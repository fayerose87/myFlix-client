import React, { useState } from 'react';
import PropTypes from 'prop-types';

//Bootstrap Elements
import { Form, Button } from 'react-bootstrap'

import './login-view.scss';
import Logo from 'url:~/src/images/myFlix.png';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div>
    <div className="header">
      <img src={Logo} className="d-inline-block align-top m-auto" height="100px" width="auto" alt="myFlix logo"/>
    </div>

       <div className="Login">
        <Form>
          <h2>Log into your myFlix account.</h2>
          <div className="form-group">
             <Form.Group className="mb-3" controlId="formUsername">
               <Form.Label>Username:</Form.Label>
               <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
              </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}