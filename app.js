// Pobieramy elementy
const inp = document.querySelector('#input')
const output = document.querySelector('#output')
const button = document.querySelector('#updateButton')

// Funkcja do aktualizacji outputa
function changeToMDX() {
  const inputValue = JSON.parse(inp.value) // Pobieramy wartość z inputa

  let out = ''
  let component = ''

  inputValue.forEach(a => {
    component = processComponent(a)
    out += component + '\n\n'
  })
  console.log(out)
  output.textContent = out // Wyświetlamy w output
}

function processComponent(component) {
  switch (component.type) {
    case 'Text':
      return component.value //todo: change ins into code
    case 'Header':
      return `### ${component.value}`
    case 'Divider':
      return '<hr/>'
    case 'YouTube':
      return `<YT src={"${component.value}"}/>`
    case 'Image':
      return `<Image src={"${component.value}"} description="${component.props.description}"/>`
    case 'Code':
      return `\`\`\`${component.props.language}\n${component.value}\n\`\`\`` // Obsługa komponentu Code
    default:
      return ''
  }
}

// Dodajemy nasłuchiwanie na kliknięcie przycisku
button.addEventListener('click', changeToMDX)
