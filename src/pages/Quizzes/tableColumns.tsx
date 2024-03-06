import { IconButton, Typography } from "@material-tailwind/react";
import { ColumnDef } from "@tanstack/table-core";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuizStatusChip } from "@components/QuizStatusChip/QuizStatusChip.tsx";
import { Difficulty, QuizStatus } from "@generated/graphql.ts";
import { Country } from "@pages/Quizzes/Country.tsx";
import { DeleteQuiz } from "@pages/Quizzes/DeleteQuiz.tsx";
import { QuizListData } from "@pages/Quizzes/mapTableData.ts";

export const tableColumns: ColumnDef<QuizListData>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => <Typography variant="small">{getValue() as string}</Typography>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <QuizStatusChip status={getValue() as QuizStatus} />,
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
  {
    accessorKey: "id",
    header: "Actions",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div>
        <Link to={`/game/quiz/${getValue()}/edit`}>
          <IconButton size="sm" variant="text">
            <Eye className="size-4" />
          </IconButton>
        </Link>

        <DeleteQuiz quizId={(getValue() as string) || ""} />
      </div>
    ),
  },
];
