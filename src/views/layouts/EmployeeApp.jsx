import { useState } from "react";
import useAppController from "../../controllers/useAppController";
import BgMesh from "../components/BgMesh";
import GreetingHeader from "../components/GreetingHeader";
import TabBar from "../components/TabBar";
import MenuTab from "../modules/Menu/MenuTab";
import QRTab from "../modules/QR/QRTab";
import LogsTab from "../modules/Logs/LogsTab";

const EMPLOYEE_TABS = [
    { key: "menu", icon: "🗓", label: "Menu" },
    { key: "qr", icon: "◻", label: "QR" },
    { key: "logs", icon: "📋", label: "Log" },
];

export default function EmployeeApp({ user }) {
    const [tab, setTab] = useState("menu");
    const { menuByDay, loadingMenu, logs, handleRedeemed } = useAppController();

    // Filter logs for this specific employee's redeemed meals
    const employeeLogs = logs.filter(
        (log) => log.employee === (user?.name || "Ahmad Fauzi") && log.status === "redeemed"
    );

    return (
        <>
            <BgMesh />

            <div style={{
                position: "relative", zIndex: 10,
                minHeight: "100dvh", maxWidth: 430, margin: "0 auto",
                display: "flex", flexDirection: "column", paddingBottom: 80,
            }}>
                {/* HEADER */}
                <div style={{
                    position: "sticky", top: 0, zIndex: 100,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(56px) saturate(180%)", WebkitBackdropFilter: "blur(56px) saturate(180%)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}>
                    <GreetingHeader user={user} />
                </div>

                {/* CONTENT */}
                <div style={{ flex: 1, paddingTop: 8 }}>
                    {tab === "menu" && <MenuTab menuByDay={menuByDay} loading={loadingMenu} />}
                    {tab === "qr" && <QRTab user={user} onRedeemed={handleRedeemed} />}
                    {tab === "logs" && <LogsTab logs={employeeLogs} />}
                </div>
            </div>

            <TabBar tabs={EMPLOYEE_TABS} tab={tab} onChange={setTab} />
        </>
    );
}
