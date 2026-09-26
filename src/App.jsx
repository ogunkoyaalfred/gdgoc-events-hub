import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import NotFound from './pages/NotFound'
import MyRsvps from './pages/MyRsvps'

export default function App() {
  return (
    <>
      {/* visually hidden until focused, so keyboard users can jump past the
          header and nav without tabbing through them on every single page */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-rsvps" element={<MyRsvps />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}