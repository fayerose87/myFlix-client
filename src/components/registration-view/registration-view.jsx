import React, { useState } from "react";
import PropTypes from "prop-types";

//Bootstrap Elements
import { Form, Button } from "react-bootstrap";

import "./registration-view.scss";
import Logo from "url:~/src/images/myFlix.png";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the servcer for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegister(username);
  };

  return (
    <div>
      <div className="header">
        <img
          src={Logo}
          className="d-inline-block align-top m-auto"
          height="100px"
          width="auto"
          alt="myFlix logo"
        />
      </div>

      <div className="Register">
        <Form>
          <h2>Let's create your myFlix account.</h2>
          <div className="form-group">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/DD/YYYY"
                onChange={(e) => setBirthday(e.target.value)}
              />
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
