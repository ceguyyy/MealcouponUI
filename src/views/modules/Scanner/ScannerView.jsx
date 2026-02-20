import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

/**
 * QR Scanner using device camera.
 * @param {Function} onScanSuccess - callback with decoded text
 * @param {Function} onClose - callback to close scanner
 * @param {string} title - scanner header title
 * @param {string} subtitle - scanner header subtitle
 */
export default function ScannerView({ onScanSuccess, onClose, title = "Scan QR Code", subtitle = "" }) {
    const scannerRef = useRef(null);
    const html5QrRef = useRef(null);
    const [error, setError] = useState(null);
    const [scanned, setScanned] = useState(null);

    useEffect(() => {
        const qr = new Html5Qrcode("qr-scanner-region");
        html5QrRef.current = qr;

        qr.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 220, height: 220 } },
            (decodedText) => {
                setScanned(decodedText);
                qr.stop().catch(() => { });
                onScanSuccess?.(decodedText);
            },
            () => { } // ignore scan failures
        ).catch((err) => {
            setError("Camera access denied or not available. " + err);
        });

        return () => {
            qr.stop().catch(() => { });
        };
    }, []);

    return (
        <div className="fd" style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
        }}>
            {/* Header */}
            <div style={{
                padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            }}>
                <div>
                    <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 18 }}>{title}</div>
                    {subtitle && <div style={{ color: "var(--t3)", fontSize: 12, fontWeight: 600, marginTop: 2 }}>{subtitle}</div>}
                </div>
                <button onClick={onClose} style={{
                    width: 38, height: 38, borderRadius: 13, border: "none",
                    background: "rgba(255,255,255,0.10)", color: "var(--t2)",
                    fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>
            </div>

            {/* Scanner area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
                {scanned ? (
                    <div className="mo" style={{
                        padding: "36px 28px", borderRadius: 28, textAlign: "center",
                        background: "rgba(50,215,75,0.12)", border: "1px solid rgba(50,215,75,0.32)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                    }}>
                        <div style={{ fontSize: 62, animation: "ck .5s cubic-bezier(.34,1.56,.64,1) both" }}>✅</div>
                        <div style={{ color: "#32D74B", fontWeight: 800, fontSize: 18 }}>Scan Successful!</div>
                        <div style={{
                            color: "var(--t3)", fontSize: 12, fontWeight: 600,
                            fontFamily: "'Courier New',monospace", wordBreak: "break-all", maxWidth: 260,
                        }}>{scanned}</div>
                    </div>
                ) : error ? (
                    <div style={{
                        padding: "36px 28px", borderRadius: 28, textAlign: "center",
                        background: "rgba(255,69,58,0.10)", border: "1px solid rgba(255,69,58,0.24)",
                    }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>📷</div>
                        <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 15 }}>Camera Error</div>
                        <div style={{ color: "var(--t3)", fontSize: 12, marginTop: 8, lineHeight: 1.6, maxWidth: 280 }}>{error}</div>
                    </div>
                ) : (
                    <>
                        <div style={{
                            width: 260, height: 260, borderRadius: 24, overflow: "hidden",
                            border: "2px solid rgba(41,151,255,0.40)",
                        }}>
                            <div id="qr-scanner-region" ref={scannerRef} style={{ width: "100%", height: "100%" }} />
                        </div>
                        <div style={{
                            marginTop: 20, padding: "12px 20px", borderRadius: 16,
                            background: "rgba(41,151,255,0.10)", border: "1px solid rgba(41,151,255,0.20)",
                            color: "rgba(255,255,255,0.58)", fontSize: 12, fontWeight: 600, textAlign: "center",
                        }}>
                            Point your camera at the QR code
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
