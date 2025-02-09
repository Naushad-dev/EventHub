import axios from "axios"

export const API= axios.create({
    baseURL:"http://localhost:3000/api/v1"
})

export const Register= (name,email,password,role)=>{
    console.log("log from fetch hook",name,email,password,role)
    return API.post("/user/register", {name,email,password,role})
}





