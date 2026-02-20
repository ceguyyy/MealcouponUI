export default function DI() {
    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 20, paddingBottom: 12 }}>
            <div style={{
                width: 36, height: 36, background: "var(--primary)", borderRadius: "var(--r-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden"
            }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* A more solid, flat 'M' or brand shape */}
                    <path d="M4 4H20V8L12 14L4 8V4Z" fill="white" />
                    <path d="M4 10V20H20V10L12 16L4 10Z" fill="white" />
                </svg>
            </div>
        </div>
    );
}
