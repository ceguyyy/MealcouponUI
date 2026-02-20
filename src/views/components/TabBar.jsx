const TabIcon = ({ type, sel }) => {
    const color = sel ? "var(--primary)" : "#94a3b8"; // var(--t3) roughly

    if (type === "menu" || type === "dash") {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="9" rx="1.5" fill={color} />
                <rect x="14" y="3" width="7" height="5" rx="1.5" fill={color} />
                <rect x="3" y="15" width="7" height="6" rx="1.5" fill={color} />
                <rect x="14" y="11" width="7" height="10" rx="1.5" fill={color} />
            </svg>
        );
    }
    if (type === "qr") {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="2.5" />
                <rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="2.5" />
                <rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="2.5" />
                <path d="M13 13H17V17H13V13Z" fill={color} />
                <path d="M17 17H21V21H17V17Z" fill={color} />
                <path d="M13 17H17V21H13V17Z" stroke={color} strokeWidth="1.5" />
            </svg>
        );
    }
    if (type === "logs" || type === "log") {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2.5" />
                <path d="M8 9H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <path d="M8 15H12" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    }
    return null;
};

export default function TabBar({ tabs, tab, onChange }) {
    const TABS = tabs || [
        { key: "menu", label: "Menu" },
        { key: "qr", label: "QR Pass" },
        { key: "logs", label: "Log" },
    ];

    return (
        <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 430,
            paddingBottom: "env(safe-area-inset-bottom,20px)", paddingTop: 12,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            display: "flex", zIndex: 200,
        }}>
            {TABS.map(({ key, label }) => {
                const sel = tab === key;
                return (
                    <button key={key} onClick={() => onChange(key)} style={{
                        flex: 1, background: "none", border: "none",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                        cursor: "pointer", padding: "4px 0", fontFamily: "var(--font)",
                        outline: "none"
                    }}>
                        <TabIcon type={key === "dash" ? "dash" : key} sel={sel} />
                        <span style={{
                            fontSize: 10, fontWeight: sel ? 900 : 700, letterSpacing: .2,
                            color: sel ? "var(--primary)" : "#64748b",
                            transition: "all .2s ease",
                            opacity: sel ? 1 : 0.8
                        }}>{label}</span>
                        {sel && (
                            <div style={{
                                width: 14, height: 2, borderRadius: 2,
                                background: "var(--primary)", marginTop: 2,
                                animation: "fadeUp 0.3s ease"
                            }} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
