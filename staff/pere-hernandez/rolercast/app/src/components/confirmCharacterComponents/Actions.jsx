import logic from '../../logic'

import { useState, useEffect } from 'react'

function Actions ({ item: actions }) {
    const [actionsData, setActionsData] = useState([])

    let actionsDiv = <></>

    useEffect(() => {
        const fetchActionsData = () => {
            Promise.all(
                actions.map(actionId => logic.retrieveAction(actionId)
                    .then(objectAction => objectAction))
            ).then(fetchedData => {
                const filteredData = fetchedData.filter(Boolean)
                setActionsData(filteredData)
            }).catch(error => {
                console.error('Error fetching action:', error)
                return null
            })
        }
        fetchActionsData()
    }, [actions])

    if (actionsData.length > 0){
        const actionNames = actionsData.map(action => action.name).join(', ')

        actionsDiv = <div>
            <h4>YOUR ACTIONS</h4>

            <p className='spell-p'>{actionNames}</p>
        </div>
    }

    return actionsDiv
}

export default Actions