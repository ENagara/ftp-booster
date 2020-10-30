export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Feed: undefined;
  Graph: undefined;
  Columns: undefined;
  Settings: undefined;
};

export type FeedParamList = {
  FeedScreen: undefined;
};

export type GraphParamList = {
  GraphScreen: undefined;
};

export type ColumnsParamList = {
  ColumnsScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type FtpDataParam = {
  no: number,
  type: 'ftp' | 'topic',
  date: firebase.firestore.Timestamp,
  ftp?: number,
  weight?: number,
  condition?: '良好' | '普通' | '悪い',
  message?: string,
}
