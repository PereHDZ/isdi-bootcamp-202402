function RenderExpertises ({item: character}) {
    if (!!character.expertises){
        const skillsAttributes = Object.keys(character.expertises).filter(key => key !== '_id')

        const skillsString = skillsAttributes.join(', ')

        return <div>    
            <div className='center'>
                <h4>YOUR EXPERTISES</h4>

                <p className='spell-p'>{skillsString}</p>
            </div>
        </div>
    }
}

export default RenderExpertises