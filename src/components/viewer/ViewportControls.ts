import {
    VIEWPORTS,
    VIEWPORT_MIN,
    VIEWPORT_MAX,
} from '../../utils/viewport'

export interface ViewportControls {
    element: HTMLElement
    setWidth: (width: number) => void
}

export function createViewportControls(
    onChange: (width: number) => void
): ViewportControls {
    const controls =
        document.createElement('div')

    controls.className =
        'viewport-controls'


    // ----------------------------------------
    // Preset buttons
    // ----------------------------------------

    const presets =
        document.createElement('div')

    presets.className =
        'viewport-controls__presets'


    // ----------------------------------------
    // Custom viewport controls
    // ----------------------------------------

    const custom =
        document.createElement('div')

    custom.className =
        'viewport-controls__custom'

    const label =
        document.createElement('label')

    label.className =
        'viewport-controls__label'

    label.textContent =
        'Custom viewport'

    const value =
        document.createElement('span')

    value.className =
        'viewport-controls__value'

    const slider =
        document.createElement('input')

    slider.type = 'range'

    slider.className =
        'viewport-controls__slider'

    slider.min =
        String(VIEWPORT_MIN)

    slider.max =
        String(VIEWPORT_MAX)

    slider.value =
        String(VIEWPORT_MAX)

    slider.setAttribute(
        'aria-label',
        'Preview viewport width'
    )


    // ----------------------------------------
    // Width helpers
    // ----------------------------------------

    function clampWidth(
        width: number
    ): number {
        return Math.min(
            VIEWPORT_MAX,
            Math.max(
                VIEWPORT_MIN,
                Math.round(width)
            )
        )
    }


    function setWidth(
        width: number
    ) {
        const clampedWidth =
            clampWidth(width)

        slider.value =
            String(clampedWidth)

        value.textContent =
            `${clampedWidth}px`

        const buttons =
            presets.querySelectorAll<HTMLButtonElement>(
                '.viewport-controls__button'
            )

        buttons.forEach(
            (button) => {
                const buttonWidth =
                    Number(
                        button.dataset.width
                    )

                const isActive =
                    buttonWidth === clampedWidth

                button.classList.toggle(
                    'viewport-controls__button--active',
                    isActive
                )

                button.setAttribute(
                    'aria-pressed',
                    String(isActive)
                )
            }
        )
    }


    // ----------------------------------------
    // Create preset buttons
    // ----------------------------------------

    Object.entries(VIEWPORTS).forEach(
        ([name, width]) => {
            const button =
                document.createElement('button')

            button.type = 'button'

            button.className =
                'viewport-controls__button'

            button.dataset.width =
                String(width)

            button.textContent =
                `${name} — ${width}px`

            button.setAttribute(
                'aria-pressed',
                'false'
            )

            button.addEventListener(
                'click',
                () => {
                    setWidth(width)
                    onChange(width)
                }
            )

            presets.append(button)
        }
    )


    // ----------------------------------------
    // Custom slider
    // ----------------------------------------

    slider.addEventListener(
        'input',
        () => {
            const width =
                Number(slider.value)

            setWidth(width)
            onChange(width)
        }
    )


    // ----------------------------------------
    // Initial state
    // ----------------------------------------

    setWidth(VIEWPORT_MAX)


    // ----------------------------------------
    // Build component
    // ----------------------------------------

    custom.append(
        label,
        value,
        slider
    )

    controls.append(
        presets,
        custom
    )


    return {
        element: controls,
        setWidth,
    }
}