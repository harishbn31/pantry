import React, { Component } from "react";
import axios from "../../config/config";
import ReviewForm from "./ReviewForm";
class ReviewAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formError: ""
		};
	}

	handleSubmit = data => {
		const id = this.props.match.params.id;
		const formData = Object.assign(data, { product: id });
		axios
			.post("/reviews", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				if (!response.data.name) {
					this.props.history.push(`/products/${id}`);
				} else {
					this.setState(() => ({ formError: "Please Fill Form Properly" }));
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<center>
					<span style={{ color: "red" }}>{this.state.formError}</span>
				</center>
				<ReviewForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default ReviewAdd;
