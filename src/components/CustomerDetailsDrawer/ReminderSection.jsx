import React from "react";
import { MenuItem, Typography, Box } from "@mui/material";
import FeatureDetail from "../FeatureDetail/FeatureDetail";

import DateRangeIcon from "@mui/icons-material/DateRange";
import SolrufTextField from "../TextField/TextField";

import BackToButton from "../BackToButton/BackToButton";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import DatePickerWithTime from "../Custom/DatePickerWithTime/DatePickerWithTime";
import SolrufSwitch from "../Custom/SolrufSwitch/SolrufSwitch";

// tables
import EventIcon from "@mui/icons-material/Event";
import SubjectIcon from "@mui/icons-material/Subject";
import { Flex, FormWrapper, ReminderBox } from "./customerDetailsDrawer.style";

const ReminderSection = ({
  reminderOn,
  handleReminderChange,
  reminderEdit,
  customerReminder,
  submitReminder,
  reminderEditHandler,
  reminderBackHandler,
  date,
  setDate,
  meetingType,
  registerReminder,
  reminderFormState,
  meetingTypes,
}) => {
  return (
    <ReminderBox>
      <Flex sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "#000",
            mr: 2.5,
            ml: 1.5,
          }}
        >
          Reminder
        </Typography>
        <SolrufSwitch
          sx={{ mt: 0.8, py: 0.5 }}
          checked={reminderOn}
          onChange={handleReminderChange}
        />
      </Flex>
      {reminderOn && (
        <Box>
          {reminderEdit || !customerReminder ? (
            <Box
              component="form"
              onSubmit={submitReminder(reminderEditHandler)}
            >
              <FormWrapper sx={{ pt: 0 }}>
                <BackToButton sx={{ mb: 2 }} onClick={reminderBackHandler}>
                  Back
                </BackToButton>

                <Flex
                  sx={
                    {
                      // flexDirection: {
                      //    xs: 'column',
                      //    md: 'row',
                      // },
                    }
                  }
                >
                  <DatePickerWithTime
                    value={date}
                    setValue={setDate}
                    label="Appointment"
                    sx={{
                      width: "100%",
                      mt: 0.4,
                      mb: [2, 0],
                      maxWidth: "100% !important",
                    }}
                  />
                  <SolrufTextField
                    select
                    label="Meeting Type"
                    defaultValue={meetingType}
                    sx={{ ml: [0, 2] }}
                    {...registerReminder("reminder_type_id", {
                      required: {
                        value: true,
                        message: "Select meeting type",
                      },
                    })}
                    error={reminderFormState.errors.reminder_id}
                    helperText={
                      reminderFormState.errors.reminder_id
                        ? reminderFormState.errors.reminder_id.message
                        : ""
                    }
                  >
                    {meetingTypes.map(({ id, name }) => (
                      <MenuItem value={id}>{name}</MenuItem>
                    ))}
                  </SolrufTextField>
                </Flex>

                <Flex sx={{ mt: 2 }}>
                  <SolrufTextField
                    label="Subject"
                    {...registerReminder("subject", {
                      required: {
                        value: true,
                        message: "Subject is required",
                      },
                    })}
                    error={reminderFormState.errors.subject}
                    helperText={
                      reminderFormState.errors.subject
                        ? reminderFormState.errors.subject.message
                        : ""
                    }
                  />
                </Flex>
              </FormWrapper>
              <PrimaryButton
                fullWidth
                type="submit"
                sx={{
                  borderRadius: "0 0 10px 10px",
                  background: "primary.main",
                }}
              >
                Save Reminder
              </PrimaryButton>
            </Box>
          ) : (
            <>
              <Box>
                <Flex
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      minWidth: "50%",
                    }}
                  >
                    <FeatureDetail
                      icon={<EventIcon />}
                      title="Appointment"
                      value={customerReminder?.appointment_at}
                    />
                    <FeatureDetail
                      icon={<SubjectIcon />}
                      title="Subject"
                      value={customerReminder?.subject}
                    />
                  </Box>
                  <Box>
                    <FeatureDetail
                      icon={<DateRangeIcon />}
                      title="Meeting Type"
                      value={customerReminder?.meeting_type?.label}
                    />
                  </Box>
                </Flex>
              </Box>
              <PrimaryButton
                fullWidth
                sx={{
                  borderRadius: "0 0 10px 10px",
                  background: "#D0D7D9",
                }}
                onClick={reminderEditHandler}
              >
                Edit
              </PrimaryButton>
            </>
          )}
        </Box>
      )}
    </ReminderBox>
  );
};

export default ReminderSection;
