export default function MenuRow({ item, idx, total }) {
    const isLast = idx === total - 1;
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: isLast ? "none" : "0.5px solid rgba(0,0,0,0.06)",
            animation: `up .3s ${idx * 0.04}s cubic-bezier(.22, 1, .36, 1) both`,
        }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                <div style={{
                    color: "var(--t1)", fontWeight: 700, fontSize: 15, lineHeight: 1.3,
                    fontFamily: "var(--font)",
                }}>
                    {item.name}
                </div>
                <div style={{
                    color: "var(--t3)", fontSize: 12, fontWeight: 600, marginTop: 4,
                    display: "flex", alignItems: "center", gap: 5,
                }}>
                    <span style={{
                        display: "inline-block", width: 5, height: 5, borderRadius: "var(--r-xs)",
                        background: "var(--primary)", flexShrink: 0,
                    }} />
                    {item.vendor}
                </div>
            </div>
        </div>
    );
}
