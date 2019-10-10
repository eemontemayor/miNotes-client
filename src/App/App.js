import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FolderListNav from '../FolderListNav/FolderListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import NotefulFormError from "../errors/NotefulFormError";
// import NotefulForm from '../NotefulForm/NotefulForm';
// import { debug } from 'util';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),// initial fetch for landing page; shows all folders and all notes
      fetch(`${config.API_ENDPOINT}/api/folders`) //todo move each of these to services
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders },
          ()=>{
            console.log(this.state)
          })
       
      })
      .catch(error => {
        console.error({ error })
      })
  }



//// handler functions in parent component that setState -> passed into context below
  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.note_id !== noteId)//var change
    })
  }

  handleDeleteFolder = folderId => {
      console.log('deleting folder #', folderId)
      this.setState({
        folders: this.state.folders.filter(item => item.id != folderId)
      })
      console.log(this.state)
  }




  render() {
    
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      deleteFolder:this.handleDeleteFolder,
    }
  
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
      <NotefulFormError>




          <nav className='App__nav'>
          <Route
            exact
            key={'/'}// nav view (list) for home/landing page
            path={'/'}
            component={FolderListNav}
          />    
          <Route
            exact
            key={'/folder/:folderid'}// nav view (list) when folder selected
            path={'/folder/:folderid'} //
            component={FolderListNav}
          />
 
        <Route
          path='/api/note/:note_id' // nav view for when a note is selected
          component={NotePageNav}
        />
        <Route
          path='/add-folder'  //nav view when adding folder
          component={NotePageNav}
        />
        <Route
          path='/add-note' // nav view when adding note
          component={NotePageNav}
        />
          </nav>



          </NotefulFormError>
          <header className='App__header'>
            <h1>
              <Link to='/'>miNotes</Link> 
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <NotefulFormError>



          <main className='App__main'>
        
        
          {/*  ROUTES FOR NOTE-LIST-MAIN COMPONENT  */}
         <Route
            exact
            key={'/'} // main view (list)for home/landing page
            path={'/'}
            component={NoteListMain}
          />   
          <Route
            exact
            key={'/folder/:folderid'} // main view (list)when a folder is selcted
            path={'/folder/:folderid'}
            component={NoteListMain}
          />

        <Route
          path='/note/:note_id'// main view (page) when a note is selected
          component={NotePageMain}
        />
        <Route
          path='/add-folder' // main view for adding folder
          component={AddFolder}
        />
        <Route
          path='/add-note' // main view for adding a note
          component={AddNote}
        />
      
          </main>



      </NotefulFormError>
        </div>

      </ApiContext.Provider>
    )
  }
}

export default App
