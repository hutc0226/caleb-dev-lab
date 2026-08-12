export interface PreviewFrame {
  element: HTMLElement
  load: (url: string) => void
  clear: () => void
}

export function createPreviewFrame(): PreviewFrame {
  const container = document.createElement('div')

  container.className = 'preview-frame'

  const iframe = document.createElement('iframe')

  iframe.className = 'preview-frame__iframe'
  iframe.title = 'Experiment preview'

  container.append(iframe)

  function load(url: string) {
    iframe.src = url
  }

  function clear() {
    iframe.removeAttribute('src')
  }

  return {
    element: container,
    load,
    clear,
  }
}