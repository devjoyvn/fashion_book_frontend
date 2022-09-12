import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Account"
    };
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        email: storeConfig.getUser().email
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.islogin) {
      this.setState({
        email: "Account"
      });
    } else {
      this.setState({
        email: storeConfig.getUser().email
      });
    }
  }
  handlelogin = () => {
    if (this.props.islogin) {
      return (
        <li
          className="btn-custom"
          onClick={() => {
            window.location.reload();
            this.props.logout();
            this.props.history.push("/");
          }}
        >
          <a>
            <i className="fa fa-lock" />Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login_register">
            <i className="fa fa-lock" />Login
          </Link>
        </li>
      );
    }
  };
  handleProfile = () => {
    if (this.state.email === "Account") {
      return;
    } else {
        
      this.props.history.push("/profile/" + this.state.email);
    }
  };
  render() {
    return (
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo pull-left">
                <a href="/">
                  <img src="/assets/images/home/logo.png" alt="" />
                </a>
              </div>
              <div className="btn-group pull-right">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    USA
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Canada</a>
                    </li>
                    <li>
                      <a href="#">UK</a>
                    </li>
                  </ul>
                </div>

                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    DOLLAR
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Canadian Dollar</a>
                    </li>
                    <li>
                      <a href="#">Pound</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="shop-menu pull-right">
                <ul className="nav navbar-nav">
                  <li onClick={() => this.handleProfile()}>
                    <Link to={"/"}>
                      <i className="fa fa-user" /> {this.state.email}
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-star" /> Wishlist
                    </a>
                  </li>
                  <li>
                    <a href="checkout.html">
                      <i className="fa fa-crosshairs" /> Checkout
                    </a>
                  </li>
                  <li>
                    <Link to={"/cart"}>
                      <i className="fa fa-shopping-cart" /> Cart
                    </Link>
                  </li>
                  {this.handlelogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMiddle;
