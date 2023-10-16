import axios from "axios";

export const registrationService = {
  addUser: async (data) => {
    return await axios.post(`/use`, data, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  },
};
