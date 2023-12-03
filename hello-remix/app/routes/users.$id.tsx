import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "../lib/api";
import type { User } from "./users.all";

export type LoaderParams = {
  id: string;
};

export const loader = async ({ params }: { params: LoaderParams }) => {
  const { id } = params;
  const user = await getUser(id);
  return json(user);
};

export default function UserData() {
  const user: User = useLoaderData();
  return (
    <div>
      <h2>{user.username}</h2>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(user, null, 2)}</code>
    </div>
  );
}
