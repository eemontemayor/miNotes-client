import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
// import config from '../config'
import './Note.css'
import NoteService from '../services/noteService'


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault() 
    
    const note_id = this.props.id

    NoteService.deleteNote(note_id) // deletes from database
    .then(()=>{
     
      this.context.deleteNote(note_id) // from handle delete note func in app.js (filters state)
                                            // allows the parent comp to perform extra behaviour
      this.props.onDeleteNote(note_id) // from handle delete note function in notepagemain (pushes '/' endpoint to props.history)
    })
    .catch(error => {
        console.error({ error })
      })
  }



  render() {
    const { name, id, modified } = this.props
    
    const date = format(modified, 'MM DD YYYY')
   
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        {/* <button className='Note__edit'
          type='button'
        >
          <Link to={`/edit/${id}`}>
          <FontAwesomeIcon icon='pen' />
          {' '}
          edit
        </Link>
        </button> */}
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {date}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
