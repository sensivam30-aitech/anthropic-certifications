'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is the Claude Certified Architect (CCA) Foundations exam?', a: 'The CCA-F exam validates your ability to design, build, and deploy production-grade AI systems using Claude and Anthropic technologies.' },
  { q: 'How many questions are on the CCA Foundations exam?', a: 'The exam contains 60 scenario-based multiple choice questions.' },
  { q: 'What is the passing score for the CCA exam?', a: 'The passing score is 720 out of 1,000 (scaled), which is approximately 70%.' },
  { q: 'How is this practice test different from the official exam?', a: 'This is an independent preparation resource. Questions are original and designed to mirror the style and domains of the official exam, but are not affiliated with Anthropic.' },
  { q: 'Will I see the same questions if I retake a practice test?', a: 'No. Our set-rotation algorithm ensures you get a fresh set of questions until all 10 sets in a mode are exhausted.' },
  { q: 'How many unique questions are in the bank?', a: 'There are 1,200 unique questions across 4 test modes and 40 sets.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary pr-4">{faq.q}</h3>
              <ChevronDown size={18} className={`text-text-secondary transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </div>
            {open === i && <p className="text-text-secondary text-sm mt-4 leading-relaxed">{faq.a}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
