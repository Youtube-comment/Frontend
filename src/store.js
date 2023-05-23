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

export let { changeName } = video_title.actions

export default configureStore({
  reducer: {
    video_title : video_title.reducer,
   }
})