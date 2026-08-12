import type { Experiment } from '../types/experiment'

export const experiments: Experiment[] = [
{
    id: '001',
    slug: 'responsive-agency-hero',
    title: 'Responsive Agency Hero',
    description:
        'An agency-style hero exploring fluid typography, responsive layouts and interactive frontend behaviour.',
    category: 'Frontend',
    technologies: [
        'HTML',
        'SCSS',
        'JavaScript',
    ],
    status: 'in-progress',
    previewPath: 'labs/001-responsive-agency-hero/',
    featured: true,
},

  {
  id: '002',
  slug: 'second-test',
  title: 'Second Test Experiment',
  description: 'Another temporary Dev Lab experiment.',
  category: 'JavaScript',
  technologies: ['JavaScript'],
  status: 'planned',
  previewPath: 'labs/002-second-test/',
}
]