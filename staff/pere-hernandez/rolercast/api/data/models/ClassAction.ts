import mongoose from 'mongoose'

import ClassActionType from '../types/ClassActionType'
import classAction from '../schemas/classAction.ts'

const { model } = mongoose

const ClassAction = model<ClassActionType>('ClassAction', classAction)

export default ClassAction