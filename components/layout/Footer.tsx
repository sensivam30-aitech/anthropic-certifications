import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">anthropiccertifications.in</h3>
            <p className="text-text-secondary text-sm">Independent exam-preparation resource — not affiliated with or endorsed by Anthropic.</p>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/exam-info/" className="block text-text-secondary hover:text-text-primary">Exam Info</Link>
              <Link href="/faq/" className="block text-text-secondary hover:text-text-primary">FAQ</Link>
              <Link href="/guide/" className="block text-text-secondary hover:text-text-primary">Study Guide</Link>
              <Link href="/admin/" className="block text-text-secondary hover:text-text-primary">Admin</Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy/" className="block text-text-secondary hover:text-text-primary">Privacy Policy</Link>
              <Link href="/terms/" className="block text-text-secondary hover:text-text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-text-secondary">
          © 2026 anthropiccertifications.in — Claude™, Anthropic™, and CCA™ are trademarks of Anthropic, PBC.
        </div>
      </div>
    </footer>
  );
}
