import React, {useEffect, useState} from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const history = useNavigate()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  
  const {loading, error, userInfo} = userRegister

  useEffect(() => {
    if (userInfo) {
      history("/mynotes")
    }
  }, [history, userInfo])
  
  const submitHandler = async(e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, pic))
    }
  }
  const postDetails = (pics) => {
    if (!pics) return setPicMessage("Please Select an Image")
    
    setPicMessage(null)

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'notezipper')
      data.append('cloud_name', 'raghavscloud')
      fetch("https://api.cloudinary.com/v1_1/raghavscloud/image/upload", {
        method: 'post',
        body: data,
      }).then((res) => res.json()).then((data) => {
        console.log(data);
        setPic(data.url.toString())
      })
        .catch((err) => {
        console.log(err)
      })
    } else {
      return setPicMessage("Please Select an Image")
    }
  }
  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
              {error && <ErrorMessage variant='danger' children={error}></ErrorMessage>}
              {message && <ErrorMessage variant='danger' children={message}></ErrorMessage>}
              {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className='py-2' controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                          type="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Name">
                      </Form.Control>
                  </Form.Group>
                  <Form.Group className='py-2' controlId="formBasicEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email">
                      </Form.Control>
                  </Form.Group>
                  <Form.Group className='py-2' controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password">
                      </Form.Control>
          </Form.Group>
                            <Form.Group className='py-2' controlId="formBasicConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                          type="password"
                          value={confirmpassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password">
                      </Form.Control>
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
            <Form.Group controlId="pic" className='py-2'>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              type="file"
              label="Upload Profile Picture"
            />
          </Form.Group>
          
                  <Button variant='primary' type='submit'>
                      Submit
                  </Button>
              </Form>
              <Row className="py-3">
                  <Col>
                      Have an account ? <Link to="/login">Login</Link>
                  </Col>
              </Row>
      </div>
      
    </MainScreen>
  )
}

export default RegisterScreen