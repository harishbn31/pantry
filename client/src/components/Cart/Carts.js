import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import TotalCart from "./TotalCart";
import Quantity from "./Quantity";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

class Carts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false
		};
	}
	componentDidMount() {
		axios
			.get("/carts", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({ carts: response.data.cart, cart: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleSubmit = (data, id) => {
		axios
			.put(`carts/${id}`, data, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.state.carts.forEach(cartId => {
					if (cartId._id === id) {
						return (cartId.quantity = data.quantity);
					} else {
						return "";
					}
				});
				this.setState(() => ({ carts: this.state.carts }));
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		if (localStorage.getItem("token")) {
			return (
				<div>
					<span
						style={{
							fontSize: "14px",
							float: "right",
							textDecoration: "underline",
							fontWeight: "bold",
							color: "red"
						}}
					>
						please hit enter after quantity change
					</span>
					<br />

					<h4>
						Shopping Cart-{this.state.carts.length}
						<span
							style={{
								float: "right",
								fontSize: "15px",
								fontWeight: "normal"
							}}
						>
							Quantity
							<br />
						</span>
					</h4>
					{this.state.cart && (
						<div>
							{this.state.carts.map(cart => {
								return (
									<div key={cart._id}>
										<hr />
										<Quantity
											id={cart._id}
											defaultValue={cart.quantity}
											handleSubmit={this.handleSubmit}
										/>

										<h4>
											<Link to={`/products/${cart.product._id}`}>
												{cart.product.name}
											</Link>
										</h4>
										<img
											src={cart.product.imageUrl}
											alt="productImg"
											width="100"
											hight="100"
										/>
										<p>&#x20B9; {cart.product.price}</p>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a
											// eslint-disable-next-line no-script-url
											href="javascript:void(0)"
											target="_self"
											rel="noopener noreferrer"
											style={{
												textDecoration: "underline",
												color: "red"
											}}
											onClick={() => {
												axios
													.delete(`carts/${cart._id}`, {
														headers: {
															"x-auth": localStorage.getItem("token")
														}
													})
													.then(response => {
														let updateCart = this.state.carts.filter(
															cartId => cartId._id !== cart._id
														);
														this.setState(() => ({
															carts: updateCart
														}));
													})
													.catch(err => {
														console.log(err);
													});
											}}
										>
											Delete
										</a>
										<hr />
									</div>
								);
							})}
						</div>
					)}
					<TotalCart carts={this.state.carts} />
					{this.state.carts[0] ? (
						<div>
							<Link
								style={{ textDecoration: "none" }}
								to="/user/select/addresses"
							>
								<Button color="secondary" variant="outlined">
									Proceed to Buy
								</Button>
							</Link>
						</div>
					) : (
						<center>
							<Typography>
								Your Cart is Empty please add some product
							</Typography>
							<Link to="/products"> goto products</Link>
						</center>
					)}
				</div>
			);
		} else {
			return (
				<div>
					<h4>please login to see cart</h4>
					<Redirect to="/user/login" />
				</div>
			);
		}
	}
}

export default Carts;
