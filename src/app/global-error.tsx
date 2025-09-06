"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log error for debugging and monitoring
        console.error("Global error occurred:", error);

        // Here you could also send error to monitoring service
        // Example: reportError(error);
    }, [error]);

    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <html lang="en" className="dark">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <title>Critical Error - Corner Software</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              html, body {
                width: 100%;
                height: 100%;
                font-family: 'Inter', sans-serif;
                background: #000000;
                color: #fafafa;
                overflow-x: hidden;
              }
              
              .glass {
                backdrop-filter: blur(16px);
                background: rgba(26, 26, 26, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }
              
              .transition-smooth {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes pulse {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }
              
              .animate-fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
              }
              
              .animate-pulse-subtle {
                animation: pulse 2s infinite;
              }
            `,
                }}
            />
        </head>
        <body>
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                position: "relative",
            }}
        >
            {/* Background Pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 60% 60%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)
              `,
                    pointerEvents: "none",
                }}
            />

            {/* Error Container */}
            <div
                className="glass animate-fade-in-up"
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    padding: "2.5rem 2rem",
                    borderRadius: "1rem",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {/* Corner Software Branding */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "2rem",
                        gap: "0.5rem",
                    }}
                >
                    {/* 64x64 Logos */}
                    <Image
                        src="/CORSW_BG_LIGHT_64x64.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="hidden md:block dark:hidden"
                    />
                    <Image
                        src="/CORSW_BG_DARK_64x64.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="hidden dark:md:block"
                    />

                    {/* 32x32 Logos */}
                    <Image
                        src="/CORSW_BG_LIGHT_32x32.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="block md:hidden dark:hidden"
                    />
                    <Image
                        src="/CORSW_BG_DARK_32x32.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="hidden dark:block dark:md:hidden"
                    />
                    <span
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            color: "#fafafa",
                        }}
                    >
                Corner Software
              </span>
                </div>

                {/* Error Icon */}
                <div
                    className="animate-pulse-subtle"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div
                        style={{
                            width: "5rem",
                            height: "5rem",
                            background: "rgba(239, 68, 68, 0.1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid rgba(239, 68, 68, 0.3)",
                        }}
                    >
                        <AlertTriangle size={32} color="#ef4444" />
                    </div>
                </div>

                {/* Error Message */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1
                        style={{
                            fontSize: "1.875rem",
                            fontWeight: "bold",
                            color: "#fafafa",
                            marginBottom: "0.75rem",
                            lineHeight: "1.2",
                        }}
                    >
                        Critical System Error
                    </h1>
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "#a3a3a3",
                            lineHeight: "1.6",
                            marginBottom: "1rem",
                        }}
                    >
                        We apologize for the inconvenience. A critical error has occurred
                        that prevented the application from functioning properly.
                    </p>
                    {error.message && (
                        <div
                            style={{
                                background: "rgba(239, 68, 68, 0.05)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                borderRadius: "0.5rem",
                                padding: "0.75rem",
                                fontSize: "0.875rem",
                                color: "#fca5a5",
                                fontFamily: "monospace",
                                wordBreak: "break-word",
                            }}
                        >
                            {error.message}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    }}
                >
                    <Button
                        onClick={reset}
                        style={{
                            width: "100%",
                            background: "#22c55e",
                            color: "#000000",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#16a34a";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#22c55e";
                        }}
                    >
                        <RotateCcw size={16} />
                        Try Again
                    </Button>

                    <Button
                        onClick={handleGoHome}
                        variant="outline"
                        style={{
                            width: "100%",
                            background: "transparent",
                            color: "#fafafa",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                        }}
                    >
                        <Home size={16} />
                        Go to Homepage
                    </Button>
                </div>

                {/* Additional Info */}
                <div
                    style={{
                        marginTop: "2rem",
                        paddingTop: "1.5rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "#737373",
                            lineHeight: "1.5",
                        }}
                    >
                        If this problem persists, please contact our support team.
                        Error details have been automatically logged for investigation.
                    </p>
                    {error.digest && (
                        <p
                            style={{
                                fontSize: "0.75rem",
                                color: "#525252",
                                marginTop: "0.5rem",
                                fontFamily: "monospace",
                            }}
                        >
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>
            </div>
        </div>
        </body>
        </html>
    );
}