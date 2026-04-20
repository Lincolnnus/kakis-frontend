import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type FAQItem = {
  question: string;
  answer: ReactNode;
};

const faqItems: FAQItem[] = [
  { question: 'What is Kakis AI and who is it for?', answer: 'It is an awesome AI tool that turns your prompt into a full-fledged short video in minutes!' },
  { question: 'How do I create a storyboard from a script?', answer: 'Just type into the prompt box and click the "Start Creating" button. You can also customise the role and art style types.' },
  { question: 'Can I edit generated scenes and shots manually?', answer: 'Yes, you can edit the generated scenes and shots manually to suit your needs.' },
  { question: 'What file formats can I export from Kakis AI?', answer: 'You can export your projects in MP4.' },
  { question: 'Do I need paid credits to generate storyboard frames?', answer: <>For this hackathon, it is <strong>100% free</strong> to use.</> },
  { question: 'Is my project data private and secure?', answer: <>Yes, we take data privacy and security seriously. Your project data is encrypted and stored securely. You can view our privacy policy here: <a href="/privacy-policy" className="text-[#5368ff] underline hover:text-[#182241]">Privacy Policy</a>. </> },
  { question: 'How can I contact support or report a bug?', answer: <>You can contact us via <a href="https://www.fooyo.sg/contact/" target="_blank" rel="noopener noreferrer" className="text-[#5368ff] hover:underline">
  https://www.fooyo.sg/contact/</a>! For the hackathon event, we will also set up WhatsApp channels for easier communications. Stay tuned! </> },
];

export default function FAQs() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7ff]">
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#d6ddf3] bg-white px-4 py-2 text-sm font-medium text-[#182241] shadow-sm transition-colors hover:bg-[#eef3ff]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-[#dfe5f4] bg-white/90 p-7 shadow-sm md:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#182241] md:text-4xl">FAQs</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
              Click any question to expand it.
            </p>

            <Accordion type="single" collapsible className="mt-8">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index + 1}`} className="border-[#dfe5f4]">
                  <AccordionTrigger className="text-left text-base text-[#182241] hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4f5d85]">
                    {item.answer ? (
                      <p>{item.answer}</p>
                    ) : (
                      <div className="min-h-8 rounded-md border border-dashed border-[#dbe4ff] bg-[#f8faff]" />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
