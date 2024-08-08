import { createSlice } from "@reduxjs/toolkit";

const kellerSlice = createSlice({
  name: "keller",

  initialState: {
    loading: false,
    error: false,
    ads: [],
    categories: [], 
    users: [],   
    addresses: [],
    favorites: [],
    follows: [],
    messages: [],
    
    
    
   
    
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data; 
    },
    
      
      

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccess,
  
  fetchFail,
  
  
} = kellerSlice.actions;
export default kellerSlice.reducer;
