import { Box, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryFilter from "../../../components/CountryFilter/CountryFilter";
import AntDateRange from "../../../components/Custom/AntDateRange/AntDateRange";
import DraggableBottomDialog from "../../../components/Custom/BottomDialog/DraggableBottomDialog";
import DateRangePickerNpm from "../../../components/Custom/DateRangePickerNpm/DateRangePickerNpm";
import PrimaryButton from "../../../components/Custom/PrimaryButton/PrimaryButton";
import CustomBottomBar from "../../../components/CustomBottomBar/CustomBottomBar";
import GlobalMobileTable from "../../../components/MyTables/GlobalMobileTable";
import GlobalTable from "../../../components/MyTables/GlobalTable";
import TabBtn from "../../../components/SmallTab/TabBtn";
import TableSearchBar from "../../../components/TableSearchBar/TableSearchBar";
import {
  setOnReminderTab,
  setRemindersData,
} from "../../../redux/slices/tableSlice";
import { axiAuth } from "../../../utils/axiosInstance";
import { formateToSqlDateWithMoment } from "../../../utils/formateToSqlDateTime";

import ConsultationTable from "./ConsultationTable";

const Consultation = () => {
  const dispatch = useDispatch();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const remindersColumns = [
    {
      Header: "ID",
      accessor: "id",
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
      Header: "Meeting Name",
      accessor: "meeting_name",
    },
    {
      Header: "Meeting Type",
      accessor: "meeting_type",
    },
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Lead Status",
      accessor: "lead_status",
    },
  ];
  const [currentTab, setCurrentTab] = useState("Consultation");
  const [reminders, setReminders] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { remindersData } = useSelector((state) => state.tableData);

  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileDate, onChange] = useState([null, null]);

  const { statesOfIndia } = useSelector((state) => state.utils);
  const [activestate, setactivestate] = useState(null);

  const onTabChange = () => {
    setCurrentTab(currentTab === "Consultation" ? "Reminders" : "Consultation");
  };

  useEffect(() => {
    setReminders(remindersData);
  }, [remindersData]);

  useEffect(() => {
    dispatch(setOnReminderTab(currentTab === "Reminders"));
  }, [currentTab, dispatch]);

  const remindersWithPagination = async (pageIndex, searchTerm, filters) => {
    let url = `api/vendor/my-reminders?page=${pageIndex + 1}&length=${10}`;

    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }

    const { from_date, to_date } = filters.date;

    if (from_date && to_date) {
      const fromDate = formateToSqlDateWithMoment(date.from_date).split(" ")[0];
      const toDate = formateToSqlDateWithMoment(date.to_date).split(" ")[0];
      url += `&from_date=${fromDate}&to_date=${toDate}`;
    }

    if (filters.state) {
      url += `&state=${filters.state}`;
    }

    // setLoading(true);
    try {
      const fetchData = await axiAuth.get(url);
      const csData = fetchData.data.reminders.map((item) => {
        return {
          ...item,
          id: item.reminder_id,
          name: item.customer?.name,
          phone: item.customer?.phone,
          meeting_name: item.meeting_type?.label,
          meeting_type: item.meeting_type?.label,
          subject:
            item.subject.length > 30
              ? item.subject.slice(0, 30) + "..."
              : item.subject,
          lead_status: item?.customer.lead?.status,
        };
      });
      setReminders(csData);
      dispatch(setRemindersData(csData));
      const pages = fetchData.data.pagination.last_page;
      // setLoading(false);
      return { csData, pages };
    } catch (error) {
      console.log(error);
      // setLoading(false);
      return { csData: [], pages: 0 };
    }
  };

  const filters = useMemo(() => {
    return {
      date: matchSm
        ? mobileDate?.length > 0
          ? { from_date: mobileDate[0], to_date: mobileDate[1] }
          : { from_date: null, to_date: null }
        : date,
      state: activestate,
    };
  }, [date, activestate, mobileDate, matchSm]);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  return (
    <Box>
      <TabBtn tabChange={onTabChange} tabName={["Consultation", "Reminders"]} />

      <Box
        sx={{
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          my: "20px",
          px: "0.5rem",
        }}
      >
        <TableSearchBar
          placeholder="search"
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
        <Box sx={{ width: "280px" }}>
          <AntDateRange date={date} setDate={setDate} />
        </Box>

        <Box sx={{ maxWidth: "500px" }}>
          {statesOfIndia.length > 0 && (
            <CountryFilter
              states={statesOfIndia}
              activestate={activestate}
              setactivestate={setactivestate}
            />
          )}
        </Box>
      </Stack>
      {currentTab === "Consultation" ? (
        <ConsultationTable searchTerm={searchTerm} filters={filters} />
      ) : (
        <>
          <GlobalMobileTable columns={remindersColumns} data={reminders} />
          <GlobalTable
            columns={remindersColumns}
            data={reminders}
            setPagination={remindersWithPagination}
            searchTerm={searchTerm}
            filters={filters}
          />
        </>
      )}

      <DraggableBottomDialog
        open={filterDialogOpen}
        handleClose={() => setFilterDialogOpen(false)}
        bar={true}
        // text={'Sort'}
      >
        <Stack sx={{ mt: 4, px: 1 }} rowGap={1}>
          <Box>
            <DateRangePickerNpm mobileDate={mobileDate} onChange={onChange} />
          </Box>

          {statesOfIndia.length > 0 && (
            <CountryFilter
              sx={{
                maxWidth: "100%",
              }}
              states={statesOfIndia}
              activestate={activestate}
              setactivestate={setactivestate}
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
};

export default Consultation;
