import React from 'react'

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">
        We value your privacy and are committed to protecting your personal
        information.
      </p>
        <section className="space-y-4 text-sm text-gray-700">
            <p>
              <strong>Information We Collect:</strong> We collect information you
              provide directly, such as when you create an account or submit a
              form.
            </p>
            <p>
              <strong>How We Use Information:</strong> We use collected data to
              provide and improve our services.
            </p>
            <p>
              <strong>Cookies:</strong> We use cookies to enhance your experience
              and analyze usage.
            </p>
            <p>
              <strong>Data Security:</strong> We implement security measures to
              protect your information.
            </p>
        </section>
    </main>
  );
}