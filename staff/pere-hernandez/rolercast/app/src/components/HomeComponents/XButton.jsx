function XButton ({onXClicked}) {
    return <button 
    className='transparent-button end' 
    onClick={onXClicked}>
        <img 
            src={`../../public/icons/IconoirXmark.png`} className='x-button'>
        </img>
    </button>
}

export default XButton