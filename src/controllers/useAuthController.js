import { useState, useEffect, useCallback } from "react";
import { ROLES, MOCK_USERS } from "../models/userRoles.js";
import { initBridge, onBridgeMessage } from "../bridge/talentaBridge.js";

/**
 * Auth controller — manages user identity and role.
 * In dev mode, provides a role switcher.
 * In production (inside Talenta webview), role comes from token.
 */
export default function useAuthController() {
    const [role, setRole] = useState(ROLES.EMPLOYEE);
    const [user, setUser] = useState(MOCK_USERS.employee);
    const [token, setToken] = useState(null);
    const [headers, setHeaders] = useState(null);
    const [isDevMode, setIsDevMode] = useState(true);

    // Initialize bridge
    useEffect(() => {
        const cleanup = initBridge();

        const unsubDevice = onBridgeMessage("device_info", (payload) => {
            setHeaders(payload?.headers || null);
        });

        const unsubToken = onBridgeMessage("update_token", (payload) => {
            if (payload?.token) {
                setToken(payload.token);
                setIsDevMode(false);
                // In production, fetch user info from API using the token
                // For now, we'll keep mock data but mark as non-dev
                // fetchUserInfo(payload.token).then(info => { setUser(info); setRole(info.role); });
            }
        });

        const unsubBack = onBridgeMessage("navigate_back", () => {
            window.history.back();
        });

        return () => {
            cleanup();
            unsubDevice();
            unsubToken();
            unsubBack();
        };
    }, []);

    // Dev mode role switcher
    const switchRole = useCallback((newRole) => {
        if (!isDevMode) return;
        setRole(newRole);
        setUser(MOCK_USERS[newRole]);
    }, [isDevMode]);

    return {
        role,
        user,
        token,
        headers,
        isDevMode,
        switchRole,
        ROLES,
    };
}
