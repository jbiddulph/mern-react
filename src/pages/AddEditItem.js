import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../redux/features/itemSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditItem = () => {
  const [itemData, setItemData] = useState(initialState);
  const { error, loading, userItems } = useSelector((state) => ({
    ...state.item,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description, tags } = itemData;
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const singleItem = userItems.find((item) => item._id === id);
      setItemData({ ...singleItem });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedItemData = { ...itemData, name: user?.result?.name };
      if (!id) {
        dispatch(createItem({ updatedItemData, navigate, toast }));
      } else {
        dispatch(updateItem({ id, updatedItemData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setItemData({ ...itemData, tags: [...itemData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setItemData({
      ...itemData,
      tags: itemData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setItemData({ title: "", description: "", tags: [] });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5 className="title">{id ? "Update Item" : "Add Item"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                type="text"
                placeholder="Enter Title"
                name="title"
                onChange={onInputChange}
                className="form-control"
                value={title || ""}
                required
                invalid="true"
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <input
                type="text"
                placeholder="Enter Description"
                style={{ height: "100px" }}
                name="description"
                onChange={onInputChange}
                className="form-control"
                value={description}
                required
                invalid="true"
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setItemData({ ...itemData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditItem;
