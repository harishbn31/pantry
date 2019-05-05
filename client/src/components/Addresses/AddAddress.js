import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import AddressForm from "./AddressForm";
import Button from "@material-ui/core/Button";
class AddAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aError: ""
		};
	}

	handleSubmit = formData => {
		axios
			.post("/addresses", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				if (response.data.name !== "ValidationError") {
					this.props.history.push("/user/addresses");
				} else {
					this.setState(() => ({
						aError: "Please fill the proper details"
					}));
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<div style={{ marginLeft: "15rem", float: "left" }}>
					<Button variant="text" color="secondary" size="small">
						<Link
							to="/user/addresses"
							style={{
								color: "#F50057",
								textDecoration: "none"
							}}
						>
							<i className="material-icons md-48">arrow_back</i>
						</Link>
					</Button>
				</div>
				<AddressForm handleSubmit={this.handleSubmit} />
				<center>
					<p style={{ color: "red" }}>{this.state.aError}</p>
				</center>
			</div>
		);
	}
}

export default AddAddress;
