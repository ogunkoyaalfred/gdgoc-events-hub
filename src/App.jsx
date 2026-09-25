import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import NotFound from './pages/NotFound'
import MyRsvps from './pages/MyRsvps'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/my-rsvps" element={<MyRsvps />} />
      </Routes>
    </>
  )
}