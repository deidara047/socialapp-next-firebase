import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { RootState } from '../store';

const initialState = {
  uid: "",
  email: "",
  logged: false,
  finished: false
}

export const rdxSignOut = createAsyncThunk("users/signout" , async () => {
  await signOut(auth);
});

export const rdxSignUp = createAsyncThunk("users/signup", async ({email, password, description}: { email: string, password:string, description: string }) => {
  if(email === "" || password === "" || description === "") {
    throw new Error("Some inputs are blank");
  }
  
  const res = await createUserWithEmailAndPassword(auth, email, password);
  // Now the Id is also the Uid for ease the development
  const userAdded = await setDoc(doc(db, "users", res.user.uid ), {
    uid: res.user.uid,
    email: res.user.email,
    description
  });

  console.log(userAdded)
  return {email: res.user.email, uid: res.user.uid};
})

export const rdxSignIn = createAsyncThunk("users/signin", async ({email, password}: { email: string, password:string }) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return {email: res.user.email, uid: res.user.uid};
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
      state.finished = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(rdxSignOut.fulfilled, (state) => {
        state.uid = ""
        state.email = "";
        state.logged = false
      })
      .addCase(rdxSignIn.fulfilled, (state, action) => {
        const { email, uid } = action.payload;
        if (email && uid) {
          state.uid = uid
          state.email = email;
          state.logged = true
        }

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