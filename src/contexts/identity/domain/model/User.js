// Agregado User (raiz). Regras de perfil; senha só como hash.
const AggregateRoot = require('../../../../shared/domain/AggregateRoot');
const UserRegistered = require('../events/UserRegistered');

class User extends AggregateRoot {
    constructor({ id, username, email, passwordHash, fullName, bio, profilePicture, isAdmin = false, isBlocked = false }) {
        super(id);
        Object.assign(this, { username, email, passwordHash, fullName, bio, profilePicture, isAdmin, isBlocked });
    }
    static register({ username, email, passwordHash, fullName }) {
        const user = new User({ id: null, username, email, passwordHash, fullName });
        user.record(new UserRegistered(user));
        return user;
    }
    updateProfile({ fullName, bio }) {
        if (fullName !== undefined) this.fullName = fullName;
        if (bio !== undefined) this.bio = bio;           // Bio é VO com limite BIO_MAX
    }
    changePicture(picture) { const old = this.profilePicture; this.profilePicture = picture; return old; }
}
module.exports = User;
