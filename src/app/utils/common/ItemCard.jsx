import React from "react";
import http from "../interceptors/auth";
import { ADMIN_URL } from "../constants/constants";
import Loader from "./Loader";

export default function ItemCard({
  section,
  toast,
  addType,
  refresh,
  setRefresh,
  id,
  item,
}) {
  let isLoading;
  const removeItem = async () => {
    isLoading = true;
    let sectionSingular;
    let payload;
    
if (section === "services" || (section === "workers" && addType === "service")) {
  sectionSingular = "service";
  payload = {
    data: {
      workerId: item.id,
      serviceId: id,
    },
  };
} else if (section === "saloons" || (section === "workers" && addType === "saloon")) {
  sectionSingular = "saloon";
  payload = {
    data: {
      workerId: item.id,
      saloonId: id,
    },
  };
}
    try {
      console.log(item);
      await http
        .delete(`${ADMIN_URL}/api/worker-${sectionSingular}`, payload)
        .then(() => {
          isLoading = false;
          setRefresh(!refresh);
          toast.success(`Worker with id: ${item.id} has been removed`);
        });
    } catch (error) {
      toast.error("Something went wrong:" + error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-1 max-w-fit max-h-fit border-2 items-center whitespace-nowrap border-[#E0D2C3] rounded-md">
          <h1 className="bg-[#E0D2C3] text-white text-2xl p-1">
            {item?.firstName !== undefined && item?.lastName !== undefined
              ? `${item.firstName} ${item.lastName}`
              : item?.name}
          </h1>
          <button
            onClick={() => removeItem()}
            className="bg-[#E0D2C3] text-white text-2xl p-1"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
