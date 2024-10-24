import express from "express"
import { signUp } from "../controllers/Auth.controllerss.js"
import {signIn} from "../controllers/Auth.controllerss.js"

const Authrouter = express.Router()

Authrouter.post("/signUp",signUp)
Authrouter.post("/signIn",signIn)
Authrouter.post("/signOut")

export default Authrouter