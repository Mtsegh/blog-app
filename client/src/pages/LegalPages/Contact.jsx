import React from 'react'

export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Have a question, feedback, or business inquiry? Reach out to us and we’ll
        get back to you as soon as possible.
      </p>

      <form className="space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-xl px-4 py-3"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-xl px-4 py-3"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border rounded-xl px-4 py-3"
          required
        />
        <button type="submit" className="px-6 py-3 rounded-xl bg-black text-white">
          Send Message
        </button>
      </form>
    </main>
  );
}
