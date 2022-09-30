import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getItem, getRelatedItems } from "../redux/features/itemSlice";
import RelatedItems from "../components/RelatedItems";
import DisqusThread from "../components/DisqusThread";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { item, relatedItems } = useSelector((state) => ({ ...state.item }));
  const { id } = useParams();
  const tags = item?.tags;
  const navigate = useNavigate();

  useEffect(() => {
    tags && dispatch(getRelatedItems(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);
  useEffect(() => {
    if (id) {
      dispatch(getItem(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
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
          <RelatedItems relatedItems={relatedItems} itemId={id} />
        </MDBCard>
        <DisqusThread id={id} title={item.title} path={`/item/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleItem;
