import React, { Component } from 'react';
import { Container, Table, Row, Col, Button } from 'reactstrap';
import TransactionListMenu from './TransactionListMenu';
import TransactionDialog from './TransactionDialog';
import transaction from '../transaction';

function TransactionRow({ tx, onClick }) {
  return (
    <tr className={tx.get('confirmed', false) ? null : 'text-muted'}
        onClick={onClick}>
      <td>{tx.get('datetime')}</td>
      <td>{tx.get('merchant')}</td>
      <td>{tx.get('amount')}</td>
    </tr>
  );
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
    transaction.new(tx);
  }
  editTransaction(tx) {
    this.setState({ editing: tx });
  }
  editDialogDone(result) {
    if (result)
      switch (result.op) {
        case 'DELETE':
          transaction.delete(result.id);
          break;
        case 'UPDATE':
          transaction.update(result.tx);
          break
      }
    this.setState({ editing: false });
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
