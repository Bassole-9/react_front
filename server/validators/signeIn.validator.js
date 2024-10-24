import y from "yup"

let signInValidator = y.object({
    email: y.string().email(),
    password: y.string().required()
})

export default signInValidator