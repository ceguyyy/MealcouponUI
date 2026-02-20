import { useState } from "react";
import useAppController from "../../controllers/useAppController";
import BgMesh from "../components/BgMesh";
import GreetingHeader from "../components/GreetingHeader";
import TabBar from "../components/TabBar";
import VendorDashboard from "../modules/Vendor/VendorDashboard";
import VendorQRScannerTab from "../modules/Vendor/VendorQRScannerTab";
import LogsTab from "../modules/Logs/LogsTab";

const VENDOR_TABS = [
    { key: "dash", icon: "📊", label: "Dashboard" },
    { key: "qr", icon: "◻", label: "QR" },
    { key: "logs", icon: "📋", label: "Log" },
];

export default function VendorApp({ user }) {
    const [tab, setTab] = useState("dash");
    const { logs, handleRedeemed } = useAppController();

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
                <div style={{ flex: 1, paddingTop: 16 }}>
                    {tab === "dash" && <VendorDashboard logs={logs} />}
                    {tab === "qr" && <VendorQRScannerTab user={user} onRedeemed={handleRedeemed} />}
                    {tab === "logs" && <LogsTab logs={logs} />}
                </div>
            </div>

            <TabBar tabs={VENDOR_TABS} tab={tab} onChange={setTab} />
        </>
    );
}
