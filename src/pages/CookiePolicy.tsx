import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
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
            <h1 className="text-3xl font-bold tracking-tight text-[#182241] md:text-4xl">Kakis.ai Cookie Policy</h1>
            <p className="mt-3 text-sm text-[#6f7895]">Last Updated Date: 2026/03/29</p>

            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
              <p>
                This Cookies Policy applies whenever you use or access our Platform. "Platform" includes any services
                provided by Kakis.ai, including our applications and related services.
              </p>
              <p>
                When providing the Platform, we may use cookies and other tracking technologies. These technologies
                allow us to store information or access information stored on your device to enable certain features
                and distinguish your device from others.
              </p>
              <p>
                This Policy explains how we use these technologies, and the choices you have to control them.
                Unless otherwise stated in this Policy, our Privacy Policy applies to the data we collect through
                cookies and similar technologies.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#4f5d85] md:text-base">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">1. What technologies may be used?</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a
                  website or app. Cookies and similar technologies enable us and our service providers to uniquely
                  identify your browser or device.
                </p>
                <p>
                  Our Platform uses cookies and similar technologies to help you navigate between pages efficiently,
                  ensure web security, understand how our websites or apps are used, remember user preferences and
                  improve your user experience.
                </p>
                <p>
                  Like many websites and apps, Kakis.ai uses cookies and similar technologies, such as software
                  development kits ("SDKs"), pixels, and local storage. We call them all "cookies" in this Policy.
                  Cookies normally work by assigning a unique number to your device and are stored on your browser by
                  the websites or on the apps that you use.
                </p>
                <p>Cookies can remain on your computer or mobile device for different periods of time:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    "Session cookies" exist only while your browser is open and are deleted automatically or shortly
                    after you close your browser.
                  </li>
                  <li>
                    "Persistent cookies" stay after you close your browser or app. Persistent cookies expire
                    automatically after a set time, like after 1 year. When you return to the Platform, persistent
                    cookies on your device can be read.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">2. Categories of Cookies</h2>
                <p>Tracking technologies can either be "first-party" or "third-party":</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>First-party cookies are set and used directly by us.</li>
                  <li>
                    Third-party cookies are set by third parties (such as analytics or advertising service providers)
                    through our Platform.
                  </li>
                </ul>
                <p>We and our analytics and other partners, use cookies for the following purposes:</p>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">2.1 Essential and Operational</h3>
                <p>
                  These cookies are essential to provide you with the Platform and the features you have requested.
                  Because these technologies are essential for the Platform and the features you have requested to
                  work, they do not require your consent. We may use strictly necessary cookies (set by us) for the
                  following essential purposes:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Detecting external cyber attacks and abnormal behavior of users.</li>
                  <li>User authentication and secure logins.</li>
                  <li>Ensuring the security and stability of the Platform.</li>
                </ul>
                <p>
                  As explained above, these cookies are strictly necessary to operate our Platform and cannot be
                  declined.
                </p>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">2.2 Functionality and Customisation</h3>
                <p>
                  These cookies are used to make the Platform work more efficiently, improve and optimize your
                  experience, and recognize you when you return to the Platform. For example, this enables us to
                  remember your preferences, like privacy settings, or region. Some cookies record your preferred
                  language. Other cookies record the region from which you visit the Platform.
                </p>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">2.3 Analytics and Research</h3>
                <p>
                  These cookies help us understand your use of the Platform and its features. They show which pages
                  you view and how you interact. This information lets us measure and quickly fix any errors on the
                  Platform to improve your experience. We also use the information from these cookies to test design
                  ideas and understand user activity and patterns. This, in turn, improves the Platform and its
                  features.
                </p>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">2.4 Advertising and Marketing</h3>
                <p>
                  We use advertising and marketing tracking technologies. These technologies help us, and third
                  parties in some cases, to promote our services on other platforms and websites, and measure the
                  effectiveness of our campaigns.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">3. How can you manage these cookies?</h2>
                <p>
                  Some of the cookies that we use are essential to operate the Platform. As a result, you cannot
                  control the use of such cookies. You are able to decide whether to accept or reject non-essential
                  cookies.
                </p>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">3.1 Your app settings</h3>
                <p>You can tailor your device settings to control your mobile advertising identifiers:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    On Apple devices: For older iOS versions, you can turn on the "Limit Ad Tracking" setting in your
                    device settings. For newer versions, you can manage third-party tracking permissions in
                    "Settings &gt; Privacy &gt; Tracking".
                  </li>
                  <li>
                    On Android devices: You can turn on the "Opt out of Ads Personalisation" in your device settings.
                  </li>
                </ul>

                <h3 className="pt-2 text-lg font-semibold text-[#182241]">3.2 Your web browser settings</h3>
                <p>
                  You can also adjust your cookie preferences via the privacy settings on the device you are using or
                  on the web browser you use to access the Platform. Browser settings allow you to control your cookie
                  and local storage settings so that you can:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>See what cookies or other locally stored data you've got and reject them on an individual basis.</li>
                  <li>Reject third-party cookies or similar technology.</li>
                  <li>Reject cookies or similar technology from particular sites.</li>
                  <li>Reject all cookies or similar technologies from being set.</li>
                  <li>Delete all cookies / site data.</li>
                </ul>
                <p>
                  If you choose to reject cookies or similar technologies, you may still use our Platform but it may
                  mean that your preferences will be lost and certain functionality and areas of our Platform may be
                  restricted or not operate properly. As the means by which you can refuse cookies through your web
                  browser controls vary from browser to browser, you should visit your browser's help menu for more
                  information.
                </p>
                <p>
                  You can delete all cookies that are already on your device. This will remove all cookies from all
                  websites you have visited. Be aware that you may also lose some saved information (e.g., saved login
                  details, site preferences).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">4. Changes to this Policy</h2>
                <p>
                  We may occasionally update this Cookies Policy to reflect, for example, changes to the cookies we
                  use or for other operational, legal or regulatory reasons. When we post changes to this Policy, we
                  will revise the "Last Updated Date" at the top of this Cookies Policy.
                </p>
                <p>
                  If we make any material changes in the way we collect, use, and/or share information held in
                  cookies, we will notify you by prominent notice on our Platform and, where required by applicable
                  law, we will request your consent for any such new uses.
                </p>
                <p>
                  We recommend that you revisit this Policy regularly to stay informed about our use of cookies and
                  related technologies.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#182241] md:text-2xl">5. Contact us</h2>
                <p>
                  If you have any questions about this Policy, or our use of cookies or other technologies, please
                  contact us via <a href="https://www.fooyo.sg/contact/" target="_blank" rel="noopener noreferrer" className="text-[#5368ff] hover:underline">https://www.fooyo.sg/contact/</a>. For details on Kakis.ai's broader data processing practices, including
                  international data transfers and the safeguards we implement, please see our Privacy Policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
