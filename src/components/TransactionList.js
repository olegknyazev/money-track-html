import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import TransactionListMenu from './TransactionListMenu';

function TransactionRow({ tx }) {
  return (
    <tr>
      <td>{tx.date}</td>
      <td>{tx.merchant}</td>
      <td>{tx.amount}</td>
    </tr>
  );
}

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {transactions: []};
  }
  componentDidMount() {
    fetch("/transaction").then(r => r.json()).then(ts => this.setTransactions(ts));
  }
  setTransactions(transactions) {
    this.setState({transactions});
  }
  render() {
    return (
      <Container>
        <TransactionListMenu/>
        <Row>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Merchant</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(tx => {
                return <TransactionRow tx={tx}/>
              })}
            </tbody>
          </table>
        </Row>
      </Container>
    );
  }
}

export default TransactionList;
