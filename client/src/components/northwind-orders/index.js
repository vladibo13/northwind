import React from 'react';
import NorthWindOrdersTable from '../northwind-orders-table';
import axios from 'axios';

class NorthWindOrders extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		};
	}
	async componentDidMount() {
		const url = 'http://localhost:5000/northwind/orders';
		const result = await axios.get(url);
		console.log(result);
		this.setState({
			orders: result.data
		});
	}
	render() {
		const { orders } = this.state;

		const headers = getHeaders(orders);
		const data = getTableBody(orders);
		if (orders.length === 0) return <p>No Orders</p>;
		return (
			<div>
				<h1>Hello From NorthWind Orders</h1>
				<NorthWindOrdersTable headers={headers} data={data} />
			</div>
		);
	}
}
function getHeaders(data) {
	if (!data.length) return;
	const [ firstItemInArray ] = data; // const item = data[0]
	console.log(firstItemInArray, 'firstItemInArray');
	return Object.entries(firstItemInArray).map(([ key, value ]) => {
		return <th> {key} </th>;
	});
}

function getTableBody(data) {
	return data.map((dataItem) => {
		return <tr>{getTableRow(dataItem)}</tr>;
	});
}

function getTableRow(row) {
	return Object.entries(row).map(([ key, value ]) => {
		return <td> {value} </td>;
	});
}
export default NorthWindOrders;
