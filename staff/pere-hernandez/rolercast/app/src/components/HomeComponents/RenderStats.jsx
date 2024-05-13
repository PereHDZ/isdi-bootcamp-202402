function RenderStats ({item: character}) {
    return <div className='character-stats-div'>
        {Object.keys(character.stats).map(stat => {
            if (stat !== '_id'){
                return <div key={stat} className='center'>
                    <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={stat} className='small-stat-icon'/>
                    <span>{character.stats[stat]}</span>
                </div>
            }                
        })}
    </div>
}

export default RenderStats