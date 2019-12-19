import React from 'react';
import NorthWindOrders from './components/northwind-orders';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import NorthWindLogin from './components/northwind-login';
import NorthWindRegister from './components/northwind-register';
import NorthWindReset from './components/northwind-reset';

function App() {
	return (
		<div className="container-fluid">
			<h1 className="text-center my-3 display-4">NorthWind App</h1>
			<BrowserRouter>
				<Switch>
					<Route exact path="/northwind" component={NorthWindOrders} />
					<Route exact path="/login" component={NorthWindLogin} />
					<Route exact path="/register" component={NorthWindRegister} />
					<Route exact path="/reset" component={NorthWindReset} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
