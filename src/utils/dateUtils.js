
export const now = new Date();

export const fmtKey = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const todayKey = fmtKey(now);

export const seedKey = (offset) => {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    return fmtKey(d);
};

export const getKeyDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
};

export const calCells = (year, month) => {
    const first = new Date(year, month, 1).getDay();
    const last = new Date(year, month + 1, 0).getDate();

    // Previous month to fill at start
    const prevLast = new Date(year, month, 0).getDate();

    const cells = [];

    // Fill previous month days
    for (let i = first - 1; i >= 0; i--) {
        const d = prevLast - i;
        const dt = new Date(year, month - 1, d);
        cells.push({ date: d, key: fmtKey(dt), isCur: false });
    }

    // Current month days
    for (let d = 1; d <= last; d++) {
        const dt = new Date(year, month, d);
        cells.push({ date: d, key: fmtKey(dt), isCur: true });
    }

    // Next month days to fill (grid of 42 for consistency)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
        const dt = new Date(year, month + 1, d);
        cells.push({ date: d, key: fmtKey(dt), isCur: false });
    }

    return cells;
};
