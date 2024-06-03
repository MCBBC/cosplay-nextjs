"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from "@nextui-org/react";
import { Key, useCallback } from "react";

export default function CosplaysTable() {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  const columns = [
    { name: "标题", uid: "title" },
    { name: "封面", uid: "cover" },
    { name: "Cosers", uid: "cosers" },
    { name: "创建时间", uid: "creation_date" },
  ];
  const users: any[] = [];
  const renderCell = useCallback((user: any, columnKey: Key) => {
    return <></>;
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
        <TableBody items={users}>
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
