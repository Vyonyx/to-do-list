import './scss/style.scss'
import notesManager from './notes-manager'
import { layoutManager, projectListManager, cardManager } from './notes-display'
import { addNote, accentItems } from './components'

function addToBody(items) { items.forEach(item => document.body.append(item)) }

addToBody([layoutManager.container, projectListManager.projects, accentItems.container, addNote.button])

const allNotes = notesManager.getAllNotes()
cardManager.populateAllCards(allNotes)