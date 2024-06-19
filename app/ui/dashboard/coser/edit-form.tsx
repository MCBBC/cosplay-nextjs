"use client";
import { Avatar, Button, Image, Input } from "@nextui-org/react";
import { cosers as Cosers } from "@prisma/client";
import Link from "next/link";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
export interface CoserInfoInstance {
  getContent: () => string;
}
const CoserBackground = forwardRef(
  (
    {
      formData,
    }: {
      formData: CoserType;
    },
    ref
  ) => {
    const [avatar, setAvatar] = useState(formData.avatar);
    const [name, setName] = useState(formData.name);
    const [background_image, setBackUrl] = useState(formData.background_image);
    useImperativeHandle(
      ref,
      () => ({
        getContent: () => {
          return { avatar, name, background_image };
        },
      }),
      [avatar, name, background_image]
    );
    return (
      <>
        <div className="relative w-full" style={{ paddingBottom: "25%" }}>
          <Input
            className="absolute top-0 left-0 right-0 bottom-0 z-20"
            type="text"
            variant="underlined"
            value={background_image}
            onValueChange={setBackUrl}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              classNames={{
                img: "object-cover rounded-none h-full w-full",
                wrapper:
                  "!max-w-full h-full w-full top-0 let-0 bottom-0 right-0 rounded-none",
              }}
              src={background_image}
              alt="background"
            />
          </div>
        </div>
        <div className="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
          <div className="relative">
            <Avatar
              color="default"
              showFallback
              className="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10 shrink-0"
              name={name[0]}
              src={avatar}
              radius="sm"
            />
            <Input
              className="absolute top-0 left-0 right-0 bottom-0 z-20"
              type="text"
              variant="underlined"
              value={avatar}
              onValueChange={setAvatar}
            />
          </div>
          <div className="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
            <Input
              className="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2"
              value={name}
              variant="underlined"
              type="text"
              onValueChange={setName}
            />
          </div>
        </div>
      </>
    );
  }
);
CoserBackground.displayName = "displayName";

export type CoserType = {
  avatar: string;
  name: string;
  background_image: string;
  id?: number;
};

export function EditCoserForm({ coserInfo }: { coserInfo: Cosers | null }) {
  const router = useRouter();
  let formData = {
    avatar: coserInfo?.avatar || "",
    name: coserInfo?.name || "",
    background_image: coserInfo?.background_image || "",
  };
  const coserRef = useRef<CoserInfoInstance>();

  const handleClick = async () => {
    if (coserRef.current?.getContent) {
      let _formData = coserRef.current.getContent() as unknown as CoserType;
      if (coserInfo?.id) {
        _formData.id = coserInfo.id;
      }
      await fetch("/dashboard/cosers/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_formData),
      });
      router.push("/dashboard/cosers");
    }
  };
  return (
    <div className="w-full px-8">
      <CoserBackground formData={formData} ref={coserRef} />
      <div className="my-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cosers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          返回
        </Link>
        <Button type="submit" onClick={handleClick}>
          编辑
        </Button>
      </div>
    </div>
  );
}
