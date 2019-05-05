import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import ReactStars from "react-stars";
import decode from "jwt-decode";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		margin: "auto",
		maxWidth: 1300,
		maxHeight: "auto"
	},
	image: {
		width: 240,
		height: 220
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%"
	}
});
class ProductShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: {},
			reviews: [],
			isload: false
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`/products/${id}`).then(response => {
			const products = response.data;
			this.setState(() => ({ products: products }));
		});
		axios.get("/reviews").then(response => {
			this.setState(() => ({ reviews: response.data, isload: true }));
		});
	}
	handleDelete = () => {
		const confirm = window.confirm("Are You Sure");
		const id = this.props.match.params.id;
		if (confirm) {
			axios
				.delete(`products/${id}`, {
					headers: {
						"x-auth": localStorage.getItem("token")
					}
				})
				.then(response => {
					this.props.history.push("/products"); // this anthor way of redireact
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	handleCart = () => {
		const data = {
			product: this.props.match.params.id,
			quantity: 1
		};
		if (localStorage.getItem("token")) {
			const confirm = window.confirm(
				"ok for go to cart or cancel for contniue shopping"
			);
			axios
				.post(`/carts`, data, {
					headers: {
						"x-auth": localStorage.getItem("token")
					}
				})
				.then(response => {
					if (confirm) {
						this.props.history.push("/user/cart");
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.props.history.push("/user/login");
		}
	};
	handleMonthlyCart = () => {
		const data = {
			product: this.props.match.params.id,
			quantity: 1
		};
		if (localStorage.getItem("token")) {
			const conform = window.confirm(
				"Are you sure this items repeated every month!"
			);
			if (conform) {
				axios
					.post(`/monthlycarts`, data, {
						headers: {
							"x-auth": localStorage.getItem("token")
						}
					})
					.then(response => {})
					.catch(err => {
						console.log(err);
					});
			}
		} else {
			this.props.history.push("/user/login");
		}
	};

	render() {
		const { classes } = this.props;
		let role = "";
		if (localStorage.getItem("token")) {
			const userId = localStorage.getItem("token");
			const decoded = decode(userId);
			role = decoded.user_role[0];
		}
		let count = 0;
		let average = 0;
		if (this.state.reviews.length > 0) {
			let rlength = this.state.reviews.length;
			if (this.state.isload) {
				this.state.reviews.map(review => {
					if (review.product === this.state.products._id) {
						count += review.rating;
						return count;
					}else {
						return ""
					}
				});
				average = Math.round(count / rlength);
			}
		}

		return (
			<div>
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container spacing={16}>
							<Grid item>
								<ButtonBase className={classes.image}>
									<img
										className={classes.img}
										src={this.state.products.imageUrl}
										alt="productImg"
									/>
								</ButtonBase>
							</Grid>

							<Grid item xs={12} sm container>
								<Grid item xs container direction="column" spacing={24}>
									<Grid item xs>
										<Typography gutterBottom variant="subtitle1">
											{this.state.products.name}
										</Typography>
										<Typography gutterBottom>
											description: {this.state.products.description}
										</Typography>

										{/* {this.state.isload &&
											this.state.reviews.map(review => {
												if (review.product === this.state.products._id) {
													return ( */}
										{/* <div key={review._id}> */}
										<ReactStars
											value={average}
											size={14}
											color2={"#F50057"}
											edit={false}
										/>
										{/* </div> */}
										{/* );
												} else {
													return "";
												}
											})} */}

										<Typography color="textPrimary" style={{ color: "red" }}>
											&#x20B9; {this.state.products.price}
										</Typography>
									</Grid>
									{/* <Grid item>
										<Typography style={{ cursor: "pointer" }}>
											Remove
										</Typography>
									</Grid> */}
								</Grid>
								<Grid item>
									<Button
										color="secondary"
										size="small"
										variant="outlined"
										onClick={this.handleCart}
									>
										<Typography
											style={{ color: "#F50057", textDecoration: "none" }}
										>
											Add Cart
										</Typography>
									</Button>
									<br />
									<br />
									<Button
										color="secondary"
										size="small"
										variant="outlined"
										onClick={this.handleMonthlyCart}
									>
										<Typography
											style={{ color: "#F50057", textDecoration: "none" }}
										>
											Add Monthly Cart
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<div
							style={{
								marginLeft: "2rem",
								marginTop: "2rem",
								float: "left"
							}}
						>
							<Button
								variant="text"
								color="secondary"
								size="small"
								className={classes.button}
							>
								<Link
									to="/products"
									style={{
										color: "#F50057",
										textDecoration: "none"
									}}
								>
									<i className="material-icons md-48">arrow_back</i>
								</Link>
							</Button>
						</div>
					</Paper>
				</div>
				<br />
				<div>
					{role === "admin" && (
						<Button
							color="secondary"
							size="small"
							variant="outlined"
							onClick={this.handleDelete}
							style={{ marginRight: "13px" }}
						>
							Delete
						</Button>
					)}
					{role === "admin" && (
						<Button color="secondary" size="small" variant="outlined">
							<Link
								style={{
									color: "#F50057",
									textDecoration: "none"
								}}
								to={`/product/edit/${this.props.match.params.id}`}
							>
								Edit
							</Link>
						</Button>
					)}
				</div>
				<br />
				<br />
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container spacing={16}>
							<Grid item xs={12} sm container>
								<Grid item xs container direction="column" spacing={16}>
									{this.state.reviews.length > 0 && (
										<Grid item xs>
											<Typography gutterBottom variant="h5">
												Reviews
											</Typography>

											{this.state.reviews.map(review => {
												if (this.state.products._id === review.product) {
													return (
														<div key={review._id} className={classes.root}>
															<Grid item>
																<Typography gutterBottom variant="subtitle1">
																	{review.title} By:
																	<span
																		style={{
																			color: "#F50057",
																			textDecoration: "underline"
																		}}
																	>
																		{review.user.username}
																	</span>
																</Typography>
																<Typography>{review.body}</Typography>

																<ReactStars
																	value={review.rating}
																	size={24}
																	color2={"#F50057"}
																	edit={false}
																/>
															</Grid>

															<hr />
														</div>
													);
												} else {
													return "";
												}
											})}
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</div>

				<br />
				<br />

				<Link
					style={{ textDecoration: "none" }}
					to={`/products/user/reviews/${this.props.match.params.id}`}
				>
					<Button color="secondary" size="small" variant="outlined">
						Write a product review
					</Button>
				</Link>
			</div>
		);
	}
}
ProductShow.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductShow);
