import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "../../../components/MyTables/GlobalTable";
import GlobalMobileTable from "../../../components/MyTables/GlobalMobileTable";
import TabBtn from "../../../components/SmallTab/TabBtn";
import { axiAuth } from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

import { setCustomerLeads } from "../../../redux/slices/tableSlice";
import BackdropLoader from "../../../components/Custom/BackdropLoader/BackdropLoader";
import { Box, IconButton, Stack } from "@mui/material";

import useCategories from "../../../hooks/useCategories";
import CategoryFilter from "../../../components/CategoryFilter/CategoryFilter";
import CountryFilter from "../../../components/CountryFilter/CountryFilter";
import TableSearchBar from "../../../components/TableSearchBar/TableSearchBar";
import CustomBottomBar from "../../../components/CustomBottomBar/CustomBottomBar";
import PrimaryButton from "../../../components/Custom/PrimaryButton/PrimaryButton";
import DraggableBottomDialog from "../../../components/Custom/BottomDialog/DraggableBottomDialog";
import CreateCustomerDrawer from "../../../components/CreateCustomerDrawer/CreateCustomerDrawer";
import DeleteIcon from "@mui/icons-material/Delete";

const customerColumns = [
  {
    Header: "ID",
    accessor: "customer_id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Phone No.",
    accessor: "phone",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Location",
    accessor: "address",
  },
  {
    Header: "Lead Status",
    accessor: "status",
  },
];

function CustomerLeads() {
  // const [currentTab, setCurrentTab] = useState('Customers/Leads');
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [customerCreateDrawer, setCustomerCreateDrawer] = useState(false);

  const { customerLeads } = useSelector((state) => state.tableData);
  const { deleteUserHandler } = useSelector((state) => state.tableData);

  // storing customer leads data in redux store whenever the component is mounted and customer leads data is changed
  useEffect(() => {
    setCustomerData(customerLeads);
  }, [customerLeads]);

  const { categories } = useCategories("product", null);
  const [activecategory, setactivecategory] = useState(null);

  const { statesOfIndia } = useSelector((state) => state.utils);
  const [activeState, setActiveState] = useState(null);

  const customerLeadsWithPagination = async (
    pageIndex,
    searchTerm,
    filters
  ) => {
    let url = `/api/vendor/customers?page=${pageIndex + 1}&length=${5}`;

    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }

    if (filters.category) {
      url += `&category_id=${filters.category}`;
    }

    if (filters.state) {
      url += `&state=${filters.state}`;
    }

    setLoading(true);
    try {
      const fetchData = await axiAuth.get(url);
      const csData = fetchData.data.customers.map((item) => {
        let address =
          item.location.city && item.location.state
            ? (item.location.city ? item.location.city : "N/A") +
              "," +
              (item.location.state ? item.location.state : "N/A")
            : "N/A";
        let product = item.lead?.category?.name
          ? item.lead.category.name
          : "N/A";
        return {
          ...item,
          address: address,
          product: product,
          status: item.lead?.status?.toUpperCase(),
        };
      });
      console.log({ csData });
      setCustomerData(csData);
      dispatch(setCustomerLeads(csData));
      const pages = fetchData.data.pagination.last_page;
      setLoading(false);
      return { csData, pages };
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { csData: [], pages: 0 };
    }
  };

  // const [priceRange, setPriceRange] = useState({
  //    from: 0,
  //    to: 0,
  // });

  // const [invalidRange, setInvalidRange] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filters = useMemo(() => {
    return {
      category: activecategory,
      state: activeState,
    };
  }, [activecategory, activeState]);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  return (
    <Box>
      {loading && <BackdropLoader />}
      <TabBtn tabName={["Customers/Leads"]} />
      <Box
        sx={{
          // maxWidth: '900px',
          width: "100%",
          margin: "0 auto",
          my: "20px",
          px: "0.5rem",
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
        }}
      >
        <TableSearchBar
          sx={{
            flex: 1,
          }}
          placeholder="search"
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: [2, 2, 0],
            justifyContent: "space-between",
          }}
        >
          <PrimaryButton
            onClick={() => setCustomerCreateDrawer(true)}
            sx={{ px: 2, ml: [0, 0, 4] }}
          >
            New Customer
          </PrimaryButton>

          <IconButton
            className="delete_btn__hover"
            sx={{
              my: "1",
            }}
            size="small"
            onClick={() => deleteUserHandler()}
          >
            <DeleteIcon sx={{ color: "#F20519" }} />
          </IconButton>
        </Box>
        {customerCreateDrawer && (
          <CreateCustomerDrawer
            rightDrawerOpen={customerCreateDrawer}
            setRightDrawerOpen={() => setCustomerCreateDrawer(false)}
          />
        )}
      </Box>

      <Stack
        sx={{
          ml: 2,
          mt: 2,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        direction="row"
        spacing={2}
      >
        <Box sx={{ maxWidth: "500px" }}>
          {statesOfIndia.length > 0 && (
            <CountryFilter
              states={statesOfIndia}
              activeState={activeState}
              setActiveState={setActiveState}
            />
          )}
        </Box>
        <Box sx={{ maxWidth: "500px" }}>
          {categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              activecategory={activecategory}
              setactivecategory={setactivecategory}
            />
          )}
        </Box>
      </Stack>

      <GlobalMobileTable columns={customerColumns} data={customerData} />

      <GlobalTable
        columns={customerColumns}
        data={customerData}
        setPagination={customerLeadsWithPagination}
        searchTerm={searchTerm}
        filters={filters}
      />

      <DraggableBottomDialog
        open={filterDialogOpen}
        handleClose={() => setFilterDialogOpen(false)}
        bar={true}
        // text={'Sort'}
      >
        <Stack sx={{ mt: 4, px: 1 }} rowGap={1}>
          {categories.length > 0 && (
            <CategoryFilter
              sx={{
                maxWidth: "100%",
              }}
              categories={categories}
              activecategory={activecategory}
              setactivecategory={setactivecategory}
            />
          )}
          {statesOfIndia.length > 0 && (
            <CountryFilter
              sx={{
                maxWidth: "100%",
              }}
              states={statesOfIndia}
              activeState={activeState}
              setActiveState={setActiveState}
            />
          )}
        </Stack>
      </DraggableBottomDialog>

      <CustomBottomBar>
        <PrimaryButton
          onClick={() => setFilterDialogOpen(true)}
          sx={{
            color: "#F3F3F3",
            background: "#4D4D4D",
            borderRadius: "0",
            fontSize: "18px",
            width: "100%",
          }}
        >
          Filter
        </PrimaryButton>
      </CustomBottomBar>
    </Box>
  );
}

export default CustomerLeads;
