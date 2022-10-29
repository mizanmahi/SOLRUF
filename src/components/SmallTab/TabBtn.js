import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)`
  font-family: "Inter";
  color: #000000;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  width: 100%;

  // height: 3.5vh;
  // padding-top : 1.4px;

  border: none;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #faecca;
  }

  &:focus {
    color: #000000;
    border-radius: 1000px;
    outline: 2px solid #ffd05b;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #ffd05b;
    color: #000000;
    pointer-events: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  width: "60vh",
  marginTop: "30px",
  backgroundColor: "#FFFFFF",
  borderRadius: "1000px",
  padding: "0.18vh",
  paddingTop: "1.9px",
  display: "flex",
  border: "1px solid #666F73",
  "@media (max-width: 680px)": {
    width: "40vh",
    paddingTop: "1.5px",
  },
}));
export default function TabBtn({ tabName, tabChange, sx }) {
  return (
    <TabsUnstyled defaultValue={0}>
      <center>
        <TabsList sx={{ ...sx }}>
          {tabName.map((item, idx) => {
            return (
              <Tab key={`tab${idx}`} onClick={tabChange}>
                {item}
              </Tab>
            );
          })}
        </TabsList>
      </center>
    </TabsUnstyled>
  );
}
