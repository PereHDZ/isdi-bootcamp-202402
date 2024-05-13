function BackgroundImage ({ item: background }){
    return <div className="select-atribute-article atribute-title full-width">
        <div className="select-atribute-button">
            <img src={`../../../public/gallery/Background_Icons/Background_${background.name}_Icon.png`} className="select-button-icon" />
        </div>

        <h2>{background.name}</h2>
    </div>
}

export default BackgroundImage