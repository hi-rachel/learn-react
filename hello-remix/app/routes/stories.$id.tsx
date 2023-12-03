import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStory } from "../lib/api";
import type { LoaderParams } from "./users.$id";
import type { Story } from "./stories.index";

export const loader = async ({ params }: { params: LoaderParams }) => {
  const { id } = params;
  const data = await getStory(id);
  return json(data);
};

export default function Story() {
  const story: Story = useLoaderData();
  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.body}</p>
    </div>
  );
}
