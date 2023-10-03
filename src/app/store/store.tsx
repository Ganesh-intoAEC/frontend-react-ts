// Create a file named store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallLog {
  value: string;
  comment: string;
  createdDate: Date;
  editedDate?: Date;
}

// Define the initial state
const initialState: CallLog[] = [];

// Create a slice for call logs
const callLogSlice = createSlice({
  name: 'callLogs',
  initialState,
  reducers: {
    addCallLog: (state, action: PayloadAction<CallLog>) => {
      state.push(action.payload);
    },
    editCallLog: (state, action: PayloadAction<{ index: number; log: CallLog }>) => {
      const { index, log } = action.payload;
      state[index] = log;
    },
    deleteCallLog: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addCallLog, editCallLog, deleteCallLog } = callLogSlice.actions;

export interface RootState {
  callLogs: CallLog[]; // Define the structure to match your actual state
}
// Create the Redux store
export const store = configureStore({
  reducer: {
    callLogs: callLogSlice.reducer,
  },
});
