"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const FloatingParticle = ({ delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: [0, 1, 0],
                y: [-100, -200],
                x: [0, Math.random() * 100 - 50]
            }}
            transition={{
                duration: 8,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-accent rounded-full blur-sm"
        />
    );
};

export default function NotFoundPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
                />

                {/* Floating Particles */}
                {Array.from({ length: 15 }, (_, i) => (
                    <FloatingParticle key={i} delay={i * 0.5} />
                ))}
            </div>

            {/*/!* Header with Logo *!/*/}
            {/*<motion.header*/}
            {/*    initial={{ opacity: 0, y: -50 }}*/}
            {/*    animate={{ opacity: 1, y: 0 }}*/}
            {/*    transition={{ duration: 0.8, ease: "easeOut" }}*/}
            {/*    className="relative z-10 p-6 md:p-8 flex items-center justify-between"*/}
            {/*>*/}
            {/*    <Link href="/" className="inline-block">*/}
            {/*        <div className="flex items-center space-x-3 group">*/}
            {/*            <motion.div*/}
            {/*                whileHover={{ rotate: 360 }}*/}
            {/*                transition={{ duration: 0.5 }}*/}
            {/*                className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"*/}
            {/*            >*/}
            {/*                /!* 64x64 Logos *!/*/}
            {/*                <Image*/}
            {/*                    src="/CORSW_BG_LIGHT_64x64.png"*/}
            {/*                    alt="Logo"*/}
            {/*                    width={64}*/}
            {/*                    height={64}*/}
            {/*                    className="hidden md:block dark:hidden"*/}
            {/*                />*/}
            {/*                <Image*/}
            {/*                    src="/CORSW_BG_DARK_64x64.png"*/}
            {/*                    alt="Logo"*/}
            {/*                    width={64}*/}
            {/*                    height={64}*/}
            {/*                    className="hidden dark:md:block"*/}
            {/*                />*/}
            
            {/*                /!* 32x32 Logos *!/*/}
            {/*                <Image*/}
            {/*                    src="/CORSW_BG_LIGHT_32x32.png"*/}
            {/*                    alt="Logo"*/}
            {/*                    width={32}*/}
            {/*                    height={32}*/}
            {/*                    className="block md:hidden dark:hidden"*/}
            {/*                />*/}
            {/*                <Image*/}
            {/*                    src="/CORSW_BG_DARK_32x32.png"*/}
            {/*                    alt="Logo"*/}
            {/*                    width={32}*/}
            {/*                    height={32}*/}
            {/*                    className="hidden dark:block dark:md:hidden"*/}
            {/*                />*/}
            {/*            </motion.div>*/}
            {/*            <span className="text-xl font-bold">*/}
            {/*  Corner Software*/}
            {/*</span>*/}
            {/*        </div>*/}
            {/*    </Link>*/}
            {/*</motion.header>*/}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Glass Morphism Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="glass rounded-3xl p-8 md:p-12 space-y-8"
                    >
                        {/* 404 Number */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.6
                            }}
                            className="relative"
                        >
                            <div className="text-8xl md:text-9xl font-bold opacity-20 absolute inset-0 blur-sm">
                                404
                            </div>
                            <div className="text-8xl md:text-9xl font-bold text-primary/80 relative z-10">
                                404
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-3xl md:text-4xl font-bold text-primary"
                        >
                            Page Not Found
                        </motion.h1>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="space-y-4"
                        >
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300  leading-relaxed">
                                Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Don&apos;t worry though – our homepage is still exactly where you left it.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="bfont-semibold px-8 py-3 rounded-xl transition-all duration-300 group"
                                >
                                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Go Home
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.history.back()}
                                className="px-8 py-3 rounded-xl transition-all duration-300 group"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="glass-light rounded-xl p-6"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            If you believe this is an error, please{" "}
                            <Link href="/contact" className="text-primary hover:underline">
                                contact our support team
                            </Link>{" "}
                            and we&apos;ll help you find what you&apos;re looking for.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="relative z-10 p-6 text-center"
            >
                <p className="text-gray-500 text-sm">
                    ©{new Date().getFullYear()} Shivam Sales Corporation All rights reserved.
                </p>
            </motion.footer>

            {/* Ambient Light Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-white/5 pointer-events-none"
            />
        </div>
    );
}