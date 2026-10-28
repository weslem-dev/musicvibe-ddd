// Porta de saída: transação de aplicação (abstrai sequelize.transaction).
/** @interface */
class UnitOfWork { async run(work) { throw new Error('not implemented'); } }
module.exports = UnitOfWork;
