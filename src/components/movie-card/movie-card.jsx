import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap Elements
import { Navbar, Nav, Row, Col, Form, FormControl, Button, Container, Card } from 'react-bootstrap'

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-uppercase font-weight-bold">{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted font-italic">{movie.Genre.Name}</Card.Subtitle>
          <Card.Text>{movie.Description}</Card.Text>
          <Button className="text-uppercase font-weight-bold" onClick={() => onMovieClick(movie)} variant="primary">Learn More</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date)
    }),     
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};