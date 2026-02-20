export default function QRVisual({ code, size = 200 }) {
    const n = 21, cell = size / n, cells = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const fin = (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
        const tim = (r === 6 || c === 6) && !fin;
        const ch = code.charCodeAt((r * n + c) % code.length) || 65;
        if (!fin && ((tim && (r + c) % 2 === 0) || (!tim && (ch + r * 3 + c) % 4 !== 0))) cells.push([r, c]);
    }
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", borderRadius: 6 }}>
            <rect width={size} height={size} fill="white" rx={6} />
            {cells.map(([r, c], i) => <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111" />)}
            {[[0, 0], [0, n - 7], [n - 7, 0]].map(([ry, cx], i) => (
                <g key={i}>
                    <rect x={cx * cell} y={ry * cell} width={7 * cell} height={7 * cell} rx={3} fill="#111" />
                    <rect x={(cx + 1) * cell} y={(ry + 1) * cell} width={5 * cell} height={5 * cell} rx={2} fill="white" />
                    <rect x={(cx + 2) * cell} y={(ry + 2) * cell} width={3 * cell} height={3 * cell} rx={1.5} fill="#111" />
                </g>
            ))}
        </svg>
    );
}
