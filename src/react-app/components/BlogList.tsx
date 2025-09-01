import { Link } from "react-router-dom";

const posts = [
  { slug: "best-dating-apps-india-2025", title: "Best Dating Apps in India 2025" },
  { slug: "how-to-avoid-creeps-online-dating", title: "How to Avoid Creeps in Online Dating" },
];

export default function BlogList() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shhava Blog 💜</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="text-purple-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
