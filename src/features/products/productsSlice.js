import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  list: [],
  filtered: [],
  //   related: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true; // обрабатывает успешное выполнение действия
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false; // обрабатывает ожидание выполнения действия
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false; // обрабатывает ошибки
    });
  },
});

export const { filterByPrice } = productsSlice.actions;

export default productsSlice.reducer;
