"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";
import DeleteVariableModal from "./DeleteaVariable";

type VariablesTableProps = {
  data?: Record<string, string>[];
};

export default function VariablesTable(props: VariablesTableProps) {
  return (
    <Table isStriped aria-label="Collection table">
      <TableHeader>
        <TableColumn>KEY</TableColumn>
        <TableColumn>VALUE</TableColumn>
        <TableColumn>ENVIRONMENT</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {props.data.length > 0 ? (
          <>
            {props.data.map((item, i) => (
              <TableRow key={`${item}-${i}`}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.envType}</TableCell>
                <TableCell className="flex gap-4">
                  <DeleteVariableModal
                    variableId={item.id}
                    projectId={item.projectId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <>
            <TableCell>
              <Skeleton className="h-3 w-full rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-3 w-full rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-3 w-full rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-3 w-full rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-3 w-full rounded-lg" />
            </TableCell>
          </>
        )}
      </TableBody>
    </Table>
  );
}
