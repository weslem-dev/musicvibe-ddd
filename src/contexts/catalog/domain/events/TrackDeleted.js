// Evento de domínio: catalog.track.deleted
const DomainEvent = require('../../../../shared/domain/DomainEvent');
class TrackDeleted extends DomainEvent {
    constructor(track, extra = {}) { super('catalog.track.deleted', track.id, { trackId: track.id, authorId: track.authorId, ...extra }); }
}
module.exports = TrackDeleted;
