import * as ImagePicker from 'expo-image-picker';

// TODO: Refactor away from being a hook now that it isn't stateful.
export function useImagePicker({ onSuccess }: { onSuccess: (photos: Array<{ uri: string; type: string }>) => void }) {
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      const images = result.assets;

      if (images.length === 0) {
        console.log('No photos selected');
        onSuccess([]);
      }

      onSuccess(images.map(image => ({ uri: image.uri!, type: image.mimeType! })));
    }
  };

  return { pickImages };
}
