import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Form, Row, Col} from 'react-bootstrap'
import "./LoginScreen.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const history = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin);

    const { loading, error, userInfo } = userLogin
    useEffect(() => {
        if (userInfo) {
            history('/mynotes')
        }
    }, [history, userInfo]) //dependency array
    
    
    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password))
    };
  return (
      <MainScreen title="LOGIN">
          <div className="loginContainer">
              {error && <ErrorMessage variant='danger' children={error}></ErrorMessage>}
              {loading && <Loading/>}
              <Form onSubmit={submitHandler}>
                  <Form.Group className='py-3' controlId="formBasicEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email">
                      </Form.Control>
                  </Form.Group>
                  <Form.Group className='py-3' controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password">
                      </Form.Control>
                  </Form.Group>

                  <Button variant='primary' type='submit'>
                      Submit
                  </Button>
              </Form>
              <Row className="py-3">
                  <Col>
                      New Customer ? <Link to="/register">Register Here</Link>
                  </Col>
              </Row>
          </div>
      </MainScreen>
  )
}

export default LoginScreen
