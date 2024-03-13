import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

interface GalleryContext {
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (uri: string) => void;
}

const GalleryContext = createContext<GalleryContext>({
  selectedPhotos: [],
  updateSelectedPhotos: () => {},
});

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [selectedPhotos, setSelectedPhotos] = useState<Array<string>>([]);

  const updateSelectedPhotos = useCallback((uri: string) => {
    setSelectedPhotos(curr => {
      return curr.includes(uri) ? curr.filter(photo => photo !== uri) : [...curr, uri];
    });
  }, []);

  const value = useMemo(() => ({ selectedPhotos, updateSelectedPhotos }), [selectedPhotos, updateSelectedPhotos]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGalleryContext() {
  return useContext(GalleryContext);
}
