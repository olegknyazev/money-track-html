import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

function coerceTransaction(tx) {
  return tx.set('amount', Number(tx.get('amount')));
}

export default class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    const newTx = coerceTransaction(this.props.tx.set(ev.target.name, ev.target.value));
    this.props.onChange(newTx);
  }
  render() {
    const labelColumns = 3;
    const contentColumns = 12 - labelColumns;
    const tx = this.props.tx;
    return (
      <Form onChange={this.onChange}>
        <FormGroup row>
          <Label for="date" sm={labelColumns}>Date</Label>
          <Col sm={contentColumns}>
            <Input type="datetime" name="date" id="date" value={tx.get('date')} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="merchant" sm={labelColumns}>Merchant</Label>
          <Col sm={contentColumns}>
            <Input type="text" name="merchant" id="merchant" value={tx.get('merchant')} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="amount" sm={labelColumns}>Amount</Label>
          <Col sm={contentColumns}>
            <Input type="number" name="amount" id="amount" value={tx.get('amount')} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="comment" sm={labelColumns}>Commentary</Label>
          <Col sm={contentColumns}>
            <Input type="textarea" name="comment" id="comment" value={tx.get('comment')} />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
