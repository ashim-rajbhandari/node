const AuthService = require('../../../services/api/auth/authService')

class AuthController {
    constructor() {
        this.service = new AuthService(),
        this.register = this.register.bind(this),
        this.login = this.login.bind(this),
        this.logout = this.logout.bind(this)
    }

    async register (req , res) {
        try{
            await this.service.register(req.body)

           return res.status(200).json({ data: "Successfully registered" });
        }catch(err) {
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }

    async login (req , res) {
        try{
            let data = await this.service.login(req.body)
           
           return res.status(200).json({ data: data });
        }catch(err) {
            console.log(err)
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }

    async logout (req , res) {
        try{
            //const { token , token_expires_at } = req.user;

            let data = await this.service.logout(req.user)
           
            return res.status(200).json({ data: "Successfully logout" });
        }catch(err) {
            console.log(err)
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }
}



module.exports = AuthController