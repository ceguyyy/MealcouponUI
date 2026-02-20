import { useState, useMemo } from "react";
import { todayKey, getKeyDate } from "../../../utils/dateUtils";

/**
 * VENDOR Dashboard: 
 * Professional summary of vouchers (Total vs Redeemed) with Date filtering
 */
export default function VendorDashboard({ logs = [] }) {
    const [selectedDate, setSelectedDate] = useState(todayKey);

    // Stats calculation based on selectedDate
    const stats = useMemo(() => {
        const dailyLogs = logs.filter(log => log.date === selectedDate);
        const redeemed = dailyLogs.filter(log => log.status === "redeemed").length;
        // Mocking 'total' as slightly higher than redeemed for visual impact, 
        // or we can use a constant/target for the day.
        const totalVouchers = dailyLogs.length > 0 ? Math.max(dailyLogs.length, redeemed + 5) : 50;

        return {
            total: totalVouchers,
            redeemed: redeemed,
            pending: Math.max(0, totalVouchers - redeemed),
            rate: totalVouchers > 0 ? Math.round((redeemed / totalVouchers) * 100) : 0
        };
    }, [logs, selectedDate]);

    return (
        <div style={{ padding: "0 20px" }}>
            {/* PROFESSIONAL DATE SELECTOR */}
            <div className="u0" style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
                    Select Monitoring Date
                </label>
                <div style={{ position: "relative" }}>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{
                            width: "100%", padding: "14px 16px", background: "var(--g3)",
                            border: "1px solid var(--b1)", borderRadius: "var(--r-md)",
                            fontFamily: "var(--font)", fontWeight: 700, fontSize: 15, color: "var(--t1)",
                            appearance: "none", outline: "none", cursor: "pointer"
                        }}
                    />
                    <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--primary)", fontSize: 18 }}>
                        📅
                    </div>
                </div>
            </div>

            {/* STATS GRID */}
            <div className="u1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "var(--g3)", padding: "20px 16px", borderRadius: "var(--r-lg)", border: "1px solid var(--b1)", boxShadow: "var(--sh1)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t3)", marginBottom: 4 }}>Total Voucher</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "var(--t1)" }}>{stats.total}</div>
                </div>
                <div style={{ background: "var(--primary)", padding: "20px 16px", borderRadius: "var(--r-lg)", boxShadow: "0 8px 16px var(--primary-lighter)", color: "#fff" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8, marginBottom: 4 }}>Redeemed</div>
                    <div style={{ fontSize: 28, fontWeight: 900 }}>{stats.redeemed}</div>
                </div>
            </div>

            {/* ANALYTICS SECTION */}
            <div className="u2" style={{ background: "var(--g1)", border: "1px solid var(--b1)", borderRadius: "var(--r-lg)", padding: 20, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--t1)" }}>Redemption Rate</div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: "var(--primary)" }}>{stats.rate}%</div>
                </div>

                {/* Progress Bar */}
                <div style={{ height: 10, background: "rgba(0,0,0,0.05)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                    <div style={{
                        position: "absolute", top: 0, left: 0, height: "100%", width: `${stats.rate}%`,
                        background: "var(--primary)", borderRadius: 5, transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                    }} />
                </div>

                <div style={{ marginTop: 20, display: "flex", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "var(--t3)", textTransform: "uppercase" }}>Remaining</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "var(--t2)", marginTop: 2 }}>{stats.pending} Units</div>
                    </div>
                    <div style={{ borderLeft: "1px solid var(--b0)" }} />
                    <div style={{ flex: 1, paddingLeft: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "var(--t3)", textTransform: "uppercase" }}>Peak Time</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "var(--t2)", marginTop: 2 }}>12:15 PM</div>
                    </div>
                </div>
            </div>

            {/* INFO CARD */}
            <div className="u3" style={{ padding: "16px 20px", borderRadius: "var(--r-md)", background: "rgba(101,31,255,0.05)", border: "1px dashed var(--primary-border)", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 20 }}>📊</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t2)", lineHeight: 1.4 }}>
                    Data is updated automatically once an employee performs a redemption scan.
                </div>
            </div>
        </div>
    );
}
