import React from "react";
import PropTypes from "prop-types";

//Bootstrap Elements
import { Button, Container } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} />
            <p></p>
          </div>
          <div className="movie-title">
            <span className="label"></span>
            <h1 className="value text-uppercase font-weight-bold">
              {movie.Title}
            </h1>
          </div>
          <div className="movie-genre">
            <span className="label text-uppercase font-weight-bold text-muted">
              Genre{" "}
            </span>
            <span className="value">{movie.Genre.Name}</span>
            <span> | </span>
            <span className="label text-uppercase font-weight-bold text-muted">
              Director{" "}
            </span>
            <span className="value">{movie.Director.Name}</span>
            <p></p>
          </div>
          <div className="movie-description">
            <span className="label"></span>
            <span className="value">{movie.Description}</span>
          </div>
          <p></p>
          <div className="btn-toolbar">
            <Button
              className="text-uppercase font-weight-bold"
              variant="primary"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Add To Favorites
            </Button>
            <Button
              className="text-uppercase font-weight-bold mx-3"
              variant="primary"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back To Movies
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
