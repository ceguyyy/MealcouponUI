import { useState } from "react";
import ScannerView from "../Scanner/ScannerView";

export default function VendorScanner({ onRedeemed }) {
    const [showScanner, setShowScanner] = useState(false);
    const [lastScanned, setLastScanned] = useState(null);

    const handleScanSuccess = (decodedText) => {
        setLastScanned({
            code: decodedText,
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        });
        setShowScanner(false);
        onRedeemed?.(decodedText);
    };

    return (
        <div style={{ padding: "0 20px" }}>
            <div className="u0" style={{
                borderRadius: 28, padding: "40px 24px", textAlign: "center",
                background: "var(--g2)", border: "1px solid var(--b0)",
            }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>📱</div>
                <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
                    Scan Employee QR
                </div>
                <div style={{ color: "var(--t2)", fontSize: 13, fontWeight: 500, lineHeight: 1.6, marginBottom: 24 }}>
                    Scan the employee's QR code to confirm their meal redemption.
                </div>
                <button onClick={() => setShowScanner(true)} style={{
                    padding: "16px 40px", borderRadius: 22, border: "none",
                    background: "linear-gradient(135deg,#22C55E 0%,#16A34A 100%)",
                    color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                    fontFamily: "var(--font)", letterSpacing: .2,
                }}>
                    Open Scanner
                </button>
            </div>

            {lastScanned && (
                <div className="mo" style={{
                    marginTop: 16, padding: "16px 18px", borderRadius: 22,
                    background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.14)",
                    display: "flex", alignItems: "center", gap: 12,
                }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 15, flexShrink: 0,
                        background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.18)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20,
                    }}>✅</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "var(--green)", fontWeight: 700, fontSize: 14 }}>Meal Redeemed</div>
                        <div style={{
                            color: "var(--t3)", fontSize: 11, fontWeight: 600, marginTop: 2,
                            fontFamily: "'Courier New',monospace", whiteSpace: "nowrap",
                            overflow: "hidden", textOverflow: "ellipsis",
                        }}>{lastScanned.code}</div>
                        <div style={{ color: "var(--t3)", fontSize: 10, marginTop: 2 }}>{lastScanned.time}</div>
                    </div>
                </div>
            )}

            <div style={{
                marginTop: 14, padding: "12px 16px", borderRadius: 18,
                background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)",
                display: "flex", alignItems: "center", gap: 10,
            }}>
                <span style={{ fontSize: 15 }}>ℹ️</span>
                <span style={{ color: "var(--t2)", fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>
                    Ask the employee to show their QR code, then tap "Open Scanner" to scan and confirm redemption.
                </span>
            </div>

            {showScanner && (
                <ScannerView
                    title="Scan Employee QR"
                    subtitle="Point camera at employee's QR code"
                    onScanSuccess={handleScanSuccess}
                    onClose={() => setShowScanner(false)}
                />
            )}
        </div>
    );
}
