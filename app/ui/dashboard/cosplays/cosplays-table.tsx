"use client";
import { deleteCosplay } from "@/app/lib/actions/cosplays";
import { Cosplay } from "@/app/lib/definitions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DateFormatter } from "@internationalized/date";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { Key, useCallback } from "react";
import CosplayStatus from "./status";

export default function CosplaysTable({ tableData }: { tableData: any[] }) {
  const columns = [
    { name: "标题", uid: "title" },
    { name: "封面", uid: "cover" },
    { name: "Cosers", uid: "cosers" },
    { name: "创建时间", uid: "creation_date" },
    { name: "status", uid: "status" },
    { name: "操作", uid: "actions" },
  ];

  const renderCell = useCallback((cosplay: Cosplay, columnKey: Key) => {
    switch (columnKey) {
      case "title":
        return <p>{cosplay.title}</p>;
      case "cover":
        return (
          <Image
            style={{ height: "200px", width: "200px", objectFit: "cover" }}
            removeWrapper={true}
            loading="lazy"
            shadow="md"
            alt="cover"
            src={cosplay?.cover || ''}
          />
        );
      case "cosers":
        return <span>{cosplay.coser?.name}</span>;
      case "creation_date":
        const toDate = new Date(
          cosplay?.creation_date!.toString() || "2024/05/20"
        );
        const date = new DateFormatter("local").format(toDate);
        return <span>{date}</span>;
      case "actions":
        const deleteCosplayFn = async () => {
          await deleteCosplay(cosplay.id);
        };
        return (
          <div className="relative flex items-center gap-6">
            <Tooltip content="编辑">
              <Link href={`/dashboard/cosplays/${cosplay.id}/edit`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <PencilIcon className="h-4 w-4" />
                </span>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={deleteCosplayFn}>
                <TrashIcon className="h-4 w-4" />
              </span>
            </Tooltip>
          </div>
        );
      case "status":
        return <CosplayStatus status={cosplay.status?.toString() || "1"} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tableData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
