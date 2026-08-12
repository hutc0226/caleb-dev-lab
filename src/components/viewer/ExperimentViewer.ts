import type { Experiment } from '../../types/experiment'
import { createPreviewFrame } from './PreviewFrame'

export interface ExperimentViewer {
  element: HTMLDialogElement
  open: (experiment: Experiment) => void
  close: () => void
}

export function createExperimentViewer(): ExperimentViewer {
  const dialog = document.createElement('dialog')

  dialog.className = 'experiment-viewer'

  dialog.innerHTML = `
    <div class="experiment-viewer__content">

      <header class="experiment-viewer__header">
        <div>
          <span class="experiment-viewer__id"></span>

          <h2 class="experiment-viewer__title"></h2>
        </div>

        <button
          class="experiment-viewer__close"
          type="button"
          aria-label="Close experiment"
        >
          Close
        </button>
      </header>

      <div class="experiment-viewer__body"></div>

    </div>
  `

  const id =
    dialog.querySelector<HTMLElement>(
      '.experiment-viewer__id'
    )

  const title =
    dialog.querySelector<HTMLElement>(
      '.experiment-viewer__title'
    )

  const body =
    dialog.querySelector<HTMLElement>(
      '.experiment-viewer__body'
    )

  const closeButton =
    dialog.querySelector<HTMLButtonElement>(
      '.experiment-viewer__close'
    )

  const preview = createPreviewFrame()

  if (body) {
    body.append(preview.element)
  }

  function open(experiment: Experiment) {
    if (id) {
      id.textContent = `LAB / ${experiment.id}`
    }

    if (title) {
      title.textContent = experiment.title
    }

    preview.load(experiment.previewPath)

    dialog.showModal()
  }

  function close() {
    dialog.close()

    preview.clear()
  }

  closeButton?.addEventListener('click', close)

  dialog.addEventListener('close', () => {
    preview.clear()
  })

  return {
    element: dialog,
    open,
    close,
  }
}