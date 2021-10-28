const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const User = require("../models/User");

//En vez de usar cookies para determinar si el usuario que navega por las distintas pestañas es válido y existe...
//Serializamos datos y deserializamos los mismos mediante passport.
passport.serializeUser((user, done) => {
    done(null, user.id);
}) //Esto se ejecuta una vez que tenga el usuario, cada pestaña nueva a la que se diriga, obtenemos el id del usuario.

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id); //Compara en la DB que el user.id coincida con uno válido y existente en la misma.
    done(null, user);
})

//Registro del usuario
passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) =>{
    const user = await User.findOne({email: email}) //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
    if (user){
        return done(null, false, req.flash("signupMessage","El email ya ha sido registrado") )//Null: No ha ocurrido un error; False: No te voy a crear un usuario debido a que ya hay uno registrado con ese mail. Vamos a tirar un mensaje con connect-flash
    }
    else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save(); //Guarda el usuario en la DB
        done(null, newUser)//Null para el error, el segundo parametro es el usuario
    }
}));

//Inicio de sesion
passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) =>{
    try {
    const user = await User.findOne({email: email}) //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
    if (!user){
        return done(null, false, req.flash("signinMessage","El usuario no existe") )//Null: No ha ocurrido un error; False: No te voy a crear un usuario debido a que ya hay uno registrado con ese mail. Vamos a tirar un mensaje con connect-flash
    }
    if (!user.comparePassword(password)){
        return done(null, false, req.flash("signinMessage","Contraseña incorrecta"))
    }
    done(null, user);
    }
    catch(error){
        console.log(error)
    }
}));