import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleInputChange, handleSubmit } = this;
    const altActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const altActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';

    return (
      <form onSubmit={handleSubmit}>
        <input
        required
        type='text'
        name='username'
        placeholder='username'
        onChange={handleInputChange}
        className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />

        <input
          required
          type='password'
          name='password'
          placeholder='password'
          onChange={handleInputChange}
          className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
        <input
          required
          type='text'
          name='firstName'
          placeholder='first name'
          onChange={handleInputChange}
          className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
        <input
          required
          type='text'
          name='lastName'
          placeholder='last name'
          onChange={handleInputChange}
          className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
        <input
          required
          type='email'
          name='email'
          placeholder='email'
          onChange={handleInputChange}
          className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />

          <div>
            <a href={altActionHref}>{altActionText}</a>
            <button type="submit" className=''> {submitButtonText}</button>

          </div>

      </form>
    );
  }
}

AuthForm.contextType = AppContext;
