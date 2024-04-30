import mongoose from 'mongoose'

import { AstralKnowledgeType } from '../types'
import { astralKnowledge } from '../schemas'

const { model } = mongoose

const AstralKnowledge = model<AstralKnowledgeType>('AstralKnowledge', astralKnowledge)

export default AstralKnowledge