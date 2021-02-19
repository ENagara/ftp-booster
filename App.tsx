import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ApplicationProvider, Spinner } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

/** screens */
import LoginScreen from './src/screens/LoginScreen';

/** components */
import BottomNavigation from './src/components/BottomNavigation';
import ErrorBoundary from './src/components/ErrorBoundary';

/** actions */
import { searchFirestoreUserExists } from './src/actions/UserDataAction';

/** configs */
import Colors from './src/configs/Colors';
import KittenTheme from './src/configs/KittenTheme';
import { auth } from './src/configs/Firebase';
import { sentryInit } from './src/configs/Sentry';

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
  // Sentry初期化
  sentryInit();

  // コンテンツを表示
  return (
    <ErrorBoundary>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...KittenTheme }}>
        <PaperProvider theme={PaperTheme}>
          <RenderApp></RenderApp>
        </PaperProvider>
      </ApplicationProvider>
    </ErrorBoundary>
  );
}

/**
 * アプリ表示
 * ログイン状態により、ログイン画面・メインコンテンツを切り替える
 */
const RenderApp = () => {
  const [loggingState, setLoggingState] = React.useState<LogingState>(LogingState.Init);
  auth.onAuthStateChanged(async (user) => {
    // Authとfirestoreの両方にユーザ情報が確認できた場合
    if (user !== null && await searchFirestoreUserExists(user.uid)) {
      // ログイン状態
      setLoggingState(LogingState.Logging);
    } else {
      // 未ログイン状態
      setLoggingState(LogingState.UnLogging);
    }
  });
  switch (loggingState) {
    // 読み込み中
    case LogingState.Init:
      return (
        <View style={styles.center}>
          <Spinner size='giant' />
        </View>
      );
    // ログイン中
    case LogingState.Logging:
      return (<BottomNavigation></BottomNavigation>);
    // 未ログイン
    case LogingState.UnLogging:
      return (<LoginScreen></LoginScreen>);
  }
}

const LogingState = {
  Init: 'init',
  Logging: 'logging',
  UnLogging: 'unLogging'
} as const;
type LogingState = typeof LogingState[keyof typeof LogingState];

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
