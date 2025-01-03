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
  RadioGroup,
  Radio,
} from "@nextui-org/react";

type ModalFormProps = {
  openModalBtnText: string;
  title: string;
  submitText: string;
  projectId: string;
};

export default function CreateVariableForm(props: ModalFormProps) {
  const { getToken } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedEnv, setSelectedEnv] = React.useState("DEV");
  const [payload, setPayload] = React.useState({
    key: "",
    value: "",
    environment: selectedEnv,
    isLoading: false,
    error: null,
  });

  async function onSubmit() {
    setPayload({ ...payload, isLoading: true });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/variables`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(await getToken()) as string}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: payload.key,
          value: payload.value,
          envType: payload.environment,
          projectId: Number.parseInt(props.projectId),
        }),
      });

      if (res.status === 200) {
        const { data } = await res.json();

        setPayload({
          ...payload,
          isLoading: false,
          key: data.key,
          value: data.value,
          environment: data.envType,
        });

        revalidatePath(`/projects/${props.projectId}`);
      } else {
        console.log(await res.json());
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
                  label="Key"
                  value={payload.key}
                  onChange={(e) =>
                    setPayload({ ...payload, key: e.target.value })
                  }
                />
                <Input
                  label="Value"
                  value={payload.value}
                  onChange={(e) =>
                    setPayload({ ...payload, value: e.target.value })
                  }
                />
                <RadioGroup
                  label="Select Environment"
                  orientation="horizontal"
                  value={selectedEnv}
                  onValueChange={setSelectedEnv}
                >
                  <Radio value="DEV">Development</Radio>
                  <Radio value="TEST">Testing</Radio>
                  <Radio value="STAGING">Staging</Radio>
                  <Radio value="PRODUCTION">Production</Radio>
                </RadioGroup>
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
