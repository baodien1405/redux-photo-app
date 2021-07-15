import userApi from "./../api/userAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentUser = await userApi.getMe();
    return currentUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getMe.pending]: (action) => {},
    [getMe.rejected]: (action) => {},
    [getMe.fulfilled]: (action) => {},
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
