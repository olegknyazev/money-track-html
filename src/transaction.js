import { Map, fromJS } from 'immutable';

const CLIENT_SIDE_KEYS = ['confirmed', 'id'];

function confirmed(tx) { return tx.set('confirmed', true); }
function unconfirmed(tx) { return tx.set('confirmed', false); }
function serverSide(tx) { return tx.deleteAll(CLIENT_SIDE_KEYS); }

let transactions = [];
let watchers = [];
let lastNewId = 0;

function setTransactions(txs) {
  transactions = txs;
  for (let handler of watchers)
    handler(transactions);
}

function initialFetch() {
  fetch("/transaction")
    .then(r => r.json())
    .then(fromJS)
    .then(txs => txs.map(confirmed))
    .then(setTransactions);
}

function newId() { return --lastNewId; }

export default {
  watch(handler) {
    watchers.push(handler);
    initialFetch();
  },

  unwatch(handler) {
    watchers.pop(handler);
  },

  new(tx) {
    let id = newId();
    tx = unconfirmed(tx).set('id', id);
    setTransactions(transactions.push(tx));
    fetch('/transaction/new', {
        method: 'POST',
        body: JSON.stringify(serverSide(tx).toJSON()),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(r => r.json())
      .then(fromJS)
      .then(tx => transactions.map(t => t.get('id') == id ? confirmed(tx) : t))
      .then(setTransactions);
  }
};
