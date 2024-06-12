"use client";
import { Button, Input, Link } from "@nextui-org/react";
import  { VditorInstance,CosplayContent } from "./cosplays-edit-markdowm";
import AutocompleteCoserName from "@/components/AutocompleteCoserName";
import { addCosplay } from "@/app/lib/actions/cosplays";
import { useRef, useState } from "react";

export default function CosplayAddWrapper() {
  const [title, setTitle] = useState("");
  const [cosId, setCosId] = useState("0");
  const selectedCoserId = (value: string) => {
    setCosId(value);
  };

  // 创建一个引用
  const vditorRef = useRef<VditorInstance>(null);
  const handleClick = () => {
    if (!vditorRef.current) {
      console.log("编辑器不存在");
      return;
    }
    if (!vditorRef.current.getContent()) {
      console.log("内容不存在");
      return;
    }
    if (!title) {
      console.log("标题不要忘记了");
      return;
    }
    if (!cosId) {
      console.log("coser不要忘记了");
      return;
    }

    addCosplay({
      title: title,
      cosId,
      content: vditorRef.current.getContent(),
    });
  };

  return (
    <div className="self-center w-full">
      <Input
        value={title}
        labelPlacement="outside-left"
        className="mb-4"
        type="text"
        label="标题"
        onValueChange={(value) => setTitle(value)}
        placeholder="输入你的标题"
      />
      <AutocompleteCoserName coserId={"0"} onSelectCoser={selectedCoserId} />
      <CosplayContent markdownText={""} ref={vditorRef} />
      <div className="my-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cosplays"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          返回
        </Link>
        <Button type="submit" onClick={handleClick}>
          添加
        </Button>
      </div>
    </div>
  );
}
