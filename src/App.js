import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

const genreNames = ['Romance', 'Biography', 'Drama', 'Adventure', 'History', 'Crime',
  'Western', 'Fantasy', 'Comedy', 'Horror', 'Family', 'Action',
  'Mystery', 'Sci-Fi', 'Animation', 'Thriller', 'Musical', 'Music',
  'War', 'Film-Noir', 'Sport']

const exampleDescriptions = [
  'An evil sorceress transports the gang back to the age chivalrous knights, spell-casting wizards, and fire-breathing dragons.',
  'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  'Danny Ocean and his ten accomplices plan to rob three Las Vegas casinos simultaneously.',
  'In turn of the century London, a magical nanny employs music and adventure to help two neglected children become closer to their father.'
]
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

          let posX, posY = (0, 0);

          const confidenceList = document.getElementById('genreConfidenceList');
          posY += confidenceList.offsetTop;
          window.scrollTo(posX, posY);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          this.setState({
            loading: false
          })
        });
    }
  }

  handleExampleClick = (e) => {
    document.getElementById('formGenreQuery').value = e.target.textContent;
  }

  render() {
    return (
      <div className='App'>
        <Container className='d-block border'>
          <Row className='d-block'>
            <Navbar bg='primary' variant='dark'>
              <Navbar.Brand>Description Prediction</Navbar.Brand>
            </Navbar>
          </Row>
          <Row className='m-4'>
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
              <p>Example Descriptions (click one!)</p>
              <ListGroup>
                {exampleDescriptions.map((example, index) => {
                  return <ListGroup.Item key={index} action onClick={this.handleExampleClick}>{example}</ListGroup.Item>
                })}
              </ListGroup>
            </Col>
          </Row>
          <Row className='mt-4' id='genreConfidenceList'>
            <Col>
              <p>Genre Confidence</p>
              <ListGroup>
                {this.state.genreProbabilities.slice(0, 10).map((genreProb, index) => {
                  return <ListGroup.Item key={genreProb[0]}>{genreProb[0]}: {genreProb[1]}</ListGroup.Item>
                })}
              </ListGroup>
            </Col>
          </Row>
          <Row className='d-block mt-4'>
            <Navbar bg='secondary' variant='dark'>
              <span className='text-white mx-auto'>DP 2020 - Lenny Brown</span>
            </Navbar>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
