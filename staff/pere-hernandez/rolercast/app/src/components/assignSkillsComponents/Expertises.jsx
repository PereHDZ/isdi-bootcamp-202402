function Expertises ({ item: inheritedExpertises }) {
    if (inheritedExpertises.length > 0){
        const weaponsString = inheritedExpertises.join(', ')

        return <div>
            <p><strong>Expertises inherited from race or class: </strong>{weaponsString}</p>
        </div>
    } else {
        return <></>
    }
}

export default Expertises