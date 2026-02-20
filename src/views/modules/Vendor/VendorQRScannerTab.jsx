import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRVisual from "../QR/QRVisual";

/**
 * VENDOR View:
 * Sub-tab toggle between "My QR Code" (Default) and "Scan Employee"
 */
export default function VendorQRScannerTab({ user, onRedeemed }) {
    const [subTab, setSubTab] = useState("my-qr"); // "my-qr" | "scan"
    const [scanned, setScanned] = useState(null);
    const [scannerError, setScannerError] = useState(null);
    const html5QrRef = useRef(null);

    useEffect(() => {
        if (subTab !== "scan" || scanned) {
            stopScanner();
            return;
        }

        const timer = setTimeout(() => {
            startScanner();
        }, 400);

        return () => {
            clearTimeout(timer);
            stopScanner();
        };
    }, [subTab, scanned]);

    const startScanner = async () => {
        const el = document.getElementById("vnd-reader");
        if (!el) return;

        try {
            if (!html5QrRef.current) {
                html5QrRef.current = new Html5Qrcode("vnd-reader");
            }

            await html5QrRef.current.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 220, height: 220 } },
                (text) => {
                    setScanned(text);
                    stopScanner();
                    onRedeemed?.(text);
                },
                () => { }
            );
        } catch (err) {
            setScannerError("Camera issue: " + (err?.message || "Check permissions"));
        }
    };

    const stopScanner = async () => {
        if (html5QrRef.current && html5QrRef.current.isScanning) {
            await html5QrRef.current.stop().catch(() => { });
            html5QrRef.current = null;
        }
    };

    const resetScan = () => {
        setScanned(null);
        setScannerError(null);
    };

    return (
        <div style={{ padding: "0 20px" }}>
            {/* SUB-TAB TOGGLE */}
            <div className="u0" style={{
                display: "flex", gap: 4, padding: 4, background: "var(--g2)",
                borderRadius: "var(--r-md)", border: "1px solid var(--b1)",
                marginBottom: 20, boxShadow: "var(--sh0)"
            }}>
                <button
                    onClick={() => setSubTab("my-qr")}
                    style={{
                        flex: 1, padding: "10px", border: "none", cursor: "pointer",
                        borderRadius: "var(--r-sm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: 800,
                        background: subTab === "my-qr" ? "var(--primary)" : "transparent",
                        color: subTab === "my-qr" ? "#fff" : "var(--t3)",
                        boxShadow: subTab === "my-qr" ? "0 4px 12px var(--primary-lighter)" : "none"
                    }}
                >
                    My QR Code
                </button>
                <button
                    onClick={() => { resetScan(); setSubTab("scan"); }}
                    style={{
                        flex: 1, padding: "10px", border: "none", cursor: "pointer",
                        borderRadius: "var(--r-sm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: 800,
                        background: subTab === "scan" ? "var(--primary)" : "transparent",
                        color: subTab === "scan" ? "#fff" : "var(--t3)",
                        boxShadow: subTab === "scan" ? "0 4px 12px var(--primary-lighter)" : "none"
                    }}
                >
                    Scan Mode
                </button>
            </div>

            {subTab === "my-qr" ? (
                /* VENDOR QR VIEW (Default) */
                <div className="u1">
                    <div className="mo" style={{
                        background: "#fff", border: "1px solid var(--b1)", borderRadius: "var(--r-lg)",
                        padding: "40px 20px", textAlign: "center", boxShadow: "var(--sh1)"
                    }}>
                        <div style={{
                            background: "#fff", padding: 18, borderRadius: "var(--r-md)",
                            display: "inline-block",
                        }}>
                            <QRVisual code={`VND-${user?.id || "V1"}`} size={220} />
                        </div>
                        <div style={{ marginTop: 28 }}>
                            <div style={{ color: "var(--t1)", fontWeight: 900, fontSize: 20, letterSpacing: "-0.5px" }}>{user?.name || "Vendor Stall"}</div>
                            <div style={{ color: "var(--primary)", fontSize: 13, fontWeight: 800, marginTop: 4 }}>
                                {new Date().toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'short' })}
                            </div>
                            <div style={{ color: "var(--t3)", fontSize: 12, fontWeight: 600, marginTop: 2 }}>Scan this QR to redeem meal</div>
                        </div>
                        <button
                            onClick={() => window.print()}
                            style={{
                                marginTop: 32, padding: "14px 24px", background: "none",
                                border: "1.5px solid var(--primary)", color: "var(--primary)",
                                borderRadius: "var(--r-md)", fontWeight: 800, fontSize: 14, cursor: "pointer", width: "100%"
                            }}
                        >
                            🖨️ Print QR Code
                        </button>
                    </div>
                </div>
            ) : (
                /* SCAN EMPLOYEE MODE */
                <div className="u1">
                    {scanned ? (
                        <div className="mo" style={{
                            padding: "48px 20px", background: "var(--g3)", border: "1px solid var(--primary-border)",
                            borderRadius: "var(--r-lg)", textAlign: "center", boxShadow: "var(--sh2)"
                        }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                            <div style={{ color: "var(--t1)", fontWeight: 950, fontSize: 19 }}>Redemption Confirmed</div>
                            <div style={{ color: "var(--t3)", fontSize: 13, marginTop: 4 }}>Code: {scanned}</div>
                            <button onClick={resetScan} style={{
                                marginTop: 28, padding: "14px 40px", background: "var(--primary)", color: "#fff",
                                border: "none", borderRadius: "var(--r-md)", fontWeight: 800, cursor: "pointer", fontSize: 14
                            }}>Next Scan</button>
                        </div>
                    ) : (
                        <div style={{
                            position: "relative", height: 320, background: "#000",
                            borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--b1)", boxShadow: "var(--sh1)"
                        }}>
                            <div id="vnd-reader" style={{ width: "100%", height: 320 }} />
                            <div style={{ pointerEvents: "none", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 220, height: 220, border: "2.5px solid var(--primary)", borderRadius: "var(--r-md)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2.5, background: "var(--primary)", animation: "scan 2.5s infinite ease-in-out" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    {scannerError && !scanned && (
                        <div style={{ color: "var(--red)", fontSize: 12, textAlign: "center", marginTop: 12, fontWeight: 700 }}>
                            ⚠️ {scannerError}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
