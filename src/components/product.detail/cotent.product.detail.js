import React, { Component } from "react";
import { Link } from "react-router-dom";
import { forgotEmailFail } from "../../actions/user.action";
import storeConfig from "../../config/storage.config";
class ContentProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      notificationComment: "",
      comment: "",
      quantity: 1,
      noti: "",
      pagination: []
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    if (storeConfig.getUser() !== null) {
      this.setState({
        name: storeConfig.getUser().firstName,
        email: storeConfig.getUser().email
      });
    } else {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.islogin === false) {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  handlename = name => {
    if (this.state.name === "") {
      this.setState({ name: name });
    }
  };
  submitComment = () => {
    if (this.state.name === "") {
      this.setState({ notificationComment: "Name must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    if (this.state.comment === "") {
      this.setState({ notificationComment: "Comment must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    this.props.submitComment(
      this.state.name,
      this.state.email,
      this.state.comment,
      this.props.id_book
    );
    this.setState({ comment: "" });
  };
  submitOrder = () => {
    if (this.state.quantity < 0) {
      this.setState({ noti: "Quantity invalid" });
      return;
    } else {
      this.setState({ noti: "" });
    }
    let product = this.props.mproductDetail;
    product.count = this.state.quantity;
    this.props.addToCart(product);
  };
  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                  {this.props.category.map((element, index) => {
                    return (
                      <div key={index} className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a key={index}>{element.name}</a>
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="brands_products">
                  <h2>Brands</h2>
                  <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                      {this.props.publisher.map((element, index) => {
                        return (
                          <li>
                            <a href="#">
                              {" "}
                              <span className="pull-right" />
                              {element.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9 padding-right">
              <div className="product-details">
                <div className="col-sm-5">
                  <div className="view-product">
                    <img src={this.props.mproductDetail.img} alt="" />
                  </div>
                  <div
                    id="similar-product"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="item active">
                        <a href="">
                          <img
                            src="/assets/images/product-details/similar1.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="/assets/images/product-details/similar2.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="images/product-details/similar3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <img
                            src="/assets/images/product-details/similar1.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="/assets/images/product-details/similar2.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="/assets/images/product-details/similar3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <img
                            src="images/product-details/similar1.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="images/product-details/similar2.jpg"
                            alt=""
                          />
                        </a>
                        <a href="">
                          <img
                            src="images/product-details/similar3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <a
                      className="left item-control"
                      href="#similar-product"
                      data-slide="prev"
                    >
                      <i className="fa fa-angle-left" />
                    </a>
                    <a
                      className="right item-control"
                      href="#similar-product"
                      data-slide="next"
                    >
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="product-information">
                    <img
                      src="/assets/images/product-details/new.jpg"
                      className="newarrival"
                      alt=""
                    />
                    <h2>{this.props.mproductDetail.name}</h2>
                    <p>Web ID: {this.props.mproductDetail._id}</p>
                    <img src="images/product-details/rating.png" alt="" />

                    <span>
                      <span>US ${this.props.mproductDetail.price}</span>
                      Quantity
                      <input
                        type="number"
                        min="0"
                        onChange={e =>
                          this.setState({ quantity: e.target.value })
                        }
                        value={this.state.quantity}
                      />
                      <button
                        onClick={() => this.submitOrder()}
                        type="button"
                        className="btn btn-fefault cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </span>
                    <p>{this.state.noti}</p>
                    <p>
                      <b>Category:</b> {this.props.nameCategory}
                    </p>
                    <p>
                      <b>Release date </b>{" "}
                      {new Date(
                        this.props.mproductDetail.release_date
                      ).toDateString("yyyy-MM-dd")}
                    </p>
                    <p>
                      <b>Publisher:</b> {this.props.namePublicsher}
                    </p>
                    <p>
                      <b>Author:</b> {this.props.nameAuthor}
                    </p>
                    <a href="">
                      <img
                        src="/assets/images/product-details/share.png"
                        className="share img-responsive"
                        alt=""
                      />
                    </a>
                  </div>
                </div>

                <div className="category-tab shop-details-tab">
                  <div className="col-sm-12">
                    <ul className="nav comment">
                      <li className="active">
                        <a href="#reviews" data-toggle="tab">
                          Reviews{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade" id="companyprofile">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src="/assets/images/home/gallery1.jpg"
                                alt=""
                              />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src="/assets/images/home/gallery3.jpg"
                                alt=""
                              />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery4.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="tag">
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src="/assets/images/home/gallery1.jpg"
                                alt=""
                              />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src="/assets/images/home/gallery2.jpg"
                                alt=""
                              />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src="/assets/images/home/gallery3.jpg"
                                alt=""
                              />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/gallery4.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button
                                type="button"
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart" />Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade active in" id="reviews">
                      <div className="col-sm-12">
                        <div className="content-conment">
                          {this.props.comment.map((element, index) => {
                            return (
                              <p>
                                <span>{element.name}:</span> {element.comment}
                              </p>
                            );
                          })}
                          {this.renderPagination()}
                        </div>
                        <hr />
                        <p style={{ color: "#5BBCEC" }}>
                          {this.state.notificationComment}
                        </p>
                        <p>
                          <b>Write Your Review</b>
                        </p>

                        <form action="#">
                          <span>
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={this.state.name}
                              onChange={e =>
                                this.setState({ name: e.target.value })
                              }
                            />
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={this.state.email}
                            />
                          </span>
                          <textarea
                            value={this.state.comment}
                            onChange={e =>
                              this.setState({ comment: e.target.value })
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-default pull-right"
                            onClick={() => this.submitComment()}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="recommended_items">
                  <h2 className="title text-center">recommended items</h2>

                  <div
                    id="recommended-item-carousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="item active">
                        {this.props.bookrelated.map((element, index) => {
                          return (
                            <div className="col-sm-4">
                              <div className="product-image-wrapper">
                                <div className="single-products">
                                  <div className="productinfo text-center">
                                    <a href={"/product/" + element._id}>
                                      <img src={element.img} alt="" />
                                      <h2>${element.price}</h2>
                                      <p>{element.describe}</p>{" "}
                                    </a>
                                    <button
                                      onClick={() => {
                                        element.count = 1;
                                        this.props.addToCart(element);
                                      }}
                                      type="button"
                                      className="btn btn-default add-to-cart"
                                    >
                                      <i className="fa fa-shopping-cart" />Add
                                      to cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <a
                      className="left recommended-item-control"
                      href="#recommended-item-carousel"
                      data-slide="prev"
                    >
                      <i className="fa fa-angle-left" />
                    </a>
                    <a
                      className="right recommended-item-control"
                      href="#recommended-item-carousel"
                      data-slide="next"
                    >
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ContentProductDetail;
