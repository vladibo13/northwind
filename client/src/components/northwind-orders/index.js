import React from 'react';
import NorthWindOrdersTable from '../northwind-orders-table';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/actions/ordersAction';

class NorthWindOrders extends React.Component {
	async componentDidMount() {
		this.props.getOrders();
	}
	render() {
		const { orders } = this.props.order;

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

const mapDispatchToProps = (dispatch) => {
	return {
		getOrders: () => dispatch(getOrders())
	};
};

const mapStateToProps = (state) => ({ order: state.order });

export default connect(mapStateToProps, mapDispatchToProps)(NorthWindOrders);
