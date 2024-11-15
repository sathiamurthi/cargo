// src/context/ProfileContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext"; // Import UserContext
import { ROLES } from "../constants/roles";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({ displayName: "", userPrincipalName: "" });
  const { setUserRole } = useContext(UserContext); // Access setUserRole

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileData = sessionStorage.getItem("profileData");
        if (!profileData) {
          const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
            },
          });
          profileData = response.data;
          sessionStorage.setItem("profileData", JSON.stringify(profileData));
        } else {
          profileData = JSON.parse(profileData);
        }

        setProfile(profileData); // Set the profile state

        // Ensure userPrincipalName exists
        if (!profileData.userPrincipalName) {
          throw new Error("UserPrincipalName is missing from profile data.");
        }

        // Fetch user role from the new API endpoint using path parameter
        const encodedEmail = encodeURIComponent(profileData.userPrincipalName);
        const roleResponse = await axios.get(`http://localhost:7071/api/getUserRole/${encodedEmail}`);

        // Assume `roleResponse.data.userRole` contains the role returned by the API
        const tempRole = roleResponse.data.userRole;

        // Use switch case to determine role based on the returned `userRole`
        let userRole;
        switch (tempRole.toUpperCase()) {
          case "LEADER":
            userRole = ROLES.LEADER;
            break;
          case "BIZOPS":
            userRole = ROLES.BIZOPS;
            break;
          case "MANAGER":
            userRole = ROLES.MANAGER;
            break;
          case "EMPLOYEE":
            userRole = ROLES.EMPLOYEE;
            break;
          default:
            userRole = ROLES.LEADER; // Default to EMPLOYEE if no match
        }

        setUserRole(userRole); // Update userRole in UserContext
      } catch (error) {
        console.error("Error fetching profile or user role:", error);
      }
    };
    fetchProfile();
  }, [setUserRole]);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
