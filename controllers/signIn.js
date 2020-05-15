const handlerSignIn = (req, res, db, bcrypt) => {
    // bcrypt.compare("apples", '$2a$10$IrLlAD48umhES1twg1oDme6fuC1FOoPDLo5Qi5vNBvHgU5ZYLhC/i', function(err, res) {
    //     // res = true
    //     console.log('first guess', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$IrLlAD48umhES1twg1oDme6fuC1FOoPDLo5Qi5vNBvHgU5ZYLhC/i', function(err, res) {
    //     // res = false
    //     console.log('second guess', res);
    // });
//     if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
//         //res.json('success');
//         res.json(database.users[0]);
//    }else{
//        res.status(400).json('error logging in');
//    }
    

    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json('incorrect from submission');
    }
    db.select('email','hash').from('login')
        .where('email','=', req.body.email)
        .then(data => {
           const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
           if (isValid){
               db.select('*').from('users')
               .where('email','=',req.body.email)
               .then(user => {
                   res.json(user[0])
               })
               .catch(err => res.status(400).json('unable to get user info'))
           }else{
               res.status(400).json('You have input wrong email address or password, please try again!')
           }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handlerSignIn: handlerSignIn
};