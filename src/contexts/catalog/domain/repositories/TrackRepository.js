// Porta de saída do agregado Track.
/** @interface */
class TrackRepository {
    async findById(id, { lock, tx } = {}) {}
    async findByAuthor(authorId) {}
    async save(track, tx) {}
    async delete(track, tx) {}
}
module.exports = TrackRepository;
