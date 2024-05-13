function SubclassImage ({ item: characterClass }){
    return <div className="select-atribute-article atribute-title full-width">
    <div className="transparent-button">
        <img src={`../../public/gallery/SubClasses_Icons/Class_${characterClass.name}_Badge_Icon.png`} className="select-button-icon" />
    </div>

    <h2>{characterClass.name}</h2>
</div>
}

export default SubclassImage