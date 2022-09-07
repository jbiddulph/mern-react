import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createItem = createAsyncThunk(
  "item/createItem",
  async ({ updatedItemData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createItem(updatedItemData);
      toast.success("Item added Successful");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: {},
    items: [],
    userItems: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createItem.pending]: (state, action) => {
      state.loading = true;
    },
    [createItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = [action.payload];
    },
    [createItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default itemSlice.reducer;
