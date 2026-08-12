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

    const presets =
        document.createElement('div')

    presets.className =
        'viewport-controls__presets'

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

    function clampWidth(width: number) {
        return Math.min(
            VIEWPORT_MAX,
            Math.max(
                VIEWPORT_MIN,
                Math.round(width)
            )
        )
    }

    function setWidth(width: number) {
        const clampedWidth =
            clampWidth(width)

        slider.value =
            String(clampedWidth)

        value.textContent =
            `${clampedWidth}px`
    }

    Object.entries(VIEWPORTS).forEach(
        ([name, width]) => {
            const button =
                document.createElement('button')

            button.type = 'button'

            button.className =
                'viewport-controls__button'

            button.textContent =
                `${name} — ${width}px`

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

    slider.addEventListener(
        'input',
        () => {
            const width =
                Number(slider.value)

            setWidth(width)
            onChange(width)
        }
    )

    setWidth(VIEWPORT_MAX)

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