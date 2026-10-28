// Política declarativa de mídia — novo tipo de arquivo = nova entrada, sem alterar o multer (OCP).
module.exports = {
    audioFile: { dir: 'public/uploads/tracks', mimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/wave'], extensions: ['.mp3', '.wav'], maxBytes: 20 * 1024 * 1024 },
    cover:     { dir: 'public/uploads/covers', mimeTypes: ['image/jpeg', 'image/png', 'image/webp'], extensions: ['.jpg', '.jpeg', '.png', '.webp'], maxBytes: 5 * 1024 * 1024 }
};
