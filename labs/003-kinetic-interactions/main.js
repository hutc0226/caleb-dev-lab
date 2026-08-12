// ----------------------------------------
// Elements
// ----------------------------------------

const projectRows =
    Array.from(
        document.querySelectorAll(
            '.project-row'
        )
    )


// ----------------------------------------
// Desktop floating preview
// ----------------------------------------

const floatingPreview =
    document.querySelector(
        '[data-floating-preview]'
    )

const floatingArt =
    document.querySelector(
        '[data-floating-art]'
    )

const previewNumber =
    document.querySelector(
        '[data-preview-number]'
    )

const previewTitle =
    document.querySelector(
        '[data-preview-title]'
    )

const previewType =
    document.querySelector(
        '[data-preview-type]'
    )


// ----------------------------------------
// Tablet preview
// ----------------------------------------

const tabletArt =
    document.querySelector(
        '[data-tablet-art]'
    )

const tabletNumber =
    document.querySelector(
        '[data-tablet-number]'
    )

const tabletTitle =
    document.querySelector(
        '[data-tablet-title]'
    )

const tabletType =
    document.querySelector(
        '[data-tablet-type]'
    )


// ----------------------------------------
// Mobile inline preview
// ----------------------------------------

const inlinePreview =
    document.querySelector(
        '[data-inline-preview]'
    )

const inlineArt =
    document.querySelector(
        '[data-inline-art]'
    )

const inlineNumber =
    document.querySelector(
        '[data-inline-number]'
    )

const inlineTitle =
    document.querySelector(
        '[data-inline-title]'
    )

const inlineType =
    document.querySelector(
        '[data-inline-type]'
    )


// ----------------------------------------
// Other elements
// ----------------------------------------

const pointerX =
    document.querySelector(
        '[data-pointer-x]'
    )

const pointerY =
    document.querySelector(
        '[data-pointer-y]'
    )

const cursor =
    document.querySelector(
        '.cursor'
    )

const magneticElements =
    Array.from(
        document.querySelectorAll(
            '[data-magnetic]'
        )
    )


// ----------------------------------------
// Media queries
// ----------------------------------------

const mobileQuery =
    window.matchMedia(
        '(max-width: 600px)'
    )

const tabletQuery =
    window.matchMedia(
        '(min-width: 601px) and (max-width: 900px)'
    )

const reducedMotionQuery =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    )


// ----------------------------------------
// Pointer state
// ----------------------------------------

let targetX =
    window.innerWidth / 2

let targetY =
    window.innerHeight / 2

let cursorX =
    targetX

let cursorY =
    targetY

let previewX =
    targetX

let previewY =
    targetY

let pointerVelocityX =
    0

let previousPointerX =
    targetX

let previewRotation =
    0

let activeProject =
    null

let selectedProject =
    projectRows[0]
    ?? null

let currentLayout =
    getLayout()


// ----------------------------------------
// Motion settings
// ----------------------------------------

const CURSOR_EASE =
    0.38

const PREVIEW_EASE =
    0.075

const ROTATION_EASE =
    0.08

const PREVIEW_OFFSET =
    115

const MAX_ROTATION =
    5

const EDGE_PADDING =
    24


// ----------------------------------------
// Layout
// ----------------------------------------

function getLayout() {
    if (mobileQuery.matches) {
        return 'mobile'
    }

    if (tabletQuery.matches) {
        return 'tablet'
    }

    return 'desktop'
}


// ----------------------------------------
// Helpers
// ----------------------------------------

function clamp(
    value,
    minimum,
    maximum
) {
    return Math.min(
        maximum,
        Math.max(
            minimum,
            value
        )
    )
}


function lerp(
    start,
    end,
    amount
) {
    return (
        start
        + (
            end
            - start
        )
        * amount
    )
}


function getProjectData(
    project
) {
    return {
        slug:
            project.dataset.project
            ?? 'future-form',

        number:
            project.dataset
                .projectNumber
            ?? '01',

        title:
            project.dataset
                .projectTitle
            ?? 'Future Form',

        type:
            project.dataset
                .projectType
            ?? 'Digital',
    }
}


function setArtClass(
    element,
    slug
) {
    if (!element) {
        return
    }

    element.className =
        [
            'preview-art',
            `preview-art--${slug}`,
        ].join(' ')
}


