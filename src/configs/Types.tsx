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
  type: DataTypeParam,
  date: firebase.firestore.Timestamp,
  ftp?: number,
  weight?: number,
  condition?: ConditionParam,
  message?: string,
}

export const DataTypeParam = {
  FTP: 'ftp',
  TOPIC: 'topic'
} as const;
export type DataTypeParam = typeof DataTypeParam[keyof typeof DataTypeParam];

export const ConditionParam = {
  GOOD: '良好',
  NORMAL: '普通',
  BAD:'悪い'
} as const;
export type ConditionParam = typeof ConditionParam[keyof typeof ConditionParam];