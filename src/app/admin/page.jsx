"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../utils/layouts/AdminLayout";
import { ADMIN_PAGE_URL } from "../utils/constants/constants";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.replace("/not-found");
    } else { 
      router.push(`${ADMIN_PAGE_URL}/saloons`)
    }
  });
  
  return (
    <AdminLayout/>
  );
}
