(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/La Hacks 2026/Residue/src/components/FrequencyVisualizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FrequencyVisualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function FrequencyVisualizer({ frequencyData, isActive }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrequencyVisualizer.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            const width = rect.width;
            const height = rect.height;
            ctx.clearRect(0, 0, width, height);
            if (!isActive || frequencyData.length === 0) {
                ctx.fillStyle = '#1a1a2e';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#4a4a6a';
                ctx.font = '14px system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('Enable microphone to see frequency analysis', width / 2, height / 2);
                return;
            }
            ctx.fillStyle = '#0a0a1a';
            ctx.fillRect(0, 0, width, height);
            const barCount = Math.min(frequencyData.length, 64);
            const barWidth = width / barCount;
            const step = Math.floor(frequencyData.length / barCount);
            for(let i = 0; i < barCount; i++){
                const value = frequencyData[i * step] / 255;
                const barHeight = value * height * 0.9;
                const hue = 200 + value * 160;
                const saturation = 70 + value * 30;
                const lightness = 30 + value * 40;
                const gradient = ctx.createLinearGradient(i * barWidth, height, i * barWidth, height - barHeight);
                gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`);
                gradient.addColorStop(1, `hsla(${hue + 30}, ${saturation}%, ${lightness + 20}%, 0.6)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth + 1, height - barHeight, barWidth - 2, barHeight);
                ctx.fillStyle = `hsla(${hue + 30}, 100%, 70%, ${value * 0.5})`;
                ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.5)`;
                ctx.shadowBlur = 10;
                ctx.fillRect(i * barWidth + 1, height - barHeight, barWidth - 2, 2);
                ctx.shadowBlur = 0;
            }
        }
    }["FrequencyVisualizer.useEffect"], [
        frequencyData,
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full h-full rounded-lg",
        style: {
            minHeight: '200px'
        }
    }, void 0, false, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/FrequencyVisualizer.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(FrequencyVisualizer, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = FrequencyVisualizer;
var _c;
__turbopack_context__.k.register(_c, "FrequencyVisualizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DbMeter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function DbMeter({ db, optimalRange }) {
    const percentage = Math.min(100, db / 120 * 100);
    const isOptimal = optimalRange && db >= optimalRange[0] && db <= optimalRange[1];
    const getColor = ()=>{
        if (isOptimal) return 'bg-green-500';
        if (db < 30) return 'bg-blue-400';
        if (db < 60) return 'bg-cyan-400';
        if (db < 80) return 'bg-yellow-400';
        return 'bg-red-400';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-400",
                        children: "Volume Level"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-mono font-bold text-white",
                        children: [
                            Math.round(db),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400",
                                children: "dB"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                                lineNumber: 25,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 bg-gray-800 rounded-full overflow-hidden relative",
                children: [
                    optimalRange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute h-full bg-green-500/20 border-x border-green-500/50",
                        style: {
                            left: `${optimalRange[0] / 120 * 100}%`,
                            width: `${(optimalRange[1] - optimalRange[0]) / 120 * 100}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-full rounded-full transition-all duration-150 ${getColor()}`,
                        style: {
                            width: `${percentage}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-xs text-gray-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Silent"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Moderate"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Loud"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            isOptimal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-green-400 text-xs text-center",
                children: "In your optimal zone"
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = DbMeter;
var _c;
__turbopack_context__.k.register(_c, "DbMeter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductivityTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ProductivityTracker({ snapshot, history, screenPreview, isTracking, onStartTracking, onStopTracking, onSelfReport }) {
    const avgProductivity = history.length > 0 ? Math.round(history.reduce((a, b)=>a + b.productivityScore, 0) / history.length) : 0;
    const getScoreColor = (score)=>{
        if (score >= 70) return 'text-green-400';
        if (score >= 40) return 'text-yellow-400';
        return 'text-red-400';
    };
    const getScoreBg = (score)=>{
        if (score >= 70) return 'bg-green-500';
        if (score >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: "Productivity Tracker"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: isTracking ? onStopTracking : onStartTracking,
                        className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isTracking ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'}`,
                        children: isTracking ? 'Stop Tracking' : 'Start Screen Tracking'
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            isTracking && snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800/50 rounded-lg p-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Current Score"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-3xl font-bold ${getScoreColor(snapshot.productivityScore)}`,
                                children: snapshot.productivityScore
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800/50 rounded-lg p-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Avg Score"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-3xl font-bold ${getScoreColor(avgProductivity)}`,
                                children: avgProductivity
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800/50 rounded-lg p-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Screen Activity"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-3xl font-bold ${snapshot.screenChanged ? 'text-green-400' : 'text-red-400'}`,
                                children: [
                                    snapshot.changePercentage,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this),
            isTracking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: "How focused are you right now?"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSelfReport(n),
                                className: `flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${snapshot?.selfReport === n ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`,
                                children: n
                            }, n, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs text-gray-500 mt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Distracted"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Deep Focus"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this),
            history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: [
                            "Session Timeline (",
                            history.length,
                            " snapshots)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-0.5 h-8 items-end",
                        children: history.slice(-40).map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex-1 rounded-t transition-all ${getScoreBg(s.productivityScore)}`,
                                style: {
                                    height: `${Math.max(4, s.productivityScore)}%`,
                                    opacity: 0.4 + s.productivityScore / 100 * 0.6
                                },
                                title: `Score: ${s.productivityScore} | Change: ${s.changePercentage}%`
                            }, i, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this),
            screenPreview && isTracking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mb-1",
                        children: "Latest Capture (processed on-device)"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: screenPreview,
                        alt: "Screen capture",
                        className: "w-full rounded-lg border border-gray-700 opacity-60"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = ProductivityTracker;
var _c;
__turbopack_context__.k.register(_c, "ProductivityTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AudioOverlayControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const SOUND_TYPES = [
    {
        id: 'brown-noise',
        label: 'Brown Noise',
        desc: 'Deep, warm rumble'
    },
    {
        id: 'pink-noise',
        label: 'Pink Noise',
        desc: 'Balanced, natural'
    },
    {
        id: 'white-noise',
        label: 'White Noise',
        desc: 'Even frequency spread'
    },
    {
        id: 'rain',
        label: 'Rain',
        desc: 'Gentle rainfall'
    },
    {
        id: 'cafe',
        label: 'Cafe',
        desc: 'Coffee shop ambience'
    },
    {
        id: 'binaural',
        label: 'Binaural',
        desc: 'Alpha wave focus'
    }
];
function AudioOverlayControl({ overlayState, onStart, onStop, onSetVolume, onSetSoundType, recommendation }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: "Acoustic Overlay"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: overlayState.isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5 text-xs text-green-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                "Playing"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            recommendation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-lg p-3 text-sm ${recommendation.action === 'maintain' ? 'bg-green-500/10 border border-green-500/30 text-green-300' : recommendation.action === 'increase' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' : 'bg-orange-500/10 border border-orange-500/30 text-orange-300'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium mb-1",
                        children: [
                            "AI Recommendation",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-xs opacity-60",
                                children: [
                                    "(",
                                    Math.round(recommendation.confidence * 100),
                                    "% confidence)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-80",
                        children: recommendation.message
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-2",
                children: SOUND_TYPES.map((sound)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (overlayState.isPlaying && overlayState.soundType === sound.id) {
                                onStop();
                            } else {
                                onStart(sound.id, overlayState.volume, overlayState.targetDb);
                            }
                        },
                        className: `p-3 rounded-lg text-left transition-all ${overlayState.isPlaying && overlayState.soundType === sound.id ? 'bg-cyan-500/20 border border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-white",
                                children: sound.label
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400",
                                children: sound.desc
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, sound.id, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: "Volume"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: [
                                    Math.round(overlayState.volume * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "0",
                        max: "100",
                        value: Math.round(overlayState.volume * 100),
                        onChange: (e)=>onSetVolume(Number(e.target.value) / 100),
                        className: "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            overlayState.isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onStop,
                className: "w-full py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors",
                children: "Stop Overlay"
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = AudioOverlayControl;
var _c;
__turbopack_context__.k.register(_c, "AudioOverlayControl");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CorrelationDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function CorrelationDashboard({ profile, correlations }) {
    if (!profile && correlations.length < 3) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-white mb-3",
                    children: "Your Acoustic Profile"
                }, void 0, false, {
                    fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-gray-500",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                }, void 0, false, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 text-sm",
                            children: [
                                "Collecting data... (",
                                correlations.length,
                                "/3 samples needed)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-xs mt-1",
                            children: "Keep your mic and screen tracking active to build your profile"
                        }, void 0, false, {
                            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-48 mx-auto mt-3 h-2 bg-gray-800 rounded-full overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full bg-cyan-500 rounded-full transition-all",
                                style: {
                                    width: `${correlations.length / 3 * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    if (!profile) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: "Your Acoustic Profile"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400",
                        children: [
                            profile.totalSessions,
                            " data points"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800/50 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Optimal Volume Range"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-cyan-400",
                                children: [
                                    profile.optimalDbRange[0],
                                    "-",
                                    profile.optimalDbRange[1],
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400 ml-1",
                                        children: "dB"
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800/50 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Sessions Analyzed"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-purple-400",
                                children: profile.totalSessions
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: "Productivity by Volume Level"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-1 h-24",
                        children: profile.productivityByEnvironment.map((env, i)=>{
                            const height = Math.max(4, env.avgProductivity);
                            const isOptimal = env.dbLevel >= profile.optimalDbRange[0] && env.dbLevel <= profile.optimalDbRange[1];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-full rounded-t transition-all ${isOptimal ? 'bg-cyan-500' : 'bg-gray-600'}`,
                                        style: {
                                            height: `${height}%`
                                        },
                                        title: `${env.dbLevel}dB: ${env.avgProductivity}% avg productivity (${env.sampleCount} samples)`
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500",
                                        children: env.dbLevel
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-xs text-gray-500 mt-1",
                        children: "dB Level"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            profile.optimalFrequencyProfile.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: "Optimal Frequency Profile"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: profile.optimalFrequencyProfile.map((band, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500 w-20 truncate",
                                        children: band.label
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-3 bg-gray-800 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full",
                                            style: {
                                                width: `${band.magnitude * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500 w-8 text-right",
                                        children: [
                                            Math.round(band.magnitude * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = CorrelationDashboard;
var _c;
__turbopack_context__.k.register(_c, "CorrelationDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyBuddyFinder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const MOCK_BUDDIES = [
    {
        id: '1',
        name: 'Alex K.',
        optimalDbRange: [
            40,
            55
        ],
        similarity: 0.92,
        currentlyStudying: true,
        location: 'UCLA Library'
    },
    {
        id: '2',
        name: 'Sarah M.',
        optimalDbRange: [
            45,
            60
        ],
        similarity: 0.87,
        currentlyStudying: true,
        location: 'Starbucks - Westwood'
    },
    {
        id: '3',
        name: 'James R.',
        optimalDbRange: [
            35,
            50
        ],
        similarity: 0.78,
        currentlyStudying: false,
        location: 'Home'
    },
    {
        id: '4',
        name: 'Priya D.',
        optimalDbRange: [
            50,
            65
        ],
        similarity: 0.73,
        currentlyStudying: true,
        location: 'Coffee Bean - Santa Monica'
    },
    {
        id: '5',
        name: 'Mike T.',
        optimalDbRange: [
            42,
            58
        ],
        similarity: 0.69,
        currentlyStudying: false,
        location: 'Dorm Room'
    }
];
function StudyBuddyFinder({ userOptimalRange }) {
    _s();
    const [buddies, setBuddies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const findBuddies = ()=>{
        setIsSearching(true);
        setTimeout(()=>{
            let sorted = [
                ...MOCK_BUDDIES
            ];
            if (userOptimalRange) {
                sorted = sorted.map((b)=>{
                    const overlap = Math.max(0, Math.min(b.optimalDbRange[1], userOptimalRange[1]) - Math.max(b.optimalDbRange[0], userOptimalRange[0]));
                    const totalRange = Math.max(b.optimalDbRange[1] - b.optimalDbRange[0], userOptimalRange[1] - userOptimalRange[0]);
                    return {
                        ...b,
                        similarity: Math.min(1, overlap / totalRange)
                    };
                });
            }
            sorted.sort((a, b)=>b.similarity - a.similarity);
            setBuddies(sorted);
            setIsSearching(false);
        }, 1500);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudyBuddyFinder.useEffect": ()=>{
            findBuddies();
        }
    }["StudyBuddyFinder.useEffect"], [
        userOptimalRange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white",
                        children: "Study Buddy Finder"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: findBuddies,
                        disabled: isSearching,
                        className: "px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors disabled:opacity-50",
                        children: isSearching ? 'Searching...' : 'Refresh'
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-400",
                children: [
                    "Find people nearby who study best in similar acoustic environments",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-1 text-purple-400",
                        children: "(Powered by Fetch.ai Agents)"
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: buddies.map((buddy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/80 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm",
                                        children: buddy.name.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    buddy.currentlyStudying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                        lineNumber: 118,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-white",
                                                children: buddy.name
                                            }, void 0, false, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-cyan-400",
                                                children: [
                                                    Math.round(buddy.similarity * 100),
                                                    "% match"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 truncate",
                                        children: [
                                            buddy.location,
                                            " · Optimal: ",
                                            buddy.optimalDbRange[0],
                                            "-",
                                            buddy.optimalDbRange[1],
                                            "dB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors",
                                children: "Connect"
                            }, void 0, false, {
                                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this)
                        ]
                    }, buddy.id, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(StudyBuddyFinder, "WX+w1T0svGYbkeCO6QwLi62YkKs=");
_c = StudyBuddyFinder;
var _c;
__turbopack_context__.k.register(_c, "StudyBuddyFinder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModeSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const MODES = [
    {
        id: 'focus',
        label: 'Focus',
        icon: '🎯',
        desc: 'Deep work & studying'
    },
    {
        id: 'calm',
        label: 'Calm',
        icon: '🧘',
        desc: 'Relaxation & meditation'
    },
    {
        id: 'creative',
        label: 'Creative',
        icon: '🎨',
        desc: 'Brainstorming & ideation'
    },
    {
        id: 'social',
        label: 'Social',
        icon: '💬',
        desc: 'Group work & discussion'
    }
];
function ModeSelector({ currentMode, onModeChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: MODES.map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onModeChange(mode.id),
                className: `flex-1 p-3 rounded-xl text-center transition-all ${currentMode === mode.id ? 'bg-cyan-500/20 border-2 border-cyan-500/50 ring-1 ring-cyan-500/20' : 'bg-gray-800/50 border-2 border-transparent hover:border-gray-700'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl",
                        children: mode.icon
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-sm font-medium mt-1 ${currentMode === mode.id ? 'text-cyan-400' : 'text-gray-300'}`,
                        children: mode.label
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: mode.desc
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, mode.id, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = ModeSelector;
var _c;
__turbopack_context__.k.register(_c, "ModeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/hooks/useAudioCapture.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAudioCapture",
    ()=>useAudioCapture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const FREQUENCY_BANDS = [
    {
        label: 'Sub-bass',
        range: [
            20,
            60
        ]
    },
    {
        label: 'Bass',
        range: [
            60,
            250
        ]
    },
    {
        label: 'Low-mid',
        range: [
            250,
            500
        ]
    },
    {
        label: 'Mid',
        range: [
            500,
            2000
        ]
    },
    {
        label: 'Upper-mid',
        range: [
            2000,
            4000
        ]
    },
    {
        label: 'Presence',
        range: [
            4000,
            6000
        ]
    },
    {
        label: 'Brilliance',
        range: [
            6000,
            20000
        ]
    }
];
function calculateDb(analyser, dataArray) {
    analyser.getFloatTimeDomainData(dataArray);
    let sumSquares = 0;
    for(let i = 0; i < dataArray.length; i++){
        sumSquares += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);
    const db = 20 * Math.log10(Math.max(rms, 1e-10));
    return Math.max(0, Math.min(120, db + 90));
}
function getFrequencyBands(analyser, freqData, sampleRate) {
    analyser.getByteFrequencyData(freqData);
    const binSize = sampleRate / analyser.fftSize;
    return FREQUENCY_BANDS.map(({ label, range })=>{
        const startBin = Math.floor(range[0] / binSize);
        const endBin = Math.min(Math.floor(range[1] / binSize), freqData.length - 1);
        let sum = 0;
        let count = 0;
        for(let i = startBin; i <= endBin; i++){
            sum += freqData[i];
            count++;
        }
        return {
            label,
            range,
            magnitude: count > 0 ? sum / count / 255 : 0
        };
    });
}
function getDominantFrequency(analyser, freqData, sampleRate) {
    analyser.getByteFrequencyData(freqData);
    const binSize = sampleRate / analyser.fftSize;
    let maxVal = 0;
    let maxIndex = 0;
    for(let i = 0; i < freqData.length; i++){
        if (freqData[i] > maxVal) {
            maxVal = freqData[i];
            maxIndex = i;
        }
    }
    return maxIndex * binSize;
}
function getSpectralCentroid(analyser, freqData, sampleRate) {
    analyser.getByteFrequencyData(freqData);
    const binSize = sampleRate / analyser.fftSize;
    let weightedSum = 0;
    let totalMagnitude = 0;
    for(let i = 0; i < freqData.length; i++){
        weightedSum += freqData[i] * (i * binSize);
        totalMagnitude += freqData[i];
    }
    return totalMagnitude > 0 ? weightedSum / totalMagnitude : 0;
}
function useAudioCapture() {
    _s();
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentProfile, setCurrentProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rawFrequencyData, setRawFrequencyData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const analyze = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioCapture.useCallback[analyze]": ()=>{
            const analyser = analyserRef.current;
            const ctx = audioContextRef.current;
            if (!analyser || !ctx) return;
            const freqData = new Uint8Array(analyser.frequencyBinCount);
            const timeData = new Float32Array(analyser.fftSize);
            const sampleRate = ctx.sampleRate;
            const update = {
                "useAudioCapture.useCallback[analyze].update": ()=>{
                    const overallDb = calculateDb(analyser, timeData);
                    const frequencyBands = getFrequencyBands(analyser, freqData, sampleRate);
                    const dominantFrequency = getDominantFrequency(analyser, freqData, sampleRate);
                    const spectralCentroid = getSpectralCentroid(analyser, freqData, sampleRate);
                    analyser.getByteFrequencyData(freqData);
                    setRawFrequencyData(Array.from(freqData.slice(0, 128)));
                    setCurrentProfile({
                        timestamp: Date.now(),
                        overallDb,
                        frequencyBands,
                        dominantFrequency,
                        spectralCentroid
                    });
                    animFrameRef.current = requestAnimationFrame(update);
                }
            }["useAudioCapture.useCallback[analyze].update"];
            update();
        }
    }["useAudioCapture.useCallback[analyze]"], []);
    const startListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioCapture.useCallback[startListening]": async ()=>{
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false
                    }
                });
                const ctx = new AudioContext();
                const source = ctx.createMediaStreamSource(stream);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 2048;
                analyser.smoothingTimeConstant = 0.8;
                source.connect(analyser);
                audioContextRef.current = ctx;
                analyserRef.current = analyser;
                streamRef.current = stream;
                setIsListening(true);
                analyze();
            } catch (err) {
                console.error('Microphone access denied:', err);
            }
        }
    }["useAudioCapture.useCallback[startListening]"], [
        analyze
    ]);
    const stopListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioCapture.useCallback[stopListening]": ()=>{
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach({
                    "useAudioCapture.useCallback[stopListening]": (t)=>t.stop()
                }["useAudioCapture.useCallback[stopListening]"]);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            audioContextRef.current = null;
            analyserRef.current = null;
            streamRef.current = null;
            setIsListening(false);
            setCurrentProfile(null);
        }
    }["useAudioCapture.useCallback[stopListening]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAudioCapture.useEffect": ()=>{
            return ({
                "useAudioCapture.useEffect": ()=>{
                    stopListening();
                }
            })["useAudioCapture.useEffect"];
        }
    }["useAudioCapture.useEffect"], [
        stopListening
    ]);
    return {
        isListening,
        currentProfile,
        rawFrequencyData,
        startListening,
        stopListening
    };
}
_s(useAudioCapture, "6TaK1Ot6U3fuGgpvZ+oiOQhExDY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/hooks/useScreenCapture.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScreenCapture",
    ()=>useScreenCapture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const CAPTURE_INTERVAL = 30_000; // 30 seconds
const INACTIVITY_THRESHOLD = 0.02; // 2% pixel change = inactive
function compareImages(prev, curr) {
    const len = prev.data.length;
    let diffPixels = 0;
    const totalPixels = len / 4;
    for(let i = 0; i < len; i += 4){
        const rDiff = Math.abs(prev.data[i] - curr.data[i]);
        const gDiff = Math.abs(prev.data[i + 1] - curr.data[i + 1]);
        const bDiff = Math.abs(prev.data[i + 2] - curr.data[i + 2]);
        if (rDiff + gDiff + bDiff > 30) {
            diffPixels++;
        }
    }
    return diffPixels / totalPixels;
}
function useScreenCapture() {
    _s();
    const [isTracking, setIsTracking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentSnapshot, setCurrentSnapshot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [productivityHistory, setProductivityHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [screenPreview, setScreenPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevImageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inactiveCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const captureFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScreenCapture.useCallback[captureFrame]": ()=>{
            const stream = streamRef.current;
            const canvas = canvasRef.current;
            if (!stream || !canvas) return;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play().then({
                "useScreenCapture.useCallback[captureFrame]": ()=>{
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    canvas.width = 320;
                    canvas.height = 180;
                    ctx.drawImage(video, 0, 0, 320, 180);
                    setScreenPreview(canvas.toDataURL('image/jpeg', 0.5));
                    const currentImage = ctx.getImageData(0, 0, 320, 180);
                    let changePercentage = 1;
                    let screenChanged = true;
                    if (prevImageRef.current) {
                        changePercentage = compareImages(prevImageRef.current, currentImage);
                        screenChanged = changePercentage > INACTIVITY_THRESHOLD;
                    }
                    prevImageRef.current = currentImage;
                    if (!screenChanged) {
                        inactiveCountRef.current++;
                    } else {
                        inactiveCountRef.current = Math.max(0, inactiveCountRef.current - 1);
                    }
                    const recentActivity = Math.max(0, 1 - inactiveCountRef.current * 0.15);
                    const productivityScore = Math.round((screenChanged ? 70 + changePercentage * 30 : 20 - inactiveCountRef.current * 5) * recentActivity);
                    const snapshot = {
                        timestamp: Date.now(),
                        screenChanged,
                        changePercentage: Math.round(changePercentage * 100),
                        productivityScore: Math.max(0, Math.min(100, productivityScore))
                    };
                    setCurrentSnapshot(snapshot);
                    setProductivityHistory({
                        "useScreenCapture.useCallback[captureFrame]": (prev)=>[
                                ...prev.slice(-59),
                                snapshot
                            ]
                    }["useScreenCapture.useCallback[captureFrame]"]);
                    video.pause();
                    video.srcObject = null;
                }
            }["useScreenCapture.useCallback[captureFrame]"]);
        }
    }["useScreenCapture.useCallback[captureFrame]"], []);
    const startTracking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScreenCapture.useCallback[startTracking]": async ()=>{
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        frameRate: 1
                    }
                });
                streamRef.current = stream;
                canvasRef.current = document.createElement('canvas');
                stream.getVideoTracks()[0].onended = ({
                    "useScreenCapture.useCallback[startTracking]": ()=>{
                        stopTracking();
                    }
                })["useScreenCapture.useCallback[startTracking]"];
                setIsTracking(true);
                captureFrame();
                intervalRef.current = setInterval(captureFrame, CAPTURE_INTERVAL);
            } catch (err) {
                console.error('Screen capture denied:', err);
            }
        }
    }["useScreenCapture.useCallback[startTracking]"], [
        captureFrame
    ]);
    const stopTracking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScreenCapture.useCallback[stopTracking]": ()=>{
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach({
                    "useScreenCapture.useCallback[stopTracking]": (t)=>t.stop()
                }["useScreenCapture.useCallback[stopTracking]"]);
            }
            streamRef.current = null;
            prevImageRef.current = null;
            inactiveCountRef.current = 0;
            setIsTracking(false);
        }
    }["useScreenCapture.useCallback[stopTracking]"], []);
    const submitSelfReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScreenCapture.useCallback[submitSelfReport]": (rating)=>{
            if (currentSnapshot) {
                const updated = {
                    ...currentSnapshot,
                    selfReport: rating
                };
                setCurrentSnapshot(updated);
                setProductivityHistory({
                    "useScreenCapture.useCallback[submitSelfReport]": (prev)=>{
                        const copy = [
                            ...prev
                        ];
                        if (copy.length > 0) {
                            copy[copy.length - 1] = updated;
                        }
                        return copy;
                    }
                }["useScreenCapture.useCallback[submitSelfReport]"]);
            }
        }
    }["useScreenCapture.useCallback[submitSelfReport]"], [
        currentSnapshot
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScreenCapture.useEffect": ()=>{
            return ({
                "useScreenCapture.useEffect": ()=>{
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach({
                            "useScreenCapture.useEffect": (t)=>t.stop()
                        }["useScreenCapture.useEffect"]);
                    }
                }
            })["useScreenCapture.useEffect"];
        }
    }["useScreenCapture.useEffect"], []);
    return {
        isTracking,
        currentSnapshot,
        productivityHistory,
        screenPreview,
        startTracking,
        stopTracking,
        submitSelfReport
    };
}
_s(useScreenCapture, "guZwRMvy7/26hdeaW0wBp0SbjME=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/hooks/useAudioOverlay.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAudioOverlay",
    ()=>useAudioOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function createNoiseBuffer(ctx, type) {
    const sampleRate = ctx.sampleRate;
    const duration = 4;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(2, length, sampleRate);
    for(let channel = 0; channel < 2; channel++){
        const data = buffer.getChannelData(channel);
        switch(type){
            case 'brown-noise':
                {
                    let last = 0;
                    for(let i = 0; i < length; i++){
                        const white = Math.random() * 2 - 1;
                        last = (last + 0.02 * white) / 1.02;
                        data[i] = last * 3.5;
                    }
                    break;
                }
            case 'pink-noise':
                {
                    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
                    for(let i = 0; i < length; i++){
                        const white = Math.random() * 2 - 1;
                        b0 = 0.99886 * b0 + white * 0.0555179;
                        b1 = 0.99332 * b1 + white * 0.0750759;
                        b2 = 0.96900 * b2 + white * 0.1538520;
                        b3 = 0.86650 * b3 + white * 0.3104856;
                        b4 = 0.55000 * b4 + white * 0.5329522;
                        b5 = -0.7616 * b5 - white * 0.0168980;
                        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
                        b6 = white * 0.115926;
                    }
                    break;
                }
            case 'white-noise':
                {
                    for(let i = 0; i < length; i++){
                        data[i] = Math.random() * 2 - 1;
                    }
                    break;
                }
            case 'rain':
                {
                    for(let i = 0; i < length; i++){
                        const white = Math.random() * 2 - 1;
                        const envelope = Math.random() < 0.001 ? 0.8 : 0.1;
                        data[i] = white * envelope;
                    }
                    let b = 0;
                    for(let i = 0; i < length; i++){
                        b = 0.97 * b + data[i] * 0.03;
                        data[i] = b * 5;
                    }
                    break;
                }
            case 'cafe':
                {
                    let brownLast = 0;
                    for(let i = 0; i < length; i++){
                        const white = Math.random() * 2 - 1;
                        brownLast = (brownLast + 0.02 * white) / 1.02;
                        const murmur = Math.sin(i * 0.001 * (1 + Math.random() * 0.5)) * 0.05;
                        data[i] = (brownLast * 2 + murmur) * (0.8 + Math.random() * 0.4);
                    }
                    break;
                }
            case 'binaural':
                {
                    const baseFreq = 200;
                    const beatFreq = 10;
                    const leftFreq = baseFreq;
                    const rightFreq = baseFreq + beatFreq;
                    const freq = channel === 0 ? leftFreq : rightFreq;
                    for(let i = 0; i < length; i++){
                        data[i] = Math.sin(2 * Math.PI * freq * i / sampleRate) * 0.3;
                    }
                    break;
                }
        }
    }
    return buffer;
}
function useAudioOverlay() {
    _s();
    const [overlayState, setOverlayState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isPlaying: false,
        soundType: 'brown-noise',
        volume: 0.3,
        targetDb: 50
    });
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioOverlay.useCallback[startOverlay]": (soundType, volume, targetDb)=>{
            stopOverlay();
            const ctx = new AudioContext();
            const gain = ctx.createGain();
            gain.gain.value = volume;
            gain.connect(ctx.destination);
            const buffer = createNoiseBuffer(ctx, soundType);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            source.connect(gain);
            source.start();
            ctxRef.current = ctx;
            sourceRef.current = source;
            gainRef.current = gain;
            setOverlayState({
                isPlaying: true,
                soundType,
                volume,
                targetDb
            });
        }
    }["useAudioOverlay.useCallback[startOverlay]"], []);
    const stopOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioOverlay.useCallback[stopOverlay]": ()=>{
            if (sourceRef.current) {
                try {
                    sourceRef.current.stop();
                } catch  {}
            }
            if (ctxRef.current) {
                ctxRef.current.close();
            }
            sourceRef.current = null;
            ctxRef.current = null;
            gainRef.current = null;
            setOverlayState({
                "useAudioOverlay.useCallback[stopOverlay]": (prev)=>({
                        ...prev,
                        isPlaying: false
                    })
            }["useAudioOverlay.useCallback[stopOverlay]"]);
        }
    }["useAudioOverlay.useCallback[stopOverlay]"], []);
    const setVolume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioOverlay.useCallback[setVolume]": (volume)=>{
            if (gainRef.current) {
                gainRef.current.gain.value = volume;
            }
            setOverlayState({
                "useAudioOverlay.useCallback[setVolume]": (prev)=>({
                        ...prev,
                        volume
                    })
            }["useAudioOverlay.useCallback[setVolume]"]);
        }
    }["useAudioOverlay.useCallback[setVolume]"], []);
    const setSoundType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAudioOverlay.useCallback[setSoundType]": (soundType)=>{
            if (overlayState.isPlaying) {
                startOverlay(soundType, overlayState.volume, overlayState.targetDb);
            } else {
                setOverlayState({
                    "useAudioOverlay.useCallback[setSoundType]": (prev)=>({
                            ...prev,
                            soundType
                        })
                }["useAudioOverlay.useCallback[setSoundType]"]);
            }
        }
    }["useAudioOverlay.useCallback[setSoundType]"], [
        overlayState.isPlaying,
        overlayState.volume,
        overlayState.targetDb,
        startOverlay
    ]);
    return {
        overlayState,
        startOverlay,
        stopOverlay,
        setVolume,
        setSoundType
    };
}
_s(useAudioOverlay, "qzTzOujWzFlbcfbv1OBiMsuwAHE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/lib/correlationEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeCorrelations",
    ()=>analyzeCorrelations,
    "createCorrelation",
    ()=>createCorrelation,
    "getRecommendation",
    ()=>getRecommendation
]);
const DB_BUCKET_SIZE = 5;
function createCorrelation(acoustic, productivity, userId) {
    return {
        id: `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId,
        acousticProfile: acoustic,
        productivitySnapshot: productivity,
        createdAt: Date.now()
    };
}
function analyzeCorrelations(correlations) {
    if (correlations.length < 3) return null;
    const dbBuckets = new Map();
    for (const corr of correlations){
        const bucket = Math.round(corr.acousticProfile.overallDb / DB_BUCKET_SIZE) * DB_BUCKET_SIZE;
        const existing = dbBuckets.get(bucket) || {
            totalProductivity: 0,
            count: 0
        };
        existing.totalProductivity += corr.productivitySnapshot.productivityScore;
        existing.count++;
        dbBuckets.set(bucket, existing);
    }
    const productivityByEnvironment = Array.from(dbBuckets.entries()).map(([dbLevel, data])=>({
            dbLevel,
            avgProductivity: Math.round(data.totalProductivity / data.count),
            sampleCount: data.count
        })).sort((a, b)=>a.dbLevel - b.dbLevel);
    let bestDb = 50;
    let bestProductivity = 0;
    for (const env of productivityByEnvironment){
        if (env.avgProductivity > bestProductivity) {
            bestProductivity = env.avgProductivity;
            bestDb = env.dbLevel;
        }
    }
    const optimalDbRange = [
        Math.max(0, bestDb - DB_BUCKET_SIZE),
        bestDb + DB_BUCKET_SIZE
    ];
    const frequencyAccum = new Map();
    const bestCorrelations = correlations.filter((c)=>c.productivitySnapshot.productivityScore >= 60).slice(-20);
    for (const corr of bestCorrelations){
        for (const band of corr.acousticProfile.frequencyBands){
            const existing = frequencyAccum.get(band.label) || {
                totalMag: 0,
                count: 0
            };
            existing.totalMag += band.magnitude;
            existing.count++;
            frequencyAccum.set(band.label, existing);
        }
    }
    const optimalFrequencyProfile = Array.from(frequencyAccum.entries()).map(([label, data])=>({
            label,
            range: [
                0,
                0
            ],
            magnitude: data.count > 0 ? data.totalMag / data.count : 0
        }));
    return {
        id: `profile-${correlations[0]?.userId || 'anon'}`,
        optimalDbRange,
        optimalFrequencyProfile,
        productivityByEnvironment,
        totalSessions: correlations.length,
        createdAt: correlations[0]?.createdAt || Date.now(),
        updatedAt: Date.now()
    };
}
function getRecommendation(profile, currentAcoustic) {
    const currentDb = currentAcoustic.overallDb;
    const [optLow, optHigh] = profile.optimalDbRange;
    const targetDb = (optLow + optHigh) / 2;
    const confidence = Math.min(profile.totalSessions / 20, 1);
    if (currentDb < optLow) {
        return {
            action: 'increase',
            targetDb,
            message: `Your environment is quieter than your optimal range (${optLow}-${optHigh}dB). Adding ambient sound to boost focus.`,
            confidence
        };
    } else if (currentDb > optHigh) {
        return {
            action: 'decrease',
            targetDb,
            message: `Your environment is louder than your optimal range (${optLow}-${optHigh}dB). Consider noise cancellation or moving.`,
            confidence
        };
    }
    return {
        action: 'maintain',
        targetDb,
        message: `You're in your optimal acoustic zone (${optLow}-${optHigh}dB). Keep it up!`,
        confidence
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/La Hacks 2026/Residue/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$FrequencyVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/FrequencyVisualizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$DbMeter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/DbMeter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$ProductivityTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/ProductivityTracker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$AudioOverlayControl$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/AudioOverlayControl.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$CorrelationDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/CorrelationDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$StudyBuddyFinder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/StudyBuddyFinder.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$ModeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/components/ModeSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/hooks/useAudioCapture.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useScreenCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/hooks/useScreenCapture.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioOverlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/hooks/useAudioOverlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$lib$2f$correlationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/La Hacks 2026/Residue/src/lib/correlationEngine.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const [currentMode, setCurrentMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('focus');
    const [correlations, setCorrelations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionActive, setSessionActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sessionDuration, setSessionDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { isListening, currentProfile: acousticProfile, rawFrequencyData, startListening, stopListening } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioCapture"])();
    const { isTracking, currentSnapshot, productivityHistory, screenPreview, startTracking, stopTracking, submitSelfReport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useScreenCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScreenCapture"])();
    const { overlayState, startOverlay, stopOverlay, setVolume, setSoundType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioOverlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioOverlay"])();
    const handleStartSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleStartSession]": async ()=>{
            await startListening();
            setSessionActive(true);
            setSessionDuration(0);
        }
    }["Home.useCallback[handleStartSession]"], [
        startListening
    ]);
    const handleStopSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleStopSession]": ()=>{
            stopListening();
            stopTracking();
            stopOverlay();
            setSessionActive(false);
        }
    }["Home.useCallback[handleStopSession]"], [
        stopListening,
        stopTracking,
        stopOverlay
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!sessionActive) return;
            const interval = setInterval({
                "Home.useEffect.interval": ()=>{
                    setSessionDuration({
                        "Home.useEffect.interval": (d)=>d + 1
                    }["Home.useEffect.interval"]);
                }
            }["Home.useEffect.interval"], 1000);
            return ({
                "Home.useEffect": ()=>clearInterval(interval)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        sessionActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (acousticProfile && currentSnapshot) {
                const corr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$lib$2f$correlationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCorrelation"])(acousticProfile, currentSnapshot, 'user-1');
                setCorrelations({
                    "Home.useEffect": (prev)=>{
                        const next = [
                            ...prev,
                            corr
                        ].slice(-200);
                        const newProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$lib$2f$correlationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeCorrelations"])(next);
                        if (newProfile) setProfile(newProfile);
                        return next;
                    }
                }["Home.useEffect"]);
            }
        }
    }["Home.useEffect"], [
        currentSnapshot
    ]);
    const recommendation = profile && acousticProfile ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$lib$2f$correlationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecommendation"])(profile, acousticProfile) : null;
    const formatDuration = (s)=>{
        const h = Math.floor(s / 3600);
        const m = Math.floor(s % 3600 / 60);
        const sec = s % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#0a0a1a] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-md sticky top-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-3 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 text-white",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent",
                                            children: "Residue"
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: "Personalized Acoustic Intelligence"
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                sessionActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-mono text-gray-300",
                                            children: formatDuration(sessionDuration)
                                        }, void 0, false, {
                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sessionActive ? handleStopSession : handleStartSession,
                                    className: `px-5 py-2 rounded-lg font-medium text-sm transition-all ${sessionActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90'}`,
                                    children: sessionActive ? 'End Session' : 'Start Session'
                                }, void 0, false, {
                                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$ModeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        currentMode: currentMode,
                        onModeChange: setCurrentMode
                    }, void 0, false, {
                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-white mb-3",
                                                children: [
                                                    "Acoustic Environment",
                                                    isListening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-green-400 font-normal",
                                                        children: "LIVE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$FrequencyVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                frequencyData: rawFrequencyData,
                                                isActive: isListening
                                            }, void 0, false, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 15
                                            }, this),
                                            acousticProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$DbMeter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    db: acousticProfile.overallDb,
                                                    optimalRange: profile?.optimalDbRange
                                                }, void 0, false, {
                                                    fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this),
                                            acousticProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 grid grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded-lg p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: "Dominant Frequency"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-mono text-cyan-400",
                                                                children: [
                                                                    Math.round(acousticProfile.dominantFrequency),
                                                                    " Hz"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded-lg p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: "Spectral Centroid"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-mono text-purple-400",
                                                                children: [
                                                                    Math.round(acousticProfile.spectralCentroid),
                                                                    " Hz"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$ProductivityTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        snapshot: currentSnapshot,
                                        history: productivityHistory,
                                        screenPreview: screenPreview,
                                        isTracking: isTracking,
                                        onStartTracking: startTracking,
                                        onStopTracking: stopTracking,
                                        onSelfReport: submitSelfReport
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$CorrelationDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        profile: profile,
                                        correlations: correlations
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$AudioOverlayControl$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        overlayState: overlayState,
                                        onStart: (type, vol, db)=>startOverlay(type, vol, db),
                                        onStop: stopOverlay,
                                        onSetVolume: setVolume,
                                        onSetSoundType: setSoundType,
                                        recommendation: recommendation
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$components$2f$StudyBuddyFinder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        userOptimalRange: profile?.optimalDbRange
                                    }, void 0, false, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5 text-green-400",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-green-400",
                                                                children: "On-Device Processing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: "All audio analysis & screen capture processed locally. No data leaves your device."
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 grid grid-cols-2 gap-2 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded p-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Audio FFT"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-green-400 font-mono",
                                                                children: "On-device"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded p-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Screen Diff"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-green-400 font-mono",
                                                                children: "On-device"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 240,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded p-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Correlation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-green-400 font-mono",
                                                                children: "On-device"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-800/50 rounded p-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Audio Gen"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-cyan-400 font-mono",
                                                                children: "Web Audio"
                                                            }, void 0, false, {
                                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mb-2",
                                                children: "Powered by"
                                            }, void 0, false, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    'ZETIC Melange',
                                                    'ElevenLabs',
                                                    'Fetch.ai',
                                                    'MongoDB Atlas',
                                                    'Cognition',
                                                    'Web Audio API'
                                                ].map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700",
                                                        children: tech
                                                    }, tech, false, {
                                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                                lineNumber: 256,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/La Hacks 2026/Residue/src/app/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(Home, "sLEB9x9VJkKPXg9n37qGDK2AqNw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioCapture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useScreenCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScreenCapture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$La__Hacks__2026$2f$Residue$2f$src$2f$hooks$2f$useAudioOverlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioOverlay"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=La%20Hacks%202026_Residue_src_0z4ziib._.js.map