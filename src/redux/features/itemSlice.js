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

export const getItems = createAsyncThunk(
  "item/getItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getItem = createAsyncThunk(
  "item/getItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getItem(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getItemsByUser = createAsyncThunk(
  "item/getItemsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getItemsByUser(userId);
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
    [getItems.pending]: (state, action) => {
      state.loading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [getItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getItem.pending]: (state, action) => {
      state.loading = true;
    },
    [getItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    [getItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getItemsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getItemsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userItems = action.payload;
    },
    [getItemsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default itemSlice.reducer;
