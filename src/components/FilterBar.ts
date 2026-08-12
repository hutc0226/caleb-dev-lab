import type { Experiment } from '../types/experiment'

export interface FilterBar {
    element: HTMLElement
    setActive: (category: string | null) => void
}

export function createFilterBar(
    experiments: Experiment[],
    onFilter: (category: string | null) => void
): FilterBar {
    const filterBar =
        document.createElement('div')

    filterBar.className = 'filter-bar'

    const categories = [
        ...new Set(
            experiments.map(
                (experiment) => experiment.category
            )
        ),
    ]

    filterBar.innerHTML = `
        <div class="filter-bar__heading">
            <span class="filter-bar__title">
                Experiments
            </span>

            <span class="filter-bar__count">
                ${String(experiments.length).padStart(2, '0')}
            </span>
        </div>

        <div
            class="filter-bar__filters"
            aria-label="Filter experiments"
        ></div>
    `

    const filters =
        filterBar.querySelector<HTMLElement>(
            '.filter-bar__filters'
        )

    function createButton(
        label: string,
        category: string | null
    ) {
        const button =
            document.createElement('button')

        button.type = 'button'

        button.className =
            'filter-bar__button'

        button.dataset.category =
            category ?? 'all'

        button.textContent = label

        button.addEventListener(
            'click',
            () => {
                setActive(category)
                onFilter(category)
            }
        )

        return button
    }

    filters?.append(
        createButton(
            'All',
            null
        )
    )

    categories.forEach(
        (category) => {
            filters?.append(
                createButton(
                    category,
                    category
                )
            )
        }
    )

    function setActive(
        category: string | null
    ) {
        const buttons =
            filterBar.querySelectorAll<HTMLButtonElement>(
                '.filter-bar__button'
            )

        buttons.forEach(
            (button) => {
                const isActive =
                    category === null
                        ? button.dataset.category === 'all'
                        : button.dataset.category === category

                button.classList.toggle(
                    'filter-bar__button--active',
                    isActive
                )

                button.setAttribute(
                    'aria-pressed',
                    String(isActive)
                )
            }
        )
    }

    setActive(null)

    return {
        element: filterBar,
        setActive,
    }
}
