"use client";
import { Input } from "@nextui-org/react";
import CosplaysContent from "./cosplays-edit-markdowm";
import AutocompleteCoserName from "@/components/AutocompleteCoserName";
import { Cosplay } from "@/app/lib/definitions";

export default function CosplayEditWrapper({
  detail,
  cosplayId,
}: {
  detail: Cosplay | null;
  cosplayId: number | string;
}) {
  return (
    <form className="self-center w-full">
      <Input
        defaultValue={detail?.title}
        labelPlacement="outside-left"
        className="mb-4"
        type="text"
        label="标题"
        placeholder="输入你的标题"
      />
      <AutocompleteCoserName defaultCoserId={cosplayId} />
      <CosplaysContent markdownText={detail?.content || ""} />
    </form>
  );
}
