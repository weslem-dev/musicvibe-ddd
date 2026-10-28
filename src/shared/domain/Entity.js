// Entidade base: identidade + igualdade por ID.
class Entity {
    constructor(id) { this.id = id; }
    equals(other) { return other instanceof Entity && other.id === this.id; }
}
module.exports = Entity;
