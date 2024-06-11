"use client";

import { Input } from "@nextui-org/react";
import CosplaysContent from "./cosplays-edit-markdowm";
import AutocompleteCoserName from "@/components/AutocompleteCoserName";
import { Coser, Cosplay } from "@/app/lib/definitions";

export default function CosplayEditWrapper({
  detail,
  coserList,
}: {
  detail: Cosplay | null;
  coserList: Coser[];
}) {
  return (
    <form className="self-center">
      <Input
        defaultValue={detail?.title}
        labelPlacement="outside-left"
        className="mb-4"
        type="text"
        label="标题"
        placeholder="输入你的标题"
      />
      <AutocompleteCoserName />
    </form>
  );
}
