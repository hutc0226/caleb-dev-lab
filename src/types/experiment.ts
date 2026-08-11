export type ExperimentStatus =
  | 'planned'
  | 'in-progress'
  | 'complete'

export interface Experiment {
  id: string
  slug: string
  title: string
  description: string
  category: string
  technologies: string[]
  status: ExperimentStatus
  previewPath: string
  githubUrl?: string
  featured?: boolean
}