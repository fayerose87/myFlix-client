import React from 'react';
import axios from 'axios'

import { LoginView } from '../login-view/login-view';
import { RegistrationView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//Bootstrap Elements
import { Navbar, Nav, Row, Col, Form, FormControl, Button, Container } from 'react-bootstrap'

import './main-view.scss';
import Logo from 'url:~/src/images/myFlix.png';

export class MainView extends React.Component {

  constructor(){
    super();
// Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount(){
    axios.get('https://fayes-flix.herokuapp.com/movies')
      .then(reponse => {
        this.setState({
          movies: reponse.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

/* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie */

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user */
  
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
     register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div>
        <Row>
          <Col>
            <Navbar variant="dark">
            <Navbar.Brand href="">
             <img src={Logo} className="d-inline-block align-top" height="100px" width="auto" alt="myFlix logo"/>
            </Navbar.Brand>
            <Nav className="me-auto">
             <Nav.Link href="">Home</Nav.Link>
             <Nav.Link href="">My Account</Nav.Link>
              <Nav.Link href="">Logout</Nav.Link>
            </Nav>
            </Navbar>
          </Col>
        </Row>
        
        <Row className="main-view justify-content-md-center">
         {selectedMovie
          ? (
            <Col md={8}>
             <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
           </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      );
     </div>
    );
  }
}
