/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

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

class Addresses extends Component {
	constructor() {
		super();
		this.state = {
			addresses: []
		};
	}
	componentDidMount() {
		axios
			.get("/addresses", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const addresses = response.data;
				this.setState(() => ({ addresses: addresses }));
			});
	}

	render() {
		const { classes } = this.props;
		// const bull = <span className={classes.bullet}>•</span>;
		if (localStorage.getItem("token")) {
			if (this.state.addresses.length >= 0) {
				return (
					<div>
						<Button
							variant="outlined"
							color="secondary"
							style={{ marginLeft: "1080px", marginTop: "5px" }}
						>
							<Link
								to="/user/addresses/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Address
							</Link>
						</Button>

						<CssBaseline />
						<main>
							<center>
								<Typography variant="h5">Your Addresses</Typography>
							</center>
							<div className={classNames(classes.layout, classes.cardGrid)}>
								<Grid container spacing={40}>
									{this.state.addresses.map((address, i) => (
										<Grid item key={address._id} sm={6} md={4} lg={3}>
											<Card className={classes.card}>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h4">
														#{i + 1}. {address.fullname}
													</Typography>
													<Typography>
														{address.street} <br />
														{address.landmark} <br />
														{address.city} <br />
														{address.postalCode} <br />
														A.P <br />
														India <br />
														{address.mobile}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small" color="secondary">
														<Link
															to={`addresses/edit/${address._id}`}
															style={{
																color: "#F50057",
																textDecoration: "none"
															}}
														>
															Edit
														</Link>
													</Button>
													<Button
														size="small"
														color="secondary"
														onClick={() => {
															axios
																.delete(`addresses/${address._id}`, {
																	headers: {
																		"x-auth": localStorage.getItem("token")
																	}
																})
																.then(response => {
																	let updateAddress = this.state.addresses.filter(
																		addressId => addressId._id !== address._id
																	);
																	this.setState(() => ({
																		addresses: updateAddress
																	}));
																})
																.catch(err => {
																	console.log(err);
																});
														}}
													>
														Delete
													</Button>
												</CardActions>
											</Card>
										</Grid>
									))}
								</Grid>
							</div>
						</main>
					</div>
				);
			} else {
				return (
					<div>
						<Typography>
							There is no addresses in this user please add address
						</Typography>
						<Button
							variant="outlined"
							color="secondary"
							style={{ marginLeft: "1190px", marginTop: "5px" }}
						>
							<Link
								to="/user/addresses/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Address
							</Link>
						</Button>
					</div>
				);
			}
		} else {
			return (
				<div>
					<center>
						<Typography>Please login to see</Typography>
						<br />
						<Button
							variant="outlined"
							color="secondary"
							size="small"
							className={classes.button}
						>
							<Link
								to="/user/login"
								style={{ color: "#F50057", textDecoration: "none" }}
							>
								Login
							</Link>
						</Button>
					</center>
					;
				</div>
			);
		}
	}
}
Addresses.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Addresses);
