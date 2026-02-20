import { useState } from "react";
import { getKeyDate } from "../../../utils/dateUtils";

export default function VendorModal({ dateKey, existing, onSave, onClose }) {
    const initItem = () => ({ id: `m${Date.now()}`, name: "", vendor: "Warung Selera" });
    const [items, setItems] = useState(existing.length ? existing.map(i => ({ ...i })) : [initItem()]);

    const set = (idx, field, val) => setItems(p => p.map((it, i) => i === idx ? { ...it, [field]: val } : it));
    const add = () => setItems(p => [...p, initItem()]);
    const del = idx => setItems(p => p.filter((_, i) => i !== idx));

    const save = () => {
        const valid = items.filter(it => it.name.trim());
        onSave(dateKey, valid.map((it, i) => ({ ...it, id: it.id || `m${Date.now() + i}` })));
        onClose();
    };

    const d = getKeyDate(dateKey);
    const label = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

    return (
        <div className="fd" style={{
            position: "fixed", inset: 0, zIndex: 600,
            background: "rgba(0,0,0,0.72)", backdropFilter: "blur(16px)",
            display: "flex", flexDirection: "column",
        }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

            <div className="mo" style={{
                marginTop: "auto", maxHeight: "92dvh",
                background: "linear-gradient(168deg,rgba(16,18,30,0.98) 0%,rgba(8,8,16,0.99) 100%)",
                border: "1px solid rgba(255,255,255,0.13)",
                borderRadius: "32px 32px 0 0",
                overflow: "hidden", display: "flex", flexDirection: "column",
            }}>
                {/* Handle */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
                    <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />
                </div>

                {/* Header */}
                <div style={{
                    padding: "10px 22px 14px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
                }}>
                    <div>
                        <div style={{ color: "var(--t3)", fontSize: 10, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
                            Vendor · Add Menu
                        </div>
                        <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 16, marginTop: 2 }}>{label}</div>
                    </div>
                    <button onClick={onClose} style={{
                        width: 34, height: 34, borderRadius: 12, border: "none",
                        background: "rgba(255,255,255,0.10)", color: "var(--t2)",
                        fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>✕</button>
                </div>

                {/* Item list */}
                <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px 4px", scrollbarWidth: "none" }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{
                            marginBottom: 12, padding: "14px 16px", borderRadius: 20,
                            background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.10)",
                            display: "flex", flexDirection: "column", gap: 9,
                        }}>
                            {/* Dish name */}
                            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                                <input
                                    value={item.name}
                                    onChange={e => set(idx, "name", e.target.value)}
                                    placeholder="Dish name…"
                                    style={{
                                        flex: 1, background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(255,255,255,0.12)", borderRadius: 13,
                                        padding: "12px 14px", color: "var(--t1)", fontSize: 14, fontWeight: 600,
                                        fontFamily: "var(--font)", outline: "none",
                                    }}
                                />
                                <button onClick={() => del(idx)} style={{
                                    width: 42, height: 42, borderRadius: 12, border: "none", flexShrink: 0,
                                    background: "rgba(255,69,58,0.13)", color: "var(--red)",
                                    fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                }}>🗑</button>
                            </div>

                            {/* Vendor stall */}
                            <input
                                value={item.vendor}
                                onChange={e => set(idx, "vendor", e.target.value)}
                                placeholder="Vendor / stall name…"
                                style={{
                                    width: "100%", background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.10)", borderRadius: 13,
                                    padding: "10px 14px", color: "var(--t2)", fontSize: 13, fontWeight: 600,
                                    fontFamily: "var(--font)", outline: "none",
                                }}
                            />
                        </div>
                    ))}

                    <button onClick={add} style={{
                        width: "100%", padding: "14px", borderRadius: 18, marginBottom: 14,
                        background: "rgba(41,151,255,0.09)", border: "1.5px dashed rgba(41,151,255,0.30)",
                        color: "var(--blue)", fontSize: 14, fontWeight: 700, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        fontFamily: "var(--font)",
                    }}>
                        <span style={{ fontSize: 20 }}>＋</span> Add Dish
                    </button>
                </div>

                {/* Save CTA */}
                <div style={{ padding: "14px 18px", borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
                    <button onClick={save} style={{
                        width: "100%", padding: "16px", borderRadius: 22, border: "none",
                        background: "linear-gradient(135deg,var(--blue) 0%,var(--indigo) 100%)",
                        color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                        fontFamily: "var(--font)", letterSpacing: .2,
                    }}>
                        Save Menu · {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </button>
                </div>
            </div>
        </div>
    );
}
