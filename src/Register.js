import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from './Firebase/index';
import { db } from './Firebase/index';

const Register = ({ history }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setCnfPassword] = useState('');
  const [error, setError] = useState('');

  const submitRegisterForm = () => {
    if (password.length < 8) {
      setPassword('');
      setCnfPassword('');
      setError('password length should be atleast 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords mismatch');
      setPassword('');
      setCnfPassword('');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        let userId = data.user.uid;
        db.ref('Users').push({
          userName,
          email,
          userId,
          cartProducts: [],
          orderedProducts: []
        });
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="form-container">
      <div className="user-image">
        <i class="fa fa-user fa-5x" aria-hidden="true"></i>
      </div>
      {error ? <span className="error-field">{error}</span> : null}
      <div className="input-field">
        <span className="span-field">Email</span>
        <input
          className="text-field"
          type="text"
          name="Email"
          autoComplete="off"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <span className="span-field">UserName</span>
        <input
          className="text-field"
          type="text"
          name="userName"
          autoComplete="off"
          value={userName}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <span className="span-field">PassWord</span>
        <input
          className="text-field"
          type="password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <span className="span-field">Confirm PassWord</span>
        <input
          className="text-field"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => {
            setCnfPassword(e.target.value);
          }}
        />
      </div>
      <button
        className="button-field"
        onClick={() => {
          submitRegisterForm();
        }}
      >
        Register
      </button>
    </div>
  );
};
export default withRouter(Register);
