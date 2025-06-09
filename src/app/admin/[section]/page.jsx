"use client";
import React, { useEffect, useState } from "react";
import DisplayCard from "../../utils/common/DisplayCard";
import http from "../../utils/interceptors/auth";
import { useParams } from "next/navigation";
import { ADMIN_URL } from "@/app/utils/constants/constants";
import AdminLayout from "@/app/utils/layouts/AdminLayout";
import Loader from "@/app/utils/common/Loader";
import CreateModal from "@/app/utils/common/CreateModal";

export default function page() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const params = useParams();
  const section = params.section;

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      http.get(`${ADMIN_URL}/api/${section}`).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AdminLayout />
      <div className="flex absolute top-[5rem] left-[8rem] right-0 rounded-lg bg-white z-40">
        <div className="grid relative top-0 right-0 left-0 grid-cols-4 h-[77vh] gap-5 place-items-start justify-start m-10 rounded-xl bg-white z-50 ">
          {isLoading ? (
            <Loader />
          ) : (
            data.map((element, index) => (
              <DisplayCard
                refresh={refresh}
                setRefresh={setRefresh}
                section={section}
                data={element}
                key={index}
              />
            ))
          )}
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="mt-20 bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white text-xl font-semibold py-3 px-6 rounded-full shadow-md flex items-center gap-4"
            >
              Add
              <span className="text-2xl bg-white text-cyan-600 w-8 h-8 flex items-center justify-center rounded-full shadow-inner">
                +
              </span>
            </button>
          </div>
        </div>
      </div>
      <CreateModal
        section={section}
        setRefresh={setRefresh}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
