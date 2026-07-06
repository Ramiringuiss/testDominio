import { motion } from 'framer-motion'

const PROJECTS = [
    {
        id: 'ods-typing',
        name: 'ODS Typing Platform',
        description: 'A gamified typing platform for UN SDG awareness. Features certificate generation, level progression, Firebase auth, and real-time stats.',
        tags: ['React', 'Firebase', 'Tailwind', 'Canvas'],
        color: 'var(--cyan)',
        icon: '⌨️',
        link: 'https://ods-three-roan.vercel.app/',
        stars: 42,
        status: 'Active',
    },
    {
        id: 'traffic-sim',
        name: 'Traffic Simulation',
        description: 'Java-based GUI traffic light simulator with linked list car management, intersection logic, and automatic/manual light control.',
        tags: ['Java', 'Swing', 'OOP', 'Data Structures'],
        color: 'var(--yellow)',
        icon: '🚦',
        link: 'https://github.com/Ramiringuiss',
        stars: 15,
        status: 'Complete',
    },
    {
        id: 'dotfiles',
        name: 'Hyprland Dotfiles',
        description: 'Catppuccin Mocha themed EndeavourOS setup with Hyprland, Waybar "Miku Capsules" config, Rofi, and Kitty terminal.',
        tags: ['Hyprland', 'Waybar', 'Arch', 'Shell'],
        color: 'var(--purple)',
        icon: '🌸',
        link: 'https://github.com/Ramiringuiss',
        stars: 87,
        status: 'Active',
    },
    {
        id: 'portfolio',
        name: 'This Portfolio',
        description: 'A fully interactive Linux desktop simulation built with React, Framer Motion, and Tailwind CSS. Draggable windows, Hyprland aesthetics.',
        tags: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
        color: 'var(--pink)',
        icon: '💻',
        link: 'https://github.com/Ramiringuiss',
        stars: 31,
        status: 'Active',
    },
    {
        id: 'shopping-cart',
        name: 'GUI Shopping Cart',
        description: 'Singly linked list-based Java shopping cart with a Swing GUI. Custom list implementation without using Java Collections Framework.',
        tags: ['Java', 'Swing', 'Linked Lists', 'GUI'],
        color: 'var(--green)',
        icon: '🛒',
        link: 'https://github.com/Ramiringuiss',
        stars: 8,
        status: 'Complete',
    },
    {
        id: 'cert-gen',
        name: 'Certificate Generator',
        description: 'Dynamic certificate generation system with Canvas API, Firestore storage, and QR code verification for the ODS Typing platform.',
        tags: ['Canvas', 'Firestore', 'QR Code', 'React'],
        color: 'var(--blue)',
        icon: '📜',
        link: 'https://github.com/Ramiringuiss',
        stars: 19,
        status: 'Complete',
    },
]

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function ProjectsWindow() {
    return (
        <div
            className="h-full overflow-y-auto"
            style={{
                background: 'rgba(14, 14, 24, 0.85)',
                padding: '20px',
            }}
        >
            {/* Header */}
            <div className="mb-5">
                <h2
                    className="text-base font-semibold mb-1"
                    style={{ color: 'var(--cyan)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                    ~/projects
                </h2>
                <p className="text-xs" style={{ color: 'var(--subtext0)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {PROJECTS.length} repositories found
                </p>
            </div>

            {/* Grid */}
            <div
                className="grid gap-3"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
            >
                {PROJECTS.map((project, i) => (
                    <motion.a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        custom={i}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col p-3.5 rounded-lg cursor-pointer no-underline"
                        style={{
                            background: 'rgba(30, 30, 46, 0.7)',
                            border: `1px solid rgba(88, 91, 112, 0.3)`,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = project.color
                            e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.5), 0 0 15px ${project.color}30`
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(88, 91, 112, 0.3)'
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        {/* Icon + Title */}
                        <div className="flex items-start gap-2 mb-2">
                            <span className="text-lg select-none">{project.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div
                                    className="font-semibold text-sm leading-tight truncate"
                                    style={{ color: project.color, fontFamily: 'JetBrains Mono, monospace' }}
                                >
                                    {project.name}
                                </div>
                                <div
                                    className="text-xs mt-0.5"
                                    style={{ color: 'var(--subtext0)', fontSize: 10 }}
                                >
                                    <span
                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full"
                                        style={{
                                            background: project.status === 'Active'
                                                ? 'rgba(166, 227, 161, 0.15)'
                                                : 'rgba(88, 91, 112, 0.3)',
                                            color: project.status === 'Active' ? 'var(--green)' : 'var(--subtext0)',
                                            fontSize: 9,
                                        }}
                                    >
                                        <span
                                            className="w-1 h-1 rounded-full"
                                            style={{
                                                background: project.status === 'Active' ? 'var(--green)' : 'var(--subtext0)',
                                                display: 'inline-block',
                                            }}
                                        />
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p
                            className="text-xs flex-1 leading-relaxed mb-3"
                            style={{ color: 'var(--subtext1)', fontSize: 11 }}
                        >
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-1.5 py-0.5 rounded text-xs"
                                    style={{
                                        background: 'rgba(49, 50, 68, 0.8)',
                                        color: 'var(--subtext0)',
                                        fontSize: 9,
                                        fontFamily: 'JetBrains Mono, monospace',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--subtext0)', fontSize: 10 }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {project.stars}
                            </div>
                            <span className="text-xs" style={{ color: project.color, fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}>
                                view →
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    )
}
