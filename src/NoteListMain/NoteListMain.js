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
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

componentDidMount(){
  console.log(this.context.notes)
}

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
          {(notesForFolder.length===0 && folderId) && <CircleButton
          type='button'
          className='NoteListMain_del-folder-button'
          onClick={()=>{
            FolderServices.deleteFolder(folderId)
            this.context.deleteFolder(folderId)}}
          >

          </CircleButton>}
          </div>
      </section>
    )
  }
}
