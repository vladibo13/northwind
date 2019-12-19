import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authAction';

class NorthWindRegister extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			lastName: '',
			firstName: ''
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
		const { registerUser } = this.props;
		const { redirect } = this.props.auth;
		console.log(redirect);
		console.log(this.props);
		try {
			await registerUser(this.state);
			if (redirect) this.props.history.push('/login');
		} catch (e) {}
	};

	render() {
		return (
			<div className="container w-50 mx-auto">
				<h1 className=" text-center my-3">Welcome From NorthWind Register</h1>
				<form>
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							placeholder="Enter First Name"
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							placeholder="Enter Last Name"
							onChange={this.handleChange}
						/>
					</div>
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
		registerUser: (user) => dispatch(registerUser(user))
	};
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, mapDispatchToProps)(NorthWindRegister);
