import QRResponseDto from "../models/dto/qrDto";
import { mapMenuResponseToDayMap } from "../models/dto/menuDto";

const API_BASE = "https://api-officeless-dev.mekari.com/28086";

export const qrService = {
    /**
     * Fetches the employee QR hash.
     * @param {string} email 
     * @returns {Promise<QRResponseDto>}
     */
    async getEmployeeQR(email) {
        try {
            const response = await fetch(`${API_BASE}/display_qr_employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return new QRResponseDto(data);

        } catch (error) {
            console.error("API Error (getEmployeeQR):", error);
            // Return a DTO representing the error state
            return new QRResponseDto({
                error: true,
                message: error.message || "Failed to fetch QR code.",
                qr_hash: null
            });
        }
    },

    /**
     * Fetches the daily menu for the calendar and maps it.
     * @returns {Promise<Object>} Dictionary of mapped menus by dateKey
     */
    async getDailyMenu() {
        try {
            const response = await fetch(`${API_BASE}/getMenuForCalendar`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return mapMenuResponseToDayMap(data);

        } catch (error) {
            console.error("API Error (getDailyMenu):", error);
            return {}; // Return empty map on error
        }
    }
};
