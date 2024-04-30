import mongoose from 'mongoose'

import { UserType } from '../types'
import { user } from '../schemas/index.ts'

const { model } = mongoose

const User = model<UserType>('User', user)

export default User