import React from "react";
import { NavLink } from "react-router-dom";
const Notfound = ({ location }) => {
	return (
		<div>
			<h5>
				404 Not found for{" "}
				<code style={{ textDecoration: "line-through", color: "red" }}>
					{location.pathname}
				</code>
			</h5>
			<NavLink activeClassName="active" to="/home">
				Redirect to Home
			</NavLink>
		</div>
	);
};
export default Notfound;
