import { useState } from "react";
import { MONTHS, DAYS } from "../../../models/constants";
import { now, todayKey, getKeyDate, calCells } from "../../../utils/dateUtils";

/**
 * COMPACT CALENDAR:
 * Displays a grid for date selection. Refined to be more compact
 * for the persistent layout where menu items appear below.
 */
export default function FullCalendar({ selectedDate, onSelectDate, menuByDay }) {
    // Use selectedDate as INITIAL view, but allow navigation
    const [viewDate, setViewDate] = useState(new Date(selectedDate || todayKey));

    const mo = viewDate.getMonth();
    const yr = viewDate.getFullYear();

    const prevMo = () => setViewDate(new Date(yr, mo - 1, 1));
    const nextMo = () => setViewDate(new Date(yr, mo + 1, 1));

    const cells = calCells(yr, mo);

    return (
        <div style={{ width: "100%" }}>
            {/* Month nav */}
            <div className="u0" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 12, padding: "10px 14px", borderRadius: "var(--r-lg)",
                background: "var(--g2)", border: "1px solid var(--b1)",
                backdropFilter: "var(--blur2)",
            }}>
                <button onClick={prevMo} style={{
                    width: 32, height: 32, borderRadius: "var(--r-sm)", border: "none",
                    background: "rgba(255,255,255,0.10)", color: "var(--t1)",
                    fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>‹</button>
                <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--t1)", fontWeight: 950, fontSize: 16, letterSpacing: "-0.5px" }}>
                        {viewDate.toLocaleString("default", { month: "long" })} {yr}
                    </div>
                </div>
                <button onClick={nextMo} style={{
                    width: 32, height: 32, borderRadius: "var(--r-sm)", border: "none",
                    background: "rgba(255,255,255,0.10)", color: "var(--t1)",
                    fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>›</button>
            </div>

            {/* Grid */}
            <div className="u2" style={{
                display: "grid", gridTemplateColumns: "repeat(7,1fr)",
                borderRadius: "var(--r-lg)", overflow: "hidden",
                border: "1px solid var(--b1)",
                background: "var(--g2)",
                backdropFilter: "blur(24px)",
            }}>
                {/* Days Header */}
                {DAYS.map(d => (
                    <div key={d} style={{
                        padding: "8px 0", textAlign: "center", fontSize: 10,
                        fontWeight: 800, color: "var(--t3)", background: "rgba(255,255,255,0.02)",
                        borderBottom: "1px solid rgba(0,0,0,0.03)"
                    }}>{d.slice(0, 3)}</div>
                ))}
                {/* Date Cells */}
                {cells.map((c, i) => {
                    const isSel = c.key === selectedDate;
                    const isToday = c.key === todayKey;
                    const hasMenu = menuByDay[c.key]?.length > 0;
                    return (
                        <button
                            key={i}
                            onClick={() => onSelectDate(c.key)}
                            style={{
                                aspectRatio: "1/1", border: "none", outline: "none",
                                background: isSel ? "var(--primary)" : "transparent",
                                color: isSel ? "#fff" : c.isCur ? "var(--t1)" : "var(--t3)",
                                fontSize: 13, fontWeight: isSel || isToday ? 900 : 700,
                                cursor: "pointer", position: "relative",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                borderRight: (i + 1) % 7 === 0 ? "none" : "1.1px solid rgba(0,0,0,0.02)",
                                borderBottom: i < cells.length - 7 ? "1.1px solid rgba(0,0,0,0.02)" : "none",
                                transition: "all 0.2s"
                            }}
                        >
                            {c.date}
                            {isToday && !isSel && (
                                <div style={{
                                    position: "absolute", bottom: 4, width: 4, height: 4,
                                    borderRadius: "50%", background: "var(--primary)"
                                }} />
                            )}
                            {hasMenu && !isSel && (
                                <div style={{
                                    position: "absolute", top: 4, right: 4, width: 3, height: 3,
                                    borderRadius: "50%", background: "var(--green)"
                                }} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Mini Legend */}
            <div className="u3" style={{
                display: "flex", gap: 12, marginTop: 10, padding: "8px 12px", borderRadius: "var(--r-md)",
                background: "var(--g1)", border: "1px solid var(--b0)",
                alignItems: "center",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "var(--t2)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }} /> Today
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "var(--t2)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} /> Menu Active
                </div>
            </div>
        </div>
    );
}
