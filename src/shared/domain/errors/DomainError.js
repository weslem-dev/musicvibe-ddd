// Hierarquia de erros de domínio — SEM status HTTP (quem traduz é o adaptador HTTP).
class DomainError extends Error { constructor(message) { super(message); this.name = this.constructor.name; } }
class NotFoundError extends DomainError {}
class ForbiddenError extends DomainError {}
class ConflictError extends DomainError {}
class ValidationError extends DomainError { constructor(message, details = []) { super(message); this.details = details; } }
class InvalidCredentialsError extends DomainError {}
module.exports = { DomainError, NotFoundError, ForbiddenError, ConflictError, ValidationError, InvalidCredentialsError };
