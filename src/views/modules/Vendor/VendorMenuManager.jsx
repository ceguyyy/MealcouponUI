import { useState } from "react";
import { todayKey, getKeyDate, seedKey } from "../../../utils/dateUtils";

export default function VendorMenuManager({ menuByDay, onSaveMenu, user }) {
    const [editingDate, setEditingDate] = useState(todayKey);
    const [items, setItems] = useState(() => {
        const existing = menuByDay[todayKey] || [];
        return existing.length ? existing.map(i => ({ ...i })) : [{ id: `m${Date.now()}`, name: "", vendor: user?.name || "Vendor" }];
    });
    const [saved, setSaved] = useState(false);

    const handleDateChange = (dateKey) => {
        setEditingDate(dateKey);
        const existing = menuByDay[dateKey] || [];
        setItems(existing.length ? existing.map(i => ({ ...i })) : [{ id: `m${Date.now()}`, name: "", vendor: user?.name || "Vendor" }]);
        setSaved(false);
    };

    const set = (idx, field, val) => setItems(p => p.map((it, i) => i === idx ? { ...it, [field]: val } : it));
    const add = () => setItems(p => [...p, { id: `m${Date.now()}`, name: "", vendor: user?.name || "Vendor" }]);
    const del = idx => setItems(p => p.filter((_, i) => i !== idx));

    const save = () => {
        const valid = items.filter(it => it.name.trim());
        onSaveMenu(editingDate, valid.map((it, i) => ({ ...it, id: it.id || `m${Date.now() + i}` })));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const d = getKeyDate(editingDate);
    const isToday = editingDate === todayKey;

    const quickDates = [0, 1, 2].map(offset => {
        const key = seedKey(offset);
        const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : getKeyDate(key).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        return { key, label };
    });

    return (
        <div style={{ padding: "0 20px" }}>
            {/* Date selector */}
            <div className="u0" style={{
                display: "flex", gap: 8, marginBottom: 16, overflowX: "auto",
                scrollbarWidth: "none", paddingBottom: 2,
            }}>
                {quickDates.map(({ key, label }) => (
                    <button key={key} onClick={() => handleDateChange(key)} style={{
                        padding: "10px 18px", borderRadius: "var(--r-md)", flexShrink: 0, cursor: "pointer",
                        fontFamily: "var(--font)", fontSize: 12, fontWeight: 700,
                        background: editingDate === key ? "var(--vendor-purple)" : "var(--g2)",
                        color: editingDate === key ? "#fff" : "var(--t2)",
                        border: editingDate === key ? "none" : "1px solid var(--b0)",
                    }}>
                        {label}
                    </button>
                ))}
            </div>

            {/* Header */}
            <div className="u1" style={{
                marginBottom: 14, padding: "14px 18px", borderRadius: "var(--r-lg)",
                background: "var(--g2)", border: "1px solid var(--b0)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div>
                    <div style={{ color: "var(--t3)", fontSize: 10, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
                        Manage Menu
                    </div>
                    <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 16, marginTop: 2 }}>
                        {isToday ? "Today's Menu" : d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </div>
                </div>
                {isToday && (
                    <div style={{
                        padding: "3px 10px", borderRadius: "var(--r-xs)",
                        background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)",
                        color: "var(--green)", fontSize: 10, fontWeight: 800, letterSpacing: .5,
                    }}>LIVE</div>
                )}
            </div>

            {/* Items */}
            <div className="u2" style={{
                borderRadius: "var(--r-lg)", overflow: "hidden",
                background: "var(--g2)", border: "1px solid var(--b0)",
            }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{
                        padding: "14px 16px",
                        borderBottom: idx < items.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                        display: "flex", flexDirection: "column", gap: 9,
                    }}>
                        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                            <input
                                value={item.name}
                                onChange={e => set(idx, "name", e.target.value)}
                                placeholder="Dish name…"
                                style={{
                                    flex: 1, background: "rgba(0,0,0,0.03)",
                                    border: "1px solid rgba(0,0,0,0.08)", borderRadius: 13,
                                    padding: "12px 14px", color: "var(--t1)", fontSize: 14, fontWeight: 600,
                                    fontFamily: "var(--font)", outline: "none",
                                }}
                            />
                            <button onClick={() => del(idx)} style={{
                                width: 42, height: 42, borderRadius: 12, border: "none", flexShrink: 0,
                                background: "rgba(239,68,68,0.08)", color: "var(--red)",
                                fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            }}>🗑</button>
                        </div>
                        <input
                            value={item.vendor}
                            onChange={e => set(idx, "vendor", e.target.value)}
                            placeholder="Vendor / stall name…"
                            style={{
                                width: "100%", background: "rgba(0,0,0,0.02)",
                                border: "1px solid rgba(0,0,0,0.06)", borderRadius: 13,
                                padding: "10px 14px", color: "var(--t2)", fontSize: 13, fontWeight: 600,
                                fontFamily: "var(--font)", outline: "none",
                            }}
                        />
                    </div>
                ))}
            </div>

            <button onClick={add} style={{
                width: "100%", padding: "14px", borderRadius: 18, marginTop: 12,
                background: "rgba(124,58,237,0.06)", border: "1.5px dashed rgba(124,58,237,0.24)",
                color: "var(--vendor-purple)", fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "var(--font)",
            }}>
                <span style={{ fontSize: 20 }}>＋</span> Add Dish
            </button>

            <button onClick={save} style={{
                width: "100%", padding: "16px", borderRadius: "var(--r-md)", border: "none", marginTop: 12,
                background: saved
                    ? "var(--green)"
                    : "var(--vendor-purple)",
                color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                fontFamily: "var(--font)", letterSpacing: .2,
                transition: "all .3s ease",
            }}>
                {saved ? "✓ Saved!" : `Save Menu · ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
            </button>
        </div>
    );
}
