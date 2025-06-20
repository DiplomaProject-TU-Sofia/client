import Modal from "react-modal";
import React, { useState, useRef, useEffect } from "react";
import { ADMIN_URL, MODAL_STYLES } from "../constants/constants";
import http from "../interceptors/auth";
import { toast } from "react-toastify";

Modal.setAppElement("body");

export default function AddItemsModal({
  refresh,
  setRefresh,
  id,
  section,
  modalIsOpen,
  setIsOpen,
  items,
  type,
}) {
  useEffect(() => {
    Modal.setAppElement("#app-root");
  }, []);

  const [selectedDays, setSelectedDays] = useState([]);
  const workerSelectRef = useRef(null);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let sectionSingular;
  let payload;

  if (section == "services" || type==="service") sectionSingular = "service";
  else sectionSingular = "saloon";

  const handleAddingWorker = () => {
    const selectedWorkerId = workerSelectRef.current.value;
    if (
      selectedWorkerId &&
      id &&
      (section === "services" ||
        (section === "saloons" && selectedDays.length > 0) ||
        (section === "workers" && type==="saloon" && selectedDays.length > 0) ||
        (section === "workers" && type === "service"))
    ) {
      try {
        if (section == "services") {
          payload = {
            WorkerId: selectedWorkerId,
            ServiceId: id,
          };
        } else if (type === "service") {
          payload = {
            WorkerId: id,
            ServiceId: selectedWorkerId,
          };
        }else if (type === "saloon") {
          payload = {
            WorkerId: id,
            SaloonId: selectedWorkerId,
            WorkingDays: selectedDays
          };
        } else {
          payload = {
            WorkerId: selectedWorkerId,
            SaloonId: id,
            WorkingDays: selectedDays,
          };
        }
        http
          .post(`${ADMIN_URL}/api/worker-${sectionSingular}`, payload)
          .then(() => {
            toast.success("New worker successfully added");
            setRefresh(!refresh);
            setIsOpen(false);
          });
      } catch (error) {
        toast.error("Something went wrong");
        setIsOpen(false);
      }
    } else {
      console.warn("Fill the form");
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={MODAL_STYLES}
        contentLabel="Add new worker"
      >
        <div className="p-3 pl-20 pr-20  flex flex-col gap-10">
          {type === "service" || type==="saloon" ? (
            <h1 className="text-2xl text-[#E0D2C3] font-bold">
              Add new {type}
            </h1>
          ) : (
            <h1 className="text-2xl text-[#E0D2C3] font-bold">
              Add new worker
            </h1>
          )}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              {type === "service" || type==="saloon" ? (
                <label>Worker ID</label>
              ) : (
                <label>{sectionSingular.toUpperCase()} ID</label>
              )}
              <input
                className="border rounded-md p-2 w-[25vw] text-center"
                type="text"
                disabled
                value={id}
              />
            </div>
            <div className="flex flex-col gap-2">
              {type === "service" || type==="saloon" ? (
                <label>Choose {type}</label>
              ) : (
                <label>Choose Worker</label>
              )}

              <select
                ref={workerSelectRef}
                className="border rounded-md p-2 w-[25vw]"
              >
                {Array.isArray(items) &&
                  items.map((item, index) =>
                    type === "service" || type==="saloon" || type=="worker" ? (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ) : (
                      <option key={index} value={item.id}>
                        {item.firstName + " " + item.lastName}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {section == "saloons" || (section=="workers" && type==="saloon") ? (
                <>
                  <label>Select Working Days</label>
                  <div className="grid grid-cols-2 gap-2">
                    {daysOfWeek.map((day) => (
                      <label key={day} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={day}
                          checked={selectedDays.includes(day)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSelectedDays((prevDays) =>
                              isChecked
                                ? [...prevDays, day]
                                : prevDays.filter((d) => d !== day)
                            );
                          }}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex justify-evenly">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[#E0D2C3] text-white p-2 w-16 rounded-md"
              >
                Close
              </button>
              <button
                onClick={() => handleAddingWorker()}
                className="bg-[#E0D2C3] text-white p-2 w-16 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
