import React, { useState } from "react";

export default function SelectMenu({activeStep}) {
  const [step, setStep] = useState([
    { title: "Service" },
    { title: "Salon details" },
    { title: "Hairdresser" },
    { title: "Payment" },
  ]);

  return (
    <select className="w-[20vw] border rounded-2xl p-4">
      <option disabled selected>
        {activeStep.title}
      </option>
      <option>Option1</option>
      <option>Option2</option>
      <option>Option3</option>
      <option>Option4</option>
      <option>Option5</option>
    </select>
  );
}
