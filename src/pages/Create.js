import { useEffect, useState } from "react"
import Select from "react-select"

import { useAuthContext } from "../hooks/useAuthContext"
import { useCollection } from "../hooks/useCollection"
import { useFirestore } from "../hooks/useFirestore"
import { useNavigate } from "react-router-dom"

import './Create.css'

const Create = () => {
  const navigate = useNavigate()

  const { addDocument, state } = useFirestore('projects')

  const { user } = useAuthContext()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [members, setMembers] = useState([])
  const [category, setCategory] = useState('')
  const [formError, setFormError] = useState('')


  const collection = useCollection('users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(collection.documents){
      const options = collection.documents.map(user => {
        return { value: user.id, label: user.name}
      })
      setUsers(options)
    }
    console.log(state)
  }, [collection.documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category){
      setFormError('Please select a category')
      return
    }
    if(members.length < 1){
      setFormError('Please assign at least one user')
      return
    }

    //create current date data
    let currentDate = new Date()
    let formattedDate = currentDate.toDateString()

    //create project object to send
    const project = {
      creator: [user.uid, user.displayName],
      name,
      description,
      category: category.value,
      date: formattedDate,
      endDate: date,
      members,
      comments: []
    }
    
    await addDocument(project)
    if(state.error == null){
      console.log('hello')
      navigate('/')
    }
  }

  const categories = [
    { value:'illustration', label:'Illustration'},
    { value:'ideation', label:'Ideation'},
    { value:'web', label:'Web'},
    { value:'research', label:'Research'},
    { value:'marketing', label:'Marketing'}
  ]

  return (
    <div className='create'>
      <form className='create_form' onSubmit={handleSubmit}>
        <div className='create_header'>Create New Project</div>
        <div className='create_name'>
          <input
            placeholder=' '
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Project Name</label>
        </div>
        <div className='create_description'>
            <label>Description</label>
            <textarea
                placeholder=' '
                required
                type="textbox"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
        </div>
        <div className='create_enddate'>
        <label>End Date</label>
            <input
                placeholder=' '
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
        </div>
        {
          <Select
            placeholder='Category'
            onChange={(option) => setCategory(option)}
            className='create_category'
            options={categories}
          />
        }
        {
          <Select 
            placeholder='Assign Members'  
            isMulti 
            onChange={(option) => setMembers(option)}
            className='create_members' 
            options={users} />
        }
        <button className='create_button'>Create</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create