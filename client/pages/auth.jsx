import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {
    // const { user, route, handleSignIn } = this.context;

    return (
      <div>Hi</div>
    );
  }
}

AuthPage.contextType = AppContext;
