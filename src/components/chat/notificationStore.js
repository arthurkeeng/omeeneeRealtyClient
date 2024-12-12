import { create } from 'zustand'
import app from '../../../axiosInstance'

export const useNotificationStore = create((set) => ({
 number : 0,
 fetch : async ()=>{
    const {data} = await app.get("/api/users/user/notification")
    set({number : data.number})
 },
 decrease : ()=>set(prev =>({number : prev.number - 1})),
 reset : ()=> set({number : 0})
}))
