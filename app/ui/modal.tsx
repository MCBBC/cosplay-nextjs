"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

export default function NotificationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Modal isOpen={!isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">通知</ModalHeader>
            <ModalBody>
              <p>
                小站要迁移到
                <Link
                  className="text-red-500"
                  href="sharecosplay.micromatrix.cf">
                  sharecosplay.micromatrix.cf
                </Link>
                下
              </p>
              <p>在下周一就会切换完成</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
