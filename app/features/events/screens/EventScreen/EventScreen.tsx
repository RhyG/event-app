import { Feather } from '@expo/vector-icons';
import { upload } from 'cloudinary-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { useEventQuery } from '@feature/events/api/useEventQuery';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { cloudinary } from '@core/lib/cloudinary';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

import { Gallery } from './Gallery';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const [images, setImages] = useState<Array<string>>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]!.uri);

      setImages(result.assets.map(asset => asset.uri));
    }
  };

  async function uploadImage() {
    if (image) {
      async function safeUpload(imgUri: string) {
        try {
          const response = await upload(cloudinary, {
            file: imgUri,
            options: {
              upload_preset: 'bad_quality',
            },
          });
          return { success: true, data: response };
        } catch (error) {
          console.error('Upload failed for:', imgUri, error);
          return { success: false, error };
        }
      }
      const results = await Promise.allSettled(images.map(safeUpload));
      console.log(results);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {images.map(image => (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ))}
      {image && <Button title="Upload" onPress={uploadImage} />}
    </View>
  );
}

function ShareEventButton() {
  return (
    <TouchableOpacity>
      <Feather name="share" size={24} color="black" />
    </TouchableOpacity>
  );
}

export function EventScreen({ route }: ScreenProp<'EventScreen'>) {
  const { name, shouldPreventBack, id } = route.params;

  // When coming straight from creating an event the user should not be able to go back.
  useHeaderOptions({
    title: name,
    ...(shouldPreventBack ? { headerBackVisible: false, gestureEnabled: false } : {}),
    headerRight: () => <ShareEventButton />,
  });

  const { data: event, isLoading, isError, error } = useEventQuery(id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!event) return null;

  return (
    <Screen>
      <Text>{event.event_description}</Text>
      {/* <Text>{event.event_date}</Text> */}
      <Gallery />
    </Screen>
  );
}
