import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
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

class CategoryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name ? props.name : "",
			nameError: "",
			nError: false
		};
	}
	handleName = e => {
		e.persist();
		this.setState(() => ({
			name: e.target.value
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
		const formData = {
			name: this.state.name
		};
		const nameReg = /^[a-zA-Z0-9\s.\-]+$/.test(this.state.name);
		if (!nameReg) {
			this.setState(() => ({
				nameError: "Give Proper Nameing Format",
				nError: true
			}));
		} else {
			this.props.handleSubmit(formData);
			this.setState(() => ({ nameError: "", nError: false }));
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<VerifiedUserIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Name Of Category
						</Typography>

						<form className={classes.form}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Name Of Category</InputLabel>
								<Input
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleName}
									placeholder="Your Category"
									required
									error={this.state.nError}
								/>
								<span style={{ color: "red" }}>{this.state.nameError}</span>
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
								Submit
							</Button>
						</form>
					</Paper>
				</main>

				<div style={{ marginLeft: "15rem", float: "left" }}>
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
			</div>
		);
	}
}

CategoryForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryForm);
