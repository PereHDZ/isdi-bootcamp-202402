import mongoose from 'mongoose'

import { 
    DarkvisionType,
    FeyAncestryType,
    HumanVersatilityType,
    HighElfCantripType,
    CantripType,
    FleetOfFootType,
    DrowMagicType,
    SavageAttacksType,
    HalflingLuckType,
    BraveType,
    StrongheartResilienceType,
    DwarvenResilienceType,
    DuergarResilienceType,
    DwarvenToughnessType,
    DuergarMagicType,
    GnomeCunningType,
    AdditionalSpellType,
    StoneCamuflageType,
    HellishResistanceType,
    TieflingMagicType,
    AstralKnowledgeType,
    GithyankiPsionicsType,
    DraconicAncestryType,
    AcidBreathType,
    LightningBreathType,
    FireBreathType,
    PoisonBreathType,
    FrostBreathType,

    HumanVersatility,
    FeyAncestry,
    Darkvision,
    SuperiorDarkvision,
    HighElfCantrip,
    Cantrip,
    FleetOfFoot,
    DrowMagic,
    DuergarMagic,
    HalflingLuck,
    Brave,
    StrongheartResilience,
    DuergarResilience,
    DwarvenToughness,
    GnomeCunning,
    AdditionalSpell,
    StoneCamuflage,
    HellishResistance,
    TieflingMagic,
    AstralKnowledge,
    GithyankiPsionics,
    DraconicAncestry,
    AcidBreath,
    LightningBreath,
    FireBreath,
    PoisonBreath,
    FrostBreath,
    DwarvenResilience
} from './index'

const { Schema, model } = mongoose

type FeaturesType = {
    humanVersatility?: HumanVersatilityType,
    feyAncestry?:  FeyAncestryType,
    darkvision?: DarkvisionType,
    superiorDarkvision?: DarkvisionType,
    highElfCantrip?: HighElfCantripType,
    cantrip?: CantripType,
    fleetOfFoot?: FleetOfFootType,
    drowMagic?: DrowMagicType,
    duergarMagic?: DuergarMagicType,
    savageAttacks?: SavageAttacksType,
    halflingLuck?: HalflingLuckType,
    brave?: BraveType,
    strongheartResilience?: StrongheartResilienceType,
    dwarvenResilience?: DwarvenResilienceType,
    duergarResilience?: DuergarResilienceType,
    dwarvenToughness?: DwarvenToughnessType,
    gnomeCunning?: GnomeCunningType,
    additionalSpell?: AdditionalSpellType,
    stoneCamuflage: StoneCamuflageType,
    hellishResistance?: HellishResistanceType,
    tieflingMagic?: TieflingMagicType,
    astralKnowledge?: AstralKnowledgeType,
    githyankiPsionics?: GithyankiPsionicsType,
    draconicAncestry?: DraconicAncestryType,
    acidBreath?: AcidBreathType,
    lightningBreath?: LightningBreathType,
    fireBreath?: FireBreathType,
    poisonBreath?: PoisonBreathType,
    frostBreath?: FrostBreathType,
}

const features = new Schema ({
    humanVersatility: {
        type: HumanVersatility,
        required: false
    },
    feyAncestry: {
        type: FeyAncestry,
        required: false
    },
    darkvision: {
        type: Darkvision,
        required: false
    },
    superiorDarkvision: {
        type: SuperiorDarkvision,
        required: false
    },
    highElfCantrip: {
        type: HighElfCantrip,
        required: false
    },
    cantrip: {
        type: Cantrip,
        required: false
    },
    fleetOfFoot: {
        type: FleetOfFoot,
        required: false
    },
    drowMagic: {
        type: DrowMagic,
        required: false
    },
    duergarMagic: {
        type: DuergarMagic,
        required: false
    },
    savageAttacks: {
        type: HumanVersatility,
        required: false
    },
    halflingLuck: {
        type: HalflingLuck,
        required: false
    },
    brave: {
        type: Brave,
        required: false
    },
    strongheartResilience: {
        type: StrongheartResilience,
        required: false
    },
    dwarvenResilience: {
        type: DwarvenResilience,
        required: false
    },
    duergarResilience: {
        type: DuergarResilience,
        required: false
    },
    dwarvenToughness: {
        type: DwarvenToughness,
        required: false
    },
    gnomeCunning: {
        type: GnomeCunning,
        required: false
    },
    additionalSpell: {
        type: AdditionalSpell,
        required: false
    },
    stoneCamuflage: {
        type: StoneCamuflage,
        required: false
    },
    hellishResistance: {
        type: HellishResistance,
        required: false
    },
    tieflingMagic: {
        type: TieflingMagic,
        required: false
    },
    astralKnowledge: {
        type: AstralKnowledge,
        required: false
    },
    githyankiPsionics: {
        type: GithyankiPsionics,
        required: false
    },
    draconicAncestry: {
        type: DraconicAncestry,
        required: false
    },
    acidBreath: {
        type: AcidBreath,
        required: false
    },
    lightningBreath: {
        type: LightningBreath,
        required: false
    },
    fireBreath: {
        type: FireBreath,
        required: false
    },
    poisonBreath: {
        type: PoisonBreath,
        required: false
    },
    frostBreath: {
        type: FrostBreath,
        required: false
    }
})

const Features = model<FeaturesType>('Features', features)

export { Features, FeaturesType}