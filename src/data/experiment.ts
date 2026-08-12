import type { Experiment } from '../types/experiment'

export const experiments: Experiment[] = [
  {
    id: '001',
    slug: 'test-experiment',
    title: 'Test Experiment',
    description: 'Temporary experiment used to build the Dev Lab interface.',
    category: 'Frontend',
    technologies: ['HTML', 'SCSS', 'TypeScript'],
    status: 'in-progress',
    previewPath: 'labs/001-test-experiment/',
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