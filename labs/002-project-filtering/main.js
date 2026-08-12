// ----------------------------------------
// Elements
// ----------------------------------------

const grid =
    document.querySelector(
        '[data-project-grid]'
    )

const projects =
    Array.from(
        document.querySelectorAll(
            '.project-card'
        )
    )

const filterButtons =
    Array.from(
        document.querySelectorAll(
            '[data-filter]'
        )
    )

const searchInput =
    document.querySelector(
        '[data-project-search]'
    )

const sortSelect =
    document.querySelector(
        '[data-project-sort]'
    )

const resultCount =
    document.querySelector(
        '[data-result-count]'
    )

const emptyState =
    document.querySelector(
        '[data-project-empty]'
    )

const resetButton =
    document.querySelector(
        '[data-reset-filters]'
    )


// ----------------------------------------
// State
// ----------------------------------------

let activeCategory =
    'all'

let searchTerm =
    ''

let sortMode =
    'newest'


// ----------------------------------------
// Helpers
// ----------------------------------------

function normalise(value) {
    return value
        .trim()
        .toLowerCase()
}


function getMatchingProjects() {
    return projects.filter(
        (project) => {
            const category =
                project.dataset
                    .projectCategory
                ?? ''

            const title =
                normalise(
                    project.dataset
                        .projectTitle
                    ?? ''
                )

            const matchesCategory =
                activeCategory === 'all'
                || category === activeCategory

            const matchesSearch =
                searchTerm === ''
                || title.includes(
                    searchTerm
                )

            return (
                matchesCategory
                && matchesSearch
            )
        }
    )
}


function sortProjects(
    projectList
) {
    return [...projectList].sort(
        (projectA, projectB) => {
            const titleA =
                projectA.dataset
                    .projectTitle
                ?? ''

            const titleB =
                projectB.dataset
                    .projectTitle
                ?? ''

            const yearA =
                Number(
                    projectA.dataset
                        .projectYear
                    ?? 0
                )

            const yearB =
                Number(
                    projectB.dataset
                        .projectYear
                    ?? 0
                )

            if (
                sortMode === 'oldest'
            ) {
                return yearA - yearB
            }

            if (
                sortMode === 'title'
            ) {
                return titleA.localeCompare(
                    titleB
                )
            }

            return yearB - yearA
        }
    )
}


function updateResultCount(
    count
) {
    if (!resultCount) {
        return
    }

    resultCount.textContent =
        String(count)
            .padStart(
                2,
                '0'
            )
}


function updateEmptyState(
    count
) {
    if (!emptyState) {
        return
    }

    emptyState.hidden =
        count !== 0
}


function updateFilterButtons() {
    filterButtons.forEach(
        (button) => {
            const category =
                button.dataset.filter

            const isActive =
                category ===
                activeCategory

            button.classList.toggle(
                'archive-controls__filter--active',
                isActive
            )

            button.setAttribute(
                'aria-pressed',
                String(isActive)
            )
        }
    )
}


// ----------------------------------------
// Render
// ----------------------------------------

function renderProjects() {
    if (!grid) {
        return
    }

    const matchingProjects =
        getMatchingProjects()

    const sortedProjects =
        sortProjects(
            matchingProjects
        )

    const matchingSet =
        new Set(
            sortedProjects
        )


    projects.forEach(
        (project) => {
            if (
                matchingSet.has(
                    project
                )
            ) {
                return
            }

            project.classList.add(
                'project-card--leaving'
            )

            window.setTimeout(
                () => {
                    project.hidden = true

                    project.classList.remove(
                        'project-card--leaving'
                    )
                },
                180
            )
        }
    )


    window.setTimeout(
        () => {
            sortedProjects.forEach(
                (
                    project,
                    index
                ) => {
                    grid.append(
                        project
                    )

                    project.hidden =
                        false

                    project.classList.add(
                        'project-card--entering'
                    )

                    window.setTimeout(
                        () => {
                            project.classList.remove(
                                'project-card--entering'
                            )
                        },
                        30
                        + index * 35
                    )
                }
            )
        },
        190
    )


    updateResultCount(
        sortedProjects.length
    )

    updateEmptyState(
        sortedProjects.length
    )

    updateFilterButtons()
}


// ----------------------------------------
// Category filters
// ----------------------------------------

filterButtons.forEach(
    (button) => {
        button.addEventListener(
            'click',
            () => {
                activeCategory =
                    button.dataset.filter
                    ?? 'all'

                renderProjects()
            }
        )
    }
)


// ----------------------------------------
// Search
// ----------------------------------------

searchInput?.addEventListener(
    'input',
    () => {
        searchTerm =
            normalise(
                searchInput.value
            )

        renderProjects()
    }
)


// ----------------------------------------
// Sorting
// ----------------------------------------

sortSelect?.addEventListener(
    'change',
    () => {
        sortMode =
            sortSelect.value

        renderProjects()
    }
)


// ----------------------------------------
// Reset
// ----------------------------------------

resetButton?.addEventListener(
    'click',
    () => {
        activeCategory =
            'all'

        searchTerm =
            ''

        sortMode =
            'newest'

        if (searchInput) {
            searchInput.value =
                ''
        }

        if (sortSelect) {
            sortSelect.value =
                'newest'
        }

        renderProjects()
    }
)


// ----------------------------------------
// Initial render
// ----------------------------------------

renderProjects()