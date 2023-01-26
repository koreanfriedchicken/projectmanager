import React from 'react'
import { useDocument } from '../hooks/useDocument'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useFirestore } from '../hooks/useFirestore'
import './Project.css'

const Project = ({ p }) => {

  const {user} = useAuthContext()
  const { updateDocument, deleteDocument, state} = useFirestore('projects')
  const { error, document } = useDocument('projects', p.id)


  const [newComment, setNewComment] = useState('')

  if(error) {
    return 
  }

  if(!document){
    return 
  }

  console.log(document)

  const handleComment = async (e) => {
    
    e.preventDefault()

    const date = new Date()
    const d = date.toISOString()
    const randomid = crypto.randomUUID()

    const commentToAdd = {
      username: user.displayName,
      content: newComment,
      createdAt: d,
      id: randomid
    }

    await updateDocument(document.id, {
      comments: [...document.comments, commentToAdd]
    })

    if(!state.error){
      setNewComment('')
    }
  }

  const handleDelete = () => {
    deleteDocument(document.id)
  }

  return (
  <div className='grid_card'>
      <div className='grid_card_delete' onClick={handleDelete}>Delete</div>
      <div className='grid_card_header'>
        <div className='grid_card_category'>{p.category}</div>
        <div className='grid_card_daysleft'>Ending {p.date}</div>
      </div>
      <div className='grid_card_createdate'>Created by: {p.creator[1]} - {p.date}</div>
      <div className='grid_card_title'>{p.name}</div>
      <img src='mural.jpg' className='grid_card_image'/>
      <div className='grid_card_description'>{p.description}</div>
      <div className='grid_card_membersheader'>Members</div>
      <div className='grid_card_members'>
        {
          p.members.map((m) => 
            <span className='grid_card_member'>{m.label}</span>
        )}
      </div>
      <div className='grid_card_commentsheader'>Comments</div>
        <div className='grid_card_comments'>
        {
          document.comments && document.comments.map((c) => {
            return <div>
              <span className='comment_name'>{c.username}</span>
              <span className='grid_comment'>{c.content}</span>
              </div>
          })
        }
      </div>
      <form onSubmit={handleComment} className='grid_comment_form'>
          <div className='grid_textarea_header'>Add new comment:</div>
          <textarea
            className='grid_comment_textarea'
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        <button className='grid_submit'>Submit</button>
      </form>
    </div>
)

}

export default Project