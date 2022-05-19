formManager = (function() {
    const formName = 'formName'
    const formHeading = 'Heading'
    
    const container = document.createElement('div')
    const form = document.createElement('form')
    container.classList.add('form-container')
    form['name'] = formName
    const heading = document.createElement('h1')
    heading.innerText = 'Form Heading'
    form.appendChild(heading)
    container.appendChild(form)

    form.addEventListener('submit', getFormInformation)

    createSubmitButton()
    createInput('Title')

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

    function createSubmitButton(text = 'Button') {
        const container = document.createElement('div')
        const button = document.createElement('button')

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