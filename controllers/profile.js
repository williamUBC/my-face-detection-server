const handleProfileGet = (req, res, db) => {
    const { id } = req.params; // req.params is an object
    //let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    db.select('*').from('users').where({id: id})
        .then(user => {
            if (user.length){
                res.json(user[0]);
            }else{
                res.status(400).json('Not found!');//Found nothing is not an error, it still send an empty array back to the front end
            }
        })
        .catch(err => res.status(400).json('Error getting an user!'))
    // if(!found) {
    //     res.status(404).json('not found');
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}
