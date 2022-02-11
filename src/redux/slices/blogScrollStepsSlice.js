import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   scrollSteps: [
      { stepName: 'panels', isInView: false },
      { stepName: 'inverters', isInView: false },
      { stepName: 'earthingKit', isInView: false },
      { stepName: 'chargeController', isInView: false },
      { stepName: 'batteries', isInView: false },
      { stepName: 'lightningArrestor', isInView: false },
      { stepName: 'pvMeter', isInView: false },
      { stepName: 'netMeter', isInView: false },
      { stepName: 'cables&wires', isInView: false },
      { stepName: 'solarJunction', isInView: false },
      { stepName: 'earthingKit', isInView: false },
      { stepName: 'chargeController', isInView: false },
   ],
};

export const scrollStepsSlice = createSlice({
   name: 'scrollSteps',
   initialState,
   reducers: {
      changeSteps: (state, action) => {
          console.log(action);
         state.scrollSteps = state.scrollSteps.map((step) => {
            if (step.stepName === action.payload.stepName) {
               return { ...step, isInView: action.payload.isInView };
            }
            return { ...step, isInView: false };
         });
      },
   },
});

// Action creators are generated for each case reducer function
export const { changeSteps } = scrollStepsSlice.actions;

export default scrollStepsSlice.reducer;
