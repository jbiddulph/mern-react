import React from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeItem } from "../redux/features/itemSlice";
import { excerpt } from "../utility/index";

const CardItem = ({
  imageFile,
  description,
  title,
  name,
  tags,
  likes,
  creator,
  socket,
  _id,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="heart" style={{ color: "#bf0000" }} />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="span"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="heart" style={{ color: "#bf0000" }} />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="heart" style={{ color: "#bf0000" }} />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeItem({ _id }));
    const alreadyLiked = likes.find((like) => like === userId);
    if (!alreadyLiked && userId !== creator) {
      socket.emit("sendNotification", {
        senderName: user?.result?.name,
        receiverName: name,
      });
    }
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <Link to={`/item/${_id}`}>
          <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          />
        </Link>
        <div
          className="top-left px-2 rounded"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          {name}
        </div>
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link key={index} to={`/items/tag/${tag}`}>
              {" "}
              #{tag}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right", marginRight: "10px" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like item" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description, 45)}
            <Link to={`/item/${_id}`} className="mx-2">
              Read More
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardItem;
