function SelectButton ({onSelectClick}) {
    return <div className="select-button-div">
        <button 
            className="select-button" 
            onClick={onSelectClick}>SELECT
        </button>
    </div>
}

export default SelectButton