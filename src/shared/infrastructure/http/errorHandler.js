// Adaptador HTTP: traduz DomainError -> status HTTP (mapa extensível, OCP).
const { NotFoundError, ForbiddenError, ConflictError, ValidationError, InvalidCredentialsError } = require('../../domain/errors/DomainError');

const STATUS_BY_ERROR = new Map([
    [ValidationError, 400], [InvalidCredentialsError, 401], [ForbiddenError, 403],
    [NotFoundError, 404], [ConflictError, 409]
]);

function statusFor(err) {
    for (const [Type, status] of STATUS_BY_ERROR) if (err instanceof Type) return status;
    return err.status || 500;
}
module.exports = { statusFor, STATUS_BY_ERROR };
