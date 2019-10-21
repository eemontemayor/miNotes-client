import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import FolderServices from '../services/folderService'
export default class NoteListMain extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext



  render() {
    const  folderId  = this.props.match.params.folderid
    const { notes=[]} = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.note_id}>
              <Note
                id={note.note_id}
                name={note.note_name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
          
        </div>
        <div className= 'NoteListMain__button-container'>
          { notesForFolder.length === 0 && <CircleButton
          type='button'
          className='NoteListMain_del-folder-button'
          onClick={()=>{
            //todo: fix below or fix conditional
            this.context.deleteFolder(folderId)
            FolderServices.deleteFolder(folderId)
            this.props.history.push('/')
          }}
          >
            <FontAwesomeIcon icon='trash-alt' />
            <br />
          {' '}
           folder
          </CircleButton>}
          </div>
      </section>
    )
  }
}
