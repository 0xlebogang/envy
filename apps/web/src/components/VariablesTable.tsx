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

type ProjectsTableProps = {
  data?: Record<string, string>[];
};

export default function VariablesTable(props: ProjectsTableProps) {
  return (
    <Table isStriped aria-label="Collection table">
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>Environment</TableColumn>
      </TableHeader>
      <TableBody>
        {props.data.length > 0 ? (
          <>
            {props.data.map((item, i) => (
              <TableRow key={`${item}-${i}`}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.envType}</TableCell>
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
