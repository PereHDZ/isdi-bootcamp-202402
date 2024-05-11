// import { ClassAction, User } from '../data/models'

// import { validate, errors } from 'com'

// const { SystemError, NotFoundError } = errors

// function retrieveClassAction(userId: string, classActionId: string): Promise<{ name: string, description: string }>{
//     //validation
//     validate.text(userId, 'userId', true)
//     validate.text(classActionId, 'classActionId', true)

//     //logic
//     return User.findById(userId)
//         .catch(error => { throw new SystemError(error.message) })
//         .then(user => {
//             if (!user) throw new NotFoundError('user not found')

//             return ClassAction.findById(classActionId).select('name description').lean()
//         })
//         .then(classAction => {
//             if (!classAction) throw new NotFoundError('classAction not found')

//             return { id: classAction._id.toString(), name: classAction.name, description: classAction.description}
//         })
// }

// export default retrieveClassAction