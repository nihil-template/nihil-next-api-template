import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iSignInRes } from '@/types/api.types';

interface IAuth {
  userInfo: iSignInRes;
}

const initialState: IAuth = {
  userInfo: null,
};

const authReducer = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setUserInfo(
      state,
      { payload, }: PayloadAction<{ userInfo: iSignInRes }>
    ) {
      state.userInfo = payload.userInfo;
    },
    resetUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, resetUserInfo, } = authReducer.actions;
export default authReducer.reducer;
