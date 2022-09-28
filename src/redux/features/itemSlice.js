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
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getItems(page);
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

export const likeItem = createAsyncThunk(
  "item/likeItem",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeItem(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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

export const searchItems = createAsyncThunk(
  "item/searchItems",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getItemsBySearch(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getItemsByTag = createAsyncThunk(
  "item/getItemsByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagItems(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedItems = createAsyncThunk(
  "item/getRelatedItems",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedItems(tags);
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
    tagItems: [],
    relatedItems: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    // Create Item
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
    // Items
    [getItems.pending]: (state, action) => {
      state.loading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // Single Item
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
    // Items By User
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
    // Delete Items
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
    // Update Item
    [updateItem.pending]: (state, action) => {
      state.loading = true;
    },
    [updateItem.fulfilled]: (state, action) => {
      state.loading = false;
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
    // Like Item
    [likeItem.pending]: (state, action) => {},
    [likeItem.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.items = state.items.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeItem.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    // Search Items
    [searchItems.pending]: (state, action) => {
      state.loading = true;
    },
    [searchItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [searchItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // Items By Tag
    [getItemsByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getItemsByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagItems = action.payload;
    },
    [getItemsByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // Related Items
    [getRelatedItems.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedItems = action.payload;
    },
    [getRelatedItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = itemSlice.actions;

export default itemSlice.reducer;
