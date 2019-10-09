import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './FolderListNav.css'

export default class FolderListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    
    return (
      <div className='FolderListNav'>
        <ul className='FolderListNav__list'>
          {folders.map(folder => // map method to display all of the folder / navlinks
            <li key={folder.id}>
              <NavLink
                className='FolderListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='FolderListNav__num-notes'>
                  {()=>{countNotesForFolder(notes, folder.id)}}
                </span>
                {folder.folder_name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='FolderListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='FolderListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
