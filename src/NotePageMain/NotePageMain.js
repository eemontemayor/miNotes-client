import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = note_id => {
  
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const  noteId  = this.props.match.params.note_id
    const note = findNote(notes, noteId) || { content: '' }
  
    
    return (
      <section className='NotePageMain'>
        <Note
          id={noteId}
          name={note.note_name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
