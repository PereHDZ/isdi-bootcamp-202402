import logic from '../../logic'

import { useEffect, useState } from "react"

function RenderActions ({ item: character }) {
    const [actionsData, setActionsData] = useState([])

    useEffect(() => {
        if (!!character.actions){
            const fetchedActionsData = () => {
                Promise.all(
                    character.actions.map(actionId => logic.retrieveAction(actionId)
                        .then(objectAction => objectAction))
                ).then(fetchedData => {
                    const filteredData = fetchedData.filter(Boolean)
                    setActionsData(filteredData)
                }).catch(error => {
                    console.error('Error fetching action: ', error)
                    return null
                })
            }
            fetchedActionsData()
        }
    }, [])

    let actionsDiv = <></>

    if (actionsData.length > 0){
        const actionNames = actionsData.map(action => action.name).join(', ')

        actionsDiv = <div className='center'>
            <h4>YOUR ACTIONS</h4>

            <p className='spell-p'>{actionNames}</p>
        </div>
    }

    return actionsDiv
}

export default RenderActions