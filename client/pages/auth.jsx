import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    const header = route.path === 'sign-in'
      ? 'Sign In'
      : 'Sign Up';

    if (user) return <Redirect to="" />;

    return (
      <div className='container bg-secondary border-radius-10px'>
        <div className='d-flex flex-column align-items-center'>
          <header className='text-white fw-bold fs-2'>{header}</header>
          <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn}
          />
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
