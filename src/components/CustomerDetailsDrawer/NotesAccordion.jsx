import React, { Fragment } from "react";
import { AccordionDetails, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import { QueryCreationBox, Textarea } from "./customerDetailsDrawer.style";

const NotesAccordion = ({
  setCreateNote,
  createNote,
  noteCreateHandle,
  customerNotes,
  noteEditHandel,
  editNoteHandler,
  handleNoteDeleteClick,
}) => {
  return (
    <CustomAccordionForDrawer
      title="+ Notes"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        // boxShadow: 0,
        "& .MuiAccordionSummary-root": {
          // borderBottom: '1px solid #D0D7D9',
        },
      }}
    >
      <QueryCreationBox>
        <PrimaryButton
          sx={{ px: 2, mb: 0.5 }}
          onClick={() => setCreateNote(!createNote)}
          IconStart={AddIcon}
        >
          note
        </PrimaryButton>
        {createNote && (
          <>
            <form onSubmit={noteCreateHandle}>
              <Textarea
                rows="3"
                placeholder="Write Your note.."
                style={{
                  backgroundColor: "#f3f3f3",
                }}
              ></Textarea>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  my: 1,
                }}
              >
                <PrimaryButton
                  variant="secondary"
                  onClick={() => setCreateNote(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton
                  sx={{ px: 2 }}
                  IconStart={SendIcon}
                  type="submit"
                >
                  Post
                </PrimaryButton>
              </Box>
            </form>
          </>
        )}
      </QueryCreationBox>

      {customerNotes.map((item, i) => {
        return (
          <Fragment key={item.note_id}>
            {item?.isEdit ? (
              <CustomAccordionForDrawer
                note={{ ...item, index: i }}
                paddingOff
                pt={false}
                // title={`Edit note ${i + 1}`}
                titleStyle={{
                  fontSize: "1rem",
                }}
                sx={{
                  m: 2,
                  px: 0,
                  boxShadow: 0,
                  "& .MuiAccordionSummary-root": {
                    background: "#F3F3F3",
                    borderBottom: "1px solid #D0D7D9",
                    color: "rgba(0,0,0,0.67) !important",
                  },
                }}
              >
                <AccordionDetails
                  className="text-right"
                  sx={{
                    color: "#4D4D4D",
                    background: "#F3F3F3",
                    padding: "0",
                    px: 2,
                    py: 1,
                    borderRadius: "0 0 10px 10px",
                  }}
                >
                  <form onSubmit={(e) => noteEditHandel(e, item.note_id)}>
                    <Textarea
                      rows="3"
                      defaultValue={item?.text}
                      placeholder="Update Your note.."
                      sx={{
                        background: "white",
                      }}
                    ></Textarea>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        my: 1,
                      }}
                    >
                      <PrimaryButton
                        variant="secondary"
                        onClick={() => editNoteHandler(item.note_id)}
                        sx={{
                          mr: 2,
                          color: "black",
                        }}
                      >
                        Cancel
                      </PrimaryButton>
                      <PrimaryButton
                        sx={{ px: 2.5 }}
                        variant="contained"
                        type="submit"
                      >
                        Submit
                      </PrimaryButton>
                    </Box>
                  </form>
                </AccordionDetails>
              </CustomAccordionForDrawer>
            ) : (
              <CustomAccordionForDrawer
                note={{ index: i, item }}
                paddingOff
                pt={false}
                titleStyle={{
                  fontSize: "1rem",
                }}
                sx={{
                  margin: "16px 0 16px 16px",
                  px: 0,
                  boxShadow: 0,
                  "& .MuiAccordionSummary-root": {
                    background: "#F3F3F3",
                    borderBottom: "1px solid #D0D7D9",
                    color: "rgba(0,0,0,0.67) !important",
                  },
                }}
              >
                <AccordionDetails
                  className="text-right"
                  sx={{
                    color: "#4D4D4D",
                    background: "#F3F3F3",
                    padding: "4px",
                    borderRadius: "0 0 10px 10px",
                  }}
                >
                  <span>
                    <AccessTimeFilledIcon sx={{ mb: 0.2 }} /> 05:23 AM
                  </span>
                  <span className="mx-4">23 Jun 2022</span>
                  <Button
                    variant="text"
                    sx={{
                      color: "#666F73",
                      textTransform: "none",
                    }}
                    onClick={() => editNoteHandler(item.note_id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "#F20519",
                      textTransform: "none",
                    }}
                    onClick={() => handleNoteDeleteClick(item.note_id)}
                  >
                    Delete
                  </Button>
                </AccordionDetails>
              </CustomAccordionForDrawer>
            )}
          </Fragment>
        );
      })}
    </CustomAccordionForDrawer>
  );
};

export default NotesAccordion;
