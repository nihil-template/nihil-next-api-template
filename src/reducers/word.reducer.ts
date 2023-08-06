import { createSlice } from '@reduxjs/toolkit';

interface IWord {
  text: string;
}

const initialState: IWord = {
  text: 'JavaScript',
};

const wordReducer = createSlice({
  name: 'word',
  initialState,
  reducers: {
    changeWord(state) {
      if (state.text === 'JavaScript') {
        state.text = 'TypeScript';
      } else {
        state.text = 'JavaScript';
      }
    },
  },
});

export const { changeWord, } = wordReducer.actions;
export default wordReducer.reducer;
