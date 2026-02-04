export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-[#848e9c] mb-8">Last updated: February 2025</p>

      <div className="bg-[#1e2329] rounded-xl p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p className="text-[#848e9c]">
            By accessing and using AevonX, you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Description of Services</h2>
          <p className="text-[#848e9c]">
            AevonX provides cryptocurrency exchange services, allowing users to exchange various
            digital currencies and fiat currencies. Our platform facilitates secure and efficient
            transactions between different currency pairs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. User Eligibility</h2>
          <p className="text-[#848e9c]">
            You must be at least 18 years old and have the legal capacity to enter into a binding
            agreement to use our services. By using AevonX, you represent and warrant that you meet
            these eligibility requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Account Security</h2>
          <p className="text-[#848e9c]">
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account. You agree to notify us immediately of
            any unauthorized access or use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Transaction Processing</h2>
          <p className="text-[#848e9c]">
            All transactions are processed according to the exchange rates displayed at the time of
            the transaction. Exchange rates are subject to market fluctuations and may change without
            prior notice. Transaction fees, if applicable, will be clearly displayed before confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Prohibited Activities</h2>
          <p className="text-[#848e9c] mb-2">Users are prohibited from:</p>
          <ul className="list-disc list-inside text-[#848e9c] space-y-1">
            <li>Using the platform for illegal activities or money laundering</li>
            <li>Attempting to manipulate or exploit the system</li>
            <li>Creating multiple accounts for fraudulent purposes</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
          <p className="text-[#848e9c]">
            AevonX shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of the services. Our liability is limited to
            the maximum extent permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
          <p className="text-[#848e9c]">
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting on the platform. Continued use of the services after changes
            constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Contact Information</h2>
          <p className="text-[#848e9c]">
            If you have any questions about these Terms of Service, please contact our support team
            through the support page on our platform.
          </p>
        </section>
      </div>
    </div>
  );
}
