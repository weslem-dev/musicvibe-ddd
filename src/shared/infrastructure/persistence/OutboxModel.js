// Tabela `outbox_events` (Transactional Outbox): evento gravado na MESMA transação do agregado.
// colunas: id (uuid), type, aggregate_id, payload (JSON), occurred_at, published_at (null = pendente), attempts
