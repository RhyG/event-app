import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@app/navigation/types';

export function JoinEventScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'JoinEventScreen'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Join Event</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Login!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text>Signup!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
        <Text>Open event!</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
