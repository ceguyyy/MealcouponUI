
import { seedKey } from "../utils/dateUtils";

export const EMPLOYEE = {
    name: "Ahmad Fauzi",
    role: "Employee",
    initials: "AF",
    id: "EMP-4821",
    division: "Engineering"
};

export const INIT_MENU = {
    [seedKey(0)]: [
        { id: "m1", name: "Nasi Ayam Bakar Madu", vendor: "Warung Selera" },
        { id: "m2", name: "Gado-Gado Tradisional", vendor: "Bu Sari" },
        { id: "m3", name: "Mie Goreng Jawa", vendor: "Pak Budi" },
        { id: "m4", name: "Soto Betawi Spesial", vendor: "Warung Selera" },
        { id: "m5", name: "Rendang Sapi", vendor: "Pak Budi" },
        { id: "m6", name: "Tempe Mendoan", vendor: "Bu Sari" },
    ],
    [seedKey(1)]: [
        { id: "m1", name: "Nasi Kuning Festive", vendor: "Warung Selera" },
        { id: "m2", name: "Opor Ayam Betawi", vendor: "Bu Sari" },
        { id: "m3", name: "Pecel Lele", vendor: "Pak Budi" },
    ],
    [seedKey(2)]: [
        { id: "m1", name: "Nasi Goreng Seafood", vendor: "Warung Selera" },
        { id: "m2", name: "Bakso Malang", vendor: "Pak Budi" },
        { id: "m3", name: "Capcay Sayur", vendor: "Bu Sari" },
    ],
};

export const INIT_LOGS = [
    { id: "R001", employee: "Ahmad Fauzi", menu: "Ayam Bakar Madu", vendor: "Warung Selera", time: "12:04", dateLabel: "Today", dateKey: seedKey(0), status: "redeemed" },
    { id: "R002", employee: "Budi Santoso", menu: "Gado-Gado", vendor: "Bu Sari", time: "12:11", dateLabel: "Today", dateKey: seedKey(0), status: "redeemed" },
    { id: "R003", employee: "Citra Dewi", menu: "Mie Goreng Jawa", vendor: "Pak Budi", time: "12:28", dateLabel: "Today", dateKey: seedKey(0), status: "redeemed" },
    { id: "R004", employee: "Dian P.", menu: "Soto Betawi", vendor: "Warung Selera", time: "07:42", dateLabel: "Today", dateKey: seedKey(0), status: "redeemed" },
    { id: "R005", employee: "Eka W.", menu: "Nasi Uduk", vendor: "Bu Sari", time: "12:30", dateLabel: "Yesterday", dateKey: seedKey(-1), status: "redeemed" },
    { id: "R006", employee: "Fajar N.", menu: "Ikan Bakar", vendor: "Warung Selera", time: "13:05", dateLabel: "Yesterday", dateKey: seedKey(-1), status: "redeemed" },
];
