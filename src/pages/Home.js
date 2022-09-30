import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setCurrentPage } from "../redux/features/itemSlice";
import CardItem from "../components/CardItem";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const { items, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.item,
    })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  useEffect(() => {
    dispatch(getItems(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "80px auto",
        padding: "15px",
        maxWidth: "1080px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {items.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Items Found
          </MDBTypography>
        )}

        {items.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            Could not find any matches for "{searchQuery}"
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 text-center row-cols-md-3 g-4">
              {items &&
                items.map((item) => <CardItem key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {items.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
