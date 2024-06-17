"use client";
import { Avatar, Image, Input } from "@nextui-org/react";
import { useState } from "react";

export function CoserBackgroundImage({
  onBackUrlChange,
}: {
  onBackUrlChange: Function;
}) {
  const [backUrl, setBackUrl] = useState("");
  const handleValueChange = (value: string) => {
    setBackUrl(value);
    onBackUrlChange(value); // 调用父组件的函数
  };
  return (
    <div className="relative w-full" style={{ paddingBottom: "25%" }}>
      <Input
        className="absolute top-0 left-0 right-0 bottom-0 z-20"
        type="email"
        variant="underlined"
        value={backUrl}
        onValueChange={handleValueChange}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          classNames={{
            img: "object-cover rounded-none h-full w-full",
            wrapper:
              "!max-w-full h-full w-full top-0 let-0 bottom-0 right-0 rounded-none",
          }}
          src={backUrl}
          alt="background"
        />
      </div>
    </div>
  );
}

export function CoserBackground({
  name,
  onBackUrlChange,
}: {
  name: string;
  onBackUrlChange: Function;
}) {
  const [avatar, setAvatar] = useState("");
  return (
    <div className="relative">
      <CoserBackgroundImage onBackUrlChange={onBackUrlChange} />
      <div className="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
        <Avatar
          color="default"
          showFallback
          className="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10 shrink-0"
          name={name[0]}
          radius="sm"
        />
        <div className="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
}

export function EditCoserForm() {
  const onBackUrlChange = (val: string) => {
    console.log(val);
  };
  return (
    <div className="w-full px-8">
      <CoserBackground onBackUrlChange={onBackUrlChange} name={"喵喵说"} />
    </div>
  );
}
