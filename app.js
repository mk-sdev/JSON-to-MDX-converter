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
      return processText(component.value) 
    case 'Header':
      return `### ${component.value}`
    case 'Divider':
      return '<hr/>'
    case 'YouTube':
      return `<YT id={"${component.value}"}/>`
    case 'Image':
      return `<Image src={"${component.value}"} description="${component.props.description}"/>`
    case 'Code':
      return `\`\`\`${component.props.language}\n${component.value}\n\`\`\`` // Obsługa komponentu Code
    default:
      return ''
  }
}

function processText(text) {
  // Zamieniamy <ins> na <code>, jeśli nie ma klasy "hint"
  text = text.replace(
    /<ins(?![^>]*class=["']hint["'])[^>]*>(.*?)<\/ins>/g,
    '<code>$1</code>'
  )

  // Usuwamy <ins> całkowicie, jeśli posiada klasę "hint"
  text = text.replace(/<ins[^>]*class=["']hint["'][^>]*>(.*?)<\/ins>/g, '$1')

  // Zamieniamy <br>, <br/> i </br> na dwie nowe linie
  text = text.replace(/<br\s*\/?>|<\/br>/g, '\n')

  return text
}





// Dodajemy nasłuchiwanie na kliknięcie przycisku
button.addEventListener('click', changeToMDX)
