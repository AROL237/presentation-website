import MenuListComponent from "@/components/common/MenuListComponent";
import SocialLinks from "@/components/common/SocialLinks";
import Image from "next/image";
import logo from "@/public/images/logo/logo_2.jpeg";

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="justify-items-center mx-auto ">
        <Image src={logo} alt="logo" className=" bg-cover w-40  rounded-md" />
        {/* <Label className="text-2xl font-bold uppercase">logo</Label> */}
      </div>

      <div className="grid justify-center  grid-cols-1 space-y-2  mx-auto">
        <MenuListComponent />
      </div>
      <div
        id="socail_links"
        className="flex flex-row  gap-4 justify-center  md:grid-cols-2  py-3"
      >
        <SocialLinks />
      </div>
      
    </>
  );
}
