import y from "yup"

let signUpSchema = y.object({
    email : y.string().email(),
    name : y.string().required(),
    phoneNumber : y.string().required(),
    password : y.string().required().min(8).max(16)
})

export default signUpSchema