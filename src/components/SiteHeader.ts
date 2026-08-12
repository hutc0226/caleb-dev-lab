import {
    createThemeToggle,
} from './ThemeToggle'


export function createSiteHeader():
    HTMLElement {
    const header =
        document.createElement(
            'header'
        )

    header.className =
        'site-header'


    const inner =
        document.createElement(
            'div'
        )

    inner.className =
        'site-header__inner'


    // ----------------------------------------
    // Brand
    // ----------------------------------------

    const brand =
        document.createElement(
            'a'
        )

    brand.className =
        'site-header__brand'

    brand.href =
        './'

    brand.setAttribute(
        'aria-label',
        "Caleb's Dev Lab home"
    )

    brand.innerHTML = `
        <span
            class="site-header__mark"
            aria-hidden="true"
        >
            C /
        </span>

        <span
            class="site-header__name"
        >
            Dev Lab
        </span>
    `


    // ----------------------------------------
    // Header actions
    // ----------------------------------------

    const actions =
        document.createElement(
            'div'
        )

    actions.className =
        'site-header__actions'


    // ----------------------------------------
    // Theme toggle
    // ----------------------------------------

    const themeToggle =
        createThemeToggle()


    // ----------------------------------------
    // Navigation
    // ----------------------------------------

    const nav =
        document.createElement(
            'nav'
        )

    nav.className =
        'site-header__nav'

    nav.setAttribute(
        'aria-label',
        'Primary navigation'
    )


    const experimentsLink =
        document.createElement(
            'a'
        )

    experimentsLink.href =
        '#experiments'

    experimentsLink.textContent =
        'Experiments'


    nav.append(
        experimentsLink
    )


    // ----------------------------------------
    // Assemble
    // ----------------------------------------

    actions.append(
        themeToggle,
        nav
    )

    inner.append(
        brand,
        actions
    )

    header.append(
        inner
    )


    return header
}