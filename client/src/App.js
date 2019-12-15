import React from 'react';
import NorthWindOrders from './components/northwind-orders';

function App() {
	return (
		<div className="container-fluid">
			<h1 className="text-center my-3 display-4">NorthWind App</h1>
			<NorthWindOrders />
		</div>
	);
}

export default App;
