import userApi from "api/userApi";

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
    [getMe.pending]: (state) => {
      state.loading = true;
    },
    [getMe.rejected]: (state) => {
      state.loading = false;
      state.error = "";
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
