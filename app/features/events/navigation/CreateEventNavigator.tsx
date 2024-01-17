import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app/navigation/types';

import { CreateEventScreen } from '../screens/CreateEventScreen/CreateEventScreen';

const CreateEventStack = createNativeStackNavigator<RootStackParamList>();

export function CreateEventNavigator() {
  return (
    <CreateEventStack.Navigator initialRouteName="CreateEventScreen" screenOptions={{ headerShown: false }}>
      <CreateEventStack.Screen name="CreateEventScreen" component={CreateEventScreen} />
    </CreateEventStack.Navigator>
  );
}
