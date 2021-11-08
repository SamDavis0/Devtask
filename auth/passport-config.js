
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');


// passport.use(new LocalStrategy({}, ()=>{
//     try{

//     }
//     catch(err){

//     }
// }))

const init = (passport) => {
    //passport logic here
    // req => passport => protected pages => res.isAuthenticated()
    // don ~= next
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done)=>{

        try{
            console.log(`inside of passport.use ${email} ${password}`);
            // take form data and validate user

            let records = await db.users.findAll({where: {email:email}}); //[{}]

            if(records){
                // a user was found in the database records[0] 
                let record = records[0] 

                //check passwords 

                bcrypt.compare(password, record.password, (err, match)=>{

                    if(match){
                        console.log('passwords matched');
                        return done(null, record)
                    }
                    else{
                        //no match 

                        console.log(`passwords didn't match`);
                        return done(null, false)
                    }
                })
            }
            else{
                // no user in our database 
                return done(null, false)
            }
        }
        catch(err){
            return done(err)
        }
        
    }))   
    
    //add the user info to session
    //user is the record passed from successful login (local strategy)
    passport.serializeUser((user, done)=>{

        console.log(`serializing user`);
        done(null, user.id)//second argument is what we want on the session
    })

    //check if user is valid
    //grabbing session data from user cookie, 
    //decoding cookie with secret key
    //getting data on there, called id
    passport.deserializeUser(async (id, done)=>{

        let foundUserInDBFromSessionData = await db.users.findByPk(id); 

        if(foundUserInDBFromSessionData){
            done(null, foundUserInDBFromSessionData)
        }
        else{
            done(null, false)
        }
    })
}

module.exports = init;