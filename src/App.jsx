import "./styles/global.css";
import useAuthController from "./controllers/useAuthController";
import EmployeeApp from "./views/layouts/EmployeeApp";
import VendorApp from "./views/layouts/VendorApp";
import { ROLES } from "./models/userRoles";

export default function App() {
  const { role, user, isDevMode, switchRole } = useAuthController();

  return (
    <>
      {/* Dev-mode role switcher */}
      {isDevMode && (
        <div style={{
          position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)",
          zIndex: 9999, display: "flex", gap: 0,
          borderRadius: "var(--r-md)", overflow: "hidden",
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}>
          <button
            onClick={() => switchRole(ROLES.EMPLOYEE)}
            style={{
              padding: "8px 18px", border: "none", cursor: "pointer",
              fontFamily: "var(--font)", fontSize: 11, fontWeight: 800, letterSpacing: .5,
              background: role === ROLES.EMPLOYEE
                ? "var(--primary)"
                : "transparent",
              color: role === ROLES.EMPLOYEE ? "#fff" : "var(--t3)",
              transition: "all .3s ease",
            }}
          >
            👤 Employee
          </button>
          <div style={{ width: 1, background: "rgba(0,0,0,0.06)" }} />
          <button
            onClick={() => switchRole(ROLES.VENDOR)}
            style={{
              padding: "8px 18px", border: "none", cursor: "pointer",
              fontFamily: "var(--font)", fontSize: 11, fontWeight: 800, letterSpacing: .5,
              background: role === ROLES.VENDOR
                ? "var(--vendor-purple)"
                : "transparent",
              color: role === ROLES.VENDOR ? "#fff" : "var(--t3)",
              transition: "all .3s ease",
            }}
          >
            🏪 Vendor
          </button>
        </div>
      )}

      {/* Role-based rendering */}
      {role === ROLES.VENDOR
        ? <VendorApp user={user} />
        : <EmployeeApp user={user} />
      }
    </>
  );
}