// ----------------------------------------
// Update preview content
// ----------------------------------------

function updateAllPreviews(
    project
) {
    const data =
        getProjectData(
            project
        )


    // Artwork

    setArtClass(
        floatingArt,
        data.slug
    )

    setArtClass(
        tabletArt,
        data.slug
    )

    setArtClass(
        inlineArt,
        data.slug
    )


    // Desktop

    if (previewNumber) {
        previewNumber.textContent =
            data.number
    }

    if (previewTitle) {
        previewTitle.textContent =
            data.title
    }

    if (previewType) {
        previewType.textContent =
            data.type
    }


    // Tablet

    if (tabletNumber) {
        tabletNumber.textContent =
            data.number
    }

    if (tabletTitle) {
        tabletTitle.textContent =
            data.title
    }

    if (tabletType) {
        tabletType.textContent =
            data.type
    }


    // Mobile

    if (inlineNumber) {
        inlineNumber.textContent =
            data.number
    }

    if (inlineTitle) {
        inlineTitle.textContent =
            data.title
    }

    if (inlineType) {
        inlineType.textContent =
            data.type
    }
}


// ----------------------------------------
// Row state
// ----------------------------------------

function clearActiveRows() {
    projectRows.forEach(
        (row) => {
            row.classList.remove(
                'project-row--active'
            )

            row.setAttribute(
                'aria-expanded',
                'false'
            )

            const arrow =
                row.querySelector(
                    '.project-row__arrow'
                )

            if (arrow) {
                arrow.textContent =
                    '↗'
            }
        }
    )
}


function setActiveRow(
    project
) {
    projectRows.forEach(
        (row) => {
            const isActive =
                row === project

            row.classList.toggle(
                'project-row--active',
                isActive
            )

            row.setAttribute(
                'aria-expanded',
                String(isActive)
            )

            const arrow =
                row.querySelector(
                    '.project-row__arrow'
                )

            if (!arrow) {
                return
            }

            if (
                isActive
                && getLayout()
                === 'mobile'
            ) {
                arrow.textContent =
                    '×'
            } else {
                arrow.textContent =
                    '↗'
            }
        }
    )
}


// ----------------------------------------
// Desktop floating preview
// ----------------------------------------

function getPreviewTarget() {
    if (!floatingPreview) {
        return {
            x: targetX,
            y: targetY,
        }
    }

    const width =
        floatingPreview.offsetWidth

    const height =
        floatingPreview.offsetHeight


    let desiredX =
        targetX
        + PREVIEW_OFFSET


    const rightEdge =
        desiredX
        + width / 2


    if (
        rightEdge
        > window.innerWidth
        - EDGE_PADDING
    ) {
        desiredX =
            targetX
            - PREVIEW_OFFSET
    }


    return {
        x:
            clamp(
                desiredX,
                width / 2
                + EDGE_PADDING,
                window.innerWidth
                - width / 2
                - EDGE_PADDING
            ),

        y:
            clamp(
                targetY,
                height / 2
                + EDGE_PADDING,
                window.innerHeight
                - height / 2
                - EDGE_PADDING
            ),
    }
}


function showFloatingPreview(
    project
) {
    if (
        getLayout()
        !== 'desktop'
    ) {
        return
    }

    const previewWasHidden =
        activeProject === null

    activeProject =
        project

    updateAllPreviews(
        project
    )


    if (
        previewWasHidden
        && floatingPreview
    ) {
        const previewTarget =
            getPreviewTarget()

        previewX =
            previewTarget.x

        previewY =
            previewTarget.y

        previewRotation =
            0
    }


    floatingPreview?.classList.add(
        'floating-preview--visible'
    )

    cursor?.classList.add(
        'cursor--project'
    )
}


function hideFloatingPreview() {
    activeProject =
        null

    floatingPreview?.classList.remove(
        'floating-preview--visible'
    )

    cursor?.classList.remove(
        'cursor--project'
    )
}


// ----------------------------------------
// Mobile inline preview
// ----------------------------------------

function closeInlinePreview() {
    inlinePreview?.classList.remove(
        'inline-preview--open'
    )
}


