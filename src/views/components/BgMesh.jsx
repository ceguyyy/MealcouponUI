export default function BgMesh() {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
            <div style={{
                position: "absolute", width: 540, height: 540, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(75,97,221,.12) 0%,transparent 68%)",
                top: -120, left: -150, animation: "d1 26s ease-in-out infinite"
            }} />
            <div style={{
                position: "absolute", width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 68%)",
                bottom: -200, right: -120, animation: "d2 32s ease-in-out infinite"
            }} />
            <div style={{
                position: "absolute", width: 420, height: 420, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(75,97,221,.06) 0%,transparent 68%)",
                top: "42%", left: "18%", animation: "d3 22s ease-in-out infinite"
            }} />
        </div>
    );
}
