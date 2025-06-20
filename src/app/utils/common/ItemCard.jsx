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

    if (section === "services") {
      sectionSingular = "service";
      payload = {
        data: {
          workerId: item.id,
          serviceId: id,
        },
      };
    } else if (section === "saloons") {
      sectionSingular = "saloon";
      payload = {
        data: {
          workerId: item.id,
          saloonId: id,
        },
      };
    } else if (section === "workers" && addType === "saloon") {
      sectionSingular = "saloon";
      payload = {
        data: {
          workerId: id,
          saloonId: item.id,
        },
      };
    } else if (section === "workers" && addType === "service") {
      sectionSingular = "service";
      payload = {
        data: {
          workerId: id,
          serviceId: item.id,
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
          toast.success(`A worker has been successfully removed`);
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
        <div className="flex items-center gap-2 px-3 py-1 border-2 border-[#E0D2C3] rounded-full bg-white shadow-sm max-w-fit">
          <span className="text-[#5A4C3B] font-medium text-base">
            {item?.firstName && item?.lastName
              ? `${item.firstName} ${item.lastName}`
              : item?.name}
          </span>
          <button
            onClick={() => removeItem()}
            className="text-[#5A4C3B] hover:text-white hover:bg-[#E0D2C3] transition-colors duration-200 rounded-full p-1 w-6 h-6 flex items-center justify-center"
            aria-label="Remove"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