function openInlinePreview(
    project
) {
    if (
        !inlinePreview
    ) {
        return
    }

    updateAllPreviews(
        project
    )


    // Move the single preview directly
    // underneath the selected row.

    project.insertAdjacentElement(
        'afterend',
        inlinePreview
    )


    window.requestAnimationFrame(
        () => {
            inlinePreview.classList.add(
                'inline-preview--open'
            )
        }
    )
}


// ----------------------------------------
// Tablet behaviour
// ----------------------------------------

function selectTabletProject(
    project
) {
    selectedProject =
        project

    setActiveRow(
        project
    )

    updateAllPreviews(
        project
    )
}


// ----------------------------------------
// Project events
// ----------------------------------------

projectRows.forEach(
    (project) => {

        // Desktop hover

        project.addEventListener(
            'pointerenter',
            (event) => {
                if (
                    event.pointerType
                    !== 'mouse'
                ) {
                    return
                }

                showFloatingPreview(
                    project
                )
            }
        )


        project.addEventListener(
            'pointerleave',
            (event) => {
                if (
                    event.pointerType
                    !== 'mouse'
                ) {
                    return
                }

                hideFloatingPreview()
            }
        )


        // Keyboard focus

        project.addEventListener(
            'focus',
            () => {
                if (
                    getLayout()
                    === 'tablet'
                ) {
                    selectTabletProject(
                        project
                    )
                }
            }
        )


        // Click / tap

        project.addEventListener(
            'click',
            () => {
                const layout =
                    getLayout()


                // ----------------------------------------
                // Mobile accordion behaviour
                // ----------------------------------------

                if (
                    layout
                    === 'mobile'
                ) {
                    const isAlreadyActive =
                        project.classList
                            .contains(
                                'project-row--active'
                            )

                    if (
                        isAlreadyActive
                    ) {
                        clearActiveRows()

                        closeInlinePreview()

                        return
                    }


                    selectedProject =
                        project

                    clearActiveRows()

                    setActiveRow(
                        project
                    )

                    openInlinePreview(
                        project
                    )

                    return
                }


                // ----------------------------------------
                // Tablet sticky preview
                // ----------------------------------------

                if (
                    layout
                    === 'tablet'
                ) {
                    selectTabletProject(
                        project
                    )

                    return
                }


                // ----------------------------------------
                // Desktop
                // ----------------------------------------

                selectedProject =
                    project
            }
        )
    }
)


// ----------------------------------------
// Pointer coordinates
// ----------------------------------------

document.addEventListener(
    'pointermove',
    (event) => {
        targetX =
            event.clientX

        targetY =
            event.clientY


        const movementX =
            targetX
            - previousPointerX


        pointerVelocityX =
            lerp(
                pointerVelocityX,
                movementX,
                0.35
            )


        previousPointerX =
            targetX


        if (pointerX) {
            pointerX.textContent =
                String(
                    Math.round(
                        targetX
                    )
                ).padStart(
                    3,
                    '0'
                )
        }


        if (pointerY) {
            pointerY.textContent =
                String(
                    Math.round(
                        targetY
                    )
                ).padStart(
                    3,
                    '0'
                )
        }
    }
)


// ----------------------------------------
// Cursor + floating preview animation
// ----------------------------------------

function animate() {

    // ----------------------------------------
    // Cursor
    // ----------------------------------------

    if (
        reducedMotionQuery.matches
    ) {
        cursorX =
            targetX

        cursorY =
            targetY
    } else {
        cursorX =
            lerp(
                cursorX,
                targetX,
                CURSOR_EASE
            )

        cursorY =
            lerp(
                cursorY,
                targetY,
                CURSOR_EASE
            )
    }


    if (cursor) {
        cursor.style.transform =
            `
                translate3d(
                    ${cursorX}px,
                    ${cursorY}px,
                    0
                )
                translate(
                    -50%,
                    -50%
                )
            `
    }


    // ----------------------------------------
    // Desktop floating artwork
    // ----------------------------------------

    if (
        floatingPreview
        && activeProject
        && getLayout()
        === 'desktop'
    ) {
        const previewTarget =
            getPreviewTarget()


        if (
            reducedMotionQuery.matches
        ) {
            previewX =
                previewTarget.x

            previewY =
                previewTarget.y

            previewRotation =
                0
        } else {
            previewX =
                lerp(
                    previewX,
                    previewTarget.x,
                    PREVIEW_EASE
                )

            previewY =
                lerp(
                    previewY,
                    previewTarget.y,
                    PREVIEW_EASE
                )


            const targetRotation =
                clamp(
                    pointerVelocityX
                    * 0.18,
                    -MAX_ROTATION,
                    MAX_ROTATION
                )


            previewRotation =
                lerp(
                    previewRotation,
                    targetRotation,
                    ROTATION_EASE
                )
        }


        floatingPreview.style.transform =
            `
                translate3d(
                    ${previewX}px,
                    ${previewY}px,
                    0
                )
                translate(
                    -50%,
                    -50%
                )
                rotate(
                    ${previewRotation}deg
                )
            `
    }


    pointerVelocityX *=
        0.86


    if (
        Math.abs(
            pointerVelocityX
        )
        < 0.01
    ) {
        pointerVelocityX =
            0
    }


    if (
        pointerVelocityX
        === 0
    ) {
        previewRotation =
            lerp(
                previewRotation,
                0,
                ROTATION_EASE
            )
    }


    window.requestAnimationFrame(
        animate
    )
}


