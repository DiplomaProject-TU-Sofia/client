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
      className="flex z-10 relative justify-between cursor-pointer flex-wrap items-center bg-white p-5 shadow-lg"
    >
      <div
        
        className="absolute z-20 top-0 right-0 rounded-full h-5 w-5 bg-red-500 text-white text-xl flex items-center justify-center"
      >
        <DeleteCardButton refresh={refresh} setRefresh={ setRefresh } section={section} id={ data.id } />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <Image
          src={"/assets/testImage.webp"}
          width={100}
          height={100}
          alt="image"
        />
        {renderCardContent()}
      </div>
    </div>
  );
}
