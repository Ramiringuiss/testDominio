import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOPBAR_HEIGHT = 44

const windowVariants = {
    hidden: {
        opacity: 0,
        scale: 0.85,
        y: 20,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.32,
            ease: [0.22, 1, 0.36, 1],
        }
    },
    exit: {
        opacity: 0,
        scale: 0.88,
        y: 10,
        filter: 'blur(6px)',
        transition: {
            duration: 0.22,
            ease: [0.4, 0, 1, 1],
        }
    }
}

export default function Window({
    window: win,
    isFocused,
    onFocus,
    onClose,
    onMinimize,
    onMaximize,
    onPositionChange,
    children,
}) {
    const dragRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const borderColor = isFocused
        ? 'rgba(148, 226, 213, 0.7)'
        : 'rgba(88, 91, 112, 0.4)'

    const glowShadow = isFocused
        ? '0 0 0 1px rgba(148,226,213,0.5), 0 0 30px rgba(148,226,213,0.15), 0 25px 60px rgba(0,0,0,0.7)'
        : '0 0 0 1px rgba(88,91,112,0.3), 0 20px 50px rgba(0,0,0,0.6)'

    const maximizedStyle = win.maximized
        ? {
            left: 0,
            top: TOPBAR_HEIGHT,
            width: '100vw',
            height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
            borderRadius: 0,
        }
        : {
            left: win.pos.x,
            top: Math.max(win.pos.y, TOPBAR_HEIGHT),
            width: win.size.w,
            height: win.size.h,
            borderRadius: 12,
        }

    return (
        <AnimatePresence>
            {!win.minimized && (
                <motion.div
                    key={win.id}
                    ref={dragRef}
                    variants={windowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    drag={!win.maximized}
                    dragMomentum={false}
                    dragElastic={0}
                    onDragStart={() => {
                        setIsDragging(true)
                        onFocus()
                    }}
                    onDragEnd={(_, info) => {
                        setIsDragging(false)
                        if (!win.maximized) {
                            onPositionChange({
                                x: win.pos.x + info.offset.x,
                                y: win.pos.y + info.offset.y,
                            })
                        }
                    }}
                    onClick={onFocus}
                    className="absolute flex flex-col overflow-hidden select-none"
                    style={{
                        ...maximizedStyle,
                        zIndex: win.zIndex,
                        background: 'rgba(17, 17, 27, 0.82)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: `1.5px solid ${borderColor}`,
                        boxShadow: glowShadow,
                        transition: win.maximized ? 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
                    }}
                >
                    {/* Title Bar */}
                    <div
                        className="flex items-center justify-between px-3 shrink-0"
                        style={{
                            height: 36,
                            background: 'rgba(30, 30, 46, 0.6)',
                            borderBottom: '1px solid rgba(88,91,112,0.3)',
                            cursor: win.maximized ? 'default' : 'move',
                        }}
                    >
                        {/* Window Controls */}
                        <div className="flex items-center gap-1.5">
                            {/* Close */}
                            <button
                                className="w-3 h-3 rounded-full flex items-center justify-center group transition-all duration-150"
                                style={{ background: '#f38ba8', border: '1px solid rgba(0,0,0,0.2)' }}
                                onClick={e => { e.stopPropagation(); onClose() }}
                                title="Close"
                            >
                                <span className="opacity-0 group-hover:opacity-100 text-black font-bold leading-none" style={{ fontSize: 7 }}>×</span>
                            </button>
                            {/* Minimize */}
                            <button
                                className="w-3 h-3 rounded-full flex items-center justify-center group transition-all duration-150"
                                style={{ background: '#f9e2af', border: '1px solid rgba(0,0,0,0.2)' }}
                                onClick={e => { e.stopPropagation(); onMinimize() }}
                                title="Minimize"
                            >
                                <span className="opacity-0 group-hover:opacity-100 text-black font-bold leading-none" style={{ fontSize: 7 }}>–</span>
                            </button>
                            {/* Maximize */}
                            <button
                                className="w-3 h-3 rounded-full flex items-center justify-center group transition-all duration-150"
                                style={{ background: '#a6e3a1', border: '1px solid rgba(0,0,0,0.2)' }}
                                onClick={e => { e.stopPropagation(); onMaximize() }}
                                title="Maximize"
                            >
                                <span className="opacity-0 group-hover:opacity-100 text-black font-bold leading-none" style={{ fontSize: 6 }}>⛶</span>
                            </button>
                        </div>

                        {/* Title */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 text-xs font-medium pointer-events-none"
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                color: isFocused ? 'var(--subtext1)' : 'var(--surface2)',
                                letterSpacing: '0.04em',
                                fontSize: 11,
                            }}
                        >
                            {win.title}
                        </div>

                        {/* Right spacer */}
                        <div style={{ width: 52 }} />
                    </div>

                    {/* Content area */}
                    <div className="flex-1 overflow-hidden">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
