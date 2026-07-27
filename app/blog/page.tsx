import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import blogData from '@/lib/data/blog.json';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((post: any) => (
          <Link key={post.id} href={`/blog/${post.slug}/`}>
            <Card hover className="h-full">
              <div className="text-xs text-accent font-medium mb-2 uppercase">{post.category}</div>
              <h2 className="text-lg font-semibold text-text-primary mb-2">{post.title}</h2>
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="text-xs text-text-secondary">{post.date} · {post.readTime} min read</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
