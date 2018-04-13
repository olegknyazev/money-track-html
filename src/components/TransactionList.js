import React, { Component } from 'react';
import { Container, Table, Row, Col, Button } from 'reactstrap';
import { set } from 'immutable';
import TransactionListMenu from './TransactionListMenu';
import TransactionDialog from './TransactionDialog';
import transaction from '../transaction';

function TransactionRow({ tx, onClick }) {
  return (
    <tr className={tx.confirmed ? null : 'text-muted'}
        onClick={onClick}>
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
    this.state = {
      transactions: [],
      editing: false
    };
    this.addTransaction = this.addTransaction.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
    this.editDialogDone = this.editDialogDone.bind(this);
    this.onTransactionsChange = this.onTransactionsChange.bind(this);
  }
  componentDidMount() {
    transaction.watch(this.onTransactionsChange);
  }
  componentWillUnmount() {
    transaction.unwatch(this.onTransactionsChange);
  }
  onTransactionsChange(txs) {
    this.setState({transactions: txs});
  }
  addTransaction(tx) {
    transaction.put(tx);
  }
  editTransaction(tx) {
    this.setState({ editing: tx });
  }
  editDialogDone(result) {
    this.setState({ editing: false });
    // TODO update this.state.transactions and post modification to the server
  }
  render() {
    return (
      <Container>
        <TransactionListMenu onNewTransaction={this.addTransaction}/>
        <Row>
          <Table hover={true}>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Merchant</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(tx => {
                return <TransactionRow tx={tx} onClick={() => this.editTransaction(tx)}/>
              })}
            </tbody>
          </Table>
        </Row>
        <TransactionDialog
          isOpen={Boolean(this.state.editing)}
          done={this.editDialogDone}
          tx={this.state.editing}/>
      </Container>
    );
  }
}
