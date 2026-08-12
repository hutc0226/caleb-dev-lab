import type { Experiment } from '../../types/experiment'

import { VIEWPORTS } from '../../utils/viewport'

import { createPreviewFrame } from './PreviewFrame'
import { createViewerToolbar } from './ViewerToolbar'
import { createViewportControls } from './ViewportControls'

export interface ExperimentViewer {
    element: HTMLDialogElement
    open: (experiment: Experiment) => void
    close: () => void
}

export function createExperimentViewer(): ExperimentViewer {
    const dialog =
        document.createElement('dialog')

    dialog.className =
        'experiment-viewer'

    dialog.innerHTML = `
        <div class="experiment-viewer__content">
            <div class="experiment-viewer__toolbar"></div>

            <div class="experiment-viewer__body"></div>
        </div>
    `

    const toolbarContainer =
        dialog.querySelector<HTMLElement>(
            '.experiment-viewer__toolbar'
        )

    const body =
        dialog.querySelector<HTMLElement>(
            '.experiment-viewer__body'
        )

    const toolbar =
        createViewerToolbar()

    const preview =
        createPreviewFrame()

    const viewportControls =
        createViewportControls(
            (width) => {
                preview.setWidth(width)
            }
        )

    /*
     * Keep the slider and viewport readout
     * synchronised when the preview is
     * resized using the drag handle.
     */
    preview.onResize(
        (width) => {
            viewportControls.setWidth(width)
        }
    )

    if (toolbarContainer) {
        toolbarContainer.append(
            toolbar.element
        )
    }

    if (body) {
        body.append(
            viewportControls.element,
            preview.element
        )
    }

    function open(
        experiment: Experiment
    ) {
        toolbar.update(experiment)

        preview.load(
            experiment.previewPath
        )

        const defaultWidth =
            VIEWPORTS.desktop

        preview.setWidth(
            defaultWidth
        )

        viewportControls.setWidth(
            defaultWidth
        )

        dialog.showModal()
    }

    function close() {
        dialog.close()
        preview.clear()
    }

    /*
     * Allow the toolbar to close
     * the Experiment Viewer.
     */
    toolbar.onClose(close)

    /*
     * Also clear the iframe if the dialog
     * is closed using Escape.
     */
    dialog.addEventListener(
        'close',
        () => {
            preview.clear()
        }
    )

    return {
        element: dialog,
        open,
        close,
    }
}