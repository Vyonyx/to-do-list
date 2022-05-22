import './scss/style.scss'
import notesManager from './notes-manager'
import { layoutManager, projectListManager, cardManager, formDisplay } from './notes-display'
import { addNote, accentItems } from './components'
import formManager from './form'

// Adding basic layout containers to the body.
function addToBody(items) { items.forEach(item => document.body.append(item)) }
addToBody([layoutManager.container, accentItems.container, addNote.button, formDisplay.container])

// Initial population of all notes, irrespective to which project it belongs to.
const allNotes = notesManager.getAllNotes()
cardManager.populateAllCards(allNotes)

// Change displayed notes depending on clicked heading in project list.
document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('heading')) return
    e.target.addEventListener('click', cardManager.populateCurrentProjectCards(e.target.dataset.project))
})

document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('add-note-button')) return
    formDisplay.toggleFormDisplay()
})

const submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', (e) => {
    const formFieldData = formManager.getFormInformation(e)
    if (!formFieldData.title) {
        alert('Please fill out title information.')
        return
    } 
    const newNote = notesManager.createNote(formFieldData)
    cardManager.populateAllCards(notesManager.getAllNotes())
    formDisplay.toggleFormDisplay()
})