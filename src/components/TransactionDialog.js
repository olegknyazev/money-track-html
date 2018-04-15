import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Map } from 'immutable';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

function currentDate() {
  return new Date().toISOString();
}

function emptyTransaction() {
  return Map({
    merchant: '',
    amount: 0,
    datetime: currentDate(),
    comment: ''
  });
}

export default class TransactionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { tx: props.tx || emptyTransaction() };
    this.done = this.done.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.onTransactionChange = this.onTransactionChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return (!prevState || !prevState.tx) ? null : {
      tx: nextProps.tx || emptyTransaction()
    };
  }
  done(result) {
    this.props.done && this.props.done(result);
  }
  cancel() {
    this.done(false);
  }
  delete() {
    this.done({op: 'DELETE', id: this.props.tx.get('id')});
  }
  save() {
    this.done({op: 'UPDATE', tx: this.state.tx});
  }
  onTransactionChange(tx) {
    this.setState({ tx });
  }
  render() {
    const labelColumns = 3;
    const contentColumns = 12 - labelColumns;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.cancel} centered={true} fade={false}>
        <ModalHeader toggle={this.cancel}>{this.props.tx ? 'Edit transaction' : 'New transaction'}</ModalHeader>
        <ModalBody>
          <TransactionForm tx={this.state.tx} onChange={this.onTransactionChange}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.cancel}>Cancel</Button>{' '}
          {this.props.tx && this.props.tx.has('id') &&
            [<Button color="danger" onClick={this.delete}>Delete</Button>, ' ']}
          <Button color="primary" onClick={this.save}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
