
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



export const fetchTask = createAsyncThunk('albums/album', async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/hello');
    const data = response.data
    return data
  } catch (error) {
    console.error(error);
  }

})

export const postTask = createAsyncThunk('task/task', async (data) => {

  try {
    await axios.post('http://localhost:4000/api/hello', data);
    alert('Successfully Task Added!')
    window.location.reload()
  } catch (error) {
    console.error(error);
  }
})



export const Slice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    data: [],
    flag: false,
    editFlag: false,
    deleteFlag: false,
    disableOptions: false,
    individualData: {},
  },
  reducers: {
    setSingleData: (state, action) => {
      state.individualData = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload
    },
    setEditFlag: (state, action) => {
      state.editFlag = action.payload
    },
    setDeleteFlag: (state, action) => {
      state.deleteFlag = action.payload
    },
    setDisableOptions: (state, action) => {
      state.disableOptions = action.payload
    }
  },
  extraReducers: {
    [fetchTask.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchTask.rejected]: (state) => {
      state.loading = false;
      state.data = [];
    },
  }

})

export const { setSingleData, setFlag, setEditFlag, setDeleteFlag, setDisableOptions } = Slice.actions;
export default Slice.reducer 