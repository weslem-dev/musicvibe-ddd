// Value Object: imutável, igualdade por valor.
class ValueObject {
    constructor(props) { this.props = Object.freeze({ ...props }); }
    equals(other) { return JSON.stringify(this.props) === JSON.stringify(other?.props); }
}
module.exports = ValueObject;
