import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { ReactNode } from 'react';

type Section = {
  title: string;
  points?: ReactNode[];
  body?: ReactNode[];
};

const sections: Section[] = [
  {
    title: '1. Data We Collect',
    body: [
      'We may collect a variety of Data from or about you or your devices from various sources, as described below.',
    ],
    points: [
      'A. Personal Data You Provide',
      'Registration and contact information: When you register to use our Services, you may be required to provide certain Data including your email address, user name, and age to create an account on the Platform.',
      'User content: We store and process the content you upload to the Platform, as well as data generated through your use of the Platform. Because Kakis.ai is a story-to-video generation platform, this specifically includes your text prompts, story narratives, generated video outputs, feedback, and interactions with the AI.',
      'Financial information: When you use our paid Services, including redeeming voucher codes or purchasing paid Services, we collect information related to the payment transaction.',
      'Communication & Business Cooperation: If you communicate with us, we will collect your contact information, such as email address, and the content of the messages you send to us. With your explicit consent, we collect certain information when you request additional information about our Services.',
      'B. Personal Data We Automatically Collect',
      'Network, device, and log data: When you use our Services, we may automatically collect your Data including IP address, operating system, the browser you are using, your Account\'s preference settings, and mobile network information.',
      'Usage and online activity data: When you use our Services, we may automatically collect data about your interactions with Kakis.ai. This includes your prompts, the time spent generating stories, your browsing history, and navigation paths.',
      'Location data: We automatically collect data about your approximate location, such as country, state or city, based on your IP address.',
      'Cookies & Analytics: We use cookies, mobile IDs, and other similar technologies ("Cookies") to operate the Platform and enhance your experience. We may use a variety of online analytics products that use cookies to help us analyze how users use our Services.',
      'C. Combination of Data',
      'By using our Services, you agree that we may combine the Data we receive from and about you, including the Data you provide and the Data we automatically collect.',
    ],
  },
  {
    title: '2. How We Use Your Data',
    points: [
      'Provision of the Services: We process your Data to provide you with the story-to-video generative Services that you request.',
      'Model Integration: To turn your prompts into full-fledged short stories, we utilize third-party AI models provided by Alibaba. We process and transmit your text prompts to these models to generate the requested video content.',
      'Content safety: To ensure the safety, security and stability of Kakis.ai, we may scan, analyze, and review User Content to detect any harmful activity and content, frauds, or illegal activity.',
      'Identification, Payment, and Communications: We use your Data to verify your identity, process payments, and contact and communicate with you regarding updates or support.',
      'Guarantee of services and algorithms: We will review and analyze usage information and statistical data to support customer service, implement user feedback, and conduct surveys.',
      'Exercising rights & Complying with obligations: We may use your Data to exercise our rights where it is necessary to do so, for example to detect, prevent, and respond to security incidents, and to comply with legal or regulatory obligations.',
    ],
  },
  {
    title: '3. Our Legal Basis for Processing Data',
    points: [
      'Consent: Where you have consented to certain processing of your Data.',
      'Contractual Necessity: Where required to provide you with our Services requested by you.',
      'Compliance with Legal Obligations: Where we have a legal obligation to do so.',
      'Legitimate Interests: Where we or a third party have a legitimate interest in doing so, such as product development and internal analytics.',
    ],
  },
  {
    title: '4. Data Storage, Security, and Retention',
    points: [
      'Storage: We store your Data on our servers located in Singapore.',
      'Security: We will take appropriate technical and organizational measures to help protect and secure your Data. This includes using encryption techniques and strictly limiting the scope of personnel with access to your Data.',
      'Retention: We will retain your Data for only as long as we need in order to provide our Services to you, or for other legitimate business purposes such as resolving disputes, safety and security reasons, or complying with our legal obligations.',
    ],
  },
  {
    title: '5. To Whom We May Share Your Data',
    points: [
      'Service Providers (Including AI Model Partners): We may engage or cooperate with third parties to perform certain functions or to provide certain Services to you. Crucially, this includes our partnership with Alibaba. We share necessary prompt and input data with Alibaba\'s API to facilitate the core video generation features of the Platform.',
      'Affiliates & Business Transactions: We may share your Data with our corporate affiliates or transfer your Data to another legal entity in the context of a transaction including mergers, acquisitions or asset sales.',
      'Legal obligations: We may in limited cases share your Data to authorities such as legal, regulatory, law enforcement, government and tax authorities.',
      'Public content: Any information that you opt to be shown to the public on our platform will be disclosed publicly.',
    ],
  },
  {
    title: '6. Your Rights Relating to Your Data',
    body: [
      'Once you have completed your Account registration, you can review, modify, and delete the Data you have submitted to us. Depending on your jurisdiction, you may have the following rights:',
    ],
    points: [
      'The right to access your Data and obtain a copy thereof.',
      'The right to request rectification of incomplete or inaccurate Data.',
      'The right to withdraw your consent.',
      'The right to request the deletion or restriction of your Data, as permitted by law.',
      'The right to delete your Account, which is an irreversible process. You can do so by contacting support or navigating to your Account settings.',
    ],
  },
  {
    title: '7. International Data Transfer',
    body: [
      'We may transfer your Data to countries or regions located outside of the country where you reside solely for the purposes set out in this Policy. Before any cross-border transfer occurs, we ensure appropriate contractual guarantees are in place to maintain security measures.',
    ],
  },
  {
    title: '8. Parental and Guardian Consent',
    body: [
      'Our Services are not intended for or directed to children as defined by the applicable laws in your country or region. If you are above the Minimum Age but under the age of majority in your jurisdiction, you need your parent or guardian\'s consent to use our Services. We do not knowingly collect or solicit Data from children under the Minimum Age.',
    ],
  },
  {
    title: '9. Contact Information',
    body: [
      <>If you have any complaints, suggestions or questions regarding this Policy, please contact us via <a href="https://www.fooyo.sg/contact/" target="_blank" rel="noopener noreferrer" className="text-[#5368ff] hover:underline">https://www.fooyo.sg/contact/</a></>,
    ],
  },
  {
    title: '10. Country/Region Specific Terms',
    points: [
      'Singapore',
      <>Data Protection Officer: If you wish to access your Data, correct any Data in our possession, withdraw your consent, or if you have any queries, please contact us via <a href="https://www.fooyo.sg/contact/" target="_blank" rel="noopener noreferrer" className="text-[#5368ff] hover:underline">https://www.fooyo.sg/contact/</a>.</>,
      'International transfer of Data: If you live in Singapore or if we collect or store your Data in Singapore, before transferring any of your Data outside of Singapore, we will take appropriate steps to ensure that the recipient is bound by legally enforceable obligations to provide a standard of protection that is at least comparable to that under the Personal Data Protection Act 2012.',
      'California (United States)',
      'CCPA Rights: If you are a California resident, the California Consumer Privacy Act of 2018 (CCPA) provides you specific rights to know about our collection and use of your personal data over the past twelve months, the right to delete your personal data, and the right to opt-out of the sale of personal data.',
      'Non-Discrimination: We will not discriminate against you for exercising any of your CCPA rights.',
      '(For users in other specific regions such as the EU, Brazil, Vietnam, or South Korea, please refer to your local data protection laws which we comply with fully. Reach out to our support team to exercise jurisdiction-specific rights).',
    ],
  },
];

export default function PrivacyPolicy() {
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
          <div className="rounded-2xl border border-[#dfe5f4] bg-white/85 p-7 shadow-sm backdrop-blur-sm md:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#182241] md:text-4xl">Kakis.ai Privacy Policy</h1>
            <p className="mt-3 text-sm text-[#6f7895]">Last Updated Date: 2026/03/29</p>
            <p className="text-sm text-[#6f7895]">Effective Date: 2026/03/29</p>

            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
              <p>
                Fooyo (together with our affiliates, the "Company", "Kakis.ai", "us", "we", or "our") respect
                your privacy and are committed to keeping secure any information we obtain from you or about you.
                This Privacy Policy (this "Policy") applies to your use of Kakis.ai, which includes its associated
                software applications and websites (collectively, the "Services", "Kakis.ai", or the "Platform").
              </p>
              <p>
                By using the Services, including accessing or using the Platform, contacting or interacting with us
                or submitting information to us, you agree to the terms of this Policy and to the collection, use,
                disclosure and processing of your Data in accordance with this Policy.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">{section.title}</h2>
                  {section.body?.map((paragraph, index) => (
                    <p key={index} className="text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {section.points && (
                    <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
                      {section.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
