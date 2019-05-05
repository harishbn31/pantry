import React, { Component } from "react";
import decode from "jwt-decode";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactStars from "react-stars";
import { Redirect } from "react-router-dom";

const styles = theme => ({
	main: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class ReviewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			bodyError: "",
			bError: false,
			body: "",
			titleError: "",
			tError: false,
			rating: 0,
			ratingError: "",
			rError: false
		};
	}
	handleChange = e => {
		e.persist();
		this.setState(() => ({ [e.target.name]: e.target.value }));
	};
	ratingChanged = newRating => {
		this.setState(() => ({ rating: newRating }));
	};
	handleSubmit = e => {
		e.preventDefault();
		const userId = localStorage.getItem("token");
		const decoded = decode(userId);
		const data = {
			title: this.state.title,
			body: this.state.body,
			rating: this.state.rating,
			user: decoded.user_id
		};
		if (this.state.title.length < 3 && this.state.body.length < 16) {
			this.setState(() => ({
				titleError: "Write minmum length title",
				tError: true,
				bodyError: "Write review > 16",
				bError: true,
				ratingError: "minmum 1 is mandatory",
				rError: true
			}));
		} else if (!this.state.rating) {
			this.setState(() => ({
				titleError: "",
				tError: false,
				bodyError: "",
				bError: false,
				ratingError: "minmum 1 is mandatory",
				rError: true
			}));
		} else {
			this.props.handleSubmit(data);
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				{localStorage.getItem("token") ? (
					<main className={classes.main}>
						<CssBaseline />
						<Paper className={classes.paper}>
							<Avatar className={classes.avatar}>
								<AccountCircleIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Write Your Review
							</Typography>
							<form className={classes.form}>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="title">Headline</InputLabel>
									<Input
										type="text"
										name="title"
										value={this.state.title}
										onChange={this.handleChange}
										placeholder="Write Your Title"
										required
										error={this.state.tError}
									/>
									<span style={{ color: "red" }}>{this.state.titleError}</span>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="body">Write your review</InputLabel>
									<Input
										type="text"
										name="body"
										value={this.state.body}
										onChange={this.handleChange}
										required
										multiline={true}
										placeholder="Write your review"
										error={this.state.bError}
									/>
									<span style={{ color: "red" }}>{this.state.bodyError}</span>
									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="rating">Your Rating</InputLabel>
										<br />
										<br />
										<ReactStars
											count={5}
											value={this.state.rating}
											onChange={this.ratingChanged}
											size={39}
											color2={"#F50057"}
										/>
										<span style={{ color: "red" }}>
											{this.state.ratingError}
										</span>
									</FormControl>
								</FormControl>
								<Button
									type="submit"
									fullWidth
									variant="outlined"
									color="secondary"
									size="small"
									className={classes.submit}
									onClick={this.handleSubmit}
								>
									Create Your Review
								</Button>
							</form>
						</Paper>
					</main>
				) : (
					<Redirect to="/user/login" />
				)}
			</div>
		);
	}
}

ReviewForm.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ReviewForm);

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import IconButton from "@material-ui/core/IconButton";
// import orange from "@material-ui/core/colors/orange";
// import grey from "@material-ui/core/colors/grey";
// import { withStyles } from "@material-ui/core/styles";
// import Star from "@material-ui/icons/Star";
// import StarBorder from "@material-ui/icons/StarBorder";

// const noPointerEvents = {
// 	pointerEvents: "none"
// };

// const styles = {
// 	root: {},
// 	iconButton: {
// 		padding: 8,
// 		marginLeft: -8,
// 		"&:first-child": {
// 			marginLeft: 0
// 		}
// 	},
// 	disabled: noPointerEvents,
// 	readOnly: noPointerEvents
// };

// /**
//  * Material design star rating component for your star application.
//  * @see [Card UI controls](https://material.io/guidelines/components/cards.html#cards-actions)
//  */
// class ReviewForm extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			hoverValue: props.value
// 		};
// 	}

// 	getIcon(type, index) {
// 		const {
// 			disabled,
// 			iconNormal,
// 			iconNormalRenderer,
// 			iconHovered,
// 			iconHoveredRenderer,
// 			iconFilled,
// 			iconFilledRenderer
// 		} = this.props;

