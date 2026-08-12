import type { Experiment } from '../types/experiment'

export function createExperimentCard(
  experiment: Experiment,
  onOpen: (experiment: Experiment) => void
): HTMLElement {
  const card = document.createElement('article')

  card.className = 'experiment-card'

  card.innerHTML = `
    <span class="experiment-card__id">
      LAB / ${experiment.id}
    </span>

    <h2 class="experiment-card__title">
      ${experiment.title}
    </h2>

    <p class="experiment-card__description">
      ${experiment.description}
    </p>

    <div class="experiment-card__technologies">
      ${experiment.technologies
        .map((technology) => `<span>${technology}</span>`)
        .join('')}
    </div>

    <button
      class="experiment-card__button"
      type="button"
    >
      View experiment
    </button>
  `

  const button =
    card.querySelector<HTMLButtonElement>(
      '.experiment-card__button'
    )

  button?.addEventListener('click', () => {
    onOpen(experiment)
  })

  return card
}