import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './landingpage.css'
import { Link, useNavigate } from 'react-router-dom'



const Landingpage = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         navigate("/mynotes");
    //     }
    // }, [navigate]);
  return (
      <div className='main'>
          <Container>
              <Row>
                  <div className="intro-text">
                      <div>
                          <h1 className='title'>Welcome to Note Zipper</h1>
                          <p className='subtitle'>One Safe Place For all your Notes</p>
                      </div>
                  <div className="buttonContainer">
                      <Link to='/login'>
                          <Button size='lg' className='landingbutton'>
                              Login
                          </Button>
                      </Link>
                      <Link to ='/register'>
                          <Button size='lg' className='landingbutton' variant="outline-primary">
                              Signup
                          </Button>
                      </Link>
                      </div>
                    </div>
              </Row>
          </Container>
    </div>
  )
}

export default Landingpage