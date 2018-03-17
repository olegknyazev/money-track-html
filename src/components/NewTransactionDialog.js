import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

class NewTransactionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { tx: {} };
    this.done = this.done.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
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
  render() {
    const labelColumns = 3;
    const contentColumns = 12 - labelColumns;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.cancel} centered={true} fade={false}>
        <ModalHeader toggle={this.cancel}>New transaction</ModalHeader>
        <ModalBody>
          <TransactionForm/>
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
