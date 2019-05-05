import React, { Component } from "react";
import axios from "../config/config";
import CategoryForm from "./CategoriesForm";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";
class CategoryEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: {},
			isLoad: false
		};
	}
	componentDidMount() {
		axios
			.get(`categories/${this.props.match.params.id}`)
			.then(response => {
				const category = response.data.category;
				this.setState(() => ({ category: category, isLoad: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleSubmit = formData => {
		axios
			.put(`categories/${this.state.category._id}`, formData)
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
				{this.state.isLoad &&
					(role === "user" ? (
						// this.props.history.push("/user/login")
						<Redirect to="/404" />
					) : (
						<CategoryForm
							name={this.state.category.name}
							handleSubmit={this.handleSubmit}
						/>
					))}
			</div>
		);
	}
}

export default CategoryEdit;
