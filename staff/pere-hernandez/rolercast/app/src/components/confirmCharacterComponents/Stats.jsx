import { useStats } from '../../pages/Home'

function Stats () {
    const { stats } = useStats()
    
    return <div className='final-stats-div'>
            {Object.keys(stats).map(stat => {
                return <div key={stat}>
                    <img src={`../../public/gallery/Stats_Icons/${stat}.png`} alt={stat} className='small-stat-icon'/>
                    <span>{stats[stat]}</span>
                </div>
            })}
        </div>
}

export default Stats