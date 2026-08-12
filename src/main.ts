import './styles/main.scss'

import { experiments } from './data/experiment'

import { createSiteHeader } from './components/SiteHeader'
import { createLabIntro } from './components/LabIntro'
import { createExperimentGrid } from './components/ExperimentGrid'
import { createExperimentViewer } from './components/viewer/ExperimentViewer'

const app =
    document.querySelector<HTMLElement>('#app')

if (!app) {
    throw new Error('App element not found')
}

const header =
    createSiteHeader()

const intro =
    createLabIntro(
        experiments.length
    )

const viewer =
    createExperimentViewer()

const grid =
    createExperimentGrid(
        experiments,
        (experiment) => {
            viewer.open(experiment)
        }
    )

grid.id = 'experiments'

app.append(
    header,
    intro,
    grid,
    viewer.element
)