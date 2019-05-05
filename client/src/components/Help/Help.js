import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

const ExpansionPanel = withStyles({
	root: {
		border: "1px solid rgba(0,0,0,.125)",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		}
	},
	expanded: {
		margin: "25px"
	}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
	root: {
		backgroundColor: "rgba(0,0,0,.03)",
		borderBottom: "1px solid rgba(0,0,0,.125)",
		marginBottom: 10,
		minHeight: 56,
		"&$expanded": {
			minHeight: 56
		}
	},
	content: {
		"&$expanded": {
			margin: "12px 0"
		}
	},
	expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing.unit * 2
	}
}))(MuiExpansionPanelDetails);

class Help extends React.Component {
	state = {
		expanded: "panel1"
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false
		});
	};

	render() {
		const { expanded } = this.state;
		return (
			<div>
				<ExpansionPanel
					square
					expanded={expanded === "panel1"}
					onChange={this.handleChange("panel1")}
				>
					<ExpansionPanelSummary>
						<Typography>Ordering Restrictions #1</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Due to certain regulatory and operational restrictions, we are
							unable to offer certain payment methods. As a result, customers
							from these states will be able to place orders only up to a
							certain value
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					square
					expanded={expanded === "panel2"}
					onChange={this.handleChange("panel2")}
				>
					<ExpansionPanelSummary>
						<Typography>
							Standard Shipping Speeds and Delivery Charges #2
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Standard Shipping Speeds and Delivery charges for Fulfilled by
							(company name) eligible items vary by the shipping address
							entered. Seller fulfilled items are dispatched directly by
							sellers. These items are indicated by the message "Sold and
							dispatched by (seller name)".
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					square
					expanded={expanded === "panel3"}
					onChange={this.handleChange("panel3")}
				>
					<ExpansionPanelSummary>
						<Typography>Connect with Us #3</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							We can help with your orders and your payments orther releted
							topics please contact dct@dct.com
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default Help;
