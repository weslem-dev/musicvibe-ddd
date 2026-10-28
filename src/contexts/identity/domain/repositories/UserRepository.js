// Porta de saída (repositório do agregado User).
/** @interface */
class UserRepository {
    async findById(id) {}
    async findByEmail(email) {}
    async findByUsername(username) {}
    async existsByEmailOrUsername(email, username) {}
    async save(user, tx) {}
}
module.exports = UserRepository;
