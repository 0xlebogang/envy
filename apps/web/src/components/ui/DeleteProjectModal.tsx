"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type DeleteProjectModalProps = {
  projectId: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function DeleteProjectModal(props: DeleteProjectModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getToken } = useAuth();
  const [payload, setPayload] = React.useState({
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  async function onSubmit() {
    setPayload({ ...payload, isLoading: true });

    try {
      const res = await fetch(`${apiUrl}/projects/${props.projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${(await getToken()) as string}`,
        },
      });

      if (res.status === 200) {
        setPayload({ ...payload, isLoading: false, error: null });
        router.push("/projects");
      } else {
        setPayload({
          isLoading: false,
          error: "An error occurred while deleting the project.",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Delete Project
      </Button>

      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {payload.error && (
                <div className="text-red-500 px-4 py-3 relative">
                  {payload.error}
                </div>
              )}
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Delete this project</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-default-500">
                  Are you sure you want to delete this project?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  onPress={() => onSubmit()}
                  color="danger"
                  isLoading={payload.isLoading}
                  isDisabled={payload.isLoading}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
