import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction';

class NorthWindLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange = (e) => {
		const { target } = e;
		console.log(this.state);
		this.setState({
			[target.name]: target.value
		});
	};
	handleRegister = async () => {
		const { loginUser } = this.props;
		await loginUser(this.state);
	};

	render() {
		return (
			<div className="container w-50 mx-auto">
				<h1 className="display-4 text-center my-3">Welcome From NorthWind Login</h1>
				<form>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email "
							className="form-control"
							id="email"
							name="email"
							placeholder="Enter Email"
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter Password"
							onChange={this.handleChange}
						/>
					</div>

					<button type="button" className="btn btn-lg btn-outline-primary" onClick={this.handleRegister}>
						Login
					</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (user) => dispatch(loginUser(user))
	};
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, mapDispatchToProps)(NorthWindLogin);
