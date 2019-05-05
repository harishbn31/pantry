import React, { Component } from "react";
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
class AddressForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullname: props.fullname ? props.fullname : "",
			fullnameError: "",
			fError: false,
			mobile: props.mobile ? props.mobile : "",
			mobileError: "",
			mError: false,
			city: props.city ? props.city : "",
			cityError: "",
			cError: false,
			street: props.street ? props.street : "",
			streetError: "",
			sError: false,
			landmark: props.landmark ? props.landmark : "",
			landmarkError: "",
			lError: false,
			postalCode: props.postalCode ? props.postalCode : "",
			postalCodeError: "",
			pError: false
		};
	}
	handleChange = e => {
		e.persist();
		this.setState(() => ({
			[e.target.name]: e.target.value
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
		const formData = {
			fullname: this.state.fullname,
			mobile: this.state.mobile,
			city: this.state.city,
			street: this.state.street,
			landmark: this.state.landmark,
			postalCode: this.state.postalCode
		};
		const mobileReg = /^(?:(?:\+|0{0,2})91(\s*[ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(
			this.state.mobile
		);
		const postalcodeReg = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(
			this.state.postalCode
		);
		const fullnameReg = /^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/.test(
			this.state.fullname
		);
		if (
			!fullnameReg &&
			!mobileReg &&
			!this.state.city &&
			!this.state.street &&
			!this.state.landmark &&
			!postalcodeReg
		) {
			this.setState(() => ({
				fullnameError: "write your proper full name",
				fError: true,
				mobileError: "write your valid phone number",
				mError: true,
				cityError: "write your city name",
				cError: true,
				streetError: "write your street",
				sError: true,
				landmarkError: "write your landmark to identify your location",
				lError: true,
				postalCodeError: "write your valid ZIP(IN) Code",
				pError: true
			}));
		} else if (!fullnameReg || this.state.fullname.length < 3) {
			this.setState(() => ({
				fullnameError: "write your proper full name",
				fError: true
			}));
		} else if (!mobileReg) {
			this.setState(() => ({
				mobileError: "write your valid phone number",
				mError: true,
				fullnameError: "",
				fError: false
			}));
		} else if (!this.state.city) {
			this.setState(() => ({
				cityError: "write city name",
				cError: true,
				mobileError: "",
				mError: false,
				fullnameError: "",
				fError: false
			}));
		} else if (!this.state.street) {
			this.setState(() => ({
				streetError: "write your street",
				sError: true,
				cityError: "",
				cError: false,
				mobileError: "",
				mError: false,
				fullnameError: "",
				fError: false
			}));
		} else if (!this.state.landmark) {
			this.setState(() => ({
				landmarkError: "write your landmark to identify your location",
				lError: true,
				streetError: "",
				sError: false,
				cityError: "",
				cError: false,
				mobileError: "",
				mError: false,
				fullnameError: "",
				fError: false
			}));
		} else if (!this.state.landmark) {
			this.setState(() => ({
				postalCodeError: "write your valid ZIP(IN) Code",
				pError: true,
				landmarkError: "",
				lError: false,
				streetError: "",
				sError: false,
				cityError: "",
				cError: false,
				mobileError: "",
				mError: false,
				fullnameError: "",
				fError: false
			}));
		} else {
			this.props.handleSubmit(formData);
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
							<AccountCircleIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Create a Address
						</Typography>

						<form className={classes.form}>
							{/* <span style={{ color: "red" }}>{this.state.signupError}</span> */}
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="FullName">Full Name</InputLabel>
								<Input
									type="text"
									name="fullname"
									value={this.state.fullname}
									onChange={this.handleChange}
									size="35"
									placeholder="Write Your FullName"
									required
									error={this.state.fError}
								/>
								<span style={{ color: "red" }}>{this.state.fullnameError}</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="Mobile">Mobile</InputLabel>
								<Input
									type="text"
									name="mobile"
									value={this.state.mobile}
									onChange={this.handleChange}
									required
									placeholder="Write Your Valid Mobile"
									error={this.state.mError}
								/>
								<span style={{ color: "red" }}>{this.state.mobileError}</span>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="city">City</InputLabel>
									<Input
										type="text"
										name="city"
										value={this.state.city}
										onChange={this.handleChange}
										required
										placeholder="Write Your City"
										error={this.state.cError}
									/>
									<span style={{ color: "red" }}>{this.state.cityError}</span>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="street">
										Home/Work Door no/Street
									</InputLabel>
									<Input
										type="text"
										name="street"
										value={this.state.street}
										onChange={this.handleChange}
										multiline={true}
										required
										placeholder="Write Your Street"
										error={this.state.sError}
									/>
									<span style={{ color: "red" }}>{this.state.streetError}</span>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="landmark">Landmark</InputLabel>
									<Input
										type="text"
										name="landmark"
										value={this.state.landmark}
										onChange={this.handleChange}
										required
										placeholder="Write Your Landmark"
										error={this.state.lError}
									/>
									<span style={{ color: "red" }}>
										{this.state.landmarkError}
									</span>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="postalcode">Postal Code</InputLabel>
									<Input
										type="text"
										name="postalCode"
										value={this.state.postalCode}
										onChange={this.handleChange}
										required
										placeholder="Write Your Postal Code"
										error={this.state.pError}
									/>
									<span style={{ color: "red" }}>
										{this.state.postalCodeError}
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
								Create
							</Button>
						</form>
					</Paper>
				</main>
			</div>
		);
	}
}
AddressForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddressForm);
