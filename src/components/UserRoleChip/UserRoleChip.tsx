import { Chip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { Roles } from "@generated/graphql.ts";

interface UserRoleChipProps {
  role?: string;
}

export function UserRoleChip({ role }: UserRoleChipProps) {
  const props = {
    [Roles.User]: {
      color: "blue",
      text: "User",
    },
    [Roles.Admin]: {
      color: "purple",
      text: "Administrator",
    },
  }[role || Roles.User];

  return <Chip color={props?.color as colors} value={props?.text} />;
}
