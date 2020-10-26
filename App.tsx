import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BottomNavigation from './src/components/BottomNavigation';
import Colors from './src/configs/Colors';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import KittenTheme  from './src/configs/KittenTheme'

const PaperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tint,
    accent: Colors.tint
  },
};

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...KittenTheme }}>
      <PaperProvider theme={PaperTheme}>
        <BottomNavigation></BottomNavigation>
      </PaperProvider>
    </ApplicationProvider>
  );
}
