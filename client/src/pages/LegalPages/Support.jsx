import React from 'react'

export default function Support() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Support</h1>
      <p className="text-gray-600 mb-10">
        Need help? Find answers to common questions or reach out to our support
        team.
      </p>

      <section className="space-y-6">
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
          <p className="text-sm text-gray-600">
            Browse common questions about accounts, usage, and features.
          </p>
        </div>
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-sm text-gray-600">
            Contact our support team for personalized assistance.
          </p>
        </div>
      </section>
    </main>
  );
}
