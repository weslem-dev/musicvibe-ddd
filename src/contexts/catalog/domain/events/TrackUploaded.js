// Evento de domínio: catalog.track.uploaded
const DomainEvent = require('../../../../shared/domain/DomainEvent');
class TrackUploaded extends DomainEvent {
    constructor(track, extra = {}) { super('catalog.track.uploaded', track.id, { trackId: track.id, authorId: track.authorId, ...extra }); }
}
module.exports = TrackUploaded;
