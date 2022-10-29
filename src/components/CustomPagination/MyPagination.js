import { Pagination } from "@mui/material";
import React, { Fragment } from "react";

const MyPagination = ({ totalPages,gotoPage,sx }) => {

  // console.log(totalPages,gotoPage)

  return (
    <Fragment>
      <Pagination
        color="primary"
        sx={{ justifyContent: "center", display: "flex",...sx }}
        count={totalPages.length}
        onChange={(e, no) => gotoPage(no - 1)}
      />
    </Fragment>
  );
};

export default MyPagination;
