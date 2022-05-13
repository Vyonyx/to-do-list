import './scss/style.scss'
import { layoutManager, projectListManager } from './notes-display'
import { addNote, accentItems } from './components'

document.body.appendChild(layoutManager.container)
document.body.appendChild(accentItems.container)
document.body.appendChild(addNote.button)

layoutManager.listContainer.appendChild(projectListManager.projects)