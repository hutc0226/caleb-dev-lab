import type { Experiment } from '../types/experiment'
import { createExperimentCard } from './ExperimentCard'

export function createExperimentGrid(
  experiments: Experiment[],
  onOpen: (experiment: Experiment) => void
): HTMLElement {
  const grid = document.createElement('section')

  grid.className = 'experiment-grid'

  experiments.forEach((experiment) => {
    const card = createExperimentCard(
      experiment,
      onOpen
    )

    grid.append(card)
  })

  return grid
}