import mongoose from 'mongoose'

import { SkillsType } from '../types'
import { skills } from '../schemas/index.ts'

const { model } = mongoose

const Skills = model<SkillsType>('Skills', skills)

export default Skills