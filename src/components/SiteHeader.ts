export function createSiteHeader(): HTMLElement {
    const header =
        document.createElement('header')

    header.className = 'site-header'

    header.innerHTML = `
        <a
            class="site-header__brand"
            href="./"
            aria-label="Caleb's Dev Lab home"
        >
            <span class="site-header__mark">
                C /
            </span>

            <span class="site-header__name">
                Dev Lab
            </span>
        </a>

        <nav
            class="site-header__nav"
            aria-label="Primary navigation"
        >
            <a href="#experiments">
                Experiments
            </a>
        </nav>
    `

    return header
}