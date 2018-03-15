import React, { Component } from 'react';

class App extends Component {
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
      <div className="container">
        <h1>Transactions</h1>
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
              return <tr>
                <td>{tx.date}</td>
                <td>{tx.merchant}</td>
                <td>{tx.amount}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
