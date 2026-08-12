import type {
    Experiment,
} from '../types/experiment'


export const experiments:
    Experiment[] = [
        {
            id: '001',

            slug:
                'responsive-agency-hero',

            title:
                'Responsive Agency Hero',

            description:
                'An agency-style hero exploring fluid typography, responsive layouts and interactive frontend behaviour.',

            category:
                'Frontend',

            technologies: [
                'HTML',
                'SCSS',
                'JavaScript',
            ],

            status:
                'complete',

            previewPath:
                'labs/001-responsive-agency-hero/',

            featured:
                true,
        },

        {
            id: '002',

            slug:
                'project-filtering',

            title:
                'Project Filtering Interface',

            description:
                'A responsive project archive exploring vanilla JavaScript filtering, search, sorting and animated state changes.',

            category:
                'JavaScript',

            technologies: [
                'HTML',
                'SCSS',
                'JavaScript',
            ],

            status:
                'complete',

            previewPath:
                'labs/002-project-filtering/',

            featured:
                true,
        },
    ]