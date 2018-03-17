import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

function currentDate() {
  return new Date().toISOString().slice(0, 10);
}

function emptyTransaction() {
  return {
    merchant: '',
    amount: 0,
    date: currentDate(),
    comment: ''
  };
}

class NewTransactionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { tx: emptyTransaction() };
    this.done = this.done.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.onTransactionChange = this.onTransactionChange.bind(this);
  }
  done(result) {
    this.props.done && this.props.done(result);
  }
  cancel() {
    this.done(false);
  }
  save() {
    this.done(this.state.tx);
  }
  onTransactionChange(tx) {
    this.setState({ tx });
  }
  render() {
    const labelColumns = 3;
    const contentColumns = 12 - labelColumns;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.cancel} centered={true} fade={false}>
        <ModalHeader toggle={this.cancel}>New transaction</ModalHeader>
        <ModalBody>
          <TransactionForm tx={this.state.tx} onChange={this.onTransactionChange}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.cancel}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.save}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewTransactionDialog;
