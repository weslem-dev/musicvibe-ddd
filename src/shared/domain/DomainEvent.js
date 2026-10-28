// Envelope de evento de domínio (formato inspirado em CloudEvents).
const { randomUUID } = require('crypto');

class DomainEvent {
    constructor(type, aggregateId, payload, version = 1) {
        this.eventId = randomUUID();       // usado pelos consumidores para idempotência
        this.type = type;                  // ex.: 'engagement.track.liked'
        this.aggregateId = aggregateId;
        this.occurredAt = new Date().toISOString();
        this.version = version;
        this.payload = payload;
    }
}
module.exports = DomainEvent;
