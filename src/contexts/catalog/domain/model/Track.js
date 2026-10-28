// Agregado Track (raiz). Invariantes de publicação, posse e edição.
const AggregateRoot = require('../../../../shared/domain/AggregateRoot');
const { ForbiddenError } = require('../../../../shared/domain/errors/DomainError');
const TrackUploaded = require('../events/TrackUploaded');
const TrackUpdated = require('../events/TrackUpdated');
const TrackDeleted = require('../events/TrackDeleted');

class Track extends AggregateRoot {
    constructor({ id, authorId, title, description, audioFile, cover, createdAt }) {
        super(id);
        Object.assign(this, { authorId, title, description, audioFile, cover, createdAt });
    }
    static publish({ authorId, title, description, audioFile, cover }) {
        const track = new Track({ id: null, authorId, title, description, audioFile, cover });
        track.record(new TrackUploaded(track));
        return track;
    }
    isOwnedBy(userId) { return Boolean(userId) && this.authorId === userId; }
    assertOwnedBy(userId) {
        if (!this.isOwnedBy(userId)) throw new ForbiddenError('Você não tem permissão para modificar esta faixa.');
    }
    edit(userId, { title, description, cover }) {
        this.assertOwnedBy(userId);
        const previousCover = this.cover;
        this.title = title; this.description = description || null;
        if (cover) this.cover = cover;
        this.record(new TrackUpdated(this, previousCover));
    }
    remove(userId) {
        this.assertOwnedBy(userId);
        this.record(new TrackDeleted(this));
    }
}
module.exports = Track;
