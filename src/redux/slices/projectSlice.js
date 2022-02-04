import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   projectToBeEdited: null,
   projects: [],
};

export const projectSlice = createSlice({
   name: 'project',
   initialState,
   reducers: {
      setProjects: (state, action) => {
         state.projects = action.payload;
      },
      setProjectToBeEdited: (state, action) => {
         state.projectToBeEdited = action.payload;
      },
      removeProjectToBeEdited: (state, action) => {
         state.projectToBeEdited = null;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProjectToBeEdited, removeProjectToBeEdited, setProjects } =
   projectSlice.actions;

export default projectSlice.reducer;
