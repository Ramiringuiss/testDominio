import { useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
    {
        name: 'GitHub',
        handle: '@Ramiringuiss',
        description: 'Check out my repos and dotfiles',
        url: 'https://github.com/Ramiringuiss',
        color: 'var(--text)',
        hoverColor: 'var(--blue)',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        handle: 'Ramson I.',
        description: 'Let\'s connect professionally',
        url: 'https://linkedin.com',
        color: 'var(--blue)',
        hoverColor: 'var(--cyan)',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        handle: 'ramson@mail.com',
        description: 'Send me a message anytime',
        url: 'mailto:ramson@mail.com',
        color: 'var(--pink)',
        hoverColor: 'var(--yellow)',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
]

export default function ContactWindow() {
    const [hoveredId, setHoveredId] = useState(null)

    return (
        <div
            className="h-full flex flex-col items-center justify-center"
            style={{
                background: 'rgba(14, 14, 24, 0.85)',
                padding: '28px',
            }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--cyan)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                    get_in_touch()
                </h2>
                <p className="text-xs" style={{ color: 'var(--subtext0)' }}>
                    Open to collaborations, projects, and conversations.
                </p>
            </motion.div>

            {/* Links */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                {LINKS.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setHoveredId(link.name)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="flex items-center gap-4 p-4 rounded-xl no-underline"
                        style={{
                            background: hoveredId === link.name
                                ? 'rgba(148, 226, 213, 0.07)'
                                : 'rgba(30, 30, 46, 0.6)',
                            border: `1px solid ${hoveredId === link.name ? link.hoverColor : 'rgba(88, 91, 112, 0.3)'}`,
                            color: hoveredId === link.name ? link.hoverColor : link.color,
                            transition: 'all 0.2s ease',
                            boxShadow: hoveredId === link.name
                                ? `0 0 20px ${link.hoverColor}20`
                                : 'none',
                            textDecoration: 'none',
                        }}
                    >
                        <div style={{ color: hoveredId === link.name ? link.hoverColor : link.color }}>
                            {link.icon}
                        </div>
                        <div>
                            <div className="font-semibold text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {link.handle}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: 'var(--subtext0)' }}>
                                {link.description}
                            </div>
                        </div>
                        <div className="ml-auto opacity-50 text-lg">→</div>
                    </motion.a>
                ))}
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
            >
                <p className="text-xs" style={{ color: 'var(--surface2)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {'  '} ramson@endeavouros ~ ❯
                </p>
            </motion.div>
        </div>
    )
}
