import { BlogCard } from "@/components/home/blog-card";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  categoryTitle?: string;
  publishedAt?: string;
  readingTime?: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  title: string;
  readMoreLabel: string;
  minReadLabel: string;
}

export function RelatedPosts({
  posts,
  title,
  readMoreLabel,
  minReadLabel,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section>
      <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-gold-500">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            featuredImageUrl={post.featuredImageUrl}
            featuredImageAlt={post.featuredImageAlt}
            categoryTitle={post.categoryTitle}
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
            readMoreLabel={readMoreLabel}
            minReadLabel={minReadLabel}
          />
        ))}
      </div>
    </section>
  );
}
