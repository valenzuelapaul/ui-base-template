import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

type ModalStateProps = {
  isOpen: boolean;
  modalContent: any; // Temp: need to have specific ModalProps
};

const initialState: ModalStateProps = {
  isOpen: false,
  modalContent: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    setModal: (state, action) => {
      // console.log('payload: ', action.payload);
      state.modalContent = action.payload;
    },
  },
});

export const { setModal } = modalSlice.actions;

export const selectModalContent = (state: RootState) =>
  state.modal.modalContent;

export default modalSlice.reducer;
