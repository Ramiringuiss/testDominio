import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Topbar from './components/Topbar'
import Window from './components/Window'
import TerminalWindow from './components/TerminalWindow'
import ProjectsWindow from './components/ProjectsWindow'
import ContactWindow from './components/ContactWindow'
import { useWindowManager } from './hooks/useWindowManager'

// Floating particles background
function Particles() {
    const count = 18
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 15,
        size: 1 + Math.random() * 2.5,
        color: i % 3 === 0 ? 'rgba(148,226,213,0.6)' : i % 3 === 1 ? 'rgba(203,166,247,0.5)' : 'rgba(137,180,250,0.4)',
    }))

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        bottom: -10,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    }}
                    animate={{
                        y: [0, -(window.innerHeight + 50)],
                        opacity: [0, 0.8, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

// Welcome overlay shown on first load
function WelcomeOverlay({ onDismiss }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 100, background: 'rgba(10, 8, 20, 0.7)', backdropFilter: 'blur(2px)' }}
            onClick={onDismiss}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
            >
                {/* EndeavourOS Logo */}
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-6 flex justify-center"
                >
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <polygon points="50,5 95,90 5,90" fill="none" stroke="rgba(203,166,247,0.8)" strokeWidth="5" />
                        <polygon points="50,20 80,80 20,80" fill="rgba(148,226,213,0.4)" />
                    </svg>
                </motion.div>

                <motion.h1
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--cyan)' }}
                >
                    SysRamson
                </motion.h1>
                <p className="text-sm mb-1" style={{ color: 'var(--subtext0)', fontFamily: 'JetBrains Mono, monospace' }}>
                    EndeavourOS + Hyprland
                </p>
                <motion.p
                    className="text-xs mt-6"
                    style={{ color: 'var(--surface2)', fontFamily: 'JetBrains Mono, monospace' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    click anywhere to continue →
                </motion.p>
            </motion.div>
        </motion.div>
    )
}

// Desktop right-click context menu hint
function DesktopHint({ onOpen }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ zIndex: 5 }}
        >
            <p
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--subtext0)',
                    background: 'rgba(30, 30, 46, 0.6)',
                    border: '1px solid rgba(88,91,112,0.3)',
                    backdropFilter: 'blur(12px)',
                    fontSize: 10,
                }}
            >
                Use the topbar to open windows  ↑
            </p>
        </motion.div>
    )
}

const WINDOW_CONTENT = {
    terminal: <TerminalWindow />,
    projects: <ProjectsWindow />,
    contact: <ContactWindow />,
}

export default function App() {
    const {
        windows,
        focusedId,
        workspaces,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updatePos,
        isOpen,
    } = useWindowManager()

    const [welcomed, setWelcomed] = useState(false)
    const [volume, setVolume] = useState(0)
    const videoRef = useRef(null)
    const fadeIntervalRef = useRef(null)

    // Sync volume state → video element whenever it changes externally (slider)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume / 100
        }
    }, [volume])

    const handleWelcomeDismiss = useCallback(() => {
        setWelcomed(true)
        // Auto-open terminal after welcome
        setTimeout(() => openWindow('terminal'), 400)

        // Fade audio in from 0 → 50 over 3 seconds
        const target = 50
        const steps = 30
        const intervalMs = 3000 / steps
        const increment = target / steps
        let current = 0

        fadeIntervalRef.current = setInterval(() => {
            current += increment
            if (current >= target) {
                current = target
                clearInterval(fadeIntervalRef.current)
                fadeIntervalRef.current = null
            }
            setVolume(Math.round(current))
        }, intervalMs)
    }, [openWindow])

    // Allow slider to cancel the fade-in
    const handleVolumeChange = useCallback((newVol) => {
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
        }
        setVolume(newVol)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Video Wallpaper */}
            <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    filter: 'brightness(0.55)',
                }}
            >
                <source src="https://i.delirius.store/video/i9juujxc33ua.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for readability */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(10, 8, 20, 0.45)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Particles */}
            <Particles />

            {/* Topbar */}
            <Topbar
                workspaces={workspaces}
                openWindow={openWindow}
                isOpen={isOpen}
                focusedId={focusedId}
                volume={volume}
                onVolumeChange={handleVolumeChange}
            />

            {/* Desktop area */}
            <div
                className="absolute inset-0"
                style={{ paddingTop: 44, zIndex: 2 }}
                onClick={e => {
                    // clicking desktop deselects focus
                    if (e.target === e.currentTarget) {
                        // do nothing for now
                    }
                }}
            >
                {/* Windows */}
                {windows.map(win => (
                    <Window
                        key={win.id}
                        window={win}
                        isFocused={focusedId === win.id}
                        onFocus={() => focusWindow(win.id)}
                        onClose={() => closeWindow(win.id)}
                        onMinimize={() => minimizeWindow(win.id)}
                        onMaximize={() => maximizeWindow(win.id)}
                        onPositionChange={pos => updatePos(win.id, pos)}
                    >
                        {WINDOW_CONTENT[win.id]}
                    </Window>
                ))}

                {/* Hint */}
                {windows.length === 0 && welcomed && <DesktopHint />}
            </div>

            {/* Welcome overlay */}
            <AnimatePresence>
                {!welcomed && (
                    <WelcomeOverlay onDismiss={handleWelcomeDismiss} />
                )}
            </AnimatePresence>
        </div>
    )
}

