import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props){
    super(props);
    this.folderInput= React.createRef();
   
  }  
  static defaultProps = {
    history: {
      push: () => { }
    },
  }


  state ={
    name: '', 
    folderValid: false,
    formValid: false,
    validationMessages: {}
  };
 
  static contextType = ApiContext;

  setFolder = (name) => {
    console.log(name);
    this.setState({name}, () => this.validateFolder(name));
  };


  validateFolder = (name) => {
  
    const validationMessages = {...this.state.validationMessages};
    let folderValid = true;
   
    if (name.length <= 1){
      validationMessages.name = 'Name must be at least 2 character long.';
      folderValid = false;
      throw Error;
   
    } else if (name.length > 15){
      validationMessages.name = 'Name must be no more than 15 characters long.';
      folderValid = false;
      console.log(' folder error if more than 15')
      throw Error;
    }

    this.setState({validationMessages, folderValid, }, this.validateForm);
  } 


  validateForm = () => {
    this.setState({
      formValid: this.state.folderValid 
    });
  }


  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      folder_name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/api/folders`, { // todo: move this to services
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
          return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' ref={this.folderInput}/>
          </div>
          <div className='buttons'>
            <button type='submit' onClick={(e)=>this.setFolder(this.folderInput.current.value)}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
