import { NextRequest, NextResponse } from 'next/server';

import { bearerFromHeader, verifyAuthToken } from '@/lib/auth/tokens';
import { getBuddyConnectionsCollection, getUserAgentsCollection, ensureMongoIndexes } from '@/lib/mongodb';

/**
 * POST /api/buddies/connect
 *
 * Create a buddy connection. Stores the connection in MongoDB and returns
 * the buddy's agent addresses so the user can chat with them on ASI:One.
 *
 * Body: { buddyId: string; buddyName?: string }
 */
export async function POST(req: NextRequest) {
  const token = bearerFromHeader(req.headers.get('authorization'));
  const payload = verifyAuthToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const body = (await req.json()) as { buddyId: string; buddyName?: string };
  if (!body.buddyId) {
    return NextResponse.json({ error: 'buddyId is required' }, { status: 400 });
  }

  if (body.buddyId === payload.uid) {
    return NextResponse.json({ error: 'cannot connect with yourself' }, { status: 400 });
  }

  await ensureMongoIndexes();
  const connectionsCol = await getBuddyConnectionsCollection();

  // Look up buddy's agent addresses
  const userAgentsCol = await getUserAgentsCollection();
  const buddyAgents = await userAgentsCol.findOne({ userId: body.buddyId });

  type AgentRole = { address: string; port: number; seed?: string };
  const agentAddresses: Record<string, string> | null = buddyAgents
    ? {
        orchestrator: (buddyAgents.orchestrator as AgentRole | undefined)?.address ?? '',
        perception: (buddyAgents.perception as AgentRole | undefined)?.address ?? '',
        correlation: (buddyAgents.correlation as AgentRole | undefined)?.address ?? '',
        intervention: (buddyAgents.intervention as AgentRole | undefined)?.address ?? '',
      }
    : null;

  const now = Date.now();
  const record = {
    userId: payload.uid,
    buddyId: body.buddyId,
    buddyName: body.buddyName ?? `User ${body.buddyId.slice(-4)}`,
    buddyAgentAddresses: agentAddresses,
    connectedAt: now,
  };

  try {
    await connectionsCol.insertOne(record);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
      // Already connected — return existing connection
      const existing = await connectionsCol.findOne({
        userId: payload.uid,
        buddyId: body.buddyId,
      });
      return NextResponse.json({
        status: 'already_connected',
        connection: existing,
      });
    }
    throw err;
  }

  return NextResponse.json({
    status: 'connected',
    connection: record,
  });
}

/**
 * DELETE /api/buddies/connect
 *
 * Remove a buddy connection.
 * Body: { buddyId: string }
 */
export async function DELETE(req: NextRequest) {
  const token = bearerFromHeader(req.headers.get('authorization'));
  const payload = verifyAuthToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const body = (await req.json()) as { buddyId: string };
  if (!body.buddyId) {
    return NextResponse.json({ error: 'buddyId is required' }, { status: 400 });
  }

  const connectionsCol = await getBuddyConnectionsCollection();
  await connectionsCol.deleteOne({
    userId: payload.uid,
    buddyId: body.buddyId,
  });

  return NextResponse.json({ status: 'disconnected' });
}
