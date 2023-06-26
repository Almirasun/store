import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories?limit=6`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => { 
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true; // обрабатывает успешное выполнение действия
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false; // обрабатывает ожидание выполнения действия
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false; // обрабатывает ошибки
    });
  },
});

export default categoriesSlice.reducer;
