import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { gql } from "@generated/gql.ts";
import { useUserStore } from "@state/userStore.ts";

const LOGOUT_USER = gql(/* GraphQL */ `
  query Query {
    logoutUser
  }
`);

export default function Profile() {
  const navigate = useNavigate();
  const { email, firstName, lastName, dateOfBirth, role, createdAt, updatedAt } = useUserStore(state => state.user);

  const [makeLogout] = useLazyQuery(LOGOUT_USER);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="flex w-72 flex-col">
        <h1 className="mb-6 text-4xl text-blue-400">User profile</h1>
        <p>Email: {email}</p>
        <p>
          Full name: {firstName} {lastName}
        </p>
        <p>DoB: {dateOfBirth}</p>
        <p>Role: {role}</p>
        <p>Created At: {createdAt}</p>
        <p>Updated At: {updatedAt}</p>

        <button
          onClick={async () => {
            await makeLogout();
            toast.success("Logout successful");
            navigate("/");
          }}
          className="mt-12 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
