import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";
import React from "react";

export default function ContactCompoent() {
  return (
    <div
      id="contant"
      className=" justify-center w-full md:w-2xl justify-items-center rounded-md  border md:p-10  p-3 py-8 flex flex-col gap-10 shadow"
    >
      <div className="mx-auto">
        <h2 className=" text-5xl tracking-wider  font-semibold ">
          Get in Touch
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="gap-2 flex flex-col">
          <Label className="capitalize">name</Label>
          <Input type="text" placeholder="Your name" />
        </div>
        <div className="gap-2 flex flex-col">
          <Label>Email:</Label>
          <Input type="text" placeholder="...@gmail.com" />
        </div>
        <div className="mx-auto pt-4">
          <Button
            variant={"default"}
            size={"lg"}
            className="uppercase text-md md:tex-xl f font-semibold p-5 hover:cursor-pointer"
          >
            send
          </Button>
        </div>
        {/* <div className="flex flex-row-reverse gap-1 on hover:text-amber-600 cursur">
          <MailIcon />
          <Label>placeholder@yaho.com</Label>
        </div> */}
      </div>
    </div>
  );
}
