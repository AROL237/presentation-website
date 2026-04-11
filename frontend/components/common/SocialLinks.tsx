import React from "react";
import data from "@/steps.json";
import { Label } from "radix-ui";
import CustomLink from "./CustomLink";
import facebook from "@/public/images/logo/facebook.png";
import whatsapp from "@/public/images/logo/whatsapp.png";
import linkedin from "@/public/images/logo/linkedin.png";
import Image from "next/image";

export default function SocialLinks() {
  const list = data.social_link;
  const ListItems = () =>
    list.map((items, index) => {
      var icon = null;
      if (items.name == "facebook") icon = facebook;
      else if (items.name == "linkedin") icon = linkedin;
      else if (items.name == "whatsapp") icon = whatsapp;
      else icon = "";
      return (
        <div key={index}>
          <CustomLink href={items.url} title={items.name} className="">
            <Image alt={items.name} src={icon} className="size-6  " />
          </CustomLink>
        </div>
      );
    });

  return <ListItems />;
}
