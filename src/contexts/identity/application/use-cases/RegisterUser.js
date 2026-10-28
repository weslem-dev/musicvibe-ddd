// Caso de uso RegisterUser (porta de entrada).
const User = require('../../domain/model/User');
const { ConflictError } = require('../../../../shared/domain/errors/DomainError');

class RegisterUser {
    /** Dependências são PORTAS (interfaces), injetadas no composition root. */
    constructor({ userRepository, passwordHasher, unitOfWork, eventBus }) {
        Object.assign(this, { userRepository, passwordHasher, unitOfWork, eventBus });
    }
    async execute({ username, email, password, fullName }) {
        if (await this.userRepository.existsByEmailOrUsername(email, username)) {
            throw new ConflictError('Este e-mail ou usuário já está cadastrado.');
        }
        const passwordHash = await this.passwordHasher.hash(password);
        const user = User.register({ username, email, passwordHash, fullName });
        return this.unitOfWork.run(async (tx) => {
            await this.userRepository.save(user, tx);
            await this.eventBus.publish(user.pullEvents(), tx);
            return { id: user.id, username, email };
        });
    }
}
module.exports = RegisterUser;
