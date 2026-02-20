export default function GreetingHeader({ user }) {
    const isVendor = user?.role === "vendor";
    const accent = isVendor ? "var(--vendor-purple)" : "var(--primary)";
    const accentBg = isVendor ? "rgba(124,58,237,0.08)" : "rgba(75,97,221,0.08)";
    const accentBorder = isVendor ? "rgba(124,58,237,0.18)" : "rgba(75,97,221,0.18)";

    return (
        <div style={{ padding: "8px 22px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    color: "var(--t3)", fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                    textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 4
                }}>
                    Hello,
                </div>
                <div style={{
                    color: "var(--t1)", fontSize: 24, fontWeight: 950, letterSpacing: "-0.8px", lineHeight: 1.1,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>
                    {user?.name || "User"}
                </div>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
                    padding: "4px 12px", borderRadius: "100px",
                    background: accentBg, border: `1px solid ${accentBorder}`,
                    transition: "all 0.3s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, animation: "pu 2s ease-in-out infinite" }} />
                    <span style={{ color: accent, fontSize: 11, fontWeight: 800, letterSpacing: .2 }}>
                        {isVendor ? "Verified Vendor" : "Employee Member"}
                    </span>
                </div>
            </div>
            <div style={{
                width: 48, height: 48, borderRadius: "14px", flexShrink: 0,
                background: "linear-gradient(135deg,#651fff 0%,#7c4dff 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease", border: "2px solid #fff"
            }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4.5 6.33V15.67L12 20L19.5 15.67V6.33L12 2Z" fill="white" fillOpacity="0.9" />
                    <circle cx="12" cy="11" r="3.5" fill="#651fff" />
                </svg>
            </div>
        </div>
    );
}
