import React, { Component } from 'react';

import { withStyles, createStyles, Theme } from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// Material-UIアイコン
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

// Route関連
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';


// スタイル
const styles = () => createStyles({
  wrapper: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: 'center',
  },
  root: {},
  button: {
    maxWidth: '100%',
  },
});

interface IProps {
  classes: {
    button: string,
    root: string,
    wrapper: string,
  }
}

type RouteRelatedBottomNavigationPorps = RouteComponentProps & IProps;

class RouteRelatedBottomNavigation extends Component<RouteRelatedBottomNavigationPorps> {

  buttons_info = [
    { label: 'フィード', icon: <HomeOutlinedIcon />, link_to: '/' },
    { label: 'グラフ', icon: <TrendingUpOutlinedIcon />, link_to: '/graph' },
    { label: 'コラム', icon: <BookOutlinedIcon />, link_to: '/columns' },
    { label: '設定', icon: <SettingsOutlinedIcon />, link_to: '/settings' },
  ];

  buttons = this.buttons_info.map((button_info) => {
    return (
      <BottomNavigationAction
        value={button_info.link_to}
        label={button_info.label}
        className={this.props.classes.button}
        icon={button_info.icon}
        component={Link}
        to={button_info.link_to}
      />
    );
  })

  render() {
    // Material-ui関連
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <BottomNavigation
          value={this.props.location.pathname}
          children={this.buttons}
        />
      </div>
    );
  }
}

// Material-uiのテーマ設定＋Redux設定＋React-Router情報取得
export default withRouter(withStyles(styles, { withTheme: true })(RouteRelatedBottomNavigation));
