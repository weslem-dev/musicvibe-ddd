// Evento de domínio: catalog.track.played
const DomainEvent = require('../../../../shared/domain/DomainEvent');
class TrackPlayed extends DomainEvent {
    constructor(track, extra = {}) { super('catalog.track.played', track.id, { trackId: track.id, authorId: track.authorId, ...extra }); }
}
module.exports = TrackPlayed;
