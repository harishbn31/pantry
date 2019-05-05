import React, { Component } from "react";
import axios from "../config/config";
import CategoryForm from "./CategoriesForm";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";

class NewCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = formData => {
		axios
			.post("/categories", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.props.history.push("/categories");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		let role = "";
		if (localStorage.getItem("token")) {
			const userId = localStorage.getItem("token");
			const decoded = decode(userId);
			role = decoded.user_role[0];
		}

		return (
			<div>
				{role === "user" ? (
					<Redirect to="/404" />
				) : (
					<CategoryForm handleSubmit={this.handleSubmit} />
				)}
			</div>
		);
	}
}

export default NewCategory;
