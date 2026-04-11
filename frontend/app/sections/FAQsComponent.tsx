import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";
import data from "@/steps.json";
import { useTheme } from "next-themes";

export default function FAQsComponent() {
  const { theme } = useTheme();
  const [faqs, setFaqs] = useState(data.Faqs);
  const QuestionAnswerComponent = () =>
    faqs.map((q, index) => {
      return (
        <AccordionItem
          key={index}
          value={index.toString()}
          className="border  p-2 rounded-md "
        >
          <AccordionTrigger className="hover:cursor-pointer">
            <span className={`ps-2 font-bold `}>
              {" "}
              {q.question}
              {"  "}?
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-accent-foreground  bg-accent rounded-xs px-2 py-4">
            {q.answer}
          </AccordionContent>
        </AccordionItem>
      );
    });
  return (
    <div className=" ">
      <div className=" p-1 justify-items-center rounded-md border lg:p-10 shadow  w-fit mx-auto">
        <div className="pb-5 w-full mx-auto justify-items-center">
          <h2 className="  text-2xl">Questions & Answers</h2>
        </div>
        <Accordion
          className=" p-2  gap-2 rounded-md md:w-3xl"
          type="single"
          defaultValue={"0"}
        >
          <QuestionAnswerComponent />
        </Accordion>
      </div>
    </div>
  );
}
