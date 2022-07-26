//zustand is how we are managing state
//allows us to keep users logged in in local storage
//we can call the useAuthStore as a hook from any component in our code
import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }), //remove user from local storage

});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
);

export default useAuthStore;