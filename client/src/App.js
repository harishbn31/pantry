import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Categories from "./components/categories";
import CategoryShow from "./components/CateegoryShow";
import CategoryEdit from "./components/CategoryEdit";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Product from "./components/products/products";
import AddProduct from "./components/products/ProductAdd";
import ProductEdit from "./components/products/ProductEdit";
import ProductShow from "./components/products/ProductShow";
import NewCategory from "./components/CategoryAdd";
import Logout from "./components/users/Logout";
import Home from "./components/Home/Home";
import Notfound from "./components/Home/NotFound";
import Carts from "./components/Cart/Carts";
import MonthlyCarts from "./components/MonthlyCart/MonthlyCart";
import OrderHistory from "./components/Orders/OrdersHistory";
import axios from "./config/config";
import "./App.css";
import Addresses from "./components/Addresses/Addresses";
import AddAddress from "./components/Addresses/AddAddress";
import AddressEdit from "./components/Addresses/AddressEdit";
import ReviewAdd from "./components/Reviews/ReviewAdd";
import SelectAddress from "./components/Addresses/Select";
import Help from "./components/Help/Help";
import decode from "jwt-decode";
import Badge from "@material-ui/core/Badge";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * 0
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role: "",
			search: "",
			admin: false,
			user: false,
			isAuth: false,
			carts: [],
			cart: false,
			cartlength: ""
		};
	}

	handleLogin = () => {
		this.setState(() => ({
			// isAuth: true
		}));
	};
	handleLogout = () => {
		this.setState(() => ({
			// isAuth: false
		}));
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
	searchHandle = e => {};
	render() {
		let login = false;
		let logout = false;

		if (localStorage.getItem("token")) {
			login = true;

			//this.cartHandle();
		} else {
			logout = true;
		}
		// eslint-disable-next-line no-unused-vars
		let role = "";
		if (localStorage.getItem("token")) {
			const userId = localStorage.getItem("token");
			const decoded = decode(userId);
			role = decoded.user_role[0];
		}
		const { classes } = this.props;

		return (
			<BrowserRouter>
				<div>
					<div id="navBar">
						<div id="topHalf">
							<div id="logoWrapper">
								<img
									id="logo"
									src="http://www.userlogos.org/files/logos/szop-gracz/masterani.png"
									width="80px"
									height="5px"
									alt="logo"
								/>{" "}
								<i
									style={{
										fontSize: "1.2rem",
										textShadow: "4px 2px red",
										marginLeft: "3.5rem"
									}}
								>
									redPantry
								</i>
							</div>
							<input
								id="in"
								type="text"
								value={this.state.search}
								placeholder="Search"
								onChange={this.searchHandle}
							/>
							<img
								id="backToSchool"
								src="http://blog.neurogistics.com/wp-content/uploads/2014/08/Back-To-School-Special-Banner.jpg"
								alt="Offer"
							/>
						</div>

						<div id="bottomHalf">
							<div id="sections">
								<div className="section">
									<Link
										className="a"
										style={{ color: "white", textDecoration: "none" }}
										to="/home"
									>
										Home
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/categories"
									>
										Shop by Categories
									</Link>
								</div>
								{/* <div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/deals"
									>
										Today Deal's
									</Link>
								</div> */}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/products"
									>
										Products
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/help"
									>
										Help
									</Link>
								</div>
							</div>
							<div id="accountStuff">
								{logout && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/register"
										>
											Register
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/orders"
									>
										Orders
									</Link>
								</div>
								{logout && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/login"
										>
											Login
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/addresses"
									>
										Your Addresses
									</Link>
								</div>
								{login && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/logout"
										>
											Logout
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/cart"
									>
										<Badge
											className={classes.margin}
											// onClick={this.cartHandle}
											badgeContent={0}
											color="secondary"
											variant="standard"
										>
											<i className="material-icons">add_shopping_cart</i>
										</Badge>
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/monthlycart"
									>
										MonthlyCart
									</Link>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="navigation">
						<Link to="/home">Home</Link>
						<Link to="/categories"> Categories</Link>
						<Link to="/products">Products</Link>
						<Link to="/user/cart">Cart</Link>
						<Link to="/user/register">Register</Link>
						<Link to="/user/login">Login</Link>
						<Link to="/user/logout">Logout</Link>
					</div> */}
					<div style={{ minHeight: "720px", positon: "fixed" }}>
						<Switch>
							<Route path="/categories" component={Categories} exact={true} />
							<Route path="/categories/add" component={NewCategory} exact />
							<Route
								path="/categories/edit/:id"
								component={CategoryEdit}
								exact
							/>
							{/* {role === "admin" &&
							()} */}

							<Route
								path="/categories/:id"
								component={CategoryShow}
								exact={true}
							/>

							<Route path="/products" component={Product} exact={true} />
							<Route path="/products/add" component={AddProduct} exact={true} />
							<Route
								path="/products/:id"
								component={ProductShow}
								exact={true}
							/>
							<Route path="/product/edit/:id" component={ProductEdit} exact />
							<Route path="/user/register" component={Register} exact />
							<Route path="/user/orders" component={OrderHistory} exact />
							<Route
								path="/user/login"
								render={props => {
									return (
										<Login {...props} handleLogin={this.handleLogin} exact />
									);
								}}
							/>
							<Route path="/user/addresses" component={Addresses} exact />
							<Route path="/user/addresses/add" component={AddAddress} exact />
							<Route
								path="/user/addresses/edit/:id"
								component={AddressEdit}
								exact
							/>
							<Route
								path="/user/select/addresses"
								component={SelectAddress}
								exact
							/>
							<Route
								path="/user/logout"
								render={props => {
									return (
										<Logout {...props} handleLogout={this.handleLogout} exact />
									);
								}}
							/>
							<Route path="/user/cart" component={Carts} exact />
							<Route path="/user/monthlycart" component={MonthlyCarts} exact />
							<Route
								path="/products/user/reviews/:id"
								component={ReviewAdd}
								exact
							/>
							<Route path="/help" component={Help} exact />
							<Route path="/home" component={Home} exact />
							<Route path="/" component={Home} exact />
							<Route path="*" component={Notfound} />
						</Switch>
					</div>
					<br />
					<br />

					<div id="navBar">
						<div id="bottomHalf">
							<div id="sections">
								<div className="section">
									© 20018 - 2019, DCT Academy Services Private Ltd. or its
									affiliates. All rights reserved.
								</div>

								<div className="section">
									<Link
										style={{
											color: "white",
											textDecoration: "none",
											float: "left",
											marginLeft: "910px"
										}}
										to="/products"
									>
										Products
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/help"
									>
										Help
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}
App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
