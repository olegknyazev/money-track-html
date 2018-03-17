import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Form, FormGroup, Label, Col, Input } from 'reactstrap';

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
          <Form>
            <FormGroup row>
              <Label for="date" sm={labelColumns}>Date</Label>
              <Col sm={contentColumns}>
                <Input type="date" name="date" id="date" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="merchant" sm={labelColumns}>Merchant</Label>
              <Col sm={contentColumns}>
                <Input type="text" name="merchant" id="merchant" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="amount" sm={labelColumns}>Amount</Label>
              <Col sm={contentColumns}>
                <Input type="number" name="amount" id="amount" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="comment" sm={labelColumns}>Commentary</Label>
              <Col sm={contentColumns}>
                <Input type="textarea" name="comment" id="comment" />
              </Col>
            </FormGroup>
          </Form>
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
