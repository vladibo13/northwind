import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetUserPassword } from '../../redux/actions/authAction';
import { registerUserService } from '../../redux/service';

class NorthWindReset extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			newPassword: '',
			newPasswordMatch: ''
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
		const { resetUserPassword } = this.props;
		await resetUserPassword(this.state);
	};

	render() {
		return (
			<div className="container w-50 mx-auto">
				<h1 className=" text-center my-3">Welcome From NorthWind Reset</h1>
				<form>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password "
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter Password"
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="newPassword">New Password</label>
						<input
							type="password"
							className="form-control"
							id="newPassword"
							name="newPassword"
							placeholder="Enter Password"
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="newPasswordMatch">Confirm Password </label>
						<input
							type="password"
							className="form-control"
							id="newPasswordMatch"
							name="newPasswordMatch"
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
		resetUserPassword: (user) => dispatch(resetUserPassword(user))
	};
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, mapDispatchToProps)(NorthWindReset);
