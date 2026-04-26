import { NextRequest, NextResponse } from 'next/server';

import { bearerFromHeader, verifyAuthToken } from '@/lib/auth/tokens';
import { getBuddyConnectionsCollection } from '@/lib/mongodb';

/**
 * GET /api/buddies/connections
 *
 * List all buddy connections for the authenticated user.
 * Returns an array of connection records with buddy agent addresses.
 */
export async function GET(req: NextRequest) {
  const token = bearerFromHeader(req.headers.get('authorization'));
  const payload = verifyAuthToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const connectionsCol = await getBuddyConnectionsCollection();
  const connections = await connectionsCol
    .find({ userId: payload.uid })
    .sort({ connectedAt: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json({
    status: 'ok',
    connections: connections.map((c) => ({
      buddyId: c.buddyId as string,
      buddyName: c.buddyName as string,
      buddyAgentAddresses: c.buddyAgentAddresses as Record<string, string> | null,
      connectedAt: c.connectedAt as number,
    })),
  });
}
