import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomAccordion from "../../components/CustomAccordion/CustomAccordion";

import { Typography } from "@mui/material";

const FilterCategory = styled(Typography)(
  ({ theme, activecategory, category }) => ({
    backgroundColor:
      category === activecategory
        ? theme.palette.primary.main
        : theme.palette.secondary.light,
    borderRadius: "1rem",
    marginBottom: "1rem",
    padding: "0.2rem .5rem",
    display: "inline-block",
    cursor: "pointer",
    fontSize: "1rem",
  })
);

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

const CategoryFilter = ({
  activecategory,
  setactivecategory,
  categories,
  sx,
}) => {
  const handleactivecategory = (category) => {
    setactivecategory(category.category_id);
  };

  const [activecategoryName, setactivecategoryName] = React.useState("");

  useEffect(() => {
    if (activecategory) {
      const activecategoryName = categories.find(
        (category) => category.category_id === activecategory
      );
      setactivecategoryName(activecategoryName.name);
    }
  }, [activecategory, categories]);

  return (
    <LeftProductFilterBox
      sx={{
        maxWidth: "300px",
        width: "100%",
        ...sx,
      }}
    >
      <CustomizedAccordionForFilter
        title="Categories"
        defaultExpanded={false}
        chipTitle={activecategoryName}
        resetHandler={() => {
          setactivecategory("");
          setactivecategoryName("");
        }}
      >
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              // minWidth: '300px',
            }}
          >
            {categories.map((category, index) => (
              <FilterCategory
                key={index}
                onClick={() => handleactivecategory(category)}
                activecategory={activecategory}
                category={category.category_id}
              >
                {category.name}
              </FilterCategory>
            ))}
          </Box>
        </>
      </CustomizedAccordionForFilter>
    </LeftProductFilterBox>
  );
};

export default CategoryFilter;
