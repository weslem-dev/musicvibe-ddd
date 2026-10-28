# MusicVibe — Arquitetura DDD + Hexagonal (Ports & Adapters)

Repositório da **Questão 1** da Avaliação N2 de *Projeto e Arquitetura de Software*
(Prof. Luiz C. Camargo — Católica SC). Aluno: **Weslem Santos**.

Este repositório **não** contém o código-fonte completo do projeto web (Express + Sequelize + Vue).
Ele contém a **organização arquitetural** do MusicVibe reescrita para *Domain-Driven Design*
com arquitetura **Hexagonal**: bounded contexts, camadas, portas, adaptadores e esqueletos
(stubs) das principais classes, para deixar explícito onde cada responsabilidade mora.

## Domínio

O MusicVibe é uma plataforma web de *streaming* e divulgação de música autoral. Artistas
(usuários) enviam faixas (áudio MP3/WAV + capa), editam e excluem suas publicações; ouvintes
navegam pelo feed paginado, abrem o detalhe da faixa, ouvem pelo player, curtem e comentam.
Cada perfil público exibe as faixas do artista e seus contadores (faixas, seguidores).
Administradores gerenciam usuários, gêneros e conteúdo.

## Bounded contexts

| Contexto | Responsabilidade | Agregados / modelos | Tipo |
|---|---|---|---|
| `identity` | Conta, cadastro, login, perfil | `User` (raiz), `Email`, `Username`, `PasswordHash`, `ProfilePicture` | Genérico/suporte |
| `catalog` | Publicação e ciclo de vida das faixas | `Track` (raiz), `TrackTitle`, `AudioFile`, `CoverImage`, `TrackStats` | **Core domain** |
| `engagement` | Interação social com as faixas | `Like` (raiz), `Comment` (raiz), `CommentContent` | **Core domain** |
| `discovery` | Feed e busca (lado de leitura / CQRS) | `FeedItem`, `SearchResult` (read models) | Suporte |
| `shared` | *Shared kernel* + infraestrutura transversal | `Entity`, `AggregateRoot`, `ValueObject`, `DomainEvent`, `EventBus` | Kernel compartilhado |

Mapa de contexto (resumo):

```
identity  --(Customer/Supplier: AuthorId)-->  catalog
catalog   --(Domain events: TrackUploaded/Deleted)--> engagement, discovery
engagement --(Domain events: TrackLiked/Unliked/CommentPosted)--> catalog (TrackStats), discovery
```

Os contextos **não importam modelos uns dos outros**. Referências entre agregados são feitas
**por identidade** (`authorId`, `trackId`) e a comunicação assíncrona é feita por **eventos de
domínio** publicados no `EventBus` (ver Questão 2 — camada de mensageria).

## Camadas (de dentro para fora) em cada contexto

```
contexts/<contexto>/
├── domain/          # Entidades, Value Objects, agregados, eventos e regras. Zero dependência de framework.
│   ├── model/
│   ├── events/
│   ├── errors/
│   └── repositories/  # Interfaces (portas de saída) dos repositórios do agregado
├── application/     # Casos de uso (portas de entrada) — orquestram domínio + portas
│   ├── use-cases/
│   ├── ports/         # Portas de saída que não são repositório (storage, hasher, token...)
│   └── dto/
└── infrastructure/  # Adaptadores (implementações concretas das portas)
    ├── http/          # Adaptador de entrada: rotas Express, controllers, validators
    ├── persistence/   # Adaptador de saída: Sequelize/MySQL (models + repositórios)
    ├── storage/       # Adaptador de saída: disco local (multer/fs)
    └── messaging/     # Adaptador de entrada/saída: consumers e publishers de eventos
```

Regra de dependência: `infrastructure → application → domain`. O domínio nunca conhece
Express, Sequelize, `fs`, JWT ou RabbitMQ. A ligação concreta é feita no
**composition root** (`src/main/container.js`), por injeção de dependência.

## Mapeamento do projeto atual (Aula 10) → nova arquitetura

| Hoje (`musicvibe-api`) | Agora (DDD) |
|---|---|
| `modules/user/userModel.js` | `identity/infrastructure/persistence/UserModel.js` + `identity/domain/model/User.js` |
| `modules/user/userService.js` (registro, login, perfil, fs) | Casos de uso `RegisterUser`, `AuthenticateUser`, `UpdateProfile`, `GetPublicProfile` + portas `PasswordHasher`, `TokenService`, `ProfilePictureStorage` |
| `modules/user/userController.js` | `identity/infrastructure/http/UserController.js` (só HTTP) |
| `config/jwt.js` | `identity/infrastructure/security/JwtTokenService.js` (implementa `TokenService`) |
| `modules/track/trackService.js` | Casos de uso `UploadTrack`, `EditTrack`, `DeleteTrack`, `GetTrackDetails`, `ListMyTracks`, `GetTrackAudio` + `TrackRepository` + `MediaStorage` |
| `modules/track/trackController.js` (`parseRange`, `fs`) | `catalog/infrastructure/http/TrackController.js` + `catalog/infrastructure/http/RangeRequest.js` |
| `middlewares/trackMulter.js`, `profileMulter.js` | `*/infrastructure/storage/*Multer.js` com política de arquivos configurável (`MediaPolicy`) |
| `modules/like/*`, `modules/comment/*` | Contexto `engagement` (agregados `Like` e `Comment`) |
| Contadores `likesCount`, `commentsCount`, `playsCount` em `tracks` | Projeção `TrackStats` atualizada por **eventos** |
| `modules/search/*`, feed em `userController.getFeed` | Contexto `discovery` (consultas / read models) |
| `middlewares/apiResponse.js`, `errorHandler.js`, `asyncHandler.js` | `shared/infrastructure/http/` |
| `config/database.js`, `config/associations.js` | `shared/infrastructure/persistence/` |

## Linguagem ubíqua

Ver [`docs/ubiquitous-language.md`](docs/ubiquitous-language.md).

## Como executar (esqueleto)

```bash
npm install
npm start   # sobe src/main/server.js (composition root)
```

> Os arquivos são *stubs* de arquitetura: mostram a assinatura, a responsabilidade e as
> dependências de cada peça. A implementação completa continua no projeto da disciplina de
> Programação Web.
