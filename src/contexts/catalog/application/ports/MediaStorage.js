// Porta de saída: arquivos de mídia (áudio/capa).
/** @interface */
class MediaStorage {
    async remove(kind, filename) {}            // kind: 'audio' | 'cover'
    async stat(kind, filename) {}              // { size, mimeType, path }
    openReadStream(kind, filename, range) {}   // range opcional { start, end }
}
module.exports = MediaStorage;
