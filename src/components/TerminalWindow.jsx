import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NEOFETCH_LINES = [
    { text: '                    ', color: null },
    { text: '       ████████      ', color: 'var(--purple)' },
    { text: '     ██░░░░░░░███    ', color: 'var(--purple)' },
    { text: '   ██░░░░░░░░░░░ █   ', color: 'var(--purple)' },
    { text: '  █░░░░░░░░░░░░░░ █  ', color: 'var(--purple)' },
    { text: ' █░░░░░░░░░░░░░░░░ █ ', color: 'var(--purple)' },
    { text: '█░░░░░░░░░░░░░░░░░░ █', color: 'var(--cyan)' },
    { text: '█░░░░░░░░░░░░░░░░░░ █', color: 'var(--cyan)' },
    { text: '█░░░░░░░░░░░░░░░░░░ █', color: 'var(--cyan)' },
    { text: ' ████████████████████', color: 'var(--cyan)' },
    { text: '                    ', color: null },
]

const INFO_LINES = [
    { label: 'user', value: 'ramson@endeavouros', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: '─────────────────────────', value: '', labelColor: 'var(--surface2)', valueColor: null },
    { label: 'OS', value: 'EndeavourOS Linux x86_64', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Kernel', value: 'Linux 6.9.8-arch1-1', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'WM', value: 'Hyprland (Wayland)', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Shell', value: 'zsh 5.9', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Terminal', value: 'Kitty', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'CPU', value: 'AMD Ryzen 5 3500U (8) @ 2.10GHz', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'GPU', value: 'AMD Radeon Vega 8', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Memory', value: '6.2GiB / 13.6GiB', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Bar', value: 'Waybar (Miku Capsules)', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
    { label: 'Theme', value: 'Catppuccin Mocha', labelColor: 'var(--cyan)', valueColor: 'var(--text)' },
]

const ABOUT_LINES = [
    '',
    '╭─ About Me ──────────────────────────────────────╮',
    '│                                                  │',
    '│  Hi! I\'m Ramson — a CS student who loves        │',
    '│  building things, ricing Linux, and exploring   │',
    '│  the edges of software and system design.       │',
    '│                                                  │',
    '│  I\'m passionate about open-source, Wayland,     │',
    '│  clean code, and making computers feel cool.    │',
    '│                                                  │',
    '╰──────────────────────────────────────────────────╯',
    '',
    '╭─ Skills ─────────────────────────────────────────╮',
    '│                                                  │',
    '│  Languages:  Java  Python  JavaScript  C         │',
    '│  Frontend:   React  HTML/CSS  Tailwind           │',
    '│  Backend:    Node.js  REST APIs  Firestore       │',
    '│  Tools:      Git  Linux  Arch  Docker  Vite      │',
    '│  WM/DE:      Hyprland  KDE  i3  Waybar  Rofi     │',
    '│                                                  │',
    '╰──────────────────────────────────────────────────╯',
]

function useTypingEffect(lines, delayBetween = 40) {
    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        if (visibleCount >= lines.length) return
        const id = setTimeout(() => setVisibleCount(v => v + 1), delayBetween)
        return () => clearTimeout(id)
    }, [visibleCount, lines.length, delayBetween])

    return lines.slice(0, visibleCount)
}

export default function TerminalWindow() {
    const scrollRef = useRef(null)
    const promptLine = '❯ neofetch && cat about.txt'

    const allLines = [...NEOFETCH_LINES.map(l => l.text), ...ABOUT_LINES]
    const visibleAbout = useTypingEffect(ABOUT_LINES, 30)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [visibleAbout])

    return (
        <div
            ref={scrollRef}
            className="h-full overflow-y-auto terminal-content"
            style={{
                background: 'rgba(14, 14, 24, 0.85)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12.5,
                lineHeight: 1.6,
                padding: '16px 20px',
                color: 'var(--text)',
            }}
        >
            {/* Prompt */}
            <div className="mb-3">
                <span style={{ color: 'var(--cyan)' }}>ramson</span>
                <span style={{ color: 'var(--subtext0)' }}>@</span>
                <span style={{ color: 'var(--purple)' }}>endeavour</span>
                <span style={{ color: 'var(--subtext0)' }}>  ~/portfolio</span>
                <span style={{ color: 'var(--yellow)' }}> main</span>
                <span style={{ color: 'var(--subtext0)' }}> on  </span>
                <br />
                <span style={{ color: 'var(--green)' }}>❯ </span>
                <span>{promptLine}</span>
            </div>

            {/* Neofetch output: logo + info side by side */}
            <div className="flex gap-4 mb-4">
                {/* ASCII Logo */}
                <div className="shrink-0">
                    {NEOFETCH_LINES.map((line, i) => (
                        <div key={i} style={{ color: line.color || 'var(--subtext0)', whiteSpace: 'pre' }}>
                            {line.text}
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="flex-1">
                    {INFO_LINES.map((item, i) => (
                        <div key={i} className="flex gap-2" style={{ whiteSpace: 'pre' }}>
                            {item.value ? (
                                <>
                                    <span style={{ color: item.labelColor }}>{item.label}</span>
                                    <span style={{ color: 'var(--subtext0)' }}>~</span>
                                    <span style={{ color: item.valueColor }}>{item.value}</span>
                                </>
                            ) : (
                                <span style={{ color: item.labelColor }}>{item.label}</span>
                            )}
                        </div>
                    ))}
                    {/* Color palette */}
                    <div className="mt-2 flex gap-1">
                        {['var(--pink)', 'var(--yellow)', 'var(--green)', 'var(--cyan)', 'var(--blue)', 'var(--purple)'].map((c, i) => (
                            <span
                                key={i}
                                style={{
                                    display: 'inline-block',
                                    width: 14,
                                    height: 14,
                                    borderRadius: 3,
                                    background: c,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div style={{ color: 'var(--surface2)', marginBottom: 8 }}>
                {'─'.repeat(60)}
            </div>

            {/* Prompt 2 */}
            <div className="mb-2">
                <span style={{ color: 'var(--green)' }}>❯ </span>
                <span>cat about.txt</span>
            </div>

            {/* About text (typing effect) */}
            {visibleAbout.map((line, i) => (
                <div
                    key={i}
                    style={{
                        color: line.startsWith('╭') || line.startsWith('╰') || line.startsWith('│')
                            ? 'var(--surface1)'
                            : 'var(--text)',
                        whiteSpace: 'pre',
                    }}
                >
                    {line.startsWith('╭') || line.startsWith('│') || line.startsWith('╰')
                        ? <span>
                            <span style={{ color: 'var(--purple)' }}>{line.charAt(0)}</span>
                            <span>{line.slice(1)}</span>
                        </span>
                        : line
                    }
                </div>
            ))}

            {/* Blinking cursor */}
            {visibleAbout.length >= ABOUT_LINES.length && (
                <div className="mt-2">
                    <span style={{ color: 'var(--green)' }}>❯ </span>
                    <span className="terminal-cursor" style={{ background: 'var(--cyan)', width: 7, height: 14, display: 'inline-block', borderRadius: 1 }} />
                </div>
            )}
        </div>
    )
}
