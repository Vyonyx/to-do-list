// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = [];

    const allProjects = createProject('All Notes')
    addToProjectList(allProjects)

    const project1 = createProject('Trip Overseas')
    addToProjectList(project1)
    const project2 = createProject('Work')
    addToProjectList(project2)

    const note1 = createNewNote('Leaving New Zealand')
    note1.addNewNoteItem('Book tickets')
    note1.addNewNoteItem('Pack bags')
    note1.addNewNoteItem('Book public transport')

    const note2 = createNewNote('London Itinerary')
    note2.addNewNoteItem('See London eye')
    note2.addNewNoteItem('Visit Hambden Markets')
    note2.addNewNoteItem('Grab a drink at Soho')
    
    project1.addNewNote(note1)
    project1.addNewNote(note2)

    function assignNewNoteToProject(note, project) {
        project.addNewNote(note)
    }

    function createNewNote(title) {
        const items = []
        function addNewNoteItem(note) { items.push(note) }

        return {
            title,
            items,
            addNewNoteItem
        }
    }

    function createProject(title) {
        const notes = []
        return {
            title,
            notes,
            addNewNote: function(note) {
                notes.push(note)
            },
        }
    }

    function addToProjectList(project) { projects.push(project) }

    function removeFromProjectList(project) {
        const index = projects.indexOf(project)
        projects.splice(index, 1)
    }

    function removeNoteFromProject(noteToRemove) {
        projects.forEach(project => { // Object
            project.notes.forEach(note => { // Object
                const currentIndex = project.notes.indexOf(note)
                if (note == noteToRemove) {
                    project.notes.splice(currentIndex, 1)
                }
            })
        })
    }

    return {
        projects,
        createNewNote,
        addToProjectList,
        removeFromProjects: removeNoteFromProject,
    }
})()

export default notesManager