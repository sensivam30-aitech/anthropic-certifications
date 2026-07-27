'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star } from 'lucide-react';

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
      <p className="text-text-secondary mb-8">Browse all 1,200 questions with explanations.</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input placeholder="Search questions..." value={search} onChange={setSearch} />
        <div className="flex gap-2">
          {['all', 'agentic', 'claude_code', 'prompting', 'tools_mcp', 'context'].map(d => (
            <button key={d} onClick={() => setFilter(d)} className={`px-3 py-2 rounded-lg text-sm border ${filter === d ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-secondary'}`}>
              {d === 'all' ? 'All' : d.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <Card className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>Agentic</Badge>
              <Badge variant="difficulty">Medium</Badge>
            </div>
            <p className="text-text-primary text-sm">At Sarvam AI, the engineering team is building a multi-agent system for KYC verification across rural banking partners. What is the recommended approach?</p>
          </div>
          <button className="text-text-secondary hover:text-yellow-400 ml-4"><Star size={18} /></button>
        </Card>
        <Card className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>Claude Code</Badge>
              <Badge variant="difficulty">Hard</Badge>
            </div>
            <p className="text-text-primary text-sm">A developer at CRED configures Claude Code for their microservices repository with 40+ services. What is the recommended approach?</p>
          </div>
          <button className="text-text-secondary hover:text-yellow-400 ml-4"><Star size={18} /></button>
        </Card>
      </div>
    </div>
  );
}
