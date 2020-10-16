import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BottomNavigation from './src/components/BottomNavigation';
import Colors from './src/configs/Colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tint,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <BottomNavigation></BottomNavigation>
    </PaperProvider>
  );
}
