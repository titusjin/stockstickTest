import { createSlice } from '@reduxjs/toolkit';

import {data as initialD} from '../utils/data/initialData.js';

/** 
 * payload likes:
 * 
 */
const initialState = {
  currentData: initialD,
  page: 0,
};
export const stockDataSlice = createSlice({
  name: 'stockDataSlice',
  initialState,
  reducers: {
    reduceData: (state, action) => {
      // console.info('in reducer reduceData: ', action.payload);
      state.currentData = action.payload;
      state.page = state.page - 1;
    },
    fetchMoreData: (state, action) => {
      state.currentData = action.payload;
      state.page = state.page + 1;
    },
  },
});

export const { reduceData, fetchMoreData }
  = stockDataSlice.actions;
export default stockDataSlice.reducer;
