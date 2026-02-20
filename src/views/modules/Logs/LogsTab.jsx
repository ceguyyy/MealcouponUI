import { useState, useMemo } from "react";
import { SC } from "../../../models/constants";
import { todayKey, seedKey } from "../../../utils/dateUtils";

export default function LogsTab({ logs }) {
    const [startDate, setStartDate] = useState(seedKey(-7)); // Last 7 days
    const [endDate, setEndDate] = useState(todayKey);

    const filteredLogs = useMemo(() => {
        return logs.filter(l => l.dateKey >= startDate && l.dateKey <= endDate);
    }, [logs, startDate, endDate]);

    const grouped = filteredLogs.reduce((a, l) => {
        (a[l.dateKey] ||= []).push(l);
        return a;
    }, {});

    const fDate = (key) => {
        const [y, m, d] = key.split("-");
        return `${d}/${m}/${y}`;
    };

    return (
        <div style={{ padding: "0 20px" }}>
            {/* DATE RANGE PICKER */}
            <div className="u0" style={{
                background: "var(--g2)", borderRadius: "var(--r-lg)",
                border: "1px solid var(--b1)", padding: "12px 16px",
                marginBottom: 20,
            }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--t3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Filter logs by date range
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", marginBottom: 4 }}>From</div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{
                                width: "100%", padding: "8px 10px", borderRadius: "var(--r-sm)",
                                border: "1px solid var(--b1)", background: "var(--g3)",
                                color: "var(--t1)", fontSize: 12, fontWeight: 700, outline: "none"
                            }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", marginBottom: 4 }}>To</div>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                width: "100%", padding: "8px 10px", borderRadius: "var(--r-sm)",
                                border: "1px solid var(--b1)", background: "var(--g3)",
                                color: "var(--t1)", fontSize: 12, fontWeight: 700, outline: "none"
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="u1" style={{ display: "flex", gap: 9, marginBottom: 18 }}>
                {[
                    { label: "Range Total", value: filteredLogs.length, color: "var(--primary)" },
                    { label: "Redeemed", value: filteredLogs.filter(l => l.status === "redeemed").length, color: "var(--green)" },
                ].map(({ label, value, color }, i) => (
                    <div key={i} style={{
                        flex: 1, padding: "14px 16px", borderRadius: "var(--r-lg)",
                        background: "var(--g2)", border: "1px solid var(--b1)",
                    }}>
                        <div style={{ color, fontSize: 26, fontWeight: 900 }}>{value}</div>
                        <div style={{ color: "var(--t3)", fontSize: 11, fontWeight: 600, marginTop: 2 }}>{label}</div>
                    </div>
                ))}
            </div>

            {filteredLogs.length > 0 ? (
                Object.entries(grouped)
                    .sort((a, b) => b[0].localeCompare(a[0])) // Sort by date descending
                    .map(([dateKey, items], groupIdx) => (
                        <div key={dateKey} style={{ marginBottom: 24, animation: `fadeUp .3s ${groupIdx * 0.1}s ease-out both` }}>
                            {/* GROUP HEADER (DATE) */}
                            <div style={{
                                fontSize: 11, fontWeight: 900, color: "var(--t3)",
                                letterSpacing: 1.2, textTransform: "uppercase",
                                marginBottom: 12, paddingBottom: 6, borderBottom: "1px solid rgba(0,0,0,0.03)"
                            }}>
                                {fDate(dateKey)}
                            </div>

                            {/* TABLE HEADER (ONLY ONCE PER DATE GROUP) */}
                            <div style={{
                                display: "flex", alignItems: "center", padding: "8px 12px",
                                fontSize: 10, fontWeight: 800, color: "var(--t3)",
                                textTransform: "uppercase", letterSpacing: 0.5
                            }}>
                                <div style={{ flex: 1.2 }}>Employee</div>
                                <div style={{ flex: 1.5 }}>Details</div>
                                <div style={{ width: 80, textAlign: "right" }}>Status</div>
                            </div>

                            {/* TABLE ROWS */}
                            <div style={{ background: "var(--g2)", borderRadius: "var(--r-md)", border: "1px solid var(--b1)", overflow: "hidden" }}>
                                {items.map((log, i) => {
                                    const cfg = SC[log.status] || SC.redeemed;
                                    return (
                                        <div key={log.id} style={{
                                            display: "flex", alignItems: "center", gap: 12,
                                            padding: "12px", borderBottom: i === items.length - 1 ? "none" : "1px solid var(--b1)",
                                            background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                                        }}>
                                            {/* EMPLOYEE COLUMN */}
                                            <div style={{ flex: 1.2, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                                <div style={{ color: "var(--t1)", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {log.employee}
                                                </div>
                                            </div>

                                            {/* DETAILS COLUMN */}
                                            <div style={{ flex: 1.5, minWidth: 0 }}>
                                                <div style={{ color: "var(--t2)", fontWeight: 600, fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {log.menu}
                                                </div>
                                                <div style={{ color: "var(--t3)", fontSize: 10, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {log.vendor} · {log.time}
                                                </div>
                                            </div>

                                            {/* STATUS COLUMN */}
                                            <div style={{ width: 80, display: "flex", justifyContent: "flex-end" }}>
                                                <div style={{
                                                    padding: "3px 8px", borderRadius: "100px",
                                                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                                                    color: cfg.color, fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.2
                                                }}>{cfg.label}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
            ) : (
                <div style={{
                    padding: "60px 20px", textAlign: "center", background: "var(--g2)",
                    borderRadius: "var(--r-lg)", border: "1px dashed var(--b1)",
                    color: "var(--t3)", fontSize: 14, fontWeight: 600
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🕵️‍♂️</div>
                    No logs found for the selected range.
                </div>
            )}
        </div>
    );
}
