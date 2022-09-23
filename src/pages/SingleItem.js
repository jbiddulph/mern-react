import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getItem } from "../redux/features/itemSlice";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => ({ ...state.item }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getItem(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", height: "600px" }}
            src={item.imageFile}
            alt={item.title}
          />
          <MDBCardBody>
            <h3>{item.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {item.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {item && item.tags && item.tags.map((tag) => `#${tag}`)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              >
                <small className="text-muted">
                  {moment(item.createdAt).fromNow()}
                </small>
              </MDBIcon>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {item.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SingleItem;
