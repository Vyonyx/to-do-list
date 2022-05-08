const accentItems = (function () {
    const container = document.createElement('div')
    container.classList.add('accents')
    const horizontalLine = document.createElement('div')
    const verticalLine = document.createElement('div')

    horizontalLine.classList.add('horizontal', 'line')
    verticalLine.classList.add('vertical', 'line')

    container.appendChild(horizontalLine)
    container.appendChild(verticalLine)

    return {
        container
    }
})()

export default accentItems