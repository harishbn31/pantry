import React, { Component } from "react";
import axios from "../../config/config";
import ProductNew from "./ProductForm";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";
class ProductEdit extends Component {
	constructor() {
		super();
		this.state = {
			product: {},
			isLoad: false
		};
	}
	componentDidMount() {
		axios
			.get(`products/${this.props.match.params.id}`)
			.then(response => {
				const product = response.data;

				this.setState(() => ({ product: product, isLoad: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleSubmit = data => {
		axios
			.put(`products/${this.props.match.params.id}`, data, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.props.history.push("/products");
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
						<ProductNew
							name={this.state.product.name}
							description={this.state.product.description}
							price={this.state.product.price}
							stock={this.state.product.stock}
							isCod={this.state.product.isCod ? "true" : "false"}
							category={this.state.product.category}
							imageUrl={this.state.product.imageUrl}
							handleSubmit={this.handleSubmit}
						/>
					))}
			</div>
		);
	}
}

export default ProductEdit;
