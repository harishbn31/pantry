import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import MonthlyTotalCart from "./MonthlyTotalCart";
import MonthlyQuantity from "./MonthlyQuantity";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
// import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import Typography from "@material-ui/core/Typography";

const styles = {
	grid: {
		width: "60%"
	}
};

class MonthlyCarts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false,
			open: false,
			fromselectedDate: new Date(),
			toselectedDate: new Date()
		};
	}
	fromHandleDateChange = date => {
		this.setState({ fromselectedDate: date });
	};
	toHandleDateChange = date => {
		this.setState({ toselectedDate: date });
	};
	componentDidMount() {
		axios
			.get("/monthlycarts", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({
					carts: response.data.monthlyCart,
					cart: true
				}));
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSubmit = (data, id) => {
		axios
			.put(`/monthlycarts/${id}`, data, {
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
		// const { classes } = this.props;
		const { fromselectedDate, toselectedDate } = this.state;
		if (localStorage.getItem("token")) {
			return (
				<div>
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
						</span>
					</h4>
					{this.state.cart && (
						<div>
							{this.state.carts.map(cart => {
								return (
									<div key={cart._id}>
										<hr />
										<MonthlyQuantity
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
													.delete(`/monthlycarts/${cart._id}`, {
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
					<MonthlyTotalCart carts={this.state.carts} />
					<div>
						{this.state.carts[0] ? (
							<Button
								variant="outlined"
								color="secondary"
								onClick={this.handleClickOpen}
							>
								place the order
							</Button>
						) : (
							<center>
								<Typography>
									Your Cart is Empty please add some product
								</Typography>
								<Link to="/products"> goto products</Link>
							</center>
						)}

						<Dialog
							open={this.state.open}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title"
						>
							<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Are you sure for purchasing this products every monthly.
									please enter your email address and pickup date here. We
									will send updates occasionally. please Subscribe to
									agree terms and conditions
								</DialogContentText>
								<TextField
									margin="dense"
									id="name"
									label="Email Address"
									type="email"
									fullWidth
								/>
								<br />
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<InlineDatePicker
										// readonly={true}
										margin="dense"
										fullWidth
										label="FROM"
										value={fromselectedDate}
										onChange={this.fromHandleDateChange}
									/>

									<InlineDatePicker
										margin="dense"
										fullWidth
										label="TO"
										value={toselectedDate}
										onChange={this.toHandleDateChange}
									/>
								</MuiPickersUtilsProvider>
							</DialogContent>

							<DialogActions>
								<Button onClick={this.handleClose} color="primary">
									Cancel
								</Button>
								<Button onClick={this.handleClose} color="primary">
									Subscribe
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<h4>please add some products to the cart</h4>
					<Redirect to="/user/login" />
				</div>
			);
		}
	}
}
MonthlyCarts.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonthlyCarts);
