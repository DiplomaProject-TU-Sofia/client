"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../utils/layouts/AdminLayout";
import { ADMIN_PAGE_URL } from "../utils/constants/constants";
import Loader from "../utils/common/Loader";

export default function page() {
  const [isLoading, setLoader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.replace("/not-found");
    } else {
      setLoader(false);
    }
  }, []);
  
  return (
    <>
      {
        isLoading?
          <Loader/>:
          <AdminLayout/>
      }
    </>
  );
}
