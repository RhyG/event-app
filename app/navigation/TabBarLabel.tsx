import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colours from '@ui/theme/colours';

interface Props {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
  label: string;
}

const focusedColour = colours.sky['800'];
const blurredColour = colours.slate['500'];

export function TabBarLabel({ label, focused }: Props) {
  return <Text style={[styles.text, { color: focused ? focusedColour : blurredColour }]}>{label}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 12 },
});
