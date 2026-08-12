import {
    VIEWPORT_MIN,
    VIEWPORT_MAX,
} from '../../utils/viewport'

export interface PreviewFrame {
    element: HTMLElement
    load: (url: string) => void
    clear: () => void
    setWidth: (width: number) => void
    onResize: (callback: (width: number) => void) => void
}

export function createPreviewFrame(): PreviewFrame {
    const container =
        document.createElement('div')

    container.className = 'preview-frame'

    const iframe =
        document.createElement('iframe')

    iframe.className = 'preview-frame__iframe'
    iframe.title = 'Experiment preview'

    const resizeHandle =
        document.createElement('div')

    resizeHandle.className =
        'preview-frame__resize-handle'

    resizeHandle.tabIndex = 0

    resizeHandle.setAttribute(
        'role',
        'separator'
    )

    resizeHandle.setAttribute(
        'aria-orientation',
        'vertical'
    )

    resizeHandle.setAttribute(
        'aria-label',
        'Resize experiment preview'
    )

    resizeHandle.setAttribute(
        'aria-valuemin',
        String(VIEWPORT_MIN)
    )

    resizeHandle.setAttribute(
        'aria-valuemax',
        String(VIEWPORT_MAX)
    )

    container.append(
        iframe,
        resizeHandle
    )

    let resizeCallback:
        ((width: number) => void) | null = null

    let startX = 0
    let startWidth = 0

    function clampWidth(width: number) {
        return Math.min(
            VIEWPORT_MAX,
            Math.max(
                VIEWPORT_MIN,
                Math.round(width)
            )
        )
    }

    function load(url: string) {
        iframe.src = url
    }

    function clear() {
        iframe.removeAttribute('src')
    }

    function setWidth(width: number) {
        const clampedWidth =
            clampWidth(width)

        container.style.width =
            `${clampedWidth}px`

        resizeHandle.setAttribute(
            'aria-valuenow',
            String(clampedWidth)
        )
    }

    function notifyResize(width: number) {
        resizeCallback?.(width)
    }

    function onResize(
        callback: (width: number) => void
    ) {
        resizeCallback = callback
    }

    resizeHandle.addEventListener(
        'pointerdown',
        (event) => {
            startX = event.clientX

            startWidth =
                container.getBoundingClientRect().width

            resizeHandle.setPointerCapture(
                event.pointerId
            )

            container.classList.add(
                'preview-frame--resizing'
            )
        }
    )

    resizeHandle.addEventListener(
        'pointermove',
        (event) => {
            if (
                !resizeHandle.hasPointerCapture(
                    event.pointerId
                )
            ) {
                return
            }

            const difference =
                event.clientX - startX

            const width =
                clampWidth(
                    startWidth + difference
                )

            setWidth(width)
            notifyResize(width)
        }
    )

    function finishResize(
        event: PointerEvent
    ) {
        if (
            resizeHandle.hasPointerCapture(
                event.pointerId
            )
        ) {
            resizeHandle.releasePointerCapture(
                event.pointerId
            )
        }

        container.classList.remove(
            'preview-frame--resizing'
        )
    }

    resizeHandle.addEventListener(
        'pointerup',
        finishResize
    )

    resizeHandle.addEventListener(
        'pointercancel',
        finishResize
    )

    /*
     * Keyboard resizing for accessibility.
     *
     * Arrow keys = 10px
     * Shift + arrow = 50px
     */
    resizeHandle.addEventListener(
        'keydown',
        (event) => {
            if (
                event.key !== 'ArrowLeft'
                && event.key !== 'ArrowRight'
            ) {
                return
            }

            event.preventDefault()

            const currentWidth =
                container.getBoundingClientRect().width

            const amount =
                event.shiftKey ? 50 : 10

            const direction =
                event.key === 'ArrowRight'
                    ? 1
                    : -1

            const width =
                clampWidth(
                    currentWidth
                    + amount * direction
                )

            setWidth(width)
            notifyResize(width)
        }
    )

    return {
        element: container,
        load,
        clear,
        setWidth,
        onResize,
    }
}