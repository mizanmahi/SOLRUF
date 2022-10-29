import {
  
  Container,
  Grid,
  MenuItem,
  Pagination,
  Typography,
  
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DynamicGardenSelect from "../../components/Custom/GardenSelectWithChip/DynamicGardenSelect";
import DynamicRangeFilter from "../../components/Custom/RangeFilter/DynamicRangeFilter";
import useCategories from "../../hooks/useCategories";
import { axiAuth } from "../../utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  FilterArea,
  ResetButton,
  SolrufTextFieldWhite,
} from "./procurement.style";
import Loader from "../../components/Loader/Loader";
import { styled } from "@mui/material";
import { motion } from "framer-motion";
import "./Procurement.css";
import ProcurementProductCard from "./ProcurementProductCard";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchString } from "../../redux/slices/searchSlice";
import { clearProductData } from "../../redux/slices/viewProductSlice";
import ProductCardForMobile from "../../components/ProductCardForMobile/ProductCardForMobile";
import DraggableBottomDialog from "../../components/Custom/BottomDialog/DraggableBottomDialog";
import PrimaryButton from "../../components/Custom/PrimaryButton/PrimaryButton";
import { useErrorHandler } from "react-error-boundary";

const drawerWidth = 240;

const FilterMenu = styled(Box)(({ theme }) => ({
  width: "100%",
  marginLeft: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const filterDrawerStyle = {
  width: "90%",
  borderRadius: "0px 0px 15px 0px",
  marginRight: "80px",
  display: { xs: "none", sm: "none", md: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    border: 0,
    backgroundColor: "red",
    height: `calc(95vh - 77px)`,
    marginTop: "190px",
  },
  boxShadow: "0px 0px 15px rgb(0 0 0 / 10%)",
  backgroundColor: "#ffffff !important",
};

const filterDrawerStyleMobile = {
  width: "100%",
  height: "60vh",
  display: { xs: "block", sm: "block", md: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    border: 0,
    backgroundColor: "red",
    marginTop: "190px",
  },
  backgroundColor: "#ffffff !important",
};

const Procurement = () => {
  const hadleError = useErrorHandler()
  //reading from ViewProduct state slice
  const viewProductItemCategory = useSelector(
    (state) => state.viewProduct.productCategoryData
  );
  const viewProductItemSubCategory = useSelector(
    (state) => state.viewProduct.productSubCategoryData
  );

  const { register, watch } = useForm({
    defaultValues: {
      category: viewProductItemCategory,
      subCategory: viewProductItemSubCategory,
    },
  });
  const [products, setProducts] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsLoadingError, setProductsLoadingError] = useState("");
  const [reset, setReset] = useState(false);
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const dispatch = useDispatch();

  // hook to get categories & sub categories from api
  const { categories } = useCategories("product");

  // watching the values of selected category and sub category
  const [watchCategoryId, watchSubCategoryId] = watch([
    "category",
    "subCategory",
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log({ watchCategoryId, watchSubCategoryId });

  // hook to get categories & sub categories from api
  const { subCategories } = useCategories("product", watchCategoryId);

  const [selectFilters, setSelectFilters] = useState([
    {
      id: 0,
      selectedItems: [],
      items: [],
      name: "",
    },
  ]);

  const [rangeFilters, setSetRangeFilters] = useState([
    {
      from: 0,
      to: 0,
      min: 0,
      max: 0,
      isValid: false,
      id: 0,
      name: "",
    },
  ]);

  // selecting the search term from the search box
  const searchTerm = useSelector((state) => state.search.searchTerm);

  // for setting the dynamic filters in the state
  useEffect(() => {
    setSelectFilters([]);
    setSetRangeFilters([]);

    // clearing the product data from the redux state which came from the homepage on View Product click.
    dispatch(clearProductData());

    if (watchSubCategoryId) {
      console.log("called the watch category use effect");
      axiAuth
        .get("api/filters?sub_category_id=" + watchSubCategoryId)
        .then((res) => {
          setSelectFilters(
            res.data.filters
              .filter((filter) => filter.filter_type === "select")
              .map((filter) => {
                return {
                  id: filter.id,
                  selectedItems: [],
                  items: filter.filter_select,
                  name: filter.name,
                };
              })
          );
          setSetRangeFilters(
            res.data.filters
              .filter((filter) => filter.filter_type === "range")
              .map((filter) => {
                return {
                  from: 0,
                  to: 0,
                  min: filter.filter_range.min,
                  max: filter.filter_range.max,
                  isValid: false,
                  id: filter.id,
                  name: filter.name,
                };
              })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [watchSubCategoryId, reset, dispatch]);

  // for applying the filters on change of filters values
  useEffect(() => {
    setProductsLoadingError("");
    setProductsLoading(true);
    console.log("fetching the products");
    let url = `api/products?length=15&page=${page}`;
    // if (rangeFilters.length === 0 && selectFilters.length === 0) {
    //    setProductsLoading(false);
    //    return;
    // }
    axiAuth
      .post(url, {
        category_id: watchSubCategoryId || "",
        search: searchTerm || "",
        attributes: [
          ...selectFilters
            .filter((filter) => filter.selectedItems.length > 0)
            .map((filter) => ({
              id: filter.id,
              type: "select",
              value: [...filter.selectedItems],
            })),
          ...rangeFilters
            .filter((filter) => filter.isValid)
            .map((filter) => ({
              id: filter.id,
              type: "range",
              min: filter.from,
              max: filter.to,
            })),
        ],
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setSearchString(""));
        setProducts(res.data.products);
        setPaginationInfo(res.data.pagination);
        setProductsLoading(false);
        setProductsLoadingError("");
      })
      .catch((err) => {
        setProductsLoadingError(err.message);
        setProductsLoading(false);
      });
  }, [watchSubCategoryId, page, dispatch, searchTerm, rangeFilters, selectFilters]);

  const onApplyFilter = () => {
    setProductsLoadingError("");
    setProductsLoading(true);
    console.log("fetching the products");
    let url = `api/products?length=15&page=${page}`;
    if (rangeFilters.length === 0 && selectFilters.length === 0) return;
    axiAuth
      .post(url, {
        category_id: watchSubCategoryId || "",
        search: searchTerm || "",
        attributes: [
          ...selectFilters
            .filter((filter) => filter.selectedItems.length > 0)
            .map((filter) => ({
              id: filter.id,
              type: "select",
              value: [...filter.selectedItems],
            })),
          ...rangeFilters
            .filter((filter) => filter.isValid)
            .map((filter) => ({
              id: filter.id,
              type: "range",
              min: filter.from,
              max: filter.to,
            })),
        ],
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setSearchString(""));
        setProducts(res.data.products);
        setPaginationInfo(res.data.pagination);
        setProductsLoading(false);
        setProductsLoadingError("");
        setShowMobileFilter(false);
      })
      .catch((err) => {
        setProductsLoadingError(err.message);
        setProductsLoading(false);
        hadleError(err);
      });
  };

  // const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <Box sx={{ background: "#f3f3f3", pt: 2.5 }}>
      {/* Category and Sub Category text input fields */}

      <FilterArea>
        <Container maxWidth="xl">
          <div className="categoriesArea">
            <SolrufTextFieldWhite
              value={watchCategoryId}
              size="small"
              select
              label="Category"
              {...register("category")}
              sx={{
                mr: [0, 0, 2, 2],
              }}
            >
              {categories.map(({ category_id, name }) => (
                <MenuItem value={category_id} key={category_id}>
                  {name}
                </MenuItem>
              ))}
            </SolrufTextFieldWhite>
            <SolrufTextFieldWhite
              value={watchSubCategoryId}
              select
              size="small"
              label="Sub Category"
              {...register("subCategory")}
            >
              {subCategories.map(({ category_id, name }) => (
                <MenuItem value={category_id} key={category_id}>
                  {name}
                </MenuItem>
              ))}
            </SolrufTextFieldWhite>
          </div>
        </Container>
      </FilterArea>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          minHeight: "100vh",
        }}
      >
        {watchSubCategoryId && selectFilters.length > 0 && (
          <div
            style={{
              position: "sticky",
              top: 100,
              paddingTop: "20px",
              marginBottom: "40px",
            }}
          >
            <motion.div
              initial={{ x: "-10vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* filter drawer from left */}
              <Box
                variant="permanent"
                sx={{
                  ...filterDrawerStyle,
                  borderRadius: "0px 15px 15px 0px",
                }}
              >
                <Box
                  sx={{
                    background: "#000000",
                    p: 2,
                    borderRadius: "0px 15px 0px 0px",
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{ color: "#ffffff", textAlign: "center" }}
                    variant="h6"
                  >
                    More Filters
                  </Typography>
                  {/* <Box
                              sx={{
                                 position: 'absolute',
                                 right: '5px',
                                 bottom: '10px',
                              }}
                           >
                              <IconButton
                                 onClick={() => {
                                    setReset(!reset);
                                    // onApplyFilter();
                                 }}
                              >
                                 <CloseIcon sx={{ color: 'white' }} />
                              </IconButton>
                           </Box> */}
                </Box>
                <FilterMenu>
                  <div className="dashboard__filter">
                    {selectFilters.length > 0 &&
                      selectFilters.map((filter, i) => (
                        <Box sx={{ mt: 1, px: 0.8 }}>
                          <DynamicGardenSelect
                            selectFilters={selectFilters}
                            setSelectFilters={setSelectFilters}
                            id={selectFilters[i].id}
                            name={selectFilters[i].name}
                          />
                        </Box>
                      ))}
                    {rangeFilters.length > 0 &&
                      rangeFilters.map((filter, i) => (
                        <Box sx={{ mt: 2, px: 0.8 }}>
                          <DynamicRangeFilter
                            id={rangeFilters[i].id}
                            rangeFilters={rangeFilters}
                            setSetRangeFilters={setSetRangeFilters}
                            name={rangeFilters[i].name}
                          />
                        </Box>
                      ))}
                  </div>
                </FilterMenu>
                <Box
                  display="flex"
                  sx={{
                    background: "#f7f7f7",
                    borderRadius: "0px 0px 15px 0",
                  }}
                >
                  <ResetButton
                    sx={{
                      borderRadius: "0 0 0 0",
                      background: "transparent",
                      boxShadow: "none",
                    }}
                    // IconStart={DoneIcon}
                    onClick={() => {
                      setReset(!reset);
                      // onApplyFilter();
                    }}
                  >
                    Reset
                  </ResetButton>
                  <ResetButton
                    sx={{
                      borderRadius: "0 0 15px 0",
                      background: "transparent",
                      boxShadow: "none",
                      "&:hover": {
                        background: "#ffd05b",
                      },
                    }}
                    IconStart={DoneIcon}
                    onClick={onApplyFilter}
                    apply
                  >
                    Apply
                  </ResetButton>
                </Box>
              </Box>
            </motion.div>
          </div>
        )}

        <Container maxWidth="xl" disableGutters={true}>
          <Box sx={{ my: 2, pb: 3 }}>
            {productsLoadingError && (
              <Typography
                color="error"
                sx={{ textAlign: "center", mt: 5, mb: 4 }}
              >
                Error fetching products! Try again reloading the page
              </Typography>
            )}

            {/*  ============ products mapping ============ */}

            {watchCategoryId === 73 && (
              <Box
                sx={{
                  width: "100%",
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: "2rem", color: "rgba(0,0,0,0.3)" }}>
                  No Product Found
                </Typography>
              </Box>
            )}

            {watchCategoryId !== 73 && (
              <Box
                sx={{
                  my: 2,
                  pb: 3,
                  px: {
                    xs: "0.2rem",
                    sm: "0.5rem",
                    md: "1rem",
                  },
                }}
              >
                {productsLoadingError && (
                  <Typography
                    color="error"
                    sx={{ textAlign: "center", mt: 5, mb: 4 }}
                  >
                    Error fetching products! Try again reloading the page
                  </Typography>
                )}
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                  {productsLoading && <Loader />}
                  {!productsLoading &&
                    products.length > 0 &&
                    products.map((product) => (
                      <Fragment>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={watchCategoryId && watchSubCategoryId ? 6 : 4}
                          lg={watchCategoryId && watchSubCategoryId ? 4 : 3}
                          xl={watchCategoryId && watchSubCategoryId ? 3 : 3}
                          sx={{
                            mx: "0",
                            display: ["none", "block"],
                          }}
                        >
                          <ProcurementProductCard
                            product={product}
                            actionType="enquiry"
                            sx={{
                              boxShadow: "0px 2px 24px rgba(22, 60, 158, 0.2)",
                              height: "100%",
                              mx: "auto",
                            }} // added this to fix the height issue of the card on products page
                          />
                        </Grid>
                      </Fragment>
                    ))}

                  {/* If no products are available, then the below code is executed for showing the message. */}
                  {!productsLoading && products.length === 0 && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.8rem",
                          "@media (max-width: 900px)": {
                            fontSize: "1.2rem",
                          },
                          color: "rgba(0,0,0,0.3)",
                          padding: "1rem",
                          textAlign: "center",
                        }}
                      >
                        No Product Found in this Category and Sub Category
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Box sx={{ display: ["block", "none"], mt: 2 }}>
                  {!productsLoading &&
                    products.length > 0 &&
                    products.map((product) => (
                      <Fragment>
                        <Box>
                          <ProductCardForMobile
                            product={product}
                            showBook={false}
                          />
                        </Box>
                      </Fragment>
                    ))}
                </Box>
              </Box>
            )}
          </Box>

          {/*  ============ pagination but only if products are available ============ */}
          {!productsLoading && products.length > 0 && (
            <Pagination
              count={paginationInfo?.last_page}
              page={page}
              onChange={(e, page) => setPage(page)}
              color="primary"
              shape="circle"
              sx={{
                "& ul": { justifyContent: "center" },
                mt: 2,
                mb: 8,
              }}
            />
          )}

          {watchCategoryId && (
            <Fragment>
              <PrimaryButton
                onClick={() => {
                  setShowMobileFilter(true);
                }}
                disableRipple={true}
                sx={{
                  py: 2,
                  position: "fixed",
                  borderRadius: "0",
                  bottom: "0",
                  width: "100%",
                  left: "0",
                  zIndex: "10",
                  background: "#000000",
                  color: "#ffffff",
                  "&:hover": {
                    background: "#000000",
                  },
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              >
                Filters
              </PrimaryButton>
              <DraggableBottomDialog
                open={showMobileFilter}
                handleClose={() => setShowMobileFilter(false)}
              >
                <Box
                  variant="permanent"
                  sx={{
                    ...filterDrawerStyleMobile,
                    borderRadius: "0px 15px 15px 0px",
                    mb: 2,
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <FilterMenu>
                    <div className="dashboard__filter">
                      {selectFilters.length > 0 &&
                        selectFilters.map((filter, i) => (
                          <Box sx={{ mt: 2, px: 0.8 }}>
                            <DynamicGardenSelect
                              selectFilters={selectFilters}
                              setSelectFilters={setSelectFilters}
                              id={selectFilters[i].id}
                              name={selectFilters[i].name}
                            />
                          </Box>
                        ))}
                      {rangeFilters.length > 0 &&
                        rangeFilters.map((filter, i) => (
                          <Box sx={{ mt: 2, px: 0.8 }}>
                            <DynamicRangeFilter
                              id={rangeFilters[i].id}
                              rangeFilters={rangeFilters}
                              setSetRangeFilters={setSetRangeFilters}
                              name={rangeFilters[i].name}
                            />
                          </Box>
                        ))}
                    </div>
                  </FilterMenu>

                  <Box
                    sx={{
                      maxWidth: "100%",

                      display: "flex",
                      position: "fixed",
                      bottom: "0",
                      width: "100%",
                    }}
                  >
                    <ResetButton
                      IconStart={CloseIcon}
                      onClick={() => setReset(!reset)}
                    >
                      Reset
                    </ResetButton>
                    <ResetButton
                      sx={{
                        background: "#ffd05b",
                      }}
                      IconStart={DoneIcon}
                      onClick={onApplyFilter}
                      apply
                    >
                      Apply
                    </ResetButton>
                  </Box>
                </Box>
              </DraggableBottomDialog>
            </Fragment>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Procurement;
