const handleRegister = (request, response, db, bcrypt) => {
    const { name, email, password } = request.body;
    const hash = bcrypt.hashSync(password, 10);

    if (!email || !name || !password) {
        return response.status(400).json('incorrect form submission');
    }

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    return response.json(user[0])
                })   
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(error => {
            return response.status(400).json('unable to register')
        })
}

module.exports = {
    handleRegister: handleRegister
}