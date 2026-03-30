import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/interview/interview.context.jsx'
import Footer from './features/auth/components/Footer.jsx'


const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <div className="app-shell">
          <div className="app-content">
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
