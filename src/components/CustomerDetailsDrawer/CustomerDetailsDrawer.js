import { Typography, Box, IconButton, Avatar } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import RightDrawer from "../RightDrawer/RightDrawer";
import CloseIcon from "@mui/icons-material/Close";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import SolrufTabPanel from "../SolrufTabPanel/SolrufTabPanel";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import { axiAuth } from "../../utils/axiosInstance";
import { useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import { setCustomerLeads } from "../../redux/slices/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { formateToSqlDateWithMoment } from "../../utils/formateToSqlDateTime";
import useSolrufPinCode from "../../hooks/useSolrufPinCode";
import { useDebounce } from "use-debounce/lib";
import useVerifyGst from "../../hooks/useVerifyGst";
import { toast } from "react-toastify";
import {
  AvatarBox,
  DrawerContent,
  EnquiryDetailsWrapper,
  TabsWrapper,
} from "./customerDetailsDrawer.style";
import { formatDocumentUrl0 } from "../../utils/utils";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import ConfirmDialog2 from "../ConfirmDialog/ConfirmDialog";
import { GetAQuote } from "./GetAQuote";
import SolrufModal2 from "../Custom/SolrufModal/SolrufModal2";
import BasicDetailsAccordion from "./BasicDetailsAccordion";
import LeadsAccordion from "./LeadsAccordion";
import QuotationAccordion from "./QuotationAccordion";
import PhotosDocumentAccordion from "./PhotosDocumentAccordion";
import NotesAccordion from "./NotesAccordion";
import ReminderSection from "./ReminderSection";
import OrdersAccordion from "./OrdersAccordion";
import EnquiriesAccordion from "./EnquiriesAccordion";

const CustomerDetailsDrawer = ({
  rightDrawerOpen,
  setRightDrawerOpen,
  customerId,
}) => {
  // All states

  const [isEdit, setIsEdit] = useState(false);
  const [leadsEdit, setLeadsEdit] = useState(false);
  const [reminderEdit, setReminderEdit] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [documents1, setDocuments1] = useState([]);
  const [createNote, setCreateNote] = useState(false);

  const [meetingType, setMeetingType] = useState("");
  const [meetingTypes, setMeetingTypes] = useState([]);
  const [leadConfigs, setLeadConfigs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useCategories("product", null);
  const [customerDetails, setCustomerDetails] = useState({});
  const { customerLeads } = useSelector((state) => state.tableData);
  const [customerProfileTabs, setCustomerProfileTabs] = useState(0);
  const [photos, setPhotos] = useState([]);

  const [customerReminder, setCustomerReminder] = useState({});

  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //    if (!customerReminder?.appointment_at) return;
  //    setDate(sqlDateTimeToJsDateTime(customerReminder?.appointment_at));
  // }, [customerReminder]);

  const [reminderOn, setReminderOn] = useState(false);

  const [customerDocuments, setCustomerDocuments] = useState([]);
  const [customerImages, setCustomerImages] = useState([]);

  const statesOfIndia = useSelector((state) => state.utils.statesOfIndia);

  console.log(documents1);

  const {
    verifyGst,
    gstVerifying,
    gstVerified,
    setGstVerified,
    gstError,
    setGstError,
  } = useVerifyGst();

  // basic details form
  const {
    register: registerBasicDetail,
    handleSubmit: submitBasicDetail,
    formState: basicDetailFormState,
    setValue: setBasicDetailValue,
    watch: basicDetailWatch,

    control,
  } = useForm({
    defaultValues: {
      state: {},
    },
  });

  const [pincode] = basicDetailWatch(["pincode"]);
  const [debouncedPinCode] = useDebounce(pincode, 1000);
  const { indiaState: stateByPin, district } =
    useSolrufPinCode(debouncedPinCode);

  useEffect(() => {
    if (stateByPin && district) {
      console.log(stateByPin, district);
      setBasicDetailValue("city", district);
      setBasicDetailValue("state", stateByPin);
    }
  }, [stateByPin, district, setBasicDetailValue]);

  const dispatch = useDispatch();

  console.log({ customerReminder });

  const [customerNotes, setCustomerNotes] = useState([]);
  const [fetchNote, setFetchNote] = useState(false);
  const [fetchDocuments, setFetchDocuments] = useState(false);
  const [fetchImages, setFetchImages] = useState(false);

  console.log({ date });

  useEffect(() => {
    axiAuth
      .get(`api/vendor/customers/${customerId}`)
      .then(({ data }) => {
        setCustomerDocuments(data.customer.documents);

        // setDate(formateToSqlDateWithMoment(data.customer?.reminder?.appointment_at));
        // console.log(formateToSqlDateWithMoment(data.customer?.reminder?.appointment_at))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [fetchDocuments, customerId]);

  useEffect(() => {
    axiAuth
      .get(`api/vendor/customers/${customerId}`)
      .then(({ data }) => {
        setCustomerImages(data.customer.images);
        console.log("loading images customer ======");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [photos, customerId, fetchImages]);

  useEffect(() => {
    axiAuth
      .get(`api/vendor/customer-notes?customer_id=${customerId}`)
      .then(({ data }) => {
        console.log(data, "note data>>>>>>>>>>>>>>");
        setCustomerNotes(
          data.notes.map((note) => ({
            ...note,
            isEdit: false,
          }))
        );
      })
      .catch((err) => {
        console.log("Error fetching note");
      });
  }, [fetchNote, customerId]);

  // All Forms

  const {
    register: registerLead,
    handleSubmit: submitLead,
    formState: leadFormState,
    // setValue: setLeadValue,
  } = useForm();

  const {
    register: registerReminder,
    handleSubmit: submitReminder,
    formState: reminderFormState,
    setValue: setReminderValue,
  } = useForm();

  // All Hooks
  useEffect(() => {
    console.log("reminder use effect ran");

    let currentCustomer = customerLeads.find(
      (item) => item.customer_id === customerId
    );
    setCustomerDetails(currentCustomer);
    setSelectedCategory(currentCustomer?.lead?.category?.id || "");
    setBasicDetailValue("state", currentCustomer?.location?.state || ""); // set the state value in the form

    axiAuth
      .get("api/vendor/lead-configs")
      .then(({ data }) => {
        setLeadConfigs(data);
        setLeadSource(
          data.sources.find((e) => e.source_name === currentCustomer.lead.name)
            .source_id
        );

        setLeadStatus(
          data.statuses.find(
            (status) => status.status_name === currentCustomer.lead.status
          ).status_id
        );
      })
      .catch((err) => {
        console.log("Error fetching lead-configs");
      });

    axiAuth
      .get("api/reminders-type")
      .then(({ data }) => {
        setMeetingTypes(data.reminders);
      })
      .catch((err) => {
        console.log("Error fetching reminder-type");
      });

    axiAuth
      .get(`api/vendor/customers/${customerId}`)
      .then(({ data }) => {
        // setCustomerDocuments(data.customer.documents);
        const time = data.customer?.reminder?.appointment_at;

        const splitted = time.split("");
        splitted.splice(6, 0, "2", "0");
        const newTime = splitted.join("");
        const newTimeToArray = newTime.split("/");
        const first = newTimeToArray[0];
        newTimeToArray[0] = newTimeToArray[1];
        newTimeToArray[1] = first;
        const newTimeToString = newTimeToArray.join("/");

        setDate(new Date(Date.parse(newTimeToString)));

        console.log(data);
        setCustomerReminder(data.customer.reminder);
        setReminderOn(data.customer.reminder.status === 1 ? true : false);
        setMeetingType(data.customer.reminder.meeting_type.id);
        setReminderValue("subject", data.customer.reminder.subject);
        setCustomerImages(data.customer.images);
      })
      .catch((err) => {
        console.log("Error fetching reminder");
      });
  }, [customerId, customerLeads, setBasicDetailValue, setReminderValue]);

  // All Form Handlers
  const basicHandler = (data) => {
    // console.log(data);

    if (!gstVerified && data.gstin.length > 0) {
      setGstError("Please verify your GST");
      toast.warn("Please verify your GST");
      return;
    }
    setIsEdit(false);

    const custData = {
      ...data,
      location: {
        street: data.street,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    };
    if (!data.email) {
      custData["email"] = null;
    }
    axiAuth
      .put(`api/vendor/customers/${customerId}`, custData)
      .then(({ dt }) => {
        let address =
          data.city && data.state
            ? (data.city ? data.city : "N/A") +
              "," +
              (data.state ? data.state : "N/A")
            : "N/A";
        const basicDetail = {
          ...data,
          location: {
            city: data.city,
            state: data.state,
            street: data.street,
            pincode: data.pincode,
          },
          address: address,
        };
        const updateRedux = customerLeads.map((item) => {
          if (item.customer_id === customerId) {
            return { ...item, ...basicDetail };
          } else {
            return item;
          }
        });
        dispatch(setCustomerLeads(updateRedux));
        setCustomerDetails({ ...customerDetails, ...basicDetail });
      })
      .catch((err) => {
        console.log("Something went wrong!!");
      });
  };

  const leadsEditHandler = (data) => {
    setLeadsEdit(false);
    const leadData = {
      ...data,
      amount: data.amount ? parseInt(data.amount) : null,
    };
    axiAuth
      .put(`api/vendor/customers/${customerDetails.customer_id}`, leadData)
      .then(({ res }) => {
        let leadData = {
          lead: {
            name: leadConfigs.sources.find(
              (e) => e.source_id === data.lead_source_id
            ).source_name,
            status: leadConfigs.statuses.find(
              (e) => e.status_id === data.lead_status_id
            ).status_name,
            amount: data.amount,
            category: categories.find(
              (e) => e.category_id === data.category_id
            ),
          },
          product: categories.find((e) => e.category_id === data.category_id)
            ? categories.find((e) => e.category_id === data.category_id).name
            : "N/A",
          status: leadConfigs.statuses
            ?.find((e) => e.status_id === data.lead_status_id)
            .status_name?.toUpperCase(),
        };
        const updateRedux = customerLeads.map((item) => {
          if (item.customer_id === customerId) {
            return { ...item, ...leadData };
          } else {
            return item;
          }
        });
        dispatch(setCustomerLeads(updateRedux));
        setCustomerDetails({ ...customerDetails, ...leadData });
      })
      .catch((err) => {
        console.log("Something went wrong!!", err);
      });
  };

  const reminderEditHandler = (data) => {
    if (reminderEdit) {
      const reminderData = {
        ...data,
        appointment_at: formateToSqlDateWithMoment(date),
        customer_id: customerDetails.customer_id,
        status: true,
      };

      axiAuth
        .post("api/vendor/customer-reminders", reminderData)
        .then(({ item }) => {
          setCustomerReminder({
            ...customerReminder,
            appointment_at: formateToSqlDateWithMoment(date),
            subject: data.subject,
            meeting_type: {
              id: meetingTypes.find((e) => e.id === data.reminder_type_id).id,
              label: meetingTypes.find((e) => e.id === data.reminder_type_id)
                .name,
            },
          });
          setMeetingType(data.reminder_type_id);
          setReminderEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReminderEdit(true);
    }
  };

  const reminderBackHandler = () => {
    setReminderEdit((prev) => !prev);
  };

  const noteCreateHandle = (e) => {
    e.preventDefault();
    let noteData = {
      customer_id: customerId,
      text: e.target[0].value,
    };

    axiAuth
      .post(`api/vendor/customer-notes`, noteData)
      .then(({ data }) => {
        setCustomerNotes([...customerNotes, noteData]);
        setFetchNote((prev) => !prev);
      })
      .catch((err) => {
        console.log("Error fetching note");
      });

    e.target.reset();
  };

  const editNoteHandler = (noteId) => {
    const upNotes = customerNotes.map((note) => {
      if (note.note_id === noteId) {
        return { ...note, isEdit: !note.isEdit };
      } else {
        return note;
      }
    });
    setCustomerNotes(upNotes);
  };

  const noteEditHandel = (e, note_id) => {
    e.preventDefault();
    let noteData = {
      customer_id: customerId,
      text: e.target[0].value,
    };

    axiAuth
      .put(`/api/vendor/customer-notes/${note_id}`, noteData)
      .then((res) => {
        // Successfully creating notes
        if (res.status === 200) {
          toast.success("Note updated successfully");

          editNoteHandler(note_id);
          setFetchNote((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log("Error fetching note");
      });
  };

  const [docDeleteConfirm, setDocDeleteConfirm] = useState({
    role: "Document",
    isOpen: false,
    title: "Delete Document?",
    message: "Document will be deleted permanently once you continue!",
    cacheRole: "User",
  });

  const [noteDeleteConfirm, setNoteDeleteConfirm] = useState({
    role: "Note",
    isOpen: false,
    title: "Delete Note?",
    message: "Note will be deleted permanently once you continue!",
    cacheRole: "User",
  });

  const [deleteDocId, setDeleteDocId] = useState("");
  const [deleteNoteId, setDeleteNoteId] = useState("");

  const handleDocDeleteClick = (doc_id) => {
    setDocDeleteConfirm({
      ...docDeleteConfirm,
      isOpen: true,
    });
    setDeleteDocId(doc_id);
  };

  const handleNoteDeleteClick = (note_id) => {
    setNoteDeleteConfirm({
      ...noteDeleteConfirm,
      isOpen: true,
    });

    setDeleteNoteId(note_id);
  };

  const deleteNoteHandler = () => {
    if (!deleteNoteId) return;
    axiAuth
      .delete(
        `api/vendor/customer-notes/${deleteNoteId}?customer_id=${customerId}`
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Note deleted successfully");
          setNoteDeleteConfirm({
            ...noteDeleteConfirm,
            isOpen: false,
          });
          setFetchNote((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log("Error deleting note", err);
      });
  };

  // All Button Handlers
  const biddingTabChangeHandler = (e, newValue) => {
    setCustomerProfileTabs(0);
  };

  const handleReminderChange = (event) => {
    setReminderOn(event.target.checked);

    const reminderData = {
      appointment_at: formateToSqlDateWithMoment(
        customerReminder?.appointment_at
      ),
      subject: customerReminder?.subject || "Reminder subject",
      customer_id: customerId,
      reminder_type_id: meetingType || 1,
      status: event.target.checked,
    };

    if (event.target.checked) {
      setReminderEdit(true);
      setCustomerReminder((prev) => ({
        ...prev,
        status: event.target.checked,
      }));
      return;
    } else {
      axiAuth
        .post("api/vendor/customer-reminders", reminderData)
        .then(({ data }) => {
          setCustomerReminder((prev) => ({
            ...prev,
            status: event.target.checked,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [];
  for (let index = 0; index < 50; index++) {
    rows.push(createData("Price per pay", 262, 16.0, 24, 6.0));
  }

  const watchGst = basicDetailWatch("gstin");
  // console.log(watchGst, 'watchGst =====================');
  // console.log(basicDetailFormState?.dirtyFields, 'dirty fields =====================');
  // console.log(customerDetails.gstin, 'customerDetails gst =====================');

  useEffect(() => {
    if (watchGst && basicDetailFormState?.dirtyFields.gstin) {
      setGstVerified(false);
      setGstError("Click on verify to verify your GST");
    } else if (watchGst && !basicDetailFormState?.dirtyFields.gstin) {
      setGstVerified(true);
      setGstError("");
    } else {
      if (customerDetails.gstin) {
        setGstVerified(true);
        setGstError("");
      }
    }
  }, [
    watchGst,
    setGstError,
    setGstVerified,
    basicDetailFormState?.dirtyFields.gstin,
    customerDetails?.gstin,
  ]);

  const handleDocumentUpload = (e) => {
    setDocumentModalOpen(false);

    const documents = formatDocumentUrl0(documents1);

    if (documents.length > 0) {
      axiAuth
        .put(`api/vendor/customers/${customerId}/others/update`, {
          documents,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Document updated successfully");
            setDocuments1([]);
            setFetchDocuments((prev) => !prev);
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.response.data.message);
        });
    } else {
      setDocuments1([]);
    }
  };

  useEffect(() => {
    if (!photos.every((photo) => photo.url)) return;
    if (photos.length > 0) {
      axiAuth
        .put(`api/vendor/customers/${customerId}/others/update`, {
          images: photos.map((photo) => photo.url),
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Photos updated successfully");
            setPhotos([]);
            setFetchImages((prev) => !prev);
            setCustomerImages(res.data.images);
          }
        });
    }
  }, [photos, setPhotos, customerId, setFetchImages, setCustomerImages]);

  const deleteDocument = () => {
    console.log("Document delete will go here");
    axiAuth
      .delete(
        `api/vendor/customer-documents/${deleteDocId}?customer_id=${customerId}`
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Document deleted successfully");
          setDocDeleteConfirm({
            ...docDeleteConfirm,
            isOpen: false,
          });
          setFetchDocuments((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    if (customerId) {
      axiAuth
        .get(`api/quotations`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.quotations);
            setQuotations(res.data.quotations);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [customerId]);

  const [quotationToBeEdited, setQuotationToBeEdited] = useState(null);
  const [getAQuotePage, setGetAQuotePage] = useState(0);

  return (
    <div>
      <RightDrawer
        drawerStyles={{ backgroundColor: "#fff" }}
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        anchor={`${window.innerWidth < 600 ? "bottom" : "right"}`}
      >
        <EnquiryDetailsWrapper>
          <IconButton
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
            onClick={() => setRightDrawerOpen(false)}
          >
            <CloseIcon sx={{ color: "primary.dark" }} />
          </IconButton>
          <DrawerContent sx={{ p: [0, 2] }}>
            <AvatarBox sx={{ paddingLeft: ["1rem", 0] }}>
              <Avatar
                alt="Remy Sharp"
                src="https://pbs.twimg.com/profile_images/732870043894226944/cPycYUfA_400x400.jpg"
                style={{
                  width: "70px",
                  height: "70px",
                  marginRight: "1.5rem",
                }}
              />
              <div>
                <Typography variant="h6" sx={{ my: 1 }}>
                  {customerDetails?.name || "n/a"} <br /> Customer Id: &nbsp; #
                  {customerDetails?.customer_id || "n/a"}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {customerDetails?.email && (
                    <PrimaryButton sx={{ mr: 2, px: 2 }} IconStart={EmailIcon}>
                      Email
                    </PrimaryButton>
                  )}

                  {customerDetails?.phone && (
                    <PrimaryButton sx={{ mr: 2, px: 2 }} IconStart={CallIcon}>
                      Call
                    </PrimaryButton>
                  )}
                </Box>
              </div>
            </AvatarBox>

            <TabsWrapper
              noPadding={true}
              sx={{ background: "transparent", boxShadow: "none" }}
            >
              <SolrufTabPanel
                tabs={["Customer Profile"]}
                activeTab={customerProfileTabs}
                handleTabChange={biddingTabChangeHandler}
                sx={{
                  "& .MuiButtonBase-root": {
                    fontSize: ".9rem",
                    paddingTop: "0rem",
                  },
                  "& .MuiTabs-flexContainer": {
                    borderBottom: "2px solid #e0e0e0",
                  },
                }}
              />
              {customerProfileTabs === 0 && (
                <>
                  {/* BASIC DETAILS ACCORDION */}
                  <BasicDetailsAccordion
                    isEdit={isEdit}
                    customerDetails={customerDetails}
                    setIsEdit={setIsEdit}
                    submitBasicDetail={submitBasicDetail}
                    basicHandler={basicHandler}
                    registerBasicDetail={registerBasicDetail}
                    gstVerified={gstVerified}
                    basicDetailFormState={basicDetailFormState}
                    gstError={gstError}
                    control={control}
                    statesOfIndia={statesOfIndia}
                    gstVerifying={gstVerifying}
                    verifyGst={verifyGst}
                    watchGst={watchGst}
                  />

                  {/*  ========= leads accordion ========= */}
                  <LeadsAccordion
                    leadsEdit={leadsEdit}
                    submitLead={submitLead}
                    leadsEditHandler={leadsEditHandler}
                    setLeadsEdit={setLeadsEdit}
                    leadSource={leadSource}
                    registerLead={registerLead}
                    leadFormState={leadFormState}
                    leadConfigs={leadConfigs}
                    leadStatus={leadStatus}
                    selectedCategory={selectedCategory}
                    customerDetails={customerDetails}
                    categories={categories}
                  />

                  {/*  ========= Reminders section ========= */}
                  <ReminderSection
                    reminderOn={reminderOn}
                    handleReminderChange={handleReminderChange}
                    reminderEdit={reminderEdit}
                    customerReminder={customerReminder}
                    submitReminder={submitReminder}
                    reminderEditHandler={reminderEditHandler}
                    reminderBackHandler={reminderBackHandler}
                    date={date}
                    setDate={setDate}
                    meetingType={meetingType}
                    registerReminder={registerReminder}
                    reminderFormState={reminderFormState}
                    meetingTypes={meetingTypes}
                  />

                  <QuotationAccordion
                    quotations={quotations}
                    setQuotations={setQuotations}
                    setQuoteModalOpen={setQuoteModalOpen}
                    setQuotationToBeEdited={setQuotationToBeEdited}
                    getAQuotePage={getAQuotePage}
                    setGetAQuotePage={setGetAQuotePage}
                  />

                  {/* ====== Quotation modal ====== */}
                  <SolrufModal2
                    open={quoteModalOpen}
                    onClose={() => {
                      setQuoteModalOpen(false);
                      setQuotationToBeEdited(null);
                      setGetAQuotePage(0);
                    }}
                    mobileTitle="Back to Dashboard"
                    title="Get A Quote"
                  >
                    <GetAQuote
                      page={getAQuotePage}
                      setPages={setGetAQuotePage}
                      customerId={customerId}
                      quotationToBeEdited={quotationToBeEdited}
                    />
                  </SolrufModal2>

                  {/* ========= photos and documents accordion */}
                  <PhotosDocumentAccordion
                    photos={photos}
                    setPhotos={setPhotos}
                    customerImages={customerImages}
                    setFetchImages={setFetchImages}
                    setDocumentModalOpen={setDocumentModalOpen}
                    customerDocuments={customerDocuments}
                    handleDocDeleteClick={handleDocDeleteClick}
                    documentModalOpen={documentModalOpen}
                    documents1={documents1}
                    setDocuments1={setDocuments1}
                    handleDocumentUpload={handleDocumentUpload}
                  />

                  {/* ========= Notes accordion ========= */}
                  <NotesAccordion
                    setCreateNote={setCreateNote}
                    createNote={createNote}
                    noteCreateHandle={noteCreateHandle}
                    customerNotes={customerNotes}
                    noteEditHandel={noteEditHandel}
                    editNoteHandler={editNoteHandler}
                    handleNoteDeleteClick={handleNoteDeleteClick}
                  />
                </>
              )}

              {customerProfileTabs === 1 && (
                <Box sx={{ p: 2 }}>
                  <OrdersAccordion rows={rows} />

                  <EnquiriesAccordion rows={rows} />
                </Box>
              )}
            </TabsWrapper>
          </DrawerContent>
        </EnquiryDetailsWrapper>
      </RightDrawer>

      {/*  ===================== note deleting confirmation modal ===================== */}

      <ConfirmDialog
        confirmDialog={{
          ...noteDeleteConfirm,
          onConfirm: deleteNoteHandler,
        }}
        setConfirmDialog={setNoteDeleteConfirm}
        variant="warning"
      />

      <ConfirmDialog2
        confirmDialog={{
          ...docDeleteConfirm,
          onConfirm: deleteDocument,
        }}
        setConfirmDialog={setDocDeleteConfirm}
        variant="warning"
      />
    </div>
  );
};

export default CustomerDetailsDrawer;
