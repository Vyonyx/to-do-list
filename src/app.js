import './scss/style.scss'
import layout from './layout'
import accentItems from './accents'
import { addNote } from './components'
import { projectList } from './side-bar'
import displayViewer from './notes-display'

document.body.appendChild(layout.container)
document.body.appendChild(accentItems.container)
document.body.appendChild(addNote.button)

layout.listContainer.appendChild(projectList.projects)