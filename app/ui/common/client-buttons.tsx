"use client";

import { Button } from "@nextui-org/react";

export function BackupButton() {
  const backupFn = async () => {
    const response = await fetch("/dashboard/api", { method: "POST" });
  };
  return <Button onClick={backupFn}>备份</Button>;
}
