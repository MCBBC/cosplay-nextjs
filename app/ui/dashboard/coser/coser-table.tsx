"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { cosers as Coser } from "@prisma/client";
import Link from "next/link";
import { Key, useCallback } from "react";
import { DateFormatter } from "@internationalized/date";

export default function CoserTable({ tableData }: { tableData: any[] }) {
  const columns = [
    { name: "名字", uid: "name" },
    { name: "操作", uid: "actions" },
  ];

  const renderCell = useCallback((coser: Coser, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return <p>{coser.name}</p>;
      case "actions":
        const deleteCosplayFn = async () => {};
        return (
          <div className="relative flex items-center gap-6">
            <Tooltip content="编辑">
              <Link href={`/dashboard/cosers/${coser.id}/edit`}>
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
