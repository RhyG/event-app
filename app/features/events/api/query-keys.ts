export const eventDetailsQueryKey = (id: string) => ['event', { id }] as const;
export const eventPhotosQueryKey = (id: string) => ['event', 'photos', 'urls', { id }] as const;
export const eventPhotosPathsQueryKey = (id: string) => ['event', 'photos', 'paths', { id }] as const;
