import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dummy Data
const DUMMY_STATS = [
  { label: "Total Revenue", value: "Rp 12.500.000", trend: "+15%", color: "var(--vendor-purple)" },
  { label: "Coupons Redeemed", value: "842", trend: "+5%", color: "var(--green)" },
  { label: "Active Customers", value: "156", trend: "+12%", color: "var(--orange)" },
  { label: "Avg. Transaction", value: "Rp 25.000", trend: "-2%", color: "var(--t2)" },
];

const DUMMY_TRANSACTIONS = [
  { id: "TXN-001", user: "Budi Santoso", items: "Nasi Campur + Es Teh", time: "12:05 PM", amount: "Rp 35.000", status: "Success" },
  { id: "TXN-002", user: "Siti Aminah", items: "Ayam Penyet", time: "11:45 AM", amount: "Rp 25.000", status: "Success" },
  { id: "TXN-003", user: "Joko Widodo", items: "Gado-Gado", time: "11:30 AM", amount: "Rp 20.000", status: "Success" },
  { id: "TXN-004", user: "Rina Wijaya", items: "Soto Ayam + Nasi", time: "11:15 AM", amount: "Rp 30.000", status: "Success" },
  { id: "TXN-005", user: "Andi Saputra", items: "Mie Goreng Spesial", time: "10:55 AM", amount: "Rp 28.000", status: "Success" },
  { id: "TXN-006", user: "Diana Putri", items: "Nasi Goreng Gila", time: "10:30 AM", amount: "Rp 32.000", status: "Success" },
];

const DUMMY_MENU_PERFORMANCE = [
  { name: "Nasi Campur", sold: 145, revenue: "Rp 4.350.000" },
  { name: "Ayam Penyet", sold: 120, revenue: "Rp 3.000.000" },
  { name: "Soto Ayam", sold: 95, revenue: "Rp 1.900.000" },
  { name: "Mie Goreng Spec", sold: 80, revenue: "Rp 2.240.000" },
];

const DUMMY_CHART_DATA = [
  { name: 'Mon', revenue: 4000000 },
  { name: 'Tue', revenue: 3000000 },
  { name: 'Wed', revenue: 5000000 },
  { name: 'Thu', revenue: 4500000 },
  { name: 'Fri', revenue: 6000000 },
  { name: 'Sat', revenue: 9000000 },
  { name: 'Sun', revenue: 8500000 },
];

export default function VendorDashboardFull() {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      minWidth: "1200px", /* explicitly non-responsive */
      backgroundColor: "#F3F4F6", /* light gray background */
      fontFamily: "var(--font)",
      color: "var(--t1)"
    }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>Welcome Back, Warung Berkah</h2>
            <p style={{ color: "var(--t2)", margin: 0, fontSize: "15px" }}>Here is what's happening with your sales today.</p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "var(--t2)", fontWeight: "500" }}>Tue, Oct 24, 2026</span>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--vendor-purple)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px" }}>
              W
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "40px" }}>
          {DUMMY_STATS.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: "#FFF",
              padding: "24px",
              borderRadius: "var(--r-lg)",
              border: "1px solid var(--b1)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}>
              <p style={{ fontSize: "13px", color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 12px 0", fontWeight: "600" }}>{stat.label}</p>
              <h3 style={{ fontSize: "28px", fontWeight: "800", color: "var(--t1)", margin: "0 0 8px 0" }}>{stat.value}</h3>
              <span style={{
                fontSize: "12px",
                fontWeight: "600",
                color: stat.trend.startsWith('+') ? "var(--green)" : "var(--red)",
                backgroundColor: stat.trend.startsWith('+') ? "rgba(0,186,136,0.1)" : "rgba(237,46,126,0.1)",
                padding: "4px 8px",
                borderRadius: "var(--r-sm)"
              }}>
                {stat.trend} from yesterday
              </span>
            </div>
          ))}
        </div>

        {/* Revenue Line Chart */}
        <div style={{
          backgroundColor: "#FFF",
          padding: "24px",
          borderRadius: "var(--r-lg)",
          border: "1px solid var(--b1)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Revenue Overview (This Week)</h3>
          </div>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DUMMY_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--b1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--t2)" }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fill: "var(--t2)" }} 
                  dx={-10}
                  tickFormatter={(value) => `Rp ${value / 1000000}M`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  formatter={(value) => [`Rp ${value.toLocaleString()}`, "Revenue"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--vendor-purple)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "var(--vendor-purple)", strokeWidth: 2, stroke: "#FFF" }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Layout for Tables/Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          {/* Recent Transactions */}
          <div style={{
            backgroundColor: "#FFF",
            padding: "24px",
            borderRadius: "var(--r-lg)",
            border: "1px solid var(--b1)",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Recent Transactions</h3>
              <button style={{ background: "transparent", border: "none", color: "var(--vendor-purple)", fontWeight: "600", cursor: "pointer" }}>View All</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--b1)", textAlign: "left" }}>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>ID</th>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>Customer</th>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>Items</th>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>Time</th>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>Amount</th>
                  <th style={{ padding: "12px 8px", color: "var(--t2)", fontSize: "13px", fontWeight: "600" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_TRANSACTIONS.map((txn, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--b1)", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-lighter)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: "16px 8px", fontSize: "14px", fontWeight: "600" }}>{txn.id}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px" }}>{txn.user}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "var(--t2)" }}>{txn.items}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", color: "var(--t2)" }}>{txn.time}</td>
                    <td style={{ padding: "16px 8px", fontSize: "14px", fontWeight: "600" }}>{txn.amount}</td>
                    <td style={{ padding: "16px 8px" }}>
                      <span style={{
                        fontSize: "12px", fontWeight: "600", color: "var(--green)",
                        backgroundColor: "rgba(0,186,136,0.1)", padding: "4px 8px", borderRadius: "12px"
                      }}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Menu Performance */}
          <div style={{
            backgroundColor: "#FFF",
            padding: "24px",
            borderRadius: "var(--r-lg)",
            border: "1px solid var(--b1)",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 20px 0" }}>Top Menu Items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {DUMMY_MENU_PERFORMANCE.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: idx !== DUMMY_MENU_PERFORMANCE.length - 1 ? "1px solid var(--b1)" : "none" }}>
                  <div>
                    <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600" }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--t2)" }}>{item.sold} items sold</p>
                  </div>
                  <div style={{ fontWeight: "700", color: "var(--vendor-purple)" }}>
                    {item.revenue}
                  </div>
                </div>
              ))}
            </div>
            <button style={{
              width: "100%", marginTop: "24px", padding: "12px",
              backgroundColor: "transparent", border: "1px solid var(--b1)",
              borderRadius: "var(--r-md)", fontWeight: "600", cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--vendor-purple)'; e.currentTarget.style.color = 'var(--vendor-purple)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--b1)'; e.currentTarget.style.color = 'var(--t1)'; }}
            >
              Generate Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
