import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import fetchAPI from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Customer } from "@/types/customer";
import {
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
} from "@/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: Customer | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  info: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      login: async (payload) => {
        const res = await fetchAPI.post<ApiResponse<LoginResponseData>>(
          "/login",
          payload
        );

        if (!res.data.success) {
          throw new Error(res.data.message || "Login failed");
        }

        const { accessToken } = res.data.data;

        set({
          isAuthenticated: true,
          token: accessToken,
        });

        await get().info();
      },

      register: async (payload) => {
        const res = await fetchAPI.post<ApiResponse<LoginResponseData>>(
          "/register",
          payload
        );

        if (!res.data.success) {
          throw new Error(res.data.message || "Registration failed");
        }

        const { accessToken } = res.data.data;

        set({
          isAuthenticated: true,
          token: accessToken,
        });

        await get().info();
      },

      info: async () => {
        const userRes = await fetchAPI.get<ApiResponse<Customer>>("/customer");
        if (!userRes.data.success) {
          throw new Error("Failed to fetch user profile");
        }

        set({
          user: userRes.data.data,
        });
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, user: null });
        localStorage.removeItem("union-cart-id");
      },
    }),
    {
      name: "union-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
);
