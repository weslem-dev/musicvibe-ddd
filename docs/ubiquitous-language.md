# Linguagem ubíqua — MusicVibe

| Termo | Significado no domínio | Onde vive |
|---|---|---|
| **Artista / Autor** | Usuário que publicou uma faixa. No catálogo é referenciado só por `AuthorId`. | identity / catalog |
| **Ouvinte** | Qualquer pessoa (com ou sem login) que acessa faixas. | todos |
| **Visitante** | Ouvinte sem login: pode ouvir e ver, não pode curtir/comentar. | identity |
| **Faixa (Track)** | Obra musical publicada: título, descrição, áudio e capa. Raiz de agregado. | catalog |
| **Publicar faixa** | Enviar áudio + capa + título; gera `TrackUploaded`. | catalog |
| **Dono da faixa** | Autor da faixa; único que pode editar/excluir (`isOwner`). | catalog |
| **Reprodução (Play)** | Abertura/execução de uma faixa; gera `TrackPlayed`. | catalog |
| **Estatísticas da faixa** | Contadores de reproduções, curtidas e comentários (`TrackStats`). Projeção. | catalog |
| **Curtida (Like)** | Marca única de um usuário numa faixa (no máximo uma por par usuário/faixa). | engagement |
| **Comentário** | Texto de até 500 caracteres de um usuário numa faixa. | engagement |
| **Feed** | Lista paginada das faixas mais recentes. | discovery |
| **Perfil público** | Página do artista com suas faixas e contadores. | identity / discovery |
| **Evento de domínio** | Fato passado e imutável (ex.: `TrackLiked`) publicado no barramento. | shared |
