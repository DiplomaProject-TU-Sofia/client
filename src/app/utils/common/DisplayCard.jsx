import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import http from "../interceptors/auth";
import { ADMIN_URL } from "../constants/constants";
import DeleteCardButton from "./DeleteCardButton";
export default function DisplayCard({ refresh, setRefresh, section, data }) {
  const router = useRouter();
  const pathName = usePathname();

  const openCardDetails = () => {
    router.push(`${pathName}/${data.id}`);
  };

  const renderCardContent = () => {
    switch (section) {
      case "workers":
        return (
          <>
            <h1>
              {data.firstName} {data.lastName}
            </h1>
          </>
        );
      case "saloons":
        return (
          <>
            <h1 className="font-bold">{data.name}</h1>
            <span>{data.location}</span>
          </>
        );
      case "services":
        return (
          <>
            <h1 className="font-bold">{data.name}</h1>
            <span>{data.description}</span>
          </>
        );
      default:
        return (
          <>
            <h1 className="font-bold">No data available</h1>
          </>
        );
    }
  };

  return (
  <div
  onClick={() => openCardDetails()}
  className="relative z-10 flex flex-col gap-4 cursor-pointer items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group w-[260px]" // fixed width
>
  {/* Delete Button */}
  <div className="absolute top-3 right-3 z-20">
    <div className="bg-red-500 hover:bg-red-600 transition text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-md">
      <DeleteCardButton
        refresh={refresh}
        setRefresh={setRefresh}
        section={section}
        id={data.id}
      />
    </div>
  </div>

  {/* Content */}
  <div className="flex flex-col items-center text-center gap-4">
    <Image
      src="/assets/testImage.webp"
      width={100}
      height={100}
      alt="image"
      className="rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
    />
    <div className="text-gray-700 font-medium text-base break-words">
      {renderCardContent()}
    </div>
  </div>
</div>
  );
}
