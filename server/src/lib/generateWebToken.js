import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    let jwt_secret = process.env.JWT_SECRET
    const token = jwt.sign({userId}, jwt_secret, {
        expiresIn:"7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 1000, // MS
        httpOnly: true, // prevent xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}