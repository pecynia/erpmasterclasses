export const eventTypes = {
    defaultType: 'success',
    types: ['success', 'transformation']
} as const

export type EventType = (typeof eventTypes)['types'][number]