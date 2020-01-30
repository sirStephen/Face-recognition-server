const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0e3cdf75524745a0af9bd357428eba73'
});

const handleApiCall = (request, response) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
    .then(data => {
        response.json(data);
    })
    .catch(err => response.status(400).json('unable to work with api'))
}

const handleImage = (request, response, db) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            return response.json(entries[0])
        })
        .catch(error => {
            response.status(400).json('unable to get entries')
        })
}

module.exports = {
    handleImage,
    handleApiCall
}