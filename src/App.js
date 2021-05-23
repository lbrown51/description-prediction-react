import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Nav, Navbar, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

const genreNames = ['Romance', 'Biography', 'Drama', 'Adventure', 'History', 'Crime',
  'Western', 'Fantasy', 'Comedy', 'Horror', 'Family', 'Action',
  'Mystery', 'Sci-Fi', 'Animation', 'Thriller', 'Musical', 'Music',
  'War', 'Film-Noir', 'Sport']
class App extends Component {
  constructor(props) {
    super(props)

    const genreProbabilities = []
    for (let i = 0; i < genreNames.length; i++) {
      genreProbabilities[i] = [genreNames[i], 'N/A']
    }

    this.state = {
      loading: false,
      genreProbabilities
    }
  }

  handleSubmitGenreQuery = async (e) => {
    e.preventDefault();

    if (!this.state.loading) {
      this.setState({ loading: true })
      const genrePredictionURL = 'https://fy8onqbppj.execute-api.us-west-2.amazonaws.com/genrepredict';
      const query = e.target[0].value;
      await axios.get(genrePredictionURL, {
        params: {
          query: query
        }
      })
        .then((res) => {
          const genreProbData = res.data;
          const genreProbabilities = []
          for (let i = 0; i < genreProbData.length; i++) {
            genreProbabilities[i] = [genreProbData[i][0], Math.round(Number(genreProbData[i][1]) * 100)  + '%']
          }
          this.setState({
            loading: false,
            genreProbabilities
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
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
              <Form onSubmit={this.handleSubmitGenreQuery}>
                <Form.Group controlId='formGenreQuery'>
                  <Form.Label>Describe your movie!</Form.Label>
                  <Form.Control className='mt-2' as='textarea' rows={6} placeholder='Movie description...' />
                  <Form.Text className='text-muted'>
                    Don't worry, we won't tell anyone about your cool idea!
                  </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                  {!this.state.loading && 'Submit Description'}
                  {this.state.loading && 'Loading...'}
                </Button>
              </Form>
            </Col>
            <Col>
              <p>Genre Confidence</p>
              <ListGroup>
                {this.state.genreProbabilities.slice(0, 10).map((genreProb, index) => {
                  return <ListGroup.Item key={genreProb[0]}>{genreProb[0]}: {genreProb[1]}</ListGroup.Item>
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