// 		switch (type) {
// 			case "normal":
// 				return iconNormalRenderer
// 					? iconNormalRenderer({ ...this.props, index })
// 					: disabled
// 					? React.cloneElement(iconNormal, { nativeColor: grey[300] })
// 					: iconNormal;
// 			case "hovered":
// 				return iconHoveredRenderer
// 					? iconHoveredRenderer({ ...this.props, index })
// 					: disabled
// 					? React.cloneElement(iconHovered, { nativeColor: grey[300] })
// 					: iconHovered;
// 			case "filled":
// 				return iconFilledRenderer
// 					? iconFilledRenderer({ ...this.props, index })
// 					: disabled
// 					? React.cloneElement(iconFilled, { nativeColor: grey[300] })
// 					: iconFilled;
// 		}
// 	}

// 	renderIcon(i) {
// 		const { value } = this.props;

// 		const rest = value >= i - 1 && value < i ? value - i + 1 : 0;
// 		const filled = rest > 0 || i <= value;
// 		const hovered = rest > 0 || i <= Math.floor(this.state.hoverValue);

// 		if (rest > 0) {
// 			return (
// 				<React.Fragment>
// 					{React.cloneElement(
// 						Math.floor(this.state.hoverValue) < value
// 							? this.getIcon("normal", i)
// 							: this.getIcon("hovered", i),
// 						{
// 							style: { position: "absolute" }
// 						}
// 					)}
// 					{React.cloneElement(
// 						this.state.hoverValue < value
// 							? this.getIcon("hovered", i)
// 							: this.getIcon("filled", i),
// 						{
// 							style: {
// 								clipPath: `polygon(0% 0%, ${rest * 100}% 0%, ${rest *
// 									100}% 100%, 0% 100%)`
// 							}
// 						}
// 					)}
// 				</React.Fragment>
// 			);
// 		}

// 		if ((hovered && !filled) || (!hovered && filled)) {
// 			return this.getIcon("hovered", i);
// 		} else if (filled) {
// 			return this.getIcon("filled", i);
// 		} else {
// 			return this.getIcon("normal", i);
// 		}
// 	}

// 	render() {
// 		const { classes, max, disabled, readOnly, value, onChange } = this.props;
// 		const rating = [];

// 		for (let i = 1; i <= max; i++) {
// 			rating.push(
// 				<IconButton
// 					key={i}
// 					className={classNames(classes.iconButton, {
// 						[classes.disabled]: disabled,
// 						[classes.readOnly]: readOnly
// 					})}
// 					disabled={disabled}
// 					onMouseEnter={() => this.setState({ hoverValue: i })}
// 					onMouseLeave={() => this.setState({ hoverValue: value })}
// 					onClick={() => {
// 						if (!readOnly && onChange) {
// 							onChange(i);
// 						}
// 					}}
// 				>
// 					{this.renderIcon(i)}
// 				</IconButton>
// 			);
// 		}

// 		return <div className={classes.root}>{rating}</div>;
// 	}
// }

// ReviewForm.defaultProps = {
// 	disabled: false,
// 	max: 5,
// 	readOnly: false,
// 	value: 0,
// 	iconHovered: <StarBorder nativeColor={orange[500]} />,
// 	iconFilled: <Star nativeColor={orange[500]} />,
// 	iconNormal: <StarBorder nativeColor={grey[300]} />
// };

// ReviewForm.propTypes = {
// 	/** Useful to extend the style applied to components. See the repository README for the accepted keys. */
// 	classes: PropTypes.object.isRequired,
// 	/** Disables the rating and gray it out if set to true. */
// 	disabled: PropTypes.bool,
// 	/** This is the icon to be used as an icon in value range. */
// 	iconFilled: PropTypes.node,
// 	/** Overrides filled icon renderer. */
// 	iconFilledRenderer: PropTypes.func,
// 	/** Overrides hovered icon renderer. */
// 	iconHoveredRenderer: PropTypes.func,
// 	/** This is the icon to be used as an hovered icon. */
// 	iconHovered: PropTypes.node,
// 	/** This is the icon to be used as an normal icon. */
// 	iconNormal: PropTypes.node,
// 	/** Overrides normal icon renderer. */
// 	iconNormalRenderer: PropTypes.func,
// 	/** The max value of the rating bar. */
// 	max: PropTypes.number,
// 	/** Fired when a value is clicked. */
// 	onChange: PropTypes.func,
// 	/** Don't allow input if set to true. */
// 	readOnly: PropTypes.bool,
// 	/** The value of the rating bar. */
// 	value: PropTypes.number
// };

// export default withStyles(styles)(ReviewForm);
