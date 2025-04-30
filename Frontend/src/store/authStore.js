import { create } from "zustand";
import axios from "axios";

// Helper functions to manage localStorage
const saveToLocalStorage = (user, isAuthenticated) => {
  if (user && isAuthenticated) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};

// Get initial state from localStorage
const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return { user, isAuthenticated };
  } catch (error) {
    console.log(error);
    return { user: null, isAuthenticated: false };
  }
};

const { user: initialUser, isAuthenticated: initialIsAuthenticated } =
  getInitialState();

export const useAuthStore = create((set) => ({
  user: initialUser,
  isAuthenticated: initialIsAuthenticated,
  error: null,
  isLoading: false,
  isCheckingAuth: false,
  message: null,

  signup: async (email, password, phone, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
        email,
        password,
        phone,
        name,
      });

      // Save to localStorage
      saveToLocalStorage(response.data.user, true);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  login: async ( phone) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signinByPhone`,
        {
          phone,
        }
      );

      // Save to localStorage
      saveToLocalStorage(response.data.user, true);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  signinEmail:async(email,password)=>{
    set({ isLoading: true, error: null });
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/signinEmail`,
            {
              email,password
            }
          );
          saveToLocalStorage(response.data.user, true);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }); 
    }catch(err){
        set({
            error: err.response?.data?.message || err.message,
            isLoading: false,
          });
          throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`);

      // Clear localStorage
      clearLocalStorage();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/check-auth`
      );

      // Save to localStorage
      saveToLocalStorage(response.data.user, true);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      // Clear localStorage on auth check failure
      clearLocalStorage();

      set({
        user: null,
        error: err.response?.data?.message || err.message,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },
}));
