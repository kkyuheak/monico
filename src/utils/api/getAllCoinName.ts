import { api } from "@/api/axiosInstance";

export const getAllCoinName = async () => {
  try {
    const response = await api.get("market/all?is_details=true");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching coin names:", error);
    throw error;
  }
};
