export function createLabIntro(
    experimentCount: number
): HTMLElement {
    const section =
        document.createElement('section')

    section.className = 'lab-intro'

    section.innerHTML = `
        <div class="lab-intro__content">

            <span class="lab-intro__eyebrow">
                Independent web experiments
            </span>

            <h1 class="lab-intro__title">
                Caleb's
                <span>Dev Lab.</span>
            </h1>

            <p class="lab-intro__description">
                A collection of frontend experiments,
                interface ideas and technical explorations
                built to test different approaches to the web.
            </p>

        </div>

        <div class="lab-intro__meta">
            <div>
                <span class="lab-intro__meta-value">
                    ${String(experimentCount).padStart(2, '0')}
                </span>

                <span class="lab-intro__meta-label">
                    Experiments
                </span>
            </div>

            <a
                class="lab-intro__explore"
                href="#experiments"
            >
                Explore labs
                <span aria-hidden="true">↓</span>
            </a>
        </div>
    `

    return section
}