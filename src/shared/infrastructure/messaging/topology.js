// Declaração da topologia do broker (exchanges, filas, bindings, DLX).
module.exports = {
    exchange: { name: 'musicvibe.events', type: 'topic', durable: true },
    deadLetterExchange: 'musicvibe.events.dlx',
    queues: {
        'catalog.track-stats':       ['engagement.track.liked', 'engagement.track.unliked', 'engagement.comment.posted', 'catalog.track.played'],
        'notification.artist-inbox': ['engagement.track.liked', 'engagement.comment.posted'],
        'media.processing':          ['catalog.track.uploaded'],
        'discovery.feed-projection': ['catalog.track.uploaded', 'catalog.track.updated', 'catalog.track.deleted'],
        'engagement.cleanup':        ['catalog.track.deleted']
    }
};
