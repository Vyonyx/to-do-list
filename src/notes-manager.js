// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = []
    let notes = []

    const allNotes = 'All Notes'
    const projectListTitle = 'Project List'

    const myProject = createProject(allNotes)
    const secondProject = createProject('Second Project')
    
    function createProject(title) {
        const project = {
            title,
            notes: [],
            addNote: function(note) { this.notes.push(note) },
            getNote: function(title) { return this.notes.find(x => x.title == title) },
        }
        projects.push(project)
        return project
    }
    
    function createNote(formData) {
        const note = {
            title: formData.title,
            description: formData.description || '',
            items: [],
            dueDate: formData.dueDate || '',
            priority: formData.priority || '',
            project: formData.project || allNotes,
            addItem: function(newItem) { this.items.push(newItem) }
        }
        note.addItem(formData['note item'])
        notes.push(note)
        return note
    }

    const getProjectList = () => projects.flatMap(project => project.title)
    const getAllNotes = () => notes
    const getProjectNotes = (project) => {
        const projectNotes = notes.filter(note => note.project == project)
        return projectNotes
    }

    return {
        projects,
        createProject,
        getProjectList,
        createNote,
        getAllNotes,
        getProjectNotes,

        allNotes,
        projectListTitle,
    }
})()

export default notesManager
