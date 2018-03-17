import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
    console.log("CHANGE!");
  }
  render() {
    const labelColumns = 3;
    const contentColumns = 12 - labelColumns;
    return (
      <Form onChange={this.onChange}>
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
    );
  }
}

export default TransactionForm;
