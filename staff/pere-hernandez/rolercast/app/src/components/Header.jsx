function Header({ onLogoutClick }){
    const handleLogoutClick = () => {
        onLogoutClick()
    }

    return <header>
    <button className="transparent-button">
        <img src="../../public/icons/navBar2.png" className="icon"></img>
    </button>

    <div className='header-logo-div'>
        <h1>ROLERCAST</h1>  

        <img src='../../public/gallery/logo.png' className='header-logo'></img>
    </div>

    <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
</header>

}

export default Header