import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { createStory, getStories } from "../lib/api";
import { useEffect, useRef, useState } from "react";

export type Story = {
  id: number;
  title: string;
  body: string;
};

export const loader = async () => {
  const stories = await getStories();
  return json(stories);
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  if (typeof title !== "string" || typeof body !== "string") {
    throw new Error("Invalid form data");
  }
  const story = await createStory({ title, body });
  return redirect(`/stories/${story.id}`);
}

export default function Stories() {
  const stories: Story[] = useLoaderData();
  const [isSubmitting, setSubmitting] = useState(false);

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    setSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting === true) {
      ref.current?.reset();
      setSubmitting(false);
    }
  }, [isSubmitting]);

  return (
    <div>
      <h1>Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/stories/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
      <Form method="post" onSubmit={handleSubmit} ref={ref}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: 320,
          }}
        >
          <input type="text" name="title" placeholder="제목을 입력하세요..." />
          <textarea name="body" placeholder="이야기를 입력하세요..." />
          <button type="submit">{isSubmitting ? "등록 중..." : "등록"}</button>
        </div>
      </Form>
    </div>
  );
}
