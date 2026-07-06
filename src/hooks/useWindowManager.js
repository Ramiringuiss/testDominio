import { useState, useCallback, useRef } from 'react'

const DEFAULT_WINDOWS = {
    terminal: {
        id: 'terminal',
        title: '~  kitty',
        icon: '⬛',
        defaultPos: { x: 80, y: 120 },
        defaultSize: { w: 700, h: 480 },
        workspace: 1,
        workspaceLabel: 'About',
    },
    projects: {
        id: 'projects',
        title: '  Projects',
        icon: '📁',
        defaultPos: { x: 200, y: 100 },
        defaultSize: { w: 780, h: 520 },
        workspace: 2,
        workspaceLabel: 'Projects',
    },
    contact: {
        id: 'contact',
        title: '  Contact',
        icon: '✉',
        defaultPos: { x: 300, y: 140 },
        defaultSize: { w: 500, h: 400 },
        workspace: 3,
        workspaceLabel: 'Contact',
    },
}

export function useWindowManager() {
    const [windows, setWindows] = useState([])
    const [focusedId, setFocusedId] = useState(null)
    const zCounter = useRef(10)

    const openWindow = useCallback((id) => {
        setWindows(prev => {
            const existing = prev.find(w => w.id === id)
            if (existing) {
                // If minimized, restore it; otherwise just focus
                if (existing.minimized) {
                    return prev.map(w =>
                        w.id === id ? { ...w, minimized: false, zIndex: ++zCounter.current } : w
                    )
                }
                // Just bring to front
                return prev.map(w =>
                    w.id === id ? { ...w, zIndex: ++zCounter.current } : w
                )
            }
            // Open new window
            const def = DEFAULT_WINDOWS[id]
            return [
                ...prev,
                {
                    ...def,
                    pos: { ...def.defaultPos },
                    size: { ...def.defaultSize },
                    minimized: false,
                    maximized: false,
                    zIndex: ++zCounter.current,
                }
            ]
        })
        setFocusedId(id)
    }, [])

    const closeWindow = useCallback((id) => {
        setWindows(prev => prev.filter(w => w.id !== id))
        setFocusedId(prev => prev === id ? null : prev)
    }, [])

    const minimizeWindow = useCallback((id) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, minimized: true } : w
        ))
        setFocusedId(null)
    }, [])

    const maximizeWindow = useCallback((id) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
        ))
    }, [])

    const focusWindow = useCallback((id) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, zIndex: ++zCounter.current } : w
        ))
        setFocusedId(id)
    }, [])

    const updatePos = useCallback((id, pos) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, pos } : w
        ))
    }, [])

    const isOpen = useCallback((id) => {
        return windows.some(w => w.id === id && !w.minimized)
    }, [windows])

    const workspaces = Object.values(DEFAULT_WINDOWS).map(d => ({
        id: d.id,
        label: d.workspaceLabel,
        workspace: d.workspace,
    }))

    return {
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
        DEFAULT_WINDOWS,
    }
}
