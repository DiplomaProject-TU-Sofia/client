import { ADMIN_URL, CATALOG_URL } from "../constants/constants";
import http from "../interceptors/auth";

export const getAllWorkers = async () => {
  try {
    return await http
      .get(`${ADMIN_URL}/api/workers`)
      .then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllSaloons = async () => {
  try {
    return await http
      .get(`${ADMIN_URL}/api/saloons`)
      .then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async () => {
  try {
    return await http.get(`${ADMIN_URL}/api/services`).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSaloonsByService = async (serviceId) => {
  try {
    const query = `$filter=SaloonWorkers/any(w: w/Worker/WorkerServices/any(ws: ws/ServiceId eq ${serviceId}))`;
    const url = `${ADMIN_URL}/api/saloons?${query}`;
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saloons by service:", error);
  }
};

export const getWorkersBySaloonAndService = async (serviceId) => {
  try {
    const query = `$filter=WorkerServices/any(ws: ws/ServiceId eq ${serviceId})`;
    const response = await http.get(`${ADMIN_URL}/api/workers?${query}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch workers by saloon and service:", error);
    return [];
  }
};

export const getAvailableHours = async (
  serviceId,
  saloonId,
  workerId,
  date
) => {
  try {
    const response = await http.get(
      `${CATALOG_URL}/api/user-reservations/available-timeslots?serviceId=${serviceId}&saloonId=${saloonId}&workerId=${workerId}&from=${date}T00:01:00&to=${date}T23:59:00`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};