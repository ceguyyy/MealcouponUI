import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { EMPLOYEE } from "../../../models/data";
import QRVisual from "./QRVisual";
import { qrService } from "../../../services/api";

/**
 * EMPLOYEE View: 
 * Sub-tab toggle between "Scan Mode" (Scanner) and "My QR Code" (Display)
 */
export default function QRTab({ user, onRedeemed }) {
    const currentUser = user || EMPLOYEE;
    const [subTab, setSubTab] = useState("scan"); // "scan" | "my-qr"
    const [scanned, setScanned] = useState(null);
    const [scannerError, setScannerError] = useState(null);
    const html5QrRef = useRef(null);

    // QR Generation States
    const [email, setEmail] = useState("");
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const handleFetchQR = async () => {
        if (!email.trim()) return;
        setLoading(true);
        setFetchError(null);

        const res = await qrService.getEmployeeQR(email);

        if (res.isSuccess) {
            setQrData(res);
        } else {
            setFetchError(res.message);
        }
        setLoading(false);
    };

    // Auto-start scanner when in "scan" mode and not already scanned
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
        const el = document.getElementById("emp-reader");
        if (!el) return;

        try {
            if (!html5QrRef.current) {
                html5QrRef.current = new Html5Qrcode("emp-reader");
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
            {/* SUB-TAB TOGGLE (Segmented Control) */}
            <div className="u0" style={{
                display: "flex", gap: 4, padding: 4, background: "var(--g2)",
                borderRadius: "var(--r-md)", border: "1px solid var(--b1)",
                marginBottom: 20
            }}>
                <button
                    onClick={() => { resetScan(); setSubTab("scan"); }}
                    style={{
                        flex: 1, padding: "10px", border: "none", cursor: "pointer",
                        borderRadius: "var(--r-sm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: 800,
                        background: subTab === "scan" ? "var(--primary)" : "transparent",
                        color: subTab === "scan" ? "#fff" : "var(--t3)",
                    }}
                >
                    Scan Mode
                </button>
                <button
                    onClick={() => setSubTab("my-qr")}
                    style={{
                        flex: 1, padding: "10px", border: "none", cursor: "pointer",
                        borderRadius: "var(--r-sm)", fontFamily: "var(--font)", fontSize: 13, fontWeight: 800,
                        background: subTab === "my-qr" ? "var(--primary)" : "transparent",
                        color: subTab === "my-qr" ? "#fff" : "var(--t3)",
                    }}
                >
                    My QR Code
                </button>
            </div>

            {subTab === "scan" ? (
                /* SCAN MODE */
                <div className="u1">
                    {scanned ? (
                        <div className="mo" style={{
                            padding: "48px 20px", background: "var(--g3)", border: "1px solid var(--primary-border)",
                            borderRadius: "var(--r-lg)", textAlign: "center"
                        }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--t1)" }}>Redemption Success!</div>
                            <div style={{ color: "var(--t3)", fontSize: 13, marginTop: 4 }}>Valid for {currentUser.name}</div>
                            <button onClick={resetScan} style={{
                                marginTop: 28, padding: "14px 40px", background: "var(--primary)", color: "#fff",
                                border: "none", borderRadius: "var(--r-md)", fontWeight: 800, cursor: "pointer", fontSize: 14
                            }}>Scan Next</button>
                        </div>
                    ) : (
                        <div style={{
                            position: "relative", border: "1px solid var(--b1)", background: "#000",
                            borderRadius: "var(--r-lg)", overflow: "hidden", minHeight: 320
                        }}>
                            <div id="emp-reader" style={{ width: "100%", height: 320 }} />
                            <div style={{ pointerEvents: "none", position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 220, height: 220, border: "2.5px solid var(--primary)", borderRadius: "var(--r-md)", position: "relative", boxShadow: "0 0 0 1000px rgba(0,0,0,0.5)" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2.5, background: "var(--primary)", animation: "scan 2.5s infinite ease-in-out" }} />
                                </div>
                                {scannerError && (
                                    <div style={{ marginTop: 24, padding: "8px 16px", background: "var(--red)", color: "#fff", fontSize: 12, fontWeight: 700, borderRadius: "var(--r-xl)" }}>
                                        {scannerError}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* MY QR MODE */
                <div className="u1">
                    <div className="mo" style={{
                        background: "var(--g3)", border: "1px solid var(--b1)", borderRadius: "var(--r-lg)",
                        padding: "40px 24px", textAlign: "center"
                    }}>
                        {!qrData && !loading && !fetchError && (
                            <div style={{ padding: "10px 0" }}>
                                <div style={{ fontSize: 42, marginBottom: 16 }}>🔑</div>
                                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--t1)", marginBottom: 8 }}>Access QR Code</div>
                                <div style={{ color: "var(--t3)", fontSize: 13, marginBottom: 24 }}>Enter your email to generate your meal coupon QR.</div>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    style={{
                                        width: "100%", padding: "14px 16px", borderRadius: "14px",
                                        border: "1px solid var(--b1)", background: "var(--g2)",
                                        fontSize: 14, fontFamily: "var(--font)", outline: "none",
                                        marginBottom: 16, textAlign: "center"
                                    }}
                                />
                                <button
                                    onClick={handleFetchQR}
                                    style={{
                                        width: "100%", padding: "14px", borderRadius: "14px", border: "none",
                                        background: "var(--primary)", color: "#fff",
                                        fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font)"
                                    }}>
                                    Generate QR
                                </button>
                            </div>
                        )}

                        {loading && (
                            <div style={{ padding: "40px 0" }}>
                                <div style={{
                                    width: 40, height: 40, border: "4px solid var(--primary-lighter)",
                                    borderTopColor: "var(--primary)", borderRadius: "50%",
                                    animation: "scan .8s linear infinite", margin: "0 auto", marginBottom: 20
                                }} />
                                <div style={{ color: "var(--t2)", fontSize: 14, fontWeight: 700 }}>Generating secure QR...</div>
                            </div>
                        )}

                        {fetchError && (
                            <div style={{ padding: "20px 0" }}>
                                <div style={{ fontSize: 42, marginBottom: 16 }}>⚠️</div>
                                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--red)", marginBottom: 8 }}>Failed to Generate</div>
                                <div style={{ color: "var(--t2)", fontSize: 13, marginBottom: 24 }}>{fetchError}</div>
                                <button
                                    onClick={() => setFetchError(null)}
                                    style={{
                                        padding: "12px 24px", borderRadius: "12px", border: "1px solid var(--b1)",
                                        background: "var(--g2)", color: "var(--t1)",
                                        fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)"
                                    }}>
                                    Try Again
                                </button>
                            </div>
                        )}

                        {qrData?.isSuccess && (
                            <div className="mo">
                                <div style={{
                                    background: "#fff", padding: 18, borderRadius: "var(--r-md)",
                                    display: "inline-block"
                                }}>
                                    <QRVisual code={qrData.qrHash} size={220} />
                                </div>
                                <div style={{ marginTop: 28 }}>
                                    <div style={{ fontWeight: 900, fontSize: 20, color: "var(--t1)", letterSpacing: "-0.5px" }}>{email.split("@")[0]}</div>
                                    <div style={{ fontSize: 13, color: "var(--t3)", fontWeight: 700, marginTop: 4 }}>Meal Coupon Ready</div>
                                </div>
                                <div style={{
                                    marginTop: 32, padding: "12px 16px", background: "var(--primary-lighter)",
                                    borderRadius: "var(--r-md)", border: "1px dashed var(--primary-border)",
                                    color: "var(--primary)", fontSize: 12, fontWeight: 700
                                }}>
                                    ⚠️ Show this code to the vendor stall
                                </div>
                                <button
                                    onClick={() => { setQrData(null); setEmail(""); }}
                                    style={{
                                        marginTop: 16, border: "none", background: "transparent",
                                        color: "var(--t3)", fontSize: 12, fontWeight: 600, cursor: "pointer",
                                        textDecoration: "underline"
                                    }}>
                                    Use a different email
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
