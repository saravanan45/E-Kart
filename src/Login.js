import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from './Firebase/index';
import { db } from './Firebase/index';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [visible, setVisible] = useState(false);

  const submitLoginForm = () => {
    if (!email || !password) {
      setError('Invalid Username/password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        let userId = data.user.uid;
        let body = {
          email,
          userId
        };
        localStorage.setItem('UserDetails', JSON.stringify(body));
        history.push('/');
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  };

  const passwordToggle = () => {
    const display = visible;
    setVisible(!display);
    !display ? setType('password') : setType('text');
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
          name="email"
          autoComplete="off"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <span className="span-field">PassWord</span>
        <span
          className="password-toggle"
          onClick={() => {
            passwordToggle();
          }}
        >
          {type === 'password' ? (
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-eye"></i>
          )}
        </span>
        <input
          className="text-field"
          type={type}
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        className="button-field"
        onClick={() => {
          submitLoginForm();
        }}
      >
        Login
      </button>
      <span className="text">
        Don't have a account? <a href="/register">Register</a>
      </span>
    </div>
  );
};
export default Login;
