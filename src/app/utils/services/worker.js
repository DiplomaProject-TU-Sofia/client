import { CATALOG_URL } from "../constants/constants";
import http from "../interceptors/auth";

export const mapReservations = (apiData) => {
  const dataSource = [];

  if (Array.isArray(apiData) && apiData.length > 0) {
    apiData.forEach((day) => {
      day.reservations.forEach((res, index) => {
        dataSource.push({
          Id: res.id,
          StartTime: new Date(res.startTime),
          EndTime: new Date(res.endTime),
          Subject: `${res.blockTitle}${res.isPaid==true? "- Paid":""}`||``,
          Description: res.blockDescription || ``,
          isPaid: res.isPaid
        });
      });
    });
  }
  return { dataSource };
};

export const createNewReservation = async (data, setIsLoading, toast) => {
  const item = Array.isArray(data) ? data[0] : data;

  const localStartTimeDate = new Date(item.StartTime);
  const utcStartTimeDate = new Date(
    Date.UTC(
      localStartTimeDate.getFullYear(),
      localStartTimeDate.getMonth(),
      localStartTimeDate.getDate(),
      localStartTimeDate.getHours(),
      localStartTimeDate.getMinutes(),
      localStartTimeDate.getSeconds()
    )
  );
  const startTime = utcStartTimeDate.toISOString();

  const localEndTimeDate = new Date(item.EndTime);
  const utcEndTimeDate = new Date(
    Date.UTC(
      localEndTimeDate.getFullYear(),
      localEndTimeDate.getMonth(),
      localEndTimeDate.getDate(),
      localEndTimeDate.getHours(),
      localEndTimeDate.getMinutes(),
      localEndTimeDate.getSeconds()
    )
  );
  const endTime = utcEndTimeDate.toISOString();

  const mappedReservation = {
    blockTitle: item.Subject || null,
    blockDescription: item.Description || null,
    startTime: startTime,
    endTime: endTime,
  };

  try {
    setIsLoading(true);
    await http
      .post(`${CATALOG_URL}/api/worker-reservations`, mappedReservation)
      .then(() => {
        setIsLoading(false);
        toast.success("Successfully created reservation");
      });
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const updateExistingReservation = async (data, setIsLoading, toast) => {
  const item = Array.isArray(data) ? data[0] : data;

  const localStartTimeDate = new Date(item.StartTime);
  const utcStartTimeDate = new Date(
    Date.UTC(
      localStartTimeDate.getFullYear(),
      localStartTimeDate.getMonth(),
      localStartTimeDate.getDate(),
      localStartTimeDate.getHours(),
      localStartTimeDate.getMinutes(),
      localStartTimeDate.getSeconds()
    )
  );
  const startTime = utcStartTimeDate.toISOString();

  const localEndTimeDate = new Date(item.EndTime);
  const utcEndTimeDate = new Date(
    Date.UTC(
      localEndTimeDate.getFullYear(),
      localEndTimeDate.getMonth(),
      localEndTimeDate.getDate(),
      localEndTimeDate.getHours(),
      localEndTimeDate.getMinutes(),
      localEndTimeDate.getSeconds()
    )
  );
  const endTime = utcEndTimeDate.toISOString();

  const mappedReservation = {
    Id: item.Id,
    startTime: startTime,
    endTime: endTime,
  };

  try {
    setIsLoading(true);
    await http
      .put(`${CATALOG_URL}/api/worker-reservations`, mappedReservation)
      .then(() => {
        setIsLoading(false);
        toast.success("Successfully updated reservation");
      });
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const deleteReservation = async (data, setIsLoading, toast) => {
  const item = Array.isArray(data) ? data[0] : data;

  try {
    setIsLoading(true);
    await http
      .delete(`${CATALOG_URL}/api/worker-reservations/${item.Id}`)
      .then(() => {
        setIsLoading(false);
        toast.success("Successfully deleted reservation");
      });
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const fetchAndMapReservations = async (setReservations) => {
  try {
    const apiResponse = await getWorkerReservations();
    const mappedApiResponse = mapReservations(apiResponse);
    setReservations(mappedApiResponse);
  } catch (err) {
    console.error("Failed to fetch reservations:", err);
  }
};

export const onActionComplete = (args, setIsLoading, toast) => {
  if (args.requestType === "eventCreated")
    createNewReservation(args.addedRecords, setIsLoading, toast);

  if (args.requestType === "eventChanged")
    updateExistingReservation(args.changedRecords, setIsLoading, toast);

  if (args.requestType === "eventRemoved")
    deleteReservation(args.deletedRecords, setIsLoading, toast);
};

export const onPopupOpen = (args) => {
  if (args.type === "Editor") {
    args.cancel = true; // This cancels the default editor popup
  }
};

function createDateTimeVariables() {
  const today = new Date();
  const fromYear = today.getFullYear();
  const fromMonth = String(today.getMonth() + 1).padStart(2, "0");
  const fromDay = String(today.getDate()).padStart(2, "0");
  const from = `${fromYear}-${fromMonth}-${fromDay}T01:00:00`;

  // Create 'to' = one month from today at 23:59:59
  const toDate = new Date(today);
  toDate.setMonth(toDate.getMonth() + 1);
  const toYear = toDate.getFullYear();
  const toMonth = String(toDate.getMonth() + 1).padStart(2, "0");
  const toDay = String(toDate.getDate()).padStart(2, "0");
  const to = `${toYear}-${toMonth}-${toDay}T23:59:59`;

  return [from, to];
}

const getWorkerReservations = async () => {
  const [from, to] = createDateTimeVariables();

  try {
    const response = await http.get(
      `${CATALOG_URL}/api/worker-reservations?from=${from}&to=${to}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
