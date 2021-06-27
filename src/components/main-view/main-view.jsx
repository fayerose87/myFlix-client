import React from 'react';
import axios from 'axios'

import { LoginView } from '../login-view/login-view';
import { RegistrationView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//Bootstrap Elements
import { Navbar, Nav, NavDropdown, Row, Col, Form, FormControl, Button, Container } from 'react-bootstrap'

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
          <Navbar collapseOnSelect expand="lg" variant="dark" className="justify-content-between">
          <Navbar.Brand href="/">
             <img src={Logo} className="d-inline-block align-top" height="80px" width="auto" alt="myFlix logo"/>
            </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#movies">Browse Movies</Nav.Link>
      <NavDropdown title="My Account" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">My Favorites</NavDropdown.Item>
        <NavDropdown.Item href="/users/:Username">Edit Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  <Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    </Nav>
</Navbar>


<Container fluid>
        
        <Row className="main-view justify-content-md-center">
         {selectedMovie
          ? (
            <Col md={8}>
             <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
           </Col>
            )
            : movies.map(movie => (
              <Col md={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      );
      </Container>
     </div>
    );
  }
}
