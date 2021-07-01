import React, { useState } from 'react';
import axios from 'axios';
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
    /* Send a request to the server for authentication */
    axios.post('https://fayes-flix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(reponse => {
      const data = reponse.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
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

//LoginView.propTypes = {
//  user: PropTypes.shape({
//      Username: PropTypes.string.isRequired,
//      Password: PropTypes.string.isRequired
//  }),
//  onLoggedIn: PropTypes.func
//};