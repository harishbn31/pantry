import React, { Component } from "react";
// import axios from "../../config/config";
class Quantity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: props.defaultValue ? props.defaultValue : ""
		};
	}

	handleQuantity = e => {
		e.persist();

		this.setState(
			() => ({ quantity: e.target.value })
			// () => {
			// 	this.props.handleSubmit();
			// }
		);
	};
	handleSubmit = e => {
		e.preventDefault();
		const id = this.props.id;
		const data = {
			quantity: this.state.quantity
		};
		this.props.handleSubmit(data, id);
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						<input
							type="number"
							name="quantity"
							id={this.props.id}
							defaultValue={this.props.defaultValue}
							min="1"
							max="50"
							onChange={this.handleQuantity}
							style={{ float: "right" }}
						/>
					</label>
				</form>
			</div>
		);
	}
}

export default Quantity;
