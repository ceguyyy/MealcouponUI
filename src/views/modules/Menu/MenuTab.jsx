import { useState } from "react";
import FullCalendar from "../Calendar/FullCalendar";
import MenuRow from "./MenuRow";
import { todayKey } from "../../../utils/dateUtils";

/**
 * EMPLOYEE Menu View: 
 * Always displays the Calendar on top, and lists the menu items 
 * for the selected date immediately below it.
 */
export default function MenuTab({ menuByDay, loading }) {
    const [selectedDate, setSelectedDate] = useState(todayKey);
    const items = menuByDay[selectedDate] || [];

    return (
        <div style={{
            display: "flex", flexDirection: "column", gap: 20,
            padding: "0 20px 20px"
        }}>
            {/* PERSISTENT CALENDAR */}
            <div className="u0">
                <FullCalendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    menuByDay={menuByDay}
                />
            </div>

            {/* MENU LIST BELOW CALENDAR */}
            <div className="u1" style={{
                background: "var(--g3)", borderRadius: "var(--r-lg)",
                border: "1px solid var(--b1)", overflow: "hidden",
            }}>
                <div style={{
                    padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--t1)" }}>
                        Menu for {selectedDate === todayKey ? "Today" : selectedDate}
                    </div>
                    <div style={{
                        fontSize: 11, fontWeight: 700, color: "var(--primary)",
                        padding: "4px 10px", background: "var(--primary-lighter)",
                        borderRadius: "var(--r-xs)"
                    }}>
                        {items.length} Options
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: "40px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{
                            width: 32, height: 32, border: "3px solid var(--primary-lighter)",
                            borderTopColor: "var(--primary)", borderRadius: "50%",
                            animation: "scan .8s linear infinite", marginBottom: 16
                        }} />
                        <div style={{ color: "var(--t2)", fontSize: 13, fontWeight: 700 }}>Fetching live menu...</div>
                    </div>
                ) : items.length > 0 ? (
                    <div>
                        {items.map((it, i) => (
                            <MenuRow key={it.id || i} item={it} idx={i} isLast={i === items.length - 1} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        padding: "40px 20px", textAlign: "center", color: "var(--t3)",
                        fontSize: 14, fontWeight: 600
                    }}>
                        No menu found for this date.
                    </div>
                )}
            </div>
        </div>
    );
}
