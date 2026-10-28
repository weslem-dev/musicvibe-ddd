// Evento de domínio: catalog.track.updated
const DomainEvent = require('../../../../shared/domain/DomainEvent');
class TrackUpdated extends DomainEvent {
    constructor(track, extra = {}) { super('catalog.track.updated', track.id, { trackId: track.id, authorId: track.authorId, ...extra }); }
}
module.exports = TrackUpdated;
