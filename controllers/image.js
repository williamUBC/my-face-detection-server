const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '5dbbd082d03842c2a08f6ff248b93b25'});

const handleApiCall = (req, res) => {
    //console.log(req.body.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handlerImage = (req, res, db) => {
    const { id } = req.body;     
    
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')    
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entries!'))
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found) {
    //     res.status(404).json('not found');
    // }
}

module.exports = {
    handlerImage: handlerImage,
    handleApiCall: handleApiCall
}