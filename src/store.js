import { configureStore, createSlice } from '@reduxjs/toolkit'

let video_title = createSlice({
    name : "video_title",
    initialState : '',
    reducers : {
        changeName(state , input){
            return input
        }
    },
});

let userInfor = createSlice({
    name : "userInfor",
    initialState: '',
    reducers : {
        getuser(state, input){
            return input
        }
    }
})

export let { changeName } = video_title.actions
export let { getuser } = userInfor.actions

export default configureStore({
  reducer: {
    video_title : video_title.reducer,
    userInfor : userInfor.reducer,
   }
})