
import Head from 'next/head'
import React from 'react'

export default function Layout({ children, title = 'Learnify' }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="mobile-only mr-2 p-2 rounded hover:bg-gray-100" onClick={() => setOpen(true)} aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="w-10 h-10 rounded bg-indigo-600 text-white flex items-center justify-center font-bold">L</div>
            <div className="text-lg font-semibold">Learnify</div>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <a href="/" className="hover:underline">Home</a>
            <a href="/browse" className="hover:underline">Browse</a>
            <a href="/my-learning" className="hover:underline">My Learning</a>
            <a href="/about" className="hover:underline">About</a>
          </nav>
        </div>
      </header>

      {/* Mobile sidebar */}
      {open && (
        <>
          <div className="sidebar-backdrop md:hidden" onClick={() => setOpen(false)} />
          <aside className="sidebar md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold">L</div>
                <div className="font-semibold">Menu</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded hover:bg-gray-100">
                ✕
              </button>
            </div>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block p-2 rounded hover:bg-gray-100">Home</a>
              <a href="/browse" className="block p-2 rounded hover:bg-gray-100">Browse</a>
              <a href="/my-learning" className="block p-2 rounded hover:bg-gray-100">My Learning</a>
              <a href="/about" className="block p-2 rounded hover:bg-gray-100">About</a>
              <div className="border-t my-3"></div>
              <div className="text-xs text-gray-500">Categories</div>
              <a href="/browse?cat=web" className="block p-2 rounded hover:bg-gray-100">Web Dev</a>
              <a href="/browse?cat=design" className="block p-2 rounded hover:bg-gray-100">Design</a>
              <a href="/browse?cat=data" className="block p-2 rounded hover:bg-gray-100">Data</a>
            </nav>
          </aside>
        </>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="py-8 text-center text-sm text-gray-400">
        © Learnify — prototype
      </footer>
    </div>
  )
}
