import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export function useImagePicker({ onSuccess }: { onSuccess: (photos: Array<string>) => void }) {
  const [images, setImages] = useState<Array<string>>([]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
      onSuccess(result.assets.map(asset => asset.uri));
    }
  };

  return { images, pickImages };
}
