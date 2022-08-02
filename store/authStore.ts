//zustand is how we are managing state
//allows us to keep users logged in in local storage
//we can call the useAuthStore as a hook from any component in our code
import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }), //remove user from local storage

  // get all users from database
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    
    set({ allUsers: response.data });
  }

});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
);

export default useAuthStore;