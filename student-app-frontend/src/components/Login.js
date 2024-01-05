import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import axios from 'axios';
const API_URL = 'http://localhost:8080/login';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState("");;
  
    const handleLogin = () => {
      const loginData = {
        username: username,
        password: password,
      };
        axios.post(API_URL, loginData)
        .then(response => {
            const loginResponse = response.data;
            if(loginResponse.jsonWebToken !== null && loginResponse.jsonWebToken !== undefined){
                sessionStorage.setItem("username", loginResponse.username);
                sessionStorage.setItem("role", loginResponse.role);
                sessionStorage.setItem("name", loginResponse.name);
                sessionStorage.setItem("id", loginResponse.id);
                sessionStorage.setItem("jsonWebToken", loginResponse.jsonWebToken);
                window.location.href = "/home";
              }
              else{
                console.log(loginResponse);
                if(loginResponse.badCredentials){
                  setErrors("Wrong username or password!");
                }
                else if(loginResponse.usernameNotFound){
                  setErrors("These username was not found!");
                }
                else if(loginResponse.multipleUsersFound){
                  setErrors("Multiple users found with this username!");
                }
                setShow(true);
                return;
              }
        })
        .catch(error => {
            console.error("Error logging in", error);
            alert("A server error has occured");
            return;
        });
    };
  
    function onDismiss() {
      setShow(false);
    }
  
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2 className="mb-4">Login</h2>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
              </FormGroup>
              <Button color="primary"  onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <Alert color="danger" isOpen={show} toggle={onDismiss}>
            <p> {"Error:\n" + errors} </p>
          </Alert>
      </Container>
    );
  };
  
  export default Login;