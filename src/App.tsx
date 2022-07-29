import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { NotificationsList } from './features/notifications/NotificationsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { NotFound } from './features/posts/NotFound'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { UserPage } from './features/users/UserPage'
import { UsersList } from './features/users/UsersList'

export const App = () => {
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
          <Route path='/posts/:postId' element={<SinglePostPage />} />
          <Route path='/editPost/:postId' element={<EditPostForm />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/users/:userId' element={<UserPage />} />
          <Route path='/notifications' element={<NotificationsList />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};
