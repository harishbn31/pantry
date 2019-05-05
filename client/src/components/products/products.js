import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ReactStars from "react-stars";
import CircularProgress from "@material-ui/core/CircularProgress";
import decode from "jwt-decode";
const styles = theme => ({
	icon: {
		marginRight: theme.spacing.unit * 2
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: "0 auto",
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing.unit * 3,
			width: "auto"
		}
	}
});
class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			search: "",
			reviews: [],
			isLoad: false,

			avarageReview: ""
		};
	}
	componentDidMount() {
		axios.get("/products").then(response => {
			const products = response.data;
			this.setState(() => ({ products: products }));
		});
		axios.get("/reviews").then(response => {
			this.setState(() => ({ reviews: response.data, isLoad: true }));
		});
	}
	searchHandle = e => {
		e.persist();
		e.preventDefault();
		this.setState(() => ({ search: e.target.value.toLowerCase() }));
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

			if (this.state.isLoad) {
				this.state.reviews.map(review => {
					return this.state.products.map(product => {
						if (review.product === product._id) {
							count += review.rating;
							return count;
						} else {
							return "";
						}
					});
				});
				average = Math.round(count / rlength);
			}
		}

		let products = [];
		if (this.state.search) {
			let searchProducts = [];
			this.state.products.forEach(product => {
				let productCat = product.category.name.toLowerCase();
				let productName = product.name.toLowerCase();
				if (
					productCat.search(this.state.search) >= 0 ||
					productName.search(this.state.search) >= 0
				) {
					searchProducts.push(product);
				}
			});
			if (searchProducts[0]) {
				products = searchProducts;
			}
		} else {
			products = this.state.products;
		}
		if (this.state.products.length === 0) {
			return (
				<div>
					<center>
						<CircularProgress className={classes.progress} color="secondary" />
					</center>
					{role === "admin" && (
						<Button
							variant="outlined"
							color="secondary"
							style={{ marginLeft: "1080px", marginTop: "5px" }}
						>
							<Link
								to="products/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Product
							</Link>
						</Button>
					)}
				</div>
			);
		} else {
			return (
				<div>
					{role === "admin" && (
						<Button
							variant="outlined"
							color="secondary"
							style={{ marginLeft: "1080px", marginTop: "5px" }}
						>
							<Link
								to="products/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Product
							</Link>
						</Button>
					)}

					<CssBaseline />
					<main>
						{/* <div className={classes.heroUnit}>
						<div className={classes.heroContent}>
							<Typography
								component="h6"
								variant="subtitle2"
								align="center"
								color="textPrimary"
								gutterBottom
							>
							</Typography>
						</div>
					</div> */}

						<div>
							<center>
								<Typography>
									<input
										style={{
											marginTop: "20px",
											marginLeft: "6rem",
											borderRadius: "5px",
											height: "40px",
											width: "700px",
											backgroundColor: "smokewhite",
											WebkitBorderRadius: "15px",
											MozBorderRadius: "15px",
											MsBorderRadius: "15px",
											OBorderRadius: "15px",
											fontSize: "18px",
											textAlign: "center"
										}}
										type="search"
										name="search"
										placeholder="search products"
										value={this.state.search}
										onChange={this.searchHandle}
									/>
									<i className="material-icons">search</i>
								</Typography>
							</center>
						</div>
						<div className={classNames(classes.layout, classes.cardGrid)}>
							<Grid container spacing={16}>
								{products.map(product => (
									<Grid item key={product._id} md={3}>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image={product.imageUrl}
												title="Image title"
											/>
											<CardContent className={classes.cardContent}>
												<Typography variant="title" component="h6">
													<Link
														to={`/products/${product._id}`}
														style={{
															textDecoration: "none",
															color: "black"
														}}
													>
														{product.name}
													</Link>
												</Typography>
												<Typography style={{ color: "green" }}>
													{product.category.name}
												</Typography>
												{/* {this.state.isLoad &&
													this.state.reviews.map(review => {
														if (review.product === product._id) {
															return (
																<div key={review._id}> */}
												<ReactStars
													value={average}
													size={14}
													color2={"#F50057"}
													edit={false}
												/>
												{/* </div>
															);
														} else {
															return (
																<ReactStars
																	value={0}
																	size={14}
																	color2={"#F50057"}
																	edit={false}
																/>
															);
														}
													})} */}

												<Typography>&#x20B9; {product.price}</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						</div>
					</main>
				</div>
			);
		}
	}
}
Product.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
