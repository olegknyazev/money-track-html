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

function toJSON(tx) { return JSON.stringify(serverSide(tx).toJSON()); }

function fetchTransaction(method, endpoint, tx) {
  return fetch(endpoint, {
    method,
    body: toJSON(tx),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
}

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
    (fetchTransaction('POST', '/transaction/new', tx)
      .then(r => r.json())
      .then(fromJS)
      .then(tx => transactions.map(t => t.get('id') == id ? confirmed(tx) : t))
      .then(setTransactions));
  },

  update(tx) {
    tx = unconfirmed(tx);
    let id = tx.get('id');
    setTransactions(transactions.map(t => t.get('id') == id ? tx : t));
    (fetchTransaction('PUT', `/transaction/${id}`, tx)
      .then(_ => transactions.map(t => t.get('id') == id ? confirmed(t) : t))
      .then(setTransactions));
  }
};
