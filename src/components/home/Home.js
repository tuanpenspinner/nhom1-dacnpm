import React, { Component } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { urlVerifyToken } from "../../constants/endPoint";
import jwtDecode from "jwt-decode";

class Home extends Component {
  UNSAFE_componentWillMount() {
    this.checkToken();
  }

  checkToken = async () => {
    let token = localStorage.getItem("token");
    const ret = await axios.post(urlVerifyToken, { token: token });
    if (!ret.data) {
      localStorage.removeItem("token");
      this.props.history.push("/login");
      window.location.reload();
    }
  };

  sigOut = () => {
    localStorage.removeItem("token");
  };
  render() {
    const token = localStorage.getItem("token");
    if (token === null) {
      return <Redirect to="/login" />;
    }
    const tokenDecode = jwtDecode(token);
    const userName = tokenDecode.fullName;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
          <ul className="navbar-nav">Home</ul>

          <div className=" dropdown ml-5">
            <div
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div className="dropdown-item ">
                <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                <h5 className=" text-danger ">Hi {userName}</h5>
              </div>

              <div className=" dropdown-item ">
                <Link
                  className="d-block "
                  to="./login"
                  onClick={() => this.sigOut()}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container ">
          <Link to="/playgame" replace>
            <button type="button" className="btn btn-success m-auto">
              Playgame
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
