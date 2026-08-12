export type Theme =
    | 'light'
    | 'dark'

const STORAGE_KEY =
    'caleb-dev-lab-theme'


export function getCurrentTheme(): Theme {
    return document
        .documentElement
        .dataset
        .theme === 'dark'
        ? 'dark'
        : 'light'
}


export function applyTheme(
    theme: Theme
) {
    document
        .documentElement
        .dataset
        .theme = theme

    document
        .documentElement
        .style
        .colorScheme = theme
}


export function initialiseTheme(): Theme {
    const savedTheme =
        localStorage.getItem(
            STORAGE_KEY
        )

    if (
        savedTheme === 'light'
        || savedTheme === 'dark'
    ) {
        applyTheme(
            savedTheme
        )

        return savedTheme
    }

    const prefersDark =
        window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

    const preferredTheme: Theme =
        prefersDark
            ? 'dark'
            : 'light'

    applyTheme(
        preferredTheme
    )

    return preferredTheme
}


export function setTheme(
    theme: Theme
) {
    applyTheme(
        theme
    )

    localStorage.setItem(
        STORAGE_KEY,
        theme
    )
}


export function toggleTheme(): Theme {
    const nextTheme: Theme =
        getCurrentTheme()
            === 'dark'
            ? 'light'
            : 'dark'

    setTheme(
        nextTheme
    )

    return nextTheme
}