import React from 'react'

export default function Explore() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Explore</h1>
      <p className="text-gray-600 max-w-3xl mb-10">
        Discover content, features, and tools designed to help you get the most
        out of our platform. Browse freely and explore what matters to you.
      </p>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">Latest Content</h3>
          <p className="text-sm text-gray-600">
            Stay updated with the newest posts, updates, and announcements.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">Trending</h3>
          <p className="text-sm text-gray-600">
            See what other users are engaging with right now.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">Categories</h3>
          <p className="text-sm text-gray-600">
            Browse by topic and find exactly what you’re looking for.
          </p>
        </div>
      </section>
    </main>
  );
}