animate()


// ----------------------------------------
// Magnetic buttons
// ----------------------------------------

magneticElements.forEach(
    (element) => {
        let magneticX =
            0

        let magneticY =
            0

        let targetMagneticX =
            0

        let targetMagneticY =
            0

        let animationFrame =
            null


        function animateMagnetic() {
            magneticX =
                lerp(
                    magneticX,
                    targetMagneticX,
                    0.12
                )

            magneticY =
                lerp(
                    magneticY,
                    targetMagneticY,
                    0.12
                )


            element.style.transform =
                `
                    translate(
                        ${magneticX}px,
                        ${magneticY}px
                    )
                `


            const stillMoving =
                Math.abs(
                    magneticX
                    - targetMagneticX
                )
                > 0.05
                ||
                Math.abs(
                    magneticY
                    - targetMagneticY
                )
                > 0.05


            if (stillMoving) {
                animationFrame =
                    window.requestAnimationFrame(
                        animateMagnetic
                    )
            } else {
                animationFrame =
                    null
            }
        }


        function startMagneticAnimation() {
            if (
                animationFrame
                !== null
            ) {
                return
            }


            animationFrame =
                window.requestAnimationFrame(
                    animateMagnetic
                )
        }


        element.addEventListener(
            'pointermove',
            (event) => {
                if (
                    event.pointerType
                    !== 'mouse'
                ) {
                    return
                }


                const bounds =
                    element
                        .getBoundingClientRect()


                const relativeX =
                    event.clientX
                    - bounds.left
                    - bounds.width / 2


                const relativeY =
                    event.clientY
                    - bounds.top
                    - bounds.height / 2


                targetMagneticX =
                    relativeX
                    * 0.12


                targetMagneticY =
                    relativeY
                    * 0.12


                startMagneticAnimation()
            }
        )


        element.addEventListener(
            'pointerleave',
            () => {
                targetMagneticX =
                    0

                targetMagneticY =
                    0

                startMagneticAnimation()
            }
        )
    }
)


// ----------------------------------------
// Responsive layout changes
// ----------------------------------------

function configureLayout() {
    const newLayout =
        getLayout()


    if (
        newLayout
        === currentLayout
    ) {
        return
    }


    currentLayout =
        newLayout


    hideFloatingPreview()

    closeInlinePreview()

    clearActiveRows()


    // Tablet always has a selected
    // artwork visible.

    if (
        newLayout
        === 'tablet'
    ) {
        const project =
            selectedProject
            ?? projectRows[0]

        if (project) {
            selectTabletProject(
                project
            )
        }
    }
}


window.addEventListener(
    'resize',
    configureLayout
)


// ----------------------------------------
// Initial layout
// ----------------------------------------

if (
    currentLayout
    === 'tablet'
    && selectedProject
) {
    selectTabletProject(
        selectedProject
    )
}


// ----------------------------------------
// Pointer leaves page
// ----------------------------------------

document.documentElement.addEventListener(
    'mouseleave',
    () => {
        if (pointerX) {
            pointerX.textContent =
                '000'
        }

        if (pointerY) {
            pointerY.textContent =
                '000'
        }


        pointerVelocityX =
            0


        hideFloatingPreview()
    }
)