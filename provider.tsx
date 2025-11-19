"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { UserDetailContext } from "./context/UserDetailContext";

export type UsersDetail={
  name: string;
  email: string;
  credits: number;
}
interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      createNewUser(user);
    }
  }, [isLoaded, isSignedIn, user]);

  const createNewUser = async (user: typeof useUser extends () => { user: infer U } ? U : null) => {
      if (!user) return;
      try {
        const result = await axios.post("/api/users", {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0]?.emailAddress,
        });
        console.log("User created:", result.data);
        setUserDetail(result.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
export default Provider;
