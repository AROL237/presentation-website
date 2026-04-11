import React from "react";
import steps from "@/steps.json";
import { Label } from "../../components/ui/label";
import { useTheme } from "next-themes";

export default function StepCard() {
  const { theme } = useTheme();
  const ListOfSteps = () => {
    return steps.list_of_steps.map((item, index) => (
      <div key={index} className="rounded-md  ">
        <div className="  border   p-3 min-h-24 max-w-60 rounded-sm shadow-amber-800">
          <div className=" flex flex-row gap-3 ">
            <Label className=" text-amber-600 text-md font-extrabold ">
              {item.step}
              {"."}
            </Label>
            <h2 className={` font-bold capitalize   `}>{item.title}</h2>
          </div>
          <div>
            <Label
              htmlFor=""
              className="tracking-wide  leading-5  line-clamp-2"
            >
              {item.description}
            </Label>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="pb-5 w-full mx-auto justify-items-center">
        <h2 className="  text-2xl">GUIDE</h2>
      </div>
      <div className=" grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-5 md:justify-center ">
        <ListOfSteps />
      </div>
    </div>
  );
}
