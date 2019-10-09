  
import config from '../config';
// import TokenService from '../services/token-service';


const FolderService = {
    addFolder(folder){
       return fetch(`${config.API_ENDPOINT}/api/folders`, { // todo: move this to services
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
    },
    deleteFolder(folderId){

    },
    // editFolder(){

    // },
    getFolders(){

    }

}

export default FolderService;