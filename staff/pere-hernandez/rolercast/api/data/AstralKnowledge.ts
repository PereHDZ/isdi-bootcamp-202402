import mongoose from 'mongoose'

const { Schema, model } = mongoose

type AstralKnowledgeType = {
    name: string,
    bonusesDescription: [string]
}

const astralKnowledge = new Schema ({
    name: {
        type: String,
        requierd: true
    },
    bonusesDescription: {
        type: [String],
        required: true
    }
})

const AstralKnowledge = model<AstralKnowledgeType>('AstralKnowledge', astralKnowledge)

export { AstralKnowledgeType, AstralKnowledge }