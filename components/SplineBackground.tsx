'use client';
import React, { useEffect } from "react";

export default function SplineBackground() {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@splinetool/viewer@1.10.53/build/spline-viewer.js";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                overflow: "hidden"
            }}
        >
            {React.createElement(
                "spline-viewer",
                {
                    url: "https://prod.spline.design/nf-jZAaB4sAlg4PZ/scene.splinecode",
                    className: "spline-bg", // Add your own class if desired
                    style: { width: "100vw", height: "100vh", objectFit: "cover" }
                }
            )}
        </div>
    );
}
