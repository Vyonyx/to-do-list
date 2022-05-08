const addNote = (function (){
    const button = document.createElement('div')
    const symbol = document.createElement('h1')
    button.classList.add('add-note-button')
    symbol.innerText = 'X'
    button.appendChild(symbol)
    return {
        button
    }
})()

export { addNote }