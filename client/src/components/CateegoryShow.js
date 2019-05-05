import React, { Component } from "react";
import axios from "../config/config";
import { Link } from "react-router-dom";
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
import ReactStars from "react-stars";
import decode from "jwt-decode";

const styles = theme => ({
	appBar: {
		position: "relative"
	},
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
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 6
	}
});
class CategoryShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: {},
			products: [],
			reviews: [],
			isLoad: false
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get(`/categories/${id}`, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({
					category: response.data.category,
					products: response.data.products
				}));
			});
		axios.get("/reviews").then(response => {
			this.setState(() => ({ reviews: response.data, isLoad: true }));
		});
	}
	handleDelete = () => {
		const confirm = window.confirm("Are You Sure");
		const id = this.props.match.params.id;
		if (confirm) {
			axios
				.delete(`categories/${id}`, {
					headers: {
						"x-auth": localStorage.getItem("token")
					}
				})
				.then(response => {
					this.props.history.push("/categories"); // this anthor way of redireact
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	render() {
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
						}
					});
				});
				average = Math.round(count / rlength);
			}
		}
		const { classes } = this.props;
		return (
			<div>
				<div style={{ marginLeft: "2rem", marginTop: "2rem", float: "left" }}>
					<Button
						variant="text"
						color="secondary"
						size="small"
						className={classes.button}
					>
						<Link
							to="/categories"
							style={{
								color: "#F50057",
								textDecoration: "none"
							}}
						>
							<i className="material-icons md-48">arrow_back</i>
						</Link>
					</Button>
				</div>
				<CssBaseline />
				<main>
					{role === "admin" && (
						<div
							style={{
								marginRight: "2rem",
								marginTop: "2rem",
								float: "right",
								color: "#F50057",
								textDecoration: "none"
							}}
						>
							<Button
								variant="outlined"
								color="secondary"
								size="small"
								style={{
									marginRight: "1rem"
								}}
							>
								<Link
									to={`/categories/edit/${this.props.match.params.id}`}
									style={{
										color: "#F50057",
										textDecoration: "none"
									}}
								>
									<Typography
										style={{
											color: "#F50057"
										}}
									>
										Edit
									</Typography>
								</Link>
							</Button>

							<Button
								onClick={this.handleDelete}
								variant="outlined"
								color="secondary"
								size="small"
							>
								<Typography
									style={{
										color: "#F50057"
									}}
								>
									Delete
								</Typography>
							</Button>
						</div>
					)}

					<div className={classes.heroUnit}>
						<div className={classes.heroContent}>
							<Typography
								component="h6"
								variant="h6"
								align="center"
								color="textPrimary"
							>
								{this.state.category.name}
							</Typography>
						</div>
					</div>
					<div className={classNames(classes.layout, classes.cardGrid)}>
						<Grid container spacing={8}>
							{this.state.products.map(product => (
								<Grid item key={product._id} sm={6} md={4} lg={3}>
									<Card className={classes.card}>
										<CardMedia
											className={classes.cardMedia}
											image={product.imageUrl}
											title="Image title"
										/>
										<CardContent className={classes.cardContent}>
											<Typography variant="h6" component="h6">
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
											{this.state.isLoad &&
												this.state.reviews.map(review => {
													if (review.product === product._id) {
														return (
															<div key={review._id}>
																<ReactStars
																	value={average}
																	size={14}
																	color2={"#F50057"}
																	edit={false}
																/>
															</div>
														);
													} else {
														return "";
													}
												})}
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
CategoryShow.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryShow);
