// Composition root: instancia adaptadores e injeta nas portas dos casos de uso (DIP).
// Exemplo de ligação (wiring) — único lugar que conhece as classes concretas.
// const userRepository = new SequelizeUserRepository(UserModel);
// const passwordHasher = new BcryptPasswordHasher(10);
// const unitOfWork     = new SequelizeUnitOfWork(sequelize);
// const eventBus       = new OutboxEventBus(OutboxModel);
// const registerUser   = new RegisterUser({ userRepository, passwordHasher, unitOfWork, eventBus });
module.exports = {};
