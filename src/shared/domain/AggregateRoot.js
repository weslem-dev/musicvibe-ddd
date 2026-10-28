// Raiz de agregado: acumula eventos de domínio que serão publicados após o commit.
const Entity = require('./Entity');

class AggregateRoot extends Entity {
    constructor(id) { super(id); this._events = []; }
    record(event) { this._events.push(event); }
    pullEvents() { const e = this._events; this._events = []; return e; }
}
module.exports = AggregateRoot;
