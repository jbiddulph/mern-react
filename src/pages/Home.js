import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../redux/features/itemSlice";
import CardItem from "../components/CardItem";
import Spinner from "../components/Spinner";

const Home = () => {
  const { items, loading } = useSelector((state) => ({ ...state.item }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {items.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Items Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {items &&
                items.map((item, index) => <CardItem key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
