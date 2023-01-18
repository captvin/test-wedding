const { Ability, AbilityBuilder } = require('@casl/ability')
const { guestbook, user } = require('@models')

const abilities = (id, role) => {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'admin':
            can('manage', [guestbook, user])
            break;
        default:
            break;
    }

    return build()
}

module.exports = abilities