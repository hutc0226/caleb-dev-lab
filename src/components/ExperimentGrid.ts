import type { Experiment } from '../types/experiment'
import { createExperimentCard } from './ExperimentCard'

export interface ExperimentGrid {
    element: HTMLElement
    setExperiments: (
        experiments: Experiment[]
    ) => void
}

export function createExperimentGrid(
    experiments: Experiment[],
    onOpen: (experiment: Experiment) => void
): ExperimentGrid {
    const grid =
        document.createElement('section')

    grid.className = 'experiment-grid'
    grid.id = 'experiments'

    function render(
        experimentsToRender: Experiment[]
    ) {
        grid.innerHTML = ''

        experimentsToRender.forEach(
            (experiment) => {
                const card =
                    createExperimentCard(
                        experiment,
                        onOpen
                    )

                grid.append(card)
            }
        )
    }

    function setExperiments(
        experimentsToRender: Experiment[]
    ) {
        render(experimentsToRender)
    }

    render(experiments)

    return {
        element: grid,
        setExperiments,
    }
}