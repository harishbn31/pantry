import React, { Component } from "react";
import axios from "../../config/config";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
	root: {
		display: "flex"
	},
	formControl: {
		margin: theme.spacing.unit * 3
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	group: {
		margin: `${theme.spacing.unit}px 0`
	},
	main: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});
class ProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name ? props.name : "",
			nameError: "",
			nError: false,
			description: props.description ? props.description : "",
			descriptionError: "",
			dError: false,
			price: props.price ? props.price : "",
			priceError: "",
			pError: false,
			stock: props.stock ? props.stock : "",
			stockError: "",
			sError: false,
			isCod: props.isCod ? props.isCod : "true",
			category: props.category ? props.category : "",
			categoryError: "",
			cError: false,
			imageUrl: props.imageUrl ? props.imageUrl : null,
			imageError: "",
			iError: false,
			categories: []
		};
	}
	componentDidMount() {
		axios
			.get("/categories")
			.then(response => {
				const categories = response.data;
				this.setState(() => ({ categories: categories }));
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleName = e => {
		e.persist();
		this.setState(() => ({ name: e.target.value }), () => {});
	};
	handleDescription = e => {
		e.persist();
		this.setState(() => ({ description: e.target.value }));
	};
	handlePrice = e => {
		e.persist();
		if (e.target.value > 0) {
			this.setState(() => ({ price: e.target.value }));
		}
	};
	handleStock = e => {
		e.persist();
		if (e.target.value >= 0) {
			this.setState(() => ({ stock: e.target.value }));
		}
	};
	handleIsCod = e => {
		e.persist();

		this.setState(() => ({ isCod: e.target.value }));
	};
	handleCategory = e => {
		e.persist();
		const category = e.target.value;

		this.setState(() => ({ category: category }));
	};
	handleFile = e => {
		e.persist();
		const img = e.target.files[0];
		this.setState(() => ({ imageUrl: img }));
	};
	handleSubmit = e => {
		e.preventDefault();
		//when we send the images with text  req.file has body send it img also text also like this way
		const data = new FormData();
		data.append("name", this.state.name);
		data.append("description", this.state.description);
		data.append("price", this.state.price);
		data.append("stock", this.state.stock);
		data.append("isCod", this.state.isCod);
		data.append("category", this.state.category);
		data.append("imageUrl", this.state.imageUrl);
		if (
			this.state.name.length < 3 &&
			this.state.description.length < 5 &&
			!this.state.price &&
			!this.state.category &&
			!this.state.stock &&
			!this.state.imageUrl
		) {
			this.setState(() => ({
				nameError: "Write > 3 chars",
				nError: true,
				descriptionError: "Write > 5 chars",
				dError: true,
				priceError: "Write Price in number format",
				pError: true,
				categoryError: "Chosse One Category",
				cError: true,
				stockError: "Write Stock in number format",
				sError: true,
				imageError: "Upload Image",
				iError: true
			}));
		} else if (this.state.name.length < 3) {
			this.setState(() => ({
				nameError: "Write Name > 3 chars",
				nError: true
			}));
		} else if (this.state.description.length < 5) {
			this.setState(() => ({
				descriptionError: "Write > 5 chars",
				dError: true,
				nameError: "",
				nError: false
			}));
		} else if (!this.state.price) {
			this.setState(() => ({
				priceError: "Do Price proper format",
				pError: true,
				descriptionError: "",
				dError: false,
				nameError: "",
				nError: false
			}));
		} else if (!this.state.stock) {
			this.setState(() => ({
				stockError: "Do Stock proper format",
				sError: true,
				priceError: " ",
				pError: false,
				descriptionError: "",
				dError: false,
				nameError: "",
				nError: false
			}));
		} else if (this.state.category === "") {
			this.setState(() => ({
				categoryError: "please select one",
				cError: true,
				stockError: "",
				sError: false,
				priceError: " ",
				pError: false,
				descriptionError: "",
				dError: false,
				nameError: "",
				nError: false
			}));
		} else if (this.state.imageUrl === null) {
			this.setState(() => ({
				imageError: "Upload Image",
				iError: true,
				stockError: "",
				sError: false,
				priceError: " ",
				pError: false,
				descriptionError: "",
				dError: false,
				nameError: "",
				nError: false
			}));
		} else {
			this.setState(() => ({
				imageError: "",
				iError: false,
				stockError: "",
				sError: false,
				priceError: " ",
				pError: false,
				descriptionError: "",
				dError: false,
				nameError: "",
				nError: false
			}));
			this.props.handleSubmit(data);
		}
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<SupervisorAccountIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Create a Product
						</Typography>
						<form className={classes.form}>
							{/* <span style={{ color: "red" }}>{this.state.signupError}</span> */}
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="productname">Product Name</InputLabel>
								<Input
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleName}
									placeholder="Write Product Name"
									required
									error={this.state.nError}
								/>
								<span style={{ color: "red" }}>{this.state.nameError}</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="description">
									Product Description
								</InputLabel>
								<Input
									name="description"
									value={this.state.description}
									onChange={this.handleDescription}
									multiline={true}
									required
									placeholder="Write Product Descrition"
									error={this.state.dError}
								/>
								<span style={{ color: "red" }}>
									{this.state.descriptionError}
								</span>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="price">Price</InputLabel>
									<Input
										type="number"
										name="price"
										value={this.state.price}
										onChange={this.handlePrice}
										required
										placeholder="Write Your Price"
										error={this.state.pError}
									/>
									<span style={{ color: "red" }}>{this.state.priceError}</span>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="stock">Stock</InputLabel>
									<Input
										type="number"
										name="stock"
										value={this.state.stock}
										onChange={this.handleStock}
										required
										placeholder="Write Your Stock"
										error={this.state.sError}
									/>
									<span style={{ color: "red" }}>{this.state.stockError}</span>
								</FormControl>
								<br />
								<FormControl>
									<FormLabel component="legend">isCodEligible</FormLabel>
									<RadioGroup
										aria-label="COD"
										name="COD"
										className={classes.group}
										value={this.state.isCod}
										onChange={this.handleIsCod}
										defaultValue={this.state.isCod}
									>
										<FormControlLabel
											value="true"
											control={<Radio />}
											label="True"
										/>
										<FormControlLabel
											value="false"
											control={<Radio />}
											label="False"
										/>
									</RadioGroup>
									<FormHelperText>Default will be a True</FormHelperText>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="category">Select Category</InputLabel>
									<NativeSelect
										native="true"
										onChange={this.handleCategory}
										input={<Input name="category" id="age-native-helper" />}
										error={this.state.cError}
									>
										<option value="" />
										{this.state.categories.map(cate => {
											return (
												<option value={cate._id} key={cate._id}>
													{cate.name}
												</option>
											);
										})}
									</NativeSelect>
									<span style={{ color: "red" }}>
										{this.state.categoryError}
									</span>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="file">Upload Image</InputLabel>
									<Input
										type="file"
										name="imageUrl"
										accept="image/*"
										encType="multipart/form-data"
										value={this.state.file}
										onChange={this.handleFile}
										error={this.state.iError}
									/>
									<span style={{ color: "red" }}>{this.state.imageError}</span>
								</FormControl>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								color="secondary"
								size="small"
								className={classes.submit}
								onClick={this.handleSubmit}
							>
								Create{" "}
								<i className="material-icons" style={{ marginLeft: "4px" }}>
									done_all
								</i>
							</Button>
						</form>
					</Paper>
				</main>
			</div>
		);
	}
}
ProductForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductForm);
