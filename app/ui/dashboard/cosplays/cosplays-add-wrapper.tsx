"use client";
import { Button, Input, Link, Textarea, Image } from "@nextui-org/react";
import { VditorInstance, CosplayContent } from "./cosplays-edit-markdowm";
import AutocompleteCoserName from "@/components/AutocompleteCoserName";
import { addCosplay } from "@/app/lib/actions/cosplays";
import { useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";

export default function CosplayAddWrapper() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [coserId, setCosId] = useState("0");
  const [cover, setCover] = useState("");
  const selectedCoserId = (value: string) => {
    setCosId(value);
  };

  // 创建一个引用
  const vditorRef = useRef<VditorInstance>(null);
  const handleClick = async () => {
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
    if (!coserId) {
      console.log("coser不要忘记了");
      return;
    }
    if (!cover) {
      console.log("封面不要忘记了");
      return;
    }
    const { message } = await addCosplay({
      title: title,
      coserId,
      content: vditorRef.current.getContent(),
      cover: cover,
    });
    if (message) {
      router.push("/dashboard/cosplays");
    }
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
      <div className="flex items-center">
        <Textarea
          value={cover}
          labelPlacement="outside-left"
          className="mb-4 mr-2 w-[400px]"
          classNames={{ mainWrapper: "flex-auto" }}
          type="text"
          label="封面"
          onValueChange={(value) => setCover(value)}
          placeholder="请设置你的封面"
        />
        <Image
          width={100}
          alt="cover"
          isBlurred
          src={cover}
          removeWrapper={true}
          classNames={{ img: "object-cover h-[100px]" }}
        />
      </div>
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
