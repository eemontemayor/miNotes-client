import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault() 
    
    const note_id = this.props.id
    
    fetch(`${config.API_ENDPOINT}/api/note/${note_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }) 
    .then(res => {
      if (!res.ok) {
        
      
        
          throw new Error()
        
      }
      
    
       
        this.context.deleteNote(note_id) // from handle delete note func in app.js (filters store)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(note_id) // from handle delete note function in notepagemain (pushes '/' endpoint to props.history)
      })
      .catch(error => {
        
        console.error({ error })
      })
  }

  render() {
    
    const { name, id } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        {/* <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div> */}
      </div>
    )
  }
}
