const userModel = require('../models/user.model')

module.exports.createUser = async ({ firstname, lastname, email, password, roles }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required')
    }

    // Validate roles
    const validRoles = ['admin', 'editor', 'viewer']
    // if (roles && roles.some(role => !validRoles.includes(role))) {
    //     throw new Error('Invalid role specified')
    // }

    const user = await userModel.create({
        fullname: { firstname, lastname },
        email,
        password,
        roles: roles || ['viewer']
    })

    return user
}