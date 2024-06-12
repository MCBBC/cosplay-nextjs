"use client";
import { Button, Input, Link, Image, Textarea } from "@nextui-org/react";
import { VditorInstance, CosplayContent } from "./cosplays-edit-markdowm";
import AutocompleteCoserName from "@/components/AutocompleteCoserName";
import { Cosplay } from "@/app/lib/definitions";
import { updateCosplay } from "@/app/lib/actions/cosplays";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CosplayEditWrapper({
  detail,
}: {
  detail: Cosplay | null;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(detail?.title || "");
  const [coserId, setCosId] = useState(detail?.cos_id.toString() || "0");
  const [cover, setCover] = useState(detail?.cover || "");
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
    if (!detail?.id) {
      console.log("cosplayId不要忘记了");
      return;
    }
    if (!cover) {
      console.log("封面不要忘记了");
      return;
    }
    console.log({
      id: detail.id,
      title: title,
      coserId,
      content: vditorRef.current.getContent(),
      cover: cover,
    });

    const { message } = await updateCosplay({
      id: detail.id,
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
        className="mb-4 w-[300px]"
        classNames={{ mainWrapper: "flex-auto" }}
        type="text"
        label="标题"
        onValueChange={(value) => setTitle(value)}
        placeholder="输入你的标题"
      />
      <AutocompleteCoserName
        coserId={detail?.cos_id || "0"}
        onSelectCoser={selectedCoserId}
      />
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
      <CosplayContent markdownText={detail?.content || ""} ref={vditorRef} />
      <div className="my-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cosplays"
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
