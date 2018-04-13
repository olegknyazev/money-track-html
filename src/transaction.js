import { set } from 'immutable';

function confirmed(tx) { return set(tx, 'confirmed', true); }
function isExisting(tx) { return 'id' in tx; }

let transactions = [];
let watchers = [];

function setTransactions(txs) {
  transactions = txs;
  for (let handler of watchers)
    handler(transactions);
}

function initialFetch() {
  fetch("/transaction")
    .then(r => r.json())
    .then(txs => txs.map(confirmed))
    .then(setTransactions);
}

export default {
  watch(handler) {
    watchers.push(handler);
    initialFetch();
  },

  unwatch(handler) {
    watchers.pop(handler);
  },

  put(tx) {
    if (isExisting(tx)) {
      setTransactions(transactions.map(t => t.id == tx.id ? tx : t));
    } else {
      setTransactions(transactions.concat(tx));
      fetch('/transaction/new', {
        method: 'POST',
        body: JSON.stringify(tx),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(r => {
        if (r.ok)
          setTransactions(transactions.map(t => t == tx ? confirmed(t) : t));
        else
          throw new Error('Network response was not ok.');
      });
    }
  }
};
