export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-[#848e9c] mb-8">Last updated: February 2025</p>

      <div className="bg-[#1e2329] rounded-xl p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
          <p className="text-[#848e9c] mb-2">We collect the following types of information:</p>
          <ul className="list-disc list-inside text-[#848e9c] space-y-1">
            <li>Account information (email address, password)</li>
            <li>Transaction data (exchange history, wallet addresses)</li>
            <li>Device and browser information for security purposes</li>
            <li>Communication records with our support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <p className="text-[#848e9c] mb-2">We use the collected information to:</p>
          <ul className="list-disc list-inside text-[#848e9c] space-y-1">
            <li>Process and complete your cryptocurrency exchanges</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Detect and prevent fraud and unauthorized access</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our services and user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
          <p className="text-[#848e9c]">
            We implement industry-standard security measures to protect your personal information,
            including encryption, secure servers, and regular security audits. However, no method
            of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Data Retention</h2>
          <p className="text-[#848e9c]">
            We retain your personal information for as long as your account is active or as needed
            to provide you services. We may also retain certain information as required by law or
            for legitimate business purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Information Sharing</h2>
          <p className="text-[#848e9c] mb-2">We may share your information with:</p>
          <ul className="list-disc list-inside text-[#848e9c] space-y-1">
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by applicable law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
          <p className="text-[#848e9c] mt-2">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
          <p className="text-[#848e9c]">
            We use cookies and similar technologies to enhance your experience, analyze usage
            patterns, and improve our services. You can manage your cookie preferences through
            your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
          <p className="text-[#848e9c] mb-2">You have the right to:</p>
          <ul className="list-disc list-inside text-[#848e9c] space-y-1">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
          <p className="text-[#848e9c]">
            We may update this Privacy Policy from time to time. We will notify you of any
            significant changes by posting the new policy on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
          <p className="text-[#848e9c]">
            If you have any questions about this Privacy Policy or our data practices, please
            contact us through the support page on our platform.
          </p>
        </section>
      </div>
    </div>
  );
}
