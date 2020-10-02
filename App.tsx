import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//コンポーネント
import RouteRelatedBottomNavigation from './src/components/RouteRelatedBottomNavigation';

// Route関連
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 共通スタイル読み込み
import './App.css';

export const Feed = () => <div>welcome Feed</div>;
export const Graph = () => <div>Graph</div>;
export const Columns = () => <div>Columns</div>;
export const Settings = () => <div>Settings</div>;
export const NotFound = () => <div>NotFound</div>;


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/graph" component={Graph} />
          <Route exact path="/columns" component={Columns} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
        <RouteRelatedBottomNavigation />
      </BrowserRouter>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
