"use client";
import React, { useEffect, useRef, useState, use } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ADMIN_URL } from "@/app/utils/constants/constants";
import http from "@/app/utils/interceptors/auth";
import Loader from "@/app/utils/common/Loader";
import AdminLayout from "@/app/utils/layouts/AdminLayout";
import ItemCard from "@/app/utils/common/ItemCard";
import AddItemsModal from "@/app/utils/common/AddItemsModal";

import {
  getAllSaloons,
  getAllServices,
  getAllWorkers,
} from "@/app/utils/services/admin";
import { isEmpty } from "@/app/utils/services/helper";

export default function Page({ params }) {
  const { section } = use(params);
  const { id } = use(params);

  const [data, setData] = useState();
  const [workers, setWorkers] = useState();
  const [services, setServices] = useState();
  const [saloons, setSaloons] = useState();
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [refresh, setRefresh] = useState(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [filteredItems, setFilteredItems] = useState();
  const [workerSectionViewModal, setWorkerSectionViewModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const inputRefs = useRef({});

  const serviceType = "service";
  const saloonType = "saloon";

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    getItemDetails();
    const servicesResponse = await getAllServices();
    const workersResponse = await getAllWorkers();
    const saloonsResponse = await getAllSaloons();

    setServices(servicesResponse);
    setWorkers(workersResponse);
    setSaloons(saloonsResponse);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      if (section == "saloons") {
        setName(data.name || "");
        setAddress(data.location || "");
      } else {
        setServiceName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setDuration(data.duration);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.workHours) {
      Object.keys(data.workHours).forEach((dayName) => {
        if (!inputRefs.current[dayName]) {
          inputRefs.current[dayName] = {
            open: React.createRef(),
            close: React.createRef(),
          };
        }
      });
    }
  }, [data?.workHours]);

  const getItemDetails = async () => {
    try {
      http.get(`${ADMIN_URL}/api/${section}/${id}`).then((response) => {
        if (response.data) setData(response?.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const updateSaloonDetails = () => {
    if (!isEmpty(name) && !isEmpty(address)) {
      try {
        const formattedWorkHours = {};

        const dayOfWeekEnum = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };

        for (const [dayName, refs] of Object.entries(inputRefs.current)) {
          const normalizedDayName = capitalize(dayName);
          const enumKey = dayOfWeekEnum[normalizedDayName];

          if (
            enumKey !== undefined &&
            refs?.open?.current &&
            refs?.close?.current
          ) {
            const openTime = refs.open.current.value;
            const closeTime = refs.close.current.value;

            // Convert hh:mm or hh:mm:ss to seconds
            const toSeconds = (timeStr) => {
              const [h, m, s] = timeStr.split(":").map(Number);
              return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
            };

            const openSec = toSeconds(openTime);
            let closeSec = toSeconds(closeTime);

            // Handle overnight shift: close after midnight
            if (closeSec <= openSec) {
              closeSec += 24 * 3600; // add 24 hours
            }

            if (openSec >= closeSec) {
              toast.error(
                `Opening time must be before closing time for ${normalizedDayName}`
              );
              return; // Stop update
            }

            formattedWorkHours[enumKey] = {
              Open: openTime,
              Close: closeTime,
            };
          } else {
            console.warn(`Skipping invalid day: ${dayName}`);
          }
        }

        // Submit updated data
        http
          .put(`${ADMIN_URL}/api/saloons`, {
            SaloonId: id,
            Name: name,
            Location: address,
            WorkHours: formattedWorkHours,
          })
          .then(() => {
            setRefresh(!refresh);
            toast.success("Successfully updated saloon");
          });
      } catch (error) {
        console.error("Failed to update saloon details:", error);
      }
    } else {
      toast.error("One or more of the required fields are empty");
    }
  };

  const updateServiceDetails = async () => {
    if (
      !isEmpty(serviceName) &&
      !isEmpty(description) &&
      !isEmpty(price) &&
      !isEmpty(duration)
    ) {
      try {
        const payload = {
          ServiceId: id,
          Name: serviceName,
          Description: description,
          Price: parseFloat(price),
          Duration: duration.includes(":") ? duration : `${duration}:00`,
        };
        console.log(payload);

        await http.put(`${ADMIN_URL}/api/${section}`, payload).then(() => {
          setRefresh(!refresh);
          toast.success("Successfully updated saloon");
        });
      } catch (error) {}
    } else {
      toast.error("One of the required fields is empty");
    }
  };

  const renderSaloonSection = () => (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {data?.name}
      </h1>
      <div className="flex gap-20">
        <div>
          {/* Saloon Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">ID</label>
              <input
                defaultValue={data?.id}
                type="text"
                readOnly
                className="border rounded-md p-2 bg-gray-50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="border rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Location</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                className="border rounded-md p-2"
              />
            </div>
          </div>

          {/* Workers */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Workers
            </h2>
            <div className="grid gap-4 items-center">
              {data?.workers.map((worker, index) => (
                <ItemCard
                  key={index}
                  toast={toast}
                  refresh={refresh}
                  section={section}
                  setRefresh={setRefresh}
                  id={id}
                  item={worker}
                />
              ))}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded-md max-w-fit p-2 justify-center items-center text-2xl bg-[#E0D2C3] text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Work Hours */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Work Hours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.workHours &&
                Object.entries(data.workHours).map(
                  ([dayName, times], index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md shadow-sm bg-gray-50"
                    >
                      <label className="block text-gray-700 font-medium capitalize mb-2">
                        {dayName}
                      </label>
                      <div className="flex gap-2">
                        <input
                          ref={inputRefs.current[dayName]?.open}
                          defaultValue={times.open}
                          type="time"
                          step={1}
                          className="border p-2 rounded w-1/2"
                        />
                        <input
                          ref={inputRefs.current[dayName]?.close}
                          defaultValue={times.close}
                          type="time"
                          step={1}
                          className="border p-2 rounded w-1/2"
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => updateSaloonDetails()}
          className="rounded-md max-w-fit p-2 cursor-pointer justify-center items-center text-2xl bg-[#E0D2C3] text-white"
        >
          Update
        </button>
      </div>

      <AddItemsModal
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        section={section}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        items={(workers || []).filter(
          (worker) => !(data?.workers || []).some((w) => w.id === worker.id)
        )}
      />
    </>
  );

  const renderWorkerSection = () => (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {data?.firstName} {data?.lastName}
      </h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">ID</label>
          <input
            defaultValue={data?.id}
            type="text"
            readOnly
            className="border rounded-md p-2 bg-gray-50"
          />
        </div>
      </div>

      {/* Saloons */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Saloons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.saloons.map((saloon, index) => (
            <ItemCard
              key={index}
              addType={saloonType}
              toast={toast}
              refresh={refresh}
              setRefresh={setRefresh}
              id={id}
              section={section}
              item={saloon}
            />
          ))}
          <button
            onClick={() => {
              setWorkerSectionViewModal(true);
              setModalType("saloon");
              setFilteredItems(
                (saloons || []).filter(
                  (saloon) =>
                    !(data?.saloons || []).some((s) => s.id === saloon.id)
                )
              );
            }}
            className="rounded-md max-w-fit p-2 justify-center items-center text-2xl bg-[#E0D2C3] text-white"
          >
            Add
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.services.map((service, index) => (
            <ItemCard
              key={index}
              toast={toast}
              addType={serviceType}
              refresh={refresh}
              setRefresh={setRefresh}
              id={id}
              section={section}
              item={service}
            />
          ))}
          <button
            onClick={() => {
              setWorkerSectionViewModal(true);
              setModalType("service");
              setFilteredItems(
                (services || []).filter(
                  (service) =>
                    !(data?.services || []).some((s) => s.id === service.id)
                )
              );
            }}
            className="rounded-md max-w-fit p-2 justify-center items-center text-2xl bg-[#E0D2C3] text-white"
          >
            Add
          </button>
        </div>
      </div>
      {console.log(services)}
      <AddItemsModal
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        section={section}
        type={modalType}
        modalIsOpen={workerSectionViewModal}
        setIsOpen={setWorkerSectionViewModal}
        items={filteredItems}
      />
    </>
  );

  const renderServiceSection = () => (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Name</label>
            <input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              type="text"
              className="border rounded-md p-2 bg-gray-50"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">ID</label>
            <input
              defaultValue={data?.serviceId}
              type="text"
              readOnly
              className="border rounded-md p-2 bg-gray-50"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Duration</label>
            <input
              value={duration || ""}
              onChange={(e) => setDuration(e.target.value)}
              type="text"
              className="border rounded-md p-2 bg-gray-50"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Price</label>
            <input
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="border rounded-md p-2 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Description</label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-2 bg-gray-50"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Workers</h2>
          <div className="grid gap-4 items-center grid-cols-[repeat(auto-fit,minmax(auto,10rem))]">
            {data?.workers.map((worker, index) => (
              <ItemCard
                key={index}
                toast={toast}
                refresh={refresh}
                section={section}
                setRefresh={setRefresh}
                id={id}
                item={worker}
              />
            ))}
            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-md max-w-fit p-2 justify-center items-center text-2xl bg-[#E0D2C3] text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => updateServiceDetails()}
            className="rounded-md cursor-pointer max-w-fit p-2 justify-center items-center text-2xl bg-[#E0D2C3] text-white"
          >
            Update
          </button>
        </div>
      </div>
      <AddItemsModal
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        section={section}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        items={(workers || []).filter(
          (worker) => !(data?.workers || []).some((w) => w.id === worker.id)
        )}
      />
    </>
  );

  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AdminLayout />
          <section className="flex absolute top-[2rem] left-[8rem] items-center mt-10 right-0 rounded-lg bg-white z-50 h-[92vh]">
            <div className="w-[60vw] mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
              {section === "saloons" && renderSaloonSection()}
              {section === "workers" && renderWorkerSection()}
              {section === "services" && renderServiceSection()}
            </div>
          </section>
        </>
      )}
    </>
  );
}
