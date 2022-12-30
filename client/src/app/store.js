import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/studentAuth/studentSlice'
import employerReducer from '../features/employerAuth/employerSlice'
import jobReducer from '../features/job/jobSlice'

export const store = configureStore({
  reducer: {
    studentauth: studentReducer,
    employerauth: employerReducer,
    job: jobReducer
  },
})
