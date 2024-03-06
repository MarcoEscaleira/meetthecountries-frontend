import { Button, Typography } from "@material-tailwind/react";
import { ColumnDef } from "@tanstack/table-core";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { Difficulty } from "@generated/graphql.ts";
import { Country } from "@pages/Quizzes/Country.tsx";
import { QuizListData } from "@pages/Quizzes/mapTableData.ts";

export const tableColumns: ColumnDef<QuizListData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    cell: ({ getValue }) => (
      <Link to={`/game/quiz/${getValue()}/edit`}>
        <Button variant="text" size="sm" className="px-2 underline">
          {getValue() as string}
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => <Typography variant="small">{getValue() as string}</Typography>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <Typography variant="small">{getValue() as string}</Typography>,
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ getValue }) => <DifficultyChip difficulty={getValue() as Difficulty} />,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => <Country country={(getValue() as string) || ""} />,
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ getValue }) => <Typography variant="small">{getValue() as string}</Typography>,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ getValue }) => <Typography variant="small">{format(getValue() as Date, "dd MMM yyyy")}</Typography>,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ getValue }) => <Typography variant="small">{format(getValue() as Date, "dd MMM yyyy")}</Typography>,
  },
];
