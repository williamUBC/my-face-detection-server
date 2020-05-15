const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    // The following code is used when no connection to the DB, and use an array as database
    // database.users.push(
    //     {
    //         id: '125',
    //         name: name,
    //         email: email,
    //         password: password,
    //         entries: 0,
    //         joined: new Date()
    //     }
    // )
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*') //return all the columns in the table
                    .insert(
                    {
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }
                )
                    .then(response => {
                        res.json(response[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register!'));//The reason not to respond err message is you do not want user to know the configuration info of your database and server.
    // let rtnInfo = database.users[database.users.length-1];
    // rtnInfo['password'] = '';
    // res.json(rtnInfo);
}

module.exports = {
    handleRegister: handleRegister
};