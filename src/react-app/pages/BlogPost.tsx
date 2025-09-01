import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/blog/${slug}.md`)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("# 404\nPost not found 💔"));
  }, [slug]);

  return (
    <div className="p-6 max-w-2xl mx-auto prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
