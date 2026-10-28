# Mapa de contexto

```
            +-------------+        AuthorId (ID apenas)       +-------------+
            |  identity   | --------------------------------> |   catalog   |
            | (supplier)  |                                   | (customer)  |
            +-------------+                                   +-------------+
                   |                                             |    ^
                   | UserRegistered                 TrackUploaded |    | TrackLiked / TrackUnliked /
                   v                                 TrackDeleted v    | CommentPosted (atualiza TrackStats)
            +-------------+                                   +-------------+
            |  discovery  | <-------------------------------- | engagement  |
            | (read side) |      eventos de domínio            |             |
            +-------------+                                   +-------------+

Integração assíncrona: EventBus (RabbitMQ, exchange topic `musicvibe.events`) + Transactional Outbox.
Integração síncrona: somente por identidade (IDs) e portas de consulta (ACL) — nunca import de models.
```
