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
    note1.addNewItem('Book tickets')
    note1.addNewItem('Pack bags')
    note1.addNewItem('Book public transport')

    const note2 = createNewNote('London Itinerary')
    note2.addNewItem('See London eye')
    note2.addNewItem('Visit Hambden Markets')
    note2.addNewItem('Grab a drink at Soho')
    
    project1.addNewNote(note1)
    project1.addNewNote(note2)

    function createNewNote(noteTitle) {
        const noteList = []
        return {
            title: noteTitle,
            items: noteList,
            addNewItem: function (note) {
                noteList.push(note)
            },
            logItems: function () {
                noteList.forEach(note => console.log(note))
            }
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
            logAllNotes: function() {
                notes.forEach(note => {
                    console.table(note)
                })
            }
        }
    }

    function addToProjectList(project) {projects.push(project)}

    return {
        projects,
        createNewNote,
        addToProjectList,
    }
})()

export default notesManager