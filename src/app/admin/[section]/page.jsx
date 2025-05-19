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
  const [refresh, setRefresh] = useState()
  const [modalIsOpen , setIsOpen] = useState(false)
  const params = useParams();
  const section = params.section;

  useEffect(() => {
   getData()
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
  }
  return (
    <>
      <AdminLayout />
      <div className="grid grid-cols-4 h-[70vh] place-items-start justify-start m-10">
        {isLoading ? (
          <Loader />
        ) : (
          data.map((element, index) => (
            <DisplayCard refresh={refresh } setRefresh={ setRefresh } section={section} data={element} key={index} />
          ))
        )}
        <div className="flex flex-col justify-center items-center">
          <button onClick={()=>setIsOpen(true)} className=" bg-[#E0D2C3] rounded-lg text-center pl-10 mt-20 text-white text-xl">
            Add <span className="ml-8 pr-3 pl-3 border-l-2">+</span>
          </button>
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
