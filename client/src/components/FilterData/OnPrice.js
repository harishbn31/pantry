import React, { Component } from "react";
import axios from "../../config/config";

class OnPrice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p500: 500,
			p1000:1000,
			p2000:2000,
			products: []
		};
	}
	componentDidMount() {
		axios.get("/products").then(response => {
			const products = response.data;
			this.setState(() => ({ products: products }));
		});
	}
	handleChange=(e)=>{
const value=e.target.value

	}
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default OnPrice;
