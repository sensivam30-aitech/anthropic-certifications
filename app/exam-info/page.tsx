import { Card } from '@/components/ui/Card';

export default function ExamInfoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">CCA-F Exam Information</h1>
      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-text-secondary">Exam Name</div>
          <div className="text-text-primary font-medium">Claude Certified Architect – Foundations (CCA-F)</div>
          <div className="text-text-secondary">Cost</div>
          <div className="text-text-primary font-medium">$99 USD</div>
          <div className="text-text-secondary">Duration</div>
          <div className="text-text-primary font-medium">120 minutes</div>
          <div className="text-text-secondary">Questions</div>
          <div className="text-text-primary font-medium">60 scenario-based multiple choice</div>
          <div className="text-text-secondary">Passing Score</div>
          <div className="text-text-primary font-medium">720 / 1,000 (scaled)</div>
          <div className="text-text-secondary">Validity</div>
          <div className="text-text-primary font-medium">2 years</div>
        </div>
      </Card>
      <h2 className="text-xl font-semibold mb-4">Domain Weightings</h2>
      <div className="space-y-3">
        {[
          { name: 'Agentic Architecture & Orchestration', pct: 27 },
          { name: 'Claude Code Configuration & Workflows', pct: 20 },
          { name: 'Prompt Engineering & Structured Output', pct: 20 },
          { name: 'Tool Design & MCP Integration', pct: 18 },
          { name: 'Context Management & Reliability', pct: 15 },
        ].map(d => (
          <div key={d.name} className="flex items-center gap-4">
            <div className="w-48 text-sm text-text-secondary">{d.name}</div>
            <div className="flex-1 bg-border h-3 rounded-full overflow-hidden">
              <div className="bg-accent h-full rounded-full" style={{ width: `${d.pct}%` }} />
            </div>
            <div className="w-10 text-sm font-medium text-text-primary">{d.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
