const handleProfile = (request, response, db) => {
    const { id } = request.params;
    
    db.select('*').from('users').where('id', id)
        .then(user => {
            if (user.length) {
                return response.json(user[0]);
            } else {
                return response.status(400).json('user not found')
            }
        })
        .catch(error => {
            return response.status(400).json(error)
        })
}

module.exports = {
    handleProfile: handleProfile
}