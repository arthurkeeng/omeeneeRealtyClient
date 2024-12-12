import { defer } from "react-router-dom"
import app from "../../axiosInstance"

export const singlePageLoader = async ({request , params}) =>{
    const {data}  = await app.get(`/api/posts/post/${params.id}`)
    return data
}
export const listPageLoader = async ({request , params}) =>{
    const query = request.url.split("?")[1]
    const {data} = await app.get(`/api/posts?${query}`)
    
    
    return  data
}
export const profilePageLoader = async () =>{
    
    const {data : posts} = await app.get(`/api/users/user/profilePosts`) 
    const {data : chats} = await app.get(`/api/chats`) 
   
    return  defer({posts,chats})
}