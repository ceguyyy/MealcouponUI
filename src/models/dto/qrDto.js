/**
 * DTO for the Employee QR Code API response
 */
export default class QRResponseDto {
    constructor(data) {
        this.error = data?.error || false;
        this.message = data?.message || "Unknown error";
        this.qrHash = data?.qr_hash || null;
    }

    /**
     * Helper to check if the response is actually successful
     * based on both the error boolean and presence of a hash.
     */
    get isSuccess() {
        return !this.error && this.qrHash !== null;
    }
}
