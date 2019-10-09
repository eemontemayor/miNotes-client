import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context // state passed down as context
    const noteId  = this.props.match.params.note_id // 
    const note = findNote(notes, noteId) || {} // for :note.id route .. note id is used to find parent folder
    const folder = findFolder(folders, note.folderid)//* change variable names to match database? */
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}// back circle btn uses props.hist to go to previous view
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && ( // if folder -> display the following (nav view when viewing particular notes)
          <h3 className='NotePageNav__folder-name'>
            {folder.folder_name}
          </h3>
        )}
      </div>
    )
  }
}
