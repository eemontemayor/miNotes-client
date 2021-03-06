import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
  constructor(props){
    super(props);
    this.nameInput= React.createRef();
    this.contentInput=React.createRef();
    this.folderInput=React.createRef();
  }  
  
  state ={
    note_name: '', nameValid: false,
    content: '', contentValid: false,
    folderid: '',
     folderValid: false,
    formValid: false,
    validationMessages: {}
  };
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      note_name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderid: e.target['note-folder-id'].value,
      modified: new Date(),
    }

   
    fetch(`${config.API_ENDPOINT}/api/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderid}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  setNote = (name, content, folder) => {
    
    this.setState({name, content, folder}, () => this.validateNote(name, content));
  };
  validateNote = (name, content, folder) => {
  
    const validationMessages = {...this.state.validationMessages};
    let nameValid = true;
    let contentValid= true;
    let folderValid= true;

    if (name.length < 2 || name.length>20){
      validationMessages.name = 'Name must be at least two character long and less than 20.';
      nameValid = false;
      console.log(' name error if less than two')
      alert('Name must be at least two character long.')
      throw Error
     
    } else if (content.length < 2){
      validationMessages.content = 'Content must be at least two character long.';
      contentValid = false;
      console.log(' content error if less than two')
      alert('Content must be at least two character long.')
      throw Error
      
    } else if (folder === null){ /// trying to find a way to access the value of inputfolder to finish validation
      validationMessages.folder = 'must select an available folder';
      folderValid= false;
      alert('must select an available folder')
 
      
      throw Error
      
    }else{

      this.setState({validationMessages, nameValid, contentValid, folderValid}, this.validateForm);
    }
  } 
  validateForm = () => {
    this.setState({
      formValid: this.state.nameValid && this.state.contentValid && this.state.contentValid
    });
  }
  render() {
    const { folders=[] } = this.context
    
    
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit} >
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name'ref={this.nameInput} required/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' ref={this.contentInput} />
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
