import type { Experiment } from '../../types/experiment'

export interface ViewerToolbar {
    element: HTMLElement
    update: (experiment: Experiment) => void
    onClose: (callback: () => void) => void
}

export function createViewerToolbar(): ViewerToolbar {
    const toolbar =
        document.createElement('header')

    toolbar.className =
        'viewer-toolbar'

    toolbar.innerHTML = `
        <div class="viewer-toolbar__info">
            <span class="viewer-toolbar__id"></span>

            <h2 class="viewer-toolbar__title"></h2>
        </div>

        <div class="viewer-toolbar__actions">
            <a
                class="viewer-toolbar__preview"
                href="#"
                target="_blank"
                rel="noopener"
            >
                Open preview
            </a>

            <a
                class="viewer-toolbar__github"
                href="#"
                target="_blank"
                rel="noopener"
                hidden
            >
                GitHub
            </a>

            <button
                class="viewer-toolbar__close"
                type="button"
                aria-label="Close experiment"
            >
                Close
            </button>
        </div>
    `

    const id =
        toolbar.querySelector<HTMLElement>(
            '.viewer-toolbar__id'
        )

    const title =
        toolbar.querySelector<HTMLElement>(
            '.viewer-toolbar__title'
        )

    const previewLink =
        toolbar.querySelector<HTMLAnchorElement>(
            '.viewer-toolbar__preview'
        )

    const githubLink =
        toolbar.querySelector<HTMLAnchorElement>(
            '.viewer-toolbar__github'
        )

    const closeButton =
        toolbar.querySelector<HTMLButtonElement>(
            '.viewer-toolbar__close'
        )

    let closeCallback:
        (() => void) | null = null

    function update(
        experiment: Experiment
    ) {
        if (id) {
            id.textContent =
                `LAB / ${experiment.id}`
        }

        if (title) {
            title.textContent =
                experiment.title
        }

        if (previewLink) {
            previewLink.href =
                experiment.previewPath
        }

        if (githubLink) {
            if (experiment.githubUrl) {
                githubLink.href =
                    experiment.githubUrl

                githubLink.hidden = false
            } else {
                githubLink.removeAttribute('href')
                githubLink.hidden = true
            }
        }
    }

    function onClose(
        callback: () => void
    ) {
        closeCallback = callback
    }

    closeButton?.addEventListener(
        'click',
        () => {
            closeCallback?.()
        }
    )

    return {
        element: toolbar,
        update,
        onClose,
    }
}