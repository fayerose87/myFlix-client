import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Card, CardDeck } from "react-bootstrap";

import axios from "axios";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthDate: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let url =
      "https://fayes-flix.herokuapp.com/users/" + localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: new Date(response.data.Birthday).toLocaleDateString(),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`https://fayes-flix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://fayes-flix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + " was removed from your favorite movies.");
      });
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <div>
              <h1>My Profile</h1>
              <div className="details">
                <div className="username">
                  <b>Username:</b> {this.state.username}
                </div>
                <div className="email">
                  <b>Email:</b> {this.state.email}
                </div>
                <div className="birthday">
                  <b>Date of Birth:</b> {this.state.birthday}
                </div>
              </div>
            </div>

            <div className="btn-group mt-3">
              <Link to={`/update`}>
                <Button id="edit-btn" className="btn font-weight-bold mr-2">
                  Edit Profile
                </Button>
              </Link>
              <Button
                id="delete-btn"
                variant="secondary"
                className="font-weight-bold"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Are you sure you want to delete your MyFlix account?"
                  );
                  if (confirmBox === true) {
                    this.handleDelete();
                  }
                }}
              >
                Delete Account
              </Button>
            </div>

            <div>
              <h2 className="mb-2 mt-4">My Favorite Movies </h2>

              {favoriteMovieList.length === 0 && (
                <p className="text-light">
                  You don't have any favorite movies yet!
                </p>
              )}
                 <CardDeck>
              {favoriteMovieList.length > 0 &&
                favoriteMovieList.map((movie) => {
                  return (

                      <Card key={movie._id} className="fav-card mt-2">
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img id="poster" src={movie.ImagePath} />
                        </Link>
                        <Button
                          className="remove font-weight-bold mt-2"
                          id="remove"
                          onClick={() => this.removeFavorite(movie)}
                        >
                          Remove
                        </Button>
                      </Card>

                  );
                })}
                </CardDeck>
                  );
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
