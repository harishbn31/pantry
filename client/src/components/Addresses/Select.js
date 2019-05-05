import React, { Component } from "react";
import Addresses from "./Addresses";
import axios from "../../config/config";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { Redirect } from "react-router-dom";
// import Typography from "@material-ui/core/Typography";

const styles = theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap"
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	grid: {
		width: "60%"
	}
});

class SelectAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false,
			open: false,
			address: "",
			success: false
		};
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

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
	placeOrder = () => {
		const data = {
			lineItems: []
		};
		this.state.carts.forEach(cart => {
			data.lineItems.push({
				product: cart.product._id,
				quantity: cart.quantity,
				price: cart.product.price
			});
		});
		axios
			.post("/orders", data, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const confirm = window.confirm(
					"thank u for purchage our product, we happy to see you again"
				);
				if (confirm) {
					this.setState(() => ({ success: true }));
					this.props.history.push("/user/orders");
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div
					//className={classes.root}
					style={{
						float: "right",
						marginRight: "15px",
						marginBottom: "55px"
					}}
				>
					<FormControl className={classes.formControl}>
						<NativeSelect
							className={classes.selectEmpty}
							value={this.state.address}
							name="address"
							onChange={this.handleChange("address")}
						>
							<option value="" disabled>
								Select
							</option>
							<option value={1}>#1</option>
							<option value={2}>#2</option>
						</NativeSelect>
						<FormHelperText>Select Address</FormHelperText>
					</FormControl>

					<Button
						style={{
							float: "right",
							marginRight: "15px",
							marginTop: "20px"
						}}
						color="secondary"
						variant="outlined"
						onClick={this.placeOrder}
					>
						Place the Order
					</Button>
					<Addresses />

					{/* <Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Are you sure for purchasing this products every monthly. please
								enter your email address and pickup date here. We will send
								updates occasionally. please Subscribe to agree terms and
								conditions
							</DialogContentText>
							
						</DialogContent>

						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleClose} color="primary">
								Subscribe
							</Button>
						</DialogActions>
					</Dialog> */}
				</div>
			</div>
		);
	}
}

SelectAddress.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectAddress);
