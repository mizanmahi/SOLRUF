import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomAccordion from "../../components/CustomAccordion/CustomAccordion";

import { Typography } from "@mui/material";

const FilterCategory = styled(Typography)(({ theme, activestate, state }) => ({
  backgroundColor:
    state === activestate
      ? theme.palette.primary.main
      : theme.palette.secondary.light,
  borderRadius: "1rem",
  marginBottom: "1rem",
  padding: "0.2rem .5rem",
  display: "inline-block",
  cursor: "pointer",
}));

const LeftProductFilterBox = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "4px",
  boxShadow: "0px 4px 24px 0  rgba(0, 69, 184, 0.15)",
  minWidth: "300px",
}));

const CustomizedAccordionForFilter = styled(CustomAccordion)(({ theme }) => ({
  "& .MuiAccordionDetails-root": {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: "55",
    borderRadius: "0 0 4px 4px",
    height: "250px",
    overflow: "scroll",
  },
  "& .MuiTypography-root": {
    fontSize: "1rem",
  },
}));

const CountryFilter = ({ activestate, setactivestate, states, sx }) => {
  const handleactivestate = (state) => {
    setactivestate(state);
  };

  return (
    <LeftProductFilterBox
      sx={{
        maxWidth: "300px",
        width: "100%",
        ...sx,
      }}
    >
      <CustomizedAccordionForFilter
        title="States"
        defaultExpanded={false}
        chipTitle={activestate}
        resetHandler={() => setactivestate("")}
      >
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              // height: '100%',
            }}
          >
            {states.map((state, index) => (
              <FilterCategory
                key={index}
                onClick={() => handleactivestate(state)}
                activestate={activestate}
                state={state}
              >
                {state}
              </FilterCategory>
            ))}
          </Box>
        </>
      </CustomizedAccordionForFilter>
    </LeftProductFilterBox>
  );
};

export default CountryFilter;
