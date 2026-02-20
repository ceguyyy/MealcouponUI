import { useState, useEffect } from "react";
import { EMPLOYEE, INIT_LOGS } from "../models/data";
import { todayKey } from "../utils/dateUtils";
import { qrService as apiService } from "../services/api";

export default function useAppController() {
    const [menuByDay, setMenuByDay] = useState({});
    const [logs, setLogs] = useState(INIT_LOGS);
    const [loadingMenu, setLoadingMenu] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            setLoadingMenu(true);
            const data = await apiService.getDailyMenu();
            setMenuByDay(data);
            setLoadingMenu(false);
        };
        fetchMenu();
    }, []);

    const handleSaveMenu = (dateKey, items) => setMenuByDay(p => ({ ...p, [dateKey]: items }));

    const handleRedeemed = (scannedCode) => {
        const employeeName = scannedCode
            ? (scannedCode.match(/EMP-([A-Z0-9-]+)/)?.[0] || "Unknown")
            : EMPLOYEE.name;

        setLogs(p => [{
            id: `R${String(p.length + 1).padStart(3, "0")}`,
            employee: employeeName,
            menu: "Meal Pass",
            vendor: "Vendor",
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            dateLabel: "Today",
            dateKey: todayKey,
            status: "redeemed",
        }, ...p]);
    };

    return {
        menuByDay,
        loadingMenu,
        logs,
        handleSaveMenu,
        handleRedeemed,
        todayKey,
    };
}
