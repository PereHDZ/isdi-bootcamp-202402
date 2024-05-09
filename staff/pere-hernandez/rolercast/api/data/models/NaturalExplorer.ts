import mongoose from 'mongoose'

import NaturalExplorerType from '../types/NaturalExplorerType'
import naturalExplorer from '../schemas/naturalExplorer.ts'

const { model } = mongoose

const NaturalExplorer = model<NaturalExplorerType>('NaturalExplorer', naturalExplorer)

export default NaturalExplorer