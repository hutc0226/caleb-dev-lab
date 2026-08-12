import {
    getCurrentTheme,
    toggleTheme,
} from '../utils/theme'


export function createThemeToggle():
    HTMLButtonElement {
    const button =
        document.createElement(
            'button'
        )

    button.type =
        'button'

    button.className =
        'theme-toggle'


    function updateButton() {
        const theme =
            getCurrentTheme()

        const isDark =
            theme === 'dark'

        button.setAttribute(
            'aria-label',
            isDark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
        )

        button.setAttribute(
            'title',
            isDark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
        )

        button.innerHTML = `
            <span
                class="theme-toggle__icon"
                aria-hidden="true"
            >
                ${isDark ? '☀' : '☾'}
            </span>
        `
    }


    button.addEventListener(
        'click',
        () => {
            toggleTheme()

            updateButton()
        }
    )


    updateButton()


    return button
}