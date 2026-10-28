// Porta de saída: publicação de eventos de domínio (implementada por OutboxEventBus).
/** @interface */
class EventBus {
    /** @param {import('../../domain/DomainEvent')[]} events @param {object} [tx] transação corrente */
    async publish(events, tx) { throw new Error('not implemented'); }
}
module.exports = EventBus;
