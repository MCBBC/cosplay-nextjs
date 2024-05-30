import Image from "next/image";
import Favicon from "@/public/images/favicon.ico";
import { Divider } from "@nextui-org/react";

export default function TitleHeader() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative top-0  z-10 md:z-0">
        <div className="flex items-center justify-center py-3 px-4">
          <Image
            src={Favicon}
            alt="网站图标"
            className="w-10 h-10 mr-4"
            unoptimized
          />
          <div className="text-lg font-semibold">Share Cosplay</div>
        </div>
      </div>
      <Divider />
    </>
  );
}
