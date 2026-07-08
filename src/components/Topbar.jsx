import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    const pad = n => String(n).padStart(2, '0')
    const hours = pad(time.getHours())
    const minutes = pad(time.getMinutes())
    const seconds = pad(time.getSeconds())
    const date = time.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
    })

    return (
        <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-semibold tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--cyan)' }}>
                {hours}:{minutes}
                <span
                    className="text-xs ml-0.5 opacity-70"
                    style={{ color: 'var(--subtext0)' }}
                >
                    :{seconds}
                </span>
            </span>
            <span className="text-xs" style={{ color: 'var(--subtext0)', fontFamily: 'JetBrains Mono, monospace' }}>{date}</span>
        </div>
    )
}

// Volume icon that switches between muted, low, and high
function VolumeIcon({ volume }) {
    if (volume === 0) {
        // Muted: speaker with X
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
        )
    }
    if (volume < 50) {
        // Low: speaker with one wave
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
        )
    }
    // High: speaker with two waves
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
    )
}

function VolumeControl({ volume, onVolumeChange }) {
    const [show, setShow] = useState(false)

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {/* Icon button */}
            <button
                className="transition-opacity hover:opacity-100 opacity-70 flex items-center justify-center"
                style={{ color: volume === 0 ? 'var(--pink)' : 'var(--subtext0)', cursor: 'pointer' }}
                onClick={() => onVolumeChange(volume === 0 ? 50 : 0)}
                title={`Volume: ${volume}%`}
            >
                <VolumeIcon volume={volume} />
            </button>

            {/* Glassmorphism slider panel */}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            top: '110%',
                            right: 0,
                            padding: '8px 12px',
                            borderRadius: 12,
                            background: 'rgba(17, 17, 27, 0.72)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(148, 226, 213, 0.18)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: 160,
                            zIndex: 200,
                        }}
                    >
                        <VolumeIcon volume={volume} />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={e => onVolumeChange(Number(e.target.value))}
                            style={{
                                flex: 1,
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                height: 4,
                                borderRadius: 9999,
                                background: `linear-gradient(to right, var(--cyan) ${volume}%, rgba(88,91,112,0.4) ${volume}%)`,
                                outline: 'none',
                                cursor: 'pointer',
                                accentColor: 'var(--cyan)',
                            }}
                        />
                        <span style={{
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--subtext0)',
                            minWidth: 24,
                            textAlign: 'right',
                        }}>
                            {volume}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const WifiIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
    </svg>
)

const BatteryIcon = ({ level }) => (
    <div className="flex items-center gap-1">
        <div className="relative flex items-center" style={{ width: 22, height: 11 }}>
            <div
                className="border rounded-sm w-full h-full relative flex items-center"
                style={{ borderColor: 'var(--subtext0)', padding: '1px' }}
            >
                <div
                    style={{
                        width: `${level}%`,
                        height: '100%',
                        background: level > 30 ? 'var(--green)' : 'var(--pink)',
                        borderRadius: 2,
                    }}
                />
            </div>
            <div
                className="absolute -right-1 rounded-r-sm"
                style={{ width: 3, height: 5, background: 'var(--subtext0)' }}
            />
        </div>
        <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--subtext0)', fontSize: '10px' }}>
            {level}%
        </span>
    </div>
)

const BATTERY_LEVEL = 87

export default function Topbar({ workspaces, openWindow, isOpen, focusedId, volume, onVolumeChange }) {
    return (
        <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-1.5"
            style={{
                background: 'rgba(17, 17, 27, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(148, 226, 213, 0.1)',
                boxShadow: '0 1px 30px rgba(0,0,0,0.5)',
                height: 44,
            }}
        >
            {/* Left: Workspaces */}
            <div className="flex items-center gap-1">
                {/* EndeavourOS Logo */}
                <div className="mr-2 flex items-center" title="EndeavourOS + Hyprland">
                    <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                        <polygon points="50,5 95,90 5,90" fill="none" stroke="var(--purple)" strokeWidth="8" />
                        <polygon points="50,20 80,80 20,80" fill="var(--cyan)" opacity="0.5" />
                    </svg>
                </div>

                {workspaces.map(ws => (
                    <button
                        key={ws.id}
                        onClick={() => openWindow(ws.id)}
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs transition-all duration-200"
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            background: isOpen(ws.id)
                                ? 'rgba(148, 226, 213, 0.15)'
                                : 'transparent',
                            color: isOpen(ws.id) ? 'var(--cyan)' : 'var(--subtext0)',
                            border: isOpen(ws.id)
                                ? '1px solid rgba(148, 226, 213, 0.3)'
                                : '1px solid transparent',
                            fontSize: '11px',
                        }}
                    >
                        <span style={{ opacity: 0.6 }}>[{ws.workspace}]</span>
                        <span>{ws.label}</span>
                        {isOpen(ws.id) && (
                            <span
                                className="w-1 h-1 rounded-full ml-1"
                                style={{ background: 'var(--cyan)', display: 'inline-block' }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Center: Clock */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <Clock />
            </div>

            {/* Right: System Tray */}
            <div className="flex items-center gap-3" style={{ color: 'var(--subtext0)' }}>
                <div className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', fontSize: '10px' }}>
                    hyprland
                </div>

                <WifiIcon />
                <BatteryIcon level={BATTERY_LEVEL} />
                <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />

                <a
                    href="https://github.com/Ramiringuiss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-100 opacity-70"
                    title="GitHub"
                    onClick={e => e.stopPropagation()}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </a>

                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-100 opacity-70"
                    title="LinkedIn"
                    onClick={e => e.stopPropagation()}
                    style={{ color: 'var(--blue)' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>
            </div>
        </motion.div>
    )
}
