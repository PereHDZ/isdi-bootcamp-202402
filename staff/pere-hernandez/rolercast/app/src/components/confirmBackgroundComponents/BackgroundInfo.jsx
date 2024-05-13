function BackgroundInfo ({ item: background }){
    const getSkills = () => {
        let skills = []

        for (const skill in background.skills){
            if (skill !== '_id')
                skills.push(skill)
        }

        const p = skills.join(', ')

        return <p><strong>Gains proficiency in: </strong>{p}</p>
    }

    return <div className='display-info-div'>
        <p className='display-info-p'>{background.description}</p>

        { getSkills()}
    </div>
}

export default BackgroundInfo