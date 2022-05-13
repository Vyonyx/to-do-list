import './scss/style.scss'
import { layout, projectList } from './notes-display'
import { addNote, accentItems } from './components'

document.body.appendChild(layout.container)
document.body.appendChild(accentItems.container)
document.body.appendChild(addNote.button)

layout.listContainer.appendChild(projectList.projects)