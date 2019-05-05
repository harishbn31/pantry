import React, { Component } from "react";
import AddressForm from "./AddressForm";
import axios from "../../config/config";
class AddressEdit extends Component {
	constructor() {
		super();
		this.state = {
			address: {},
			isLoad: false
		};
	}
	componentDidMount() {
		axios
			.get(`addresses/${this.props.match.params.id}`, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const address = response.data;

				this.setState(() => ({ address: address, isLoad: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleSubmit = formData => {
		axios
			.put(`addresses/${this.props.match.params.id}`, formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.props.history.push("/user/addresses");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				{this.state.isLoad && (
					<AddressForm
						fullname={this.state.address.fullname}
						mobile={this.state.address.mobile}
						city={this.state.address.city}
						street={this.state.address.street}
						landmark={this.state.address.landmark}
						postalCode={this.state.address.postalCode}
						handleSubmit={this.handleSubmit}
					/>
				)}
			</div>
		);
	}
}

export default AddressEdit;
