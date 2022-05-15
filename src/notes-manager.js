// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = []

    const allNotes = 'All Notes'
    const projectListTitle = 'Project List'

    const myProject = createProject(allNotes)
    const newProject = createProject('Second Project')
    const newProject2 = createProject('Third Project')
    const myNote = createNote(
        'Note Two', 
        'First item in list of to-dos?',
        'Second Project',
        'A general representation of how my card may be formatted.',
        '15/05',
        'high'
    )

    const myNote2 = createNote(
        'Note Three', 
        'First item in list of to-dos?',
        'Third Project',
        'A general representation of how my card may be formatted.',
        '15/05',
        'high'
    )

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
    
    function createNote(title, firstItem, projectTitle, description, dueDate, priority) {
        const note = {
            title,
            description: description || '',
            items: [firstItem],
            dueDate: dueDate || '',
            priority: priority || '',
            addItem: function(newItem) { this.items.push(newItem) }
        }
        if (projectTitle == null) {
            projects[0].addNote(note)
        } else if (projectTitle) {
            findProject(projectTitle).addNote(note)
        }
        return note
    }

    function findProject(title) { return projects[projects.findIndex(projects => projects.title == title)] }
    const getProjectList = () => projects.flatMap(project => project.title)
    const getAllNotes = () => projects.flatMap(project => project.notes)

    return {
        projects,
        createProject,
        findProject,
        getProjectList,
        createNote,
        getAllNotes,
        allNotes,
        projectListTitle,
    }
})()

export default notesManager
