"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

type ModalFormProps = {
  openModalBtnText: string;
  title: string;
  submitText: string;
};

export default function CreateProjectForm(props: ModalFormProps) {
  const { getToken } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [payload, setPayload] = React.useState({
    name: "",
    description: "",
    isLoading: false,
    error: null,
  });

  async function onSubmit() {
    setPayload({ ...payload, isLoading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(await getToken()) as string}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
        }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setPayload({
          ...payload,
          isLoading: false,
          name: data.name,
          description: data.description,
        });

        revalidatePath("/");
      } else {
        setPayload({
          ...payload,
          isLoading: false,
          error: "An error occurred",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        {props.openModalBtnText}
      </Button>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.title}
              </ModalHeader>

              <ModalBody>
                {payload.error && (
                  <div className="text-red-500">{payload.error}</div>
                )}
                <Input
                  label="Name"
                  value={payload.name}
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                />
                <Input
                  label="Description"
                  value={payload.description}
                  onChange={(e) =>
                    setPayload({ ...payload, description: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={payload.isLoading}
                  isDisabled={payload.isLoading}
                  onPress={() => onSubmit()}
                >
                  {props.submitText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
