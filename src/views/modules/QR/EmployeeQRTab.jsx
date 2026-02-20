import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { EMPLOYEE } from "../../../models/data";
import QRVisual from "./QRVisual";

/**
 * Combined View for Employee:
 * Default: Scanner box
 * Below: Small preview of My QR (can be expanded/toggled)
 */
export default function EmployeeQRTab({ onRedeemed }) {
    const [showMyQR, setShowMyQR] = useState(false);
    const [scanned, setScanned] = useState(null);
    const [scannerError, setScannerError] = useState(null);
    const html5QrRef = useRef(null);
    const scannerMounted = useRef(false);

    useEffect(() => {
        if (showMyQR || scanned) {
            if (html5QrRef.current) {
                html5QrRef.current.stop().catch(() => { });
                html5QrRef.current = null;
                scannerMounted.current = false;
            }
            return;
        }

        const timer = setTimeout(() => {
            if (scannerMounted.current) return;
            const el = document.getElementById("emp-scanner-feed");
            if (!el) return;

            const qr = new Html5Qrcode("emp-scanner-feed");
            html5QrRef.current = qr;
            scannerMounted.current = true;

            qr.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 220, height: 220 } },
                (decodedText) => {
                    setScanned(decodedText);
                    qr.stop().catch(() => { });
                    scannerMounted.current = false;
                    onRedeemed?.();
                },
                () => { }
            ).catch((err) => {
                setScannerError(err?.message || "Camera blocked");
                scannerMounted.current = false;
            });
        }, 300);

        return () => {
            clearTimeout(timer);
            if (html5QrRef.current) {
                html5QrRef.current.stop().catch(() => { });
                html5QrRef.current = null;
                scannerMounted.current = false;
            }
        };
    }, [showMyQR, scanned]);

    return (
        <div style={{ padding: "0 20px" }}>
            {/* SCANNER AREA */}
            {!showMyQR && !scanned && (
                <div className="u0" style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--b1)", background: "#000", minHeight: 320 }}>
                    <div id="emp-scanner-feed" style={{ width: "100%", height: "100%", minHeight: 320 }} />
                    {/* Scan Overlay UI */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 220, height: 220, border: "2px solid var(--primary)", borderRadius: "var(--r-md)", position: "relative", boxShadow: "0 0 0 2000px rgba(0,0,0,0.5)" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "var(--primary)", animation: "scanLine 2s infinite ease-in-out" }} />
                        </div>
                        <div style={{ marginTop: 20, color: "#fff", background: "rgba(0,0,0,0.6)", padding: "6px 16px", borderRadius: "var(--r-xl)", fontSize: 13, fontWeight: 600 }}>Scan Vendor QR</div>
                    </div>
                </div>
            )}

            {/* SUCCESS STATE */}
            {scanned && (
                <div className="mo" style={{ padding: "40px 20px", background: "var(--g2)", border: "1px solid var(--primary-border)", borderRadius: "var(--r-lg)", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                    <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 18 }}>Meal Confirmed</div>
                    <button onClick={() => setScanned(null)} style={{ marginTop: 20, padding: "10px 24px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontWeight: 700, cursor: "pointer" }}>Scan Again</button>
                </div>
            )}

            {/* MY QR SECTION */}
            <div className="u1" style={{ marginTop: 16 }}>
                <div style={{ background: "var(--g3)", border: "1px solid var(--b0)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--sh0)" }}>
                    <button onClick={() => setShowMyQR(!showMyQR)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>◻</span>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--t1)" }}>Show My QR</div>
                                <div style={{ fontSize: 12, color: "var(--t3)", fontWeight: 600 }}>Give this code to vendor</div>
                            </div>
                        </div>
                        <span style={{ transform: showMyQR ? "rotate(180deg)" : "none", transition: "transform 0.3s", color: "var(--t3)" }}>▾</span>
                    </button>

                    {showMyQR && (
                        <div className="mo" style={{ padding: "0 20px 24px", textAlign: "center" }}>
                            <div style={{ background: "#fff", padding: 20, borderRadius: "var(--r-md)", display: "inline-block", boxShadow: "inset 0 0 0 1px var(--b0)" }}>
                                <QRVisual code={`EMP-${EMPLOYEE.id}`} size={200} />
                            </div>
                            <div style={{ marginTop: 16, color: "var(--t1)", fontWeight: 800 }}>{EMPLOYEE.name}</div>
                            <div style={{ fontSize: 12, color: "var(--t3)", fontWeight: 600 }}>{EMPLOYEE.id}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
