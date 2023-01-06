import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { RootState } from '../store';

const initialState = {
  uid: "",
  email: "",
  logged: false
}

export const rdxSignOut = createAsyncThunk("users/signout" , async () => {
  const res = await signOut(auth);
});

export const rdxSignUp = createAsyncThunk(("users/signup"), async ({email, password}: { email: string, password:string }) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user;
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const { email, uid } = action.payload;
      if (email && uid) {
        state.uid = uid
        state.email = email;
        state.logged = true;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(rdxSignOut.fulfilled, (state) => {
        state.uid = ""
        state.email = "";
        state.logged = false
      })
      .addCase(rdxSignUp.fulfilled, (state, action) => {
        const { email, uid } = action.payload;
        if (email && uid) {
          state.uid = uid
          state.email = email;
          state.logged = true
        }
      })
  },
});



export const selectUserData = (state: RootState) => state.users
export const { addUser } = usersSlice.actions
export default usersSlice.reducer;