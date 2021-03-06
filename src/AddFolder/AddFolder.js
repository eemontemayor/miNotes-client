import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
// import config from '../config'
import './AddFolder.css'
import FolderService from '../services/folderService'

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
    capName:'',
    folderValid: false,
    formValid: false,
    validationMessages: {}
  };
 
  static contextType = ApiContext;

  setFolder = (name) => {
    let capName = name.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    // console.log(name, capName);
    this.setState({capName}, () => this.validateFolder(capName));
  };


  validateFolder = (name) => {
    
    const validationMessages = {...this.state.validationMessages};
    let folderValid = true;
   
    if (name.length <= 1){
      validationMessages.name = 'Name must be at least 2 character long.';
      folderValid = false;
      // throw Error;
   
    } else if (name.length > 15){
      validationMessages.name = 'Name must be no more than 15 characters long.';
      folderValid = false;
      console.log(' folder error if more than 15')
      // throw Error;
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
    const name = e.target['folder-name'].value.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    const folder = {
      folder_name: name
    }
    FolderService.addFolder(folder)
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
