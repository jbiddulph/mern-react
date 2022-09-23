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

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteItem(id);
      toast.success("Item Deleted Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ id, updatedItemData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateItem(updatedItemData, id);
      toast.success("Item Updated Successfully");
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
    [deleteItem.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.items = state.items.filter((item) => item._id !== id);
        state.userItems = state.userItems.filter((item) => item._id !== id);
      }
    },
    [deleteItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateItem.pending]: (state, action) => {
      state.loading = true;
    },
    [updateItem.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.items = state.items.map((item) =>
          item._id === id ? action.payload : item
        );
        state.userItems = state.userItems.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default itemSlice.reducer;
