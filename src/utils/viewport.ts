export const VIEWPORTS = {
    mobile: 390,
    tablet: 768,
    desktop: 1440,
} as const

export const VIEWPORT_MIN = 320
export const VIEWPORT_MAX = 1440

export type ViewportName =
    keyof typeof VIEWPORTS