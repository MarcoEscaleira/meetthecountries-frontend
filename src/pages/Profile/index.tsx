import { Typography } from "@material-tailwind/react";
import { useUserStore } from "@state/userStore.ts";

export default function Profile() {
  const {
    user: { email, firstName, lastName, dateOfBirth, role, createdAt, updatedAt },
  } = useUserStore();

  return (
    <div className="flex h-full w-full flex-col items-center p-6 pt-16 md:p-10 md:pt-20">
      <Typography variant="h1" className="mb-6">
        Profile
      </Typography>
      <p>Email: {email}</p>
      <p>
        Full name: {firstName} {lastName}
      </p>
      <p>DoB: {dateOfBirth}</p>
      <p>Role: {role}</p>
      <p>Created At: {createdAt}</p>
      <p>Updated At: {updatedAt}</p>
    </div>
  );
}
