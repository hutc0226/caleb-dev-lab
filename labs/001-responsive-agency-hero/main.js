// ----------------------------------------
// Interactive hero visual
// ----------------------------------------

const visual =
    document.querySelector(
        '.hero-visual'
    )

const pointerX =
    document.querySelector(
        '[data-pointer-x]'
    )

const pointerY =
    document.querySelector(
        '[data-pointer-y]'
    )


function updatePointer(event) {
    if (!visual) {
        return
    }

    const bounds =
        visual.getBoundingClientRect()

    const x =
        Math.min(
            Math.max(
                event.clientX
                - bounds.left,
                0
            ),
            bounds.width
        )

    const y =
        Math.min(
            Math.max(
                event.clientY
                - bounds.top,
                0
            ),
            bounds.height
        )

    const xPercent =
        (x / bounds.width)
        * 100

    const yPercent =
        (y / bounds.height)
        * 100

    visual.style.setProperty(
        '--pointer-x',
        `${xPercent}%`
    )

    visual.style.setProperty(
        '--pointer-y',
        `${yPercent}%`
    )

    if (pointerX) {
        pointerX.textContent =
            String(
                Math.round(
                    xPercent
                )
            ).padStart(
                2,
                '0'
            )
    }

    if (pointerY) {
        pointerY.textContent =
            String(
                Math.round(
                    yPercent
                )
            ).padStart(
                2,
                '0'
            )
    }
}


visual?.addEventListener(
    'pointermove',
    updatePointer
)


visual?.addEventListener(
    'pointerleave',
    () => {
        visual.style.setProperty(
            '--pointer-x',
            '50%'
        )

        visual.style.setProperty(
            '--pointer-y',
            '50%'
        )

        if (pointerX) {
            pointerX.textContent =
                '50'
        }

        if (pointerY) {
            pointerY.textContent =
                '50'
        }
    }
)


// ----------------------------------------
// Responsive navigation
// ----------------------------------------

const menuToggle =
    document.querySelector(
        '.menu-toggle'
    )

const mobileNav =
    document.querySelector(
        '.mobile-nav'
    )

const mobileNavLinks =
    document.querySelectorAll(
        '.mobile-nav a'
    )


function openMenu() {
    if (
        !menuToggle
        || !mobileNav
    ) {
        return
    }

    menuToggle.setAttribute(
        'aria-expanded',
        'true'
    )

    menuToggle.setAttribute(
        'aria-label',
        'Close navigation'
    )

    mobileNav.setAttribute(
        'aria-hidden',
        'false'
    )

    mobileNav.classList.add(
        'mobile-nav--open'
    )
}


function closeMenu() {
    if (
        !menuToggle
        || !mobileNav
    ) {
        return
    }

    menuToggle.setAttribute(
        'aria-expanded',
        'false'
    )

    menuToggle.setAttribute(
        'aria-label',
        'Open navigation'
    )

    mobileNav.setAttribute(
        'aria-hidden',
        'true'
    )

    mobileNav.classList.remove(
        'mobile-nav--open'
    )
}


menuToggle?.addEventListener(
    'click',
    () => {
        const isOpen =
            menuToggle.getAttribute(
                'aria-expanded'
            ) === 'true'

        if (isOpen) {
            closeMenu()
        } else {
            openMenu()
        }
    }
)


mobileNavLinks.forEach(
    (link) => {
        link.addEventListener(
            'click',
            closeMenu
        )
    }
)


document.addEventListener(
    'keydown',
    (event) => {
        if (
            event.key
            === 'Escape'
        ) {
            closeMenu()
        }
    }
)


// ----------------------------------------
// Close mobile menu if returning
// to desktop navigation
// ----------------------------------------

const desktopBreakpoint =
    window.matchMedia(
        '(min-width: 1001px)'
    )


function handleDesktopChange(
    event
) {
    if (event.matches) {
        closeMenu()
    }
}


desktopBreakpoint.addEventListener(
    'change',
    handleDesktopChange
)