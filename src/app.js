import './scss/style.scss'
import notesManager from './notes-manager'
import { layoutManager, projectListManager, cardManager, formDisplay } from './notes-display'
import { addNote, accentItems } from './components'

// Adding basic layout containers to the body.
function addToBody(items) { items.forEach(item => document.body.append(item)) }
addToBody([layoutManager.container, projectListManager.projects, accentItems.container, addNote.button, formDisplay.container])

// Initial population of all notes, irrespective to which project it belongs to.
const allNotes = notesManager.getAllNotes()
cardManager.populateAllCards(allNotes)

// Change displayed notes depending on clicked heading in project list.
document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('heading')) return
    e.target.addEventListener('click', cardManager.populateCurrentProjectCards(e.target.dataset.project))
})

addNote.button.addEventListener('click', function() {
    formDisplay.resetForm()
    formDisplay.toggleFormDisplay()
})

const form = document.forms['card-form']
document.querySelector('form').addEventListener('click', (e) => {
    console.log('pls work')
    return false
})

document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('exit-button')) return
    formDisplay.toggleFormDisplay()
})