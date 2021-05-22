import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Nav, Navbar, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

class App extends Component {
  handleClick = async (e) => {
    const genrePredictionURL = 'https://fy8onqbppj.execute-api.us-west-2.amazonaws.com/genrepredict';
    const query = 'An evil sorceress transports the gang back to the age chivalrous knights, spell-casting wizards, and fire-breathing dragons.';
    await axios.get(genrePredictionURL, {
      params: {
        query: query
      }
    })
      .then((res) => {
        console.log(res);
      });
  }
  render() {
    const genreNames = ['Romance', 'Biography', 'Drama', 'Adventure', 'History', 'Crime',
        'Western', 'Fantasy', 'Comedy', 'Horror', 'Family', 'Action',
        'Mystery', 'Sci-Fi', 'Animation', 'Thriller', 'Musical', 'Music',
        'War', 'Film-Noir', 'Sport']
    return (
      <div className='App'>
        <Navbar bg='primary' variant='dark'>
          <Navbar.Brand href='#home'>Description Prediction</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Genre</Nav.Link>
            <Nav.Link href='#features'>Actors</Nav.Link>
          </Nav>
        </Navbar>
        <Container className='m-4'>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId='formGenreQuery'>
                  <Form.Label>Describe your movie!</Form.Label>
                  <Form.Control as='textarea' rows={6} placeholder='Movie description...'/>
                  <Form.Text className='text-muted'>
                    Don't worry, we won't tell anyone about your cool idea!
                  </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={this.handleClick}>
                  Submit
                </Button>
              </Form>
            </Col>
            <Col className='mt-4'>
              <ListGroup>
                {genreNames.map((genre, index) => {
                  return <ListGroup.Item>{genre}: 0</ListGroup.Item>
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
