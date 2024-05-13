function ReturnButton ({ onReturnClicked }) {
    return <div className="return-div">
        <button className="transparent-button" onClick={onReturnClicked}>
            <img src="../../public/icons/return.png" className="icon"></img>
        </button>
        <h3 className="return">RETURN</h3>
    </div>
}

export default ReturnButton