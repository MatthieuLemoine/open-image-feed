import React, { Component } from 'react';
import { View } from 'react-native';
import ToolbarContainer from '../../containers/app/ToolbarContainer';

const withNavigationBar = (Wrapped, hide) =>
  class WithNavigationBar extends Component {        // (1)
    static renderNavigationBar() {
      return hide ? <View /> : <ToolbarContainer title="Open Image Feed" />;
    }
    render() {
      return <Wrapped {...this.props} />;
    }
  };

export default withNavigationBar;
