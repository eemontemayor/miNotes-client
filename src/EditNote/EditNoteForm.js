import React,{Component} from 'react'
import { findNote } from '../notes-helpers'
import Note from '../Note/Note'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import NoteService from '../services/noteService'
export default class EditNoteForm extends Component{
    static defaultProps = {
        match: {
          params: {}
        }
      }
      static contextType = ApiContext
    componentDidMount() {
        
            NoteService.getNoteById(this.props.match.params.note_id)
        
            .then(note => {
                
                this.setState({
                    note
                }, () => {
                    console.log(this.state)
                })
            })
              
        }
    render() {
        const { folders } = this.context
        // const {note_name, content} = this.state 
        // console.log(this.state)
        return (
            <section className = 'EditNoteForm'>
                <h2>
                    Edit Note
                </h2>
                <NotefulForm>
                <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
                        <input type='text' id='note-name-input' name='note-name'
                            // value={note.note_name}
                            required />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
                        <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'ref={this.folderInput} defaultValue={null}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'  onClick={(e)=>this.setNote(this.nameInput.current.value, this.contentInput.current.value, this.folderInput.current.value)}>
              Add note
            </button>
          </div>
             </NotefulForm>
            </section>
        )
    }
}
