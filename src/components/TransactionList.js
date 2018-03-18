import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { set } from 'immutable';
import TransactionListMenu from './TransactionListMenu';

function TransactionRow({ tx }) {
  return (
    <tr className={tx.confirmed ? null : 'unconfirmed'}>
      <td>{tx.date}</td>
      <td>{tx.merchant}</td>
      <td>{tx.amount}</td>
    </tr>
  );
}

function confirmed(tx) {
  return set(tx, 'confirmed', true);
}

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
    this.addTransaction = this.addTransaction.bind(this);
  }
  componentDidMount() {
    fetch("/transaction").then(r => r.json()).then(ts => this.setTransactions(ts));
  }
  setTransactions(txs) {
    this.setState({ transactions: txs.map(confirmed) });
  }
  addTransaction(tx) {
    this.setState({ transactions: this.state.transactions.concat(tx) });
    fetch('/transaction/new', {
      method: 'POST',
      body: JSON.stringify(tx),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(r => {
      if (r.ok)
        this.setState({ transactions: this.state.transactions.map(t => t == tx ? confirmed(t) : t) });
      else
        throw new Error('Network response was not ok.');
    });
    // TODO stop pending fetches on unmount
  }
  render() {
    return (
      <Container>
        <TransactionListMenu onNewTransaction={this.addTransaction}/>
        <Row>
          <table className="table">
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
