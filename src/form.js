import notesManager from "./notes-manager"

const formManager = (function() {
    const formName = 'formName'
    const formHeading = 'Heading'
    
    const container = document.createElement('div')
    const form = document.createElement('form')
    container.classList.add('form-container')
    form['name'] = formName
    const heading = document.createElement('h1')
    heading.innerText = 'New Note'
    form.appendChild(heading)
    container.appendChild(form)

    form.addEventListener('submit', getFormInformation)

    createInput('Title')
    createInput('Note Item')
    createInput('Due Date')
    createInput('Priority')
    createInput('Description', 'textarea')
    createSelect('Project')
    createSubmitButton()
    
    function createInput(nameID, type = 'input'){
        const container = document.createElement('div')
        const input = document.createElement(type)
        const label = document.createElement('label')

        input['name'] = String(nameID).toLowerCase()
        input['id'] = String(nameID).toLowerCase()
        label['htmlFor'] = String(nameID).toLowerCase()

        label.innerText = nameID

        container.appendChild(label)
        container.appendChild(input)
        form.appendChild(container)
    }

    function createSelect(nameID) {
        const container = document.createElement('div')
        const select = document.createElement('select')
        const label = document.createElement('label')

        select['name'] = String(nameID).toLowerCase()
        select['id'] = String(nameID).toLowerCase()
        label['htmlFor'] = String(nameID).toLowerCase()

        label.innerText = 'Projects:'

        notesManager.projects.forEach(project => {
            const option = document.createElement('option')
            option.value = project.title
            option.innerText = project.title
            if (option.value === notesManager.allNotes) option.selected = 'selected'
            select.appendChild(option)
        })

        container.appendChild(label)
        container.appendChild(select)
        form.appendChild(container)
    }

    function createSubmitButton(text = 'Button') {
        const container = document.createElement('div')
        const button = document.createElement('button')

        button.classList.add('submit-button')
        button['type'] = 'submit'
        button['htmlFor'] = 
        button.innerText = text

        container.appendChild(button)
        form.appendChild(container)
    }

    function getFormInformation(e) {
        e.preventDefault()
        const output = {}
        const inputs = [...form]
        inputs.forEach(input => {
            if (!input.value) return
            output[input.name] = input.value
        })
        inputs.forEach(input => {
            if(input.value && typeof input != 'function') input.value = ''
        })
        return output
    }

    function changeHeading(text = formHeading) {
        heading.innerText = text
    }

    return {
        container,
        changeHeading,
        createInput,
        createSubmitButton,
        getFormInformation
    }
})()

export default formManager