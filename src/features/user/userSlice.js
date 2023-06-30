import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios(`${BASE_URL}/user?limit=6`);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

const initialState = {
  currentUser: [],
  cart: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });

      state.cart = newCart;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(getUser.pending, (state) => {
  //       state.isLoading = true; // обрабатывает успешное выполнение действия
  //     });
  //     builder.addCase(getUser.fulfilled, (state, { payload }) => {
  //       state.list = payload;
  //       state.isLoading = false; // обрабатывает ожидание выполнения действия
  //     });
  //     builder.addCase(getUser.rejected, (state) => {
  //       state.isLoading = false; // обрабатывает ошибки
  //     });
  //   },
});

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;
