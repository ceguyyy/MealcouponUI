/**
 * Talenta Mobile ↔ Web Bridge
 * Handles postMessage communication with the Talenta Mobile app.
 */

const listeners = {};

/** Register a callback for a specific message type */
export function onBridgeMessage(messageType, callback) {
    if (!listeners[messageType]) listeners[messageType] = [];
    listeners[messageType].push(callback);
    return () => {
        listeners[messageType] = listeners[messageType].filter((cb) => cb !== callback);
    };
}

/** Initialize the bridge — call once on app mount */
export function initBridge() {
    const handler = (event) => {
        let data = event.data;
        // Handle string payloads
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch {
                return;
            }
        }
        if (!data?.message) return;

        const cbs = listeners[data.message];
        if (cbs) cbs.forEach((cb) => cb(data.payload));
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
}

/** Send message to Talenta Mobile */
function sendToMobile(message, payload = null) {
    const msg = { message, payload };
    // React Native WebView
    if (window.ReactNativeWebView?.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }
    // Standard parent frame
    else if (window.parent !== window) {
        window.parent.postMessage(msg, "*");
    }
}

// ─── Outbound helpers ───────────────────────────

export function sendInvalidToken() {
    sendToMobile("invalid_token");
}

export function sendCloseWebview() {
    sendToMobile("close_webview");
}

export function sendExitApplication() {
    sendToMobile("exit_application");
}

export function sendOpenExternalBrowser(path) {
    sendToMobile("open_external_browser", { path });
}

export function sendOpenNativePage(path) {
    sendToMobile("open_native_page", { path });
}

export function sendOpenSignOut(force = false, message = "") {
    sendToMobile("open_sign_out", { force, message });
}
