import { PasswordReset, PasswordService, resetPassword, validateReset } from 'password-client';
import * as React from 'react';
import { MessageComponent, MessageState, navigate } from '../react-hook-core';
import { handleError, initForm, registerEvents, storage } from 'uione';
import logo from '../assets/images/logo.png';
import { context } from './service';

interface ResetPasswordState extends MessageState {
  user: PasswordReset;
  confirmPassword: string;
}

export class ResetPasswordForm extends MessageComponent<ResetPasswordState, any> {
  constructor(props: any) {
    super(props);
    this.signin = this.signin.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.passwordService = context.getPasswordServicer();
    const user: PasswordReset = {
      username: '',
      passcode: '',
      password: ''
    };
    this.state = {
      user,
      message: '',
      confirmPassword: ''
    };
  }
  private passwordService: PasswordService;

  componentDidMount() {
    this.form = initForm(this.ref.current, registerEvents);
  }

  signin() {
    navigate(this.props.history, 'signin');
  }

  resetPassword(event: any) {
    event.preventDefault();
    const { user, confirmPassword } = this.state;
    const customPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const r = storage.resource();
    const results = validateReset(user, confirmPassword, r, customPassword);
    if (Array.isArray(results) && results.length > 0) {
      this.showError(results);
      return;
    }
    resetPassword(this.passwordService.resetPassword, user, r.resource(), this.showMessage, this.showError, handleError, storage.loading());
    /*
    validateAndResetPassword(
      this.passwordService.resetPassword, this.state.user, this.state.confirmPassword,
      this.resourceService, this.showMessage, this.showError, this.hideMessage,
      validateReset, this.handleError, strongPassword, this.loading, this.showError);
      */
  }

  render() {
    const resource = storage.getResource();
    const { message, user } = this.state;
    return (
      <div className='view-container central-full'>
        <form id='userForm' name='userForm' noValidate={true} autoComplete='off' ref={this.ref} model-name='user'>
          <div>
            <img className='logo' src={logo} alt='logo'/>
            <h2>{resource.reset_password}</h2>
            <div className={'message ' + this.alertClass}>
              {message}
              <span onClick={this.hideMessage} hidden={!message || message === ''} />
            </div>
            <label>
              {resource.username}
              <input type='text'
                id='username' name='username'
                value={user.username}
                placeholder={resource.placeholder_username}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.passcode}
              <input type='text'
                id='passcode' name='passcode'
                value={user.passcode}
                placeholder={resource.placeholder_passcode}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.new_password}
              <input type='password'
                id='password' name='password'
                value={user.password}
                placeholder={resource.placeholder_new_password}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.confirm_password}
              <input type='password'
                id='confirmPassword' name='confirmPassword'
                value={this.state.confirmPassword}
                placeholder={resource.placeholder_confirm_password}
                onChange={this.updateFlatState}
                maxLength={255} required={true} />
            </label>
            <button type='submit' id='btnResetPassword' name='btnResetPassword' onClick={this.resetPassword}>
              {resource.button_reset_password}
            </button>
            <a id='btnSignin' href='signin'>{resource.button_signin}</a>
          </div>
        </form>
      </div>
    );
  }
}
