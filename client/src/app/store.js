import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/studentAuth/studentSlice';
import employerReducer from '../features/employerAuth/employerSlice';
import jobReducer from '../features/job/jobSlice';
import adminReducer from '../features/adminAuth/adminSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    studentauth: studentReducer,
    employerauth: employerReducer,
    job: jobReducer,
    post: postReducer,
    adminauth: adminReducer
  },
})
