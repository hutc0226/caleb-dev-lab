import './styles/main.scss'

import { experiments } from './data/experiment'

import { createExperimentGrid } from './components/ExperimentGrid'
import { createExperimentViewer } from './components/viewer/ExperimentViewer'

const app =
  document.querySelector<HTMLElement>('#app')

if (!app) {
  throw new Error('App element not found')
}

const viewer = createExperimentViewer()

const grid = createExperimentGrid(
  experiments,
  (experiment) => {
    viewer.open(experiment)
  }
)

app.append(grid)
app.append(viewer.element)