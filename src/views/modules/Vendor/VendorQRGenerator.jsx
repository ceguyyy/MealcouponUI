import { useRef } from "react";
import QRVisual from "../QR/QRVisual";

export default function VendorQRGenerator({ user }) {
    const printRef = useRef(null);
    const qrCode = `VENDOR-${user?.id || "VND-0000"}-MEAL-${new Date().toISOString().split("T")[0]}`;

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open("", "_blank", "width=400,height=600");
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Meal Coupon QR - ${user?.name || "Vendor"}</title>
        <style>
          body { font-family: 'DM Sans', -apple-system, sans-serif; text-align: center; padding: 40px 20px; }
          h1 { font-size: 22px; margin-bottom: 4px; color: #232933; }
          h2 { font-size: 14px; color: #626B79; font-weight: 500; margin-bottom: 24px; }
          .qr { display: inline-block; padding: 20px; border: 2px solid #E5E7EB; border-radius: 16px; margin-bottom: 20px; }
          .code { font-family: 'Courier New', monospace; font-size: 11px; color: #9CA3AF; margin-top: 16px; word-break: break-all; }
          .date { font-size: 12px; color: #626B79; margin-top: 8px; }
          .footer { margin-top: 32px; font-size: 10px; color: #9CA3AF; }
        </style>
      </head>
      <body>
        <h1>🍽️ ${user?.name || "Vendor"}</h1>
        <h2>Meal Coupon QR Code</h2>
        <div class="qr">${printContent.innerHTML}</div>
        <div class="code">${qrCode}</div>
        <div class="date">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        <div class="footer">Scan this QR code with the Meal Coupon app to redeem your meal.</div>
      </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div style={{ padding: "0 20px" }}>
            {/* QR Card */}
            <div className="u0" style={{
                borderRadius: 36,
                background: "linear-gradient(148deg,rgba(124,58,237,.10) 0%,rgba(75,97,221,.08) 55%,rgba(34,197,94,.04) 100%)",
                border: "1px solid rgba(124,58,237,0.16)",
                overflow: "hidden", position: "relative",
            }}>
                {/* Shimmer line */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1.5,
                    background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.40),transparent)",
                    backgroundSize: "200% 100%", animation: "sm 3.5s linear infinite",
                }} />

                {/* Vendor info */}
                <div style={{ padding: "26px 24px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 20, flexShrink: 0,
                        background: "linear-gradient(135deg,#7C3AED,#A855F7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, fontWeight: 900, color: "#fff",
                    }}>{user?.initials || "V"}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "var(--t1)", fontWeight: 800, fontSize: 17 }}>{user?.name || "Vendor"}</div>
                        <div style={{ color: "var(--t2)", fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                            {user?.division || "Food Service"} · {user?.id || "VND-0000"}
                        </div>
                    </div>
                    <div style={{
                        padding: "7px 13px", borderRadius: 14,
                        background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.16)", textAlign: "center",
                    }}>
                        <div style={{ color: "var(--t3)", fontSize: 9, fontWeight: 800, letterSpacing: 1.6 }}>VENDOR</div>
                        <div style={{ color: "var(--t1)", fontSize: 9, fontWeight: 800, letterSpacing: 1.6 }}>QR</div>
                    </div>
                </div>

                {/* QR */}
                <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <div ref={printRef} style={{
                        padding: 18, borderRadius: 26,
                        background: "#fff",
                    }}>
                        <QRVisual code={qrCode} size={200} />
                    </div>

                    <div style={{
                        width: "100%", padding: "12px 18px", borderRadius: 20,
                        background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}>
                        <span style={{ fontSize: 16 }}>📅</span>
                        <div>
                            <div style={{ color: "var(--t1)", fontWeight: 700, fontSize: 13 }}>
                                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                            </div>
                            <div style={{
                                color: "var(--t3)", fontSize: 11, fontWeight: 600,
                                fontFamily: "'Courier New',monospace", letterSpacing: 1, marginTop: 2,
                            }}>
                                {qrCode}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print button */}
            <button onClick={handlePrint} style={{
                marginTop: 14, width: "100%", padding: "16px", borderRadius: 22, border: "none",
                background: "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
                color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                fontFamily: "var(--font)", letterSpacing: .2,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
                🖨️ Print QR Code
            </button>

            {/* Info */}
            <div style={{
                marginTop: 14, padding: "12px 16px", borderRadius: 18,
                background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)",
                display: "flex", alignItems: "center", gap: 10,
            }}>
                <span style={{ fontSize: 15 }}>ℹ️</span>
                <span style={{ color: "var(--t2)", fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>
                    Display this QR code for employees to scan, or print it to post at your stall.
                </span>
            </div>
        </div>
    );
}
