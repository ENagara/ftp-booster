import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

/** screens */
import LoginScreen from './src/screens/LoginScreen';

/** components */
import BottomNavigation from './src/components/BottomNavigation';

/** configs */
import Colors from './src/configs/Colors';
import KittenTheme from './src/configs/KittenTheme';
import { auth } from './src/configs/Firebase';

const PaperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tint,
    accent: Colors.tint
  },
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...KittenTheme }}>
      <PaperProvider theme={PaperTheme}>
        <RenderApp></RenderApp>
      </PaperProvider>
    </ApplicationProvider>
  );
}

/**
 * アプリ表示
 * ログイン状態により、ログイン画面・メインコンテンツを切り替える
 */
const RenderApp = () => {
  const [logging, setLogging] = React.useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLogging(true);
    } else {
      setLogging(false);
    }
  });
  return (
    logging
      ? <BottomNavigation></BottomNavigation>
      : <LoginScreen></LoginScreen>
  );
}

export default App;
