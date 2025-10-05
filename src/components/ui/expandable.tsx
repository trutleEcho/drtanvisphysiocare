"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Types
 */
interface ExpandableContextType {
    isExpanded: boolean
    setIsExpanded: (expanded: boolean) => void
    onExpandStart?: () => void
    onExpandEnd?: () => void
    collapsedSize?: number | string
    staggerChildren?: number
}

const ExpandableContext = createContext<ExpandableContextType | undefined>(undefined)

/**
 * Hook
 */
function useExpandable() {
    const context = useContext(ExpandableContext)
    if (!context) {
        throw new Error("useExpandable must be used within an Expandable component")
    }
    return context
}

/**
 * Expandable Root
 */
interface ExpandableProps {
    children: (props: { isExpanded: boolean }) => React.ReactNode
    expanded?: boolean
    onExpandedChange?: (expanded: boolean) => void
    onExpandStart?: () => void
    onExpandEnd?: () => void
    collapsedSize?: number | string // new
    staggerChildren?: number // new
    transitionDuration?: number // new
    className?: string
}

export function Expandable({
                               children,
                               expanded,
                               onExpandedChange,
                               onExpandStart,
                               onExpandEnd,
                               collapsedSize = 0,
                               staggerChildren = 0.05,
                               transitionDuration = 0.3,
                               className,
                           }: ExpandableProps) {
    const [internalExpanded, setInternalExpanded] = useState(false)

    const isControlled = expanded !== undefined
    const isExpanded = isControlled ? expanded : internalExpanded

    const setIsExpanded = (newExpanded: boolean) => {
        if (newExpanded && onExpandStart) {
            onExpandStart()
        }

        if (isControlled) {
            onExpandedChange?.(newExpanded)
        } else {
            setInternalExpanded(newExpanded)
        }

        // Call onExpandEnd after a brief delay to allow animation to start
        if (newExpanded && onExpandEnd) {
            setTimeout(onExpandEnd, transitionDuration * 1000)
        }
    }

    return (
        <ExpandableContext.Provider
            value={{
                isExpanded,
                setIsExpanded,
                onExpandStart,
                onExpandEnd,
                collapsedSize,
                staggerChildren,
            }}
        >
            <div className={cn("w-full", className)}>{children({ isExpanded })}</div>
        </ExpandableContext.Provider>
    )
}

/**
 * Expandable Components
 */
export function ExpandableCard({
                                   children,
                                   className,
                               }: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className,
            )}
        >
            {children}
        </div>
    )
}

export function ExpandableCardHeader({
                                         children,
                                         className,
                                     }: {
    children: React.ReactNode
    className?: string
}) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
}

export function ExpandableCardContent({
                                          children,
                                          className,
                                      }: {
    children: React.ReactNode
    className?: string
}) {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>
}

export function ExpandableCardFooter({
                                         children,
                                         className,
                                     }: {
    children: React.ReactNode
    className?: string
}) {
    const { isExpanded, collapsedSize, staggerChildren } = useExpandable()

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: collapsedSize }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: collapsedSize }}
                    transition={{ duration: 0.3, ease: "easeInOut", staggerChildren }}
                    className={cn("flex items-center p-6 pt-0", className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export function ExpandableTrigger({
                                      children,
                                      className,
                                  }: {
    children: React.ReactNode
    className?: string
}) {
    const { isExpanded, setIsExpanded } = useExpandable()

    return (
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
                "w-full text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md",
                className,
            )}
        >
            {children}
        </button>
    )
}

export function ExpandableContent({
                                      children,
                                      className,
                                  }: {
    children: React.ReactNode
    className?: string
}) {
    const { isExpanded, collapsedSize, staggerChildren } = useExpandable()

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: collapsedSize }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: collapsedSize }}
                    transition={{ duration: 0.3, ease: "easeInOut", staggerChildren }}
                    className={cn("overflow-hidden", className)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
