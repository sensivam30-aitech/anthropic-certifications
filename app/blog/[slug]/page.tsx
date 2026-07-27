import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import blogData from '@/lib/data/blog.json';

export function generateStaticParams() {
  return blogData.map((post: any) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogData.find((p: any) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-xs text-accent font-medium mb-2 uppercase">{post.category}</div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-text-secondary mb-8">{post.date} · {post.readTime} min read</div>
      <Card>
        <div className="prose prose-invert max-w-none">
          {post.content.split('\n').map((line: string, i: number) => (
            <p key={i} className="text-text-secondary mb-4">{line.replace('## ', '')}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}
