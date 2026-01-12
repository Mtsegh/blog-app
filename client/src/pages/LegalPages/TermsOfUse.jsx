import React from 'react'

export default function TermsOfUse() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
      <p className="text-gray-600 mb-6">
        By using this platform, you agree to comply with the following terms and
        conditions.
      </p>

      <section className="space-y-4 text-sm text-gray-700">
        <p>
          <strong>Use of Service:</strong> You agree to use the service only for
          lawful purposes and in a way that does not infringe on the rights of
          others.
        </p>
        <p>
          <strong>Accounts:</strong> You are responsible for maintaining the
          confidentiality of your account information.
        </p>
        <p>
          <strong>Intellectual Property:</strong> All content and materials are
          owned by or licensed to us and may not be reused without permission.
        </p>
        <p>
          <strong>Termination:</strong> We reserve the right to suspend or
          terminate access if these terms are violated.
        </p>
      </section>
    </main>
  );
}
