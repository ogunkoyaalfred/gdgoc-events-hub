import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-rsvps" element={<div className="mx-auto max-w-2xl px-4 py-16 text-center text-zinc-600">My RSVPs page: Sprint 7.</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}