function RaceImage ({item: race}) {
    return <div className="select-atribute-article atribute-title full-width">
        <div className="select-atribute-button">
            <img src={`../../../public/gallery/Race_Icons/Race_${race.name}.png`} className="select-button-icon" />
        </div>

        <h2>{race.name}</h2>
    </div>
}

export default RaceImage