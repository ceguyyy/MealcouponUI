export default class MenuDto {
    constructor(data) {
        this.id = data?.id;

        // Convert menu_date (milliseconds) to YYYY-MM-DD
        const d = new Date(data?.menu_date || Date.now());
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        this.dateKey = `${y}-${m}-${day}`;

        this.vendorName = data?.vendor_id?.name || "Unknown Vendor";
        this.dishes = (data?.menu_detail || []).map(detail => detail.menu);
    }
}

/**
 * Maps the raw API response array into the dictionary format expected by MenuTab and FullCalendar:
 * { "YYYY-MM-DD": [ { id, name, vendor }, ... ] }
 */
export function mapMenuResponseToDayMap(apiResponseArray) {
    const menuByDay = {};
    if (!Array.isArray(apiResponseArray)) return menuByDay;

    for (const raw of apiResponseArray) {
        const dto = new MenuDto(raw);
        if (!menuByDay[dto.dateKey]) {
            menuByDay[dto.dateKey] = [];
        }

        dto.dishes.forEach((dish, idx) => {
            menuByDay[dto.dateKey].push({
                id: `${dto.id}-${idx}`,
                name: dish,
                vendor: dto.vendorName
            });
        });
    }
    return menuByDay;
}
