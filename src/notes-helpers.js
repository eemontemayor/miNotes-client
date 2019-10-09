
export const findFolder = (folders=[], folderId) =>{
  return folders.find(folder => folder.id === folderId)

}

export const findNote = (notes=[], noteId) => {
  return notes.find(note => note.note_id == noteId)

}

export const getNotesForFolder = (notes=[], folderId) => {
  
  if(!folderId){
    return notes
  } 
    return notes.filter(note => note.folderid == folderId)
}

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderid === folderId).length
