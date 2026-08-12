import type { Experiment } from '../types/experiment'

export function createExperimentCard(
    experiment: Experiment,
    onOpen: (experiment: Experiment) => void
): HTMLElement {
    const card =
        document.createElement('article')

    card.className = 'experiment-card'

    const statusLabel =
        experiment.status
            .replace('-', ' ')
            .toUpperCase()

    card.innerHTML = `
        <div class="experiment-card__preview">
            <div class="experiment-card__preview-grid"></div>

            <div class="experiment-card__preview-content">
                <span class="experiment-card__preview-id">
                    ${experiment.id}
                </span>

                <span class="experiment-card__preview-category">
                    ${experiment.category}
                </span>
            </div>
        </div>

        <div class="experiment-card__content">

            <div class="experiment-card__meta">
                <span class="experiment-card__id">
                    LAB / ${experiment.id}
                </span>

                <span
                    class="experiment-card__status"
                    data-status="${experiment.status}"
                >
                    ${statusLabel}
                </span>
            </div>

            <h2 class="experiment-card__title">
                ${experiment.title}
            </h2>

            <p class="experiment-card__description">
                ${experiment.description}
            </p>

            <div class="experiment-card__footer">
                <div class="experiment-card__technologies">
                    ${experiment.technologies
                        .map(
                            (technology) => `
                                <span>
                                    ${technology}
                                </span>
                            `
                        )
                        .join('')}
                </div>

                <span
                    class="experiment-card__view"
                    aria-hidden="true"
                >
                    View lab
                    <span>↗</span>
                </span>
            </div>

        </div>

        <button
            class="experiment-card__action"
            type="button"
            aria-label="Open ${experiment.title}"
        ></button>
    `

    const button =
        card.querySelector<HTMLButtonElement>(
            '.experiment-card__action'
        )

    button?.addEventListener(
        'click',
        () => {
            onOpen(experiment)
        }
    )

    return card
}