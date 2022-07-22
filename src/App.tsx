import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import { PostsList } from './features/posts/PostsList'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
