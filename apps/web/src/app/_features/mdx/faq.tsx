import type { FAQPage, Question, WithContext } from "schema-dts";

// `answer` accepts an HTML string for visible rendering (so authors keep
// <strong>, <a>, etc.). For JSON-LD we strip tags and emit plain text —
// Google's structured-data validators render escaped HTML noisily and a
// clean text answer is the safest signal.
type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export function FAQ({ items }: FaqProps) {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map<Question>((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    })),
  };

  return (
    <section className="not-prose my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <dl className="divide-border border-border divide-y border-y">
        {items.map((item) => (
          <div key={item.question} className="py-4">
            <dt className="text-lg font-semibold">{item.question}</dt>
            <dd
              className="text-muted-foreground mt-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </dl>
    </section>
  );
}
