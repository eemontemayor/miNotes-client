import config from '../config';
// import TokenService from '../services/token-service';

const NoteService = {
    deleteNote(note_id){
    return fetch(`${config.API_ENDPOINT}/api/note/${note_id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      }) 
      .then(res => {
        if (!res.ok) {
        //   if (!res.ok)
        //   return res.json().then(e => Promise.reject(e))
        // return res.json()
            throw new Error()
        }
      })
    },  
    addNote(newNote){
        return fetch(`${config.API_ENDPOINT}/api/notes`, {
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
    }
}
export default NoteService;