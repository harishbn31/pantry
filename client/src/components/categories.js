import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../config/config";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import decode from "jwt-decode";
const styles = theme => ({
	root: {
		display: "flex"
	},
	paper: {
		marginRight: theme.spacing.unit * 2
	},
	progress: {
		margin: theme.spacing.unit * 2
	}
});
class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			open: false
		};
	}
	componentDidMount() {
		axios.get("/categories").then(response => {
			const categories = response.data;
			this.setState(() => ({ categories: categories }));
		});
	}
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		const { open } = this.state;
		let role = "";
		if (localStorage.getItem("token")) {
			const userId = localStorage.getItem("token");
			const decoded = decode(userId);
			role = decoded.user_role[0];
		}

		if (this.state.categories.length === 0) {
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
								to="categories/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Category
							</Link>
						</Button>
					)}
				</div>
			);
		} else {
			return (
				<div>
					<div>
						<Button
							buttonRef={node => {
								this.anchorEl = node;
							}}
							aria-owns={open ? "menu-list-grow" : undefined}
							aria-haspopup="true"
							onClick={this.handleToggle}
						>
							Categories
						</Button>
						<Popper
							open={open}
							anchorEl={this.anchorEl}
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									id="menu-list-grow"
									style={{
										transformOrigin:
											placement === "bottom" ? "center top" : "center bottom"
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<MenuList>
												{this.state.categories.map(category => {
													return (
														<MenuItem
															key={category._id}
															onClick={this.handleClose}
														>
															<Link
																style={{
																	textDecoration: "none",
																	color: "#F50057"
																}}
																to={`/categories/${category._id}`}
															>
																{category.name}
															</Link>
														</MenuItem>
													);
												})}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
					{role === "admin" && (
						<Button
							variant="outlined"
							color="secondary"
							style={{ marginLeft: "1050px", marginTop: "5px" }}
						>
							<Link
								to="categories/add"
								style={{
									float: "right",
									color: "#F50057",
									textDecoration: "none"
								}}
							>
								Add Category
							</Link>
						</Button>
					)}
				</div>
			);
		}
	}
}
Categories.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Categories);
