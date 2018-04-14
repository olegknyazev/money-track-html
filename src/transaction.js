import { set, remove } from 'immutable';

function confirmed(tx) { return set(tx, 'confirmed', true); }
function unconfirmed(tx) { return set(tx, 'confirmed', false); }
function serverSide(tx) { return remove(remove(tx, 'confirmed'), 'id'); }

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
    tx.id = id;
    tx = unconfirmed(tx);
    setTransactions(transactions.concat(tx));
    fetch('/transaction/new', {
      method: 'POST',
      body: JSON.stringify(serverSide(tx)),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(r => r.json())
    .then(tx => setTransactions(transactions.map(t => t.id == id ? confirmed(tx) : t)));
  }
};
