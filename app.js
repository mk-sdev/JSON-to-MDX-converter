// Pobieramy elementy
const inp = document.querySelector('#input')
const output = document.querySelector('#output')
const button = document.querySelector('#updateButton')

// Funkcja do aktualizacji outputa
function changeToMDX() {
  const inputValue = JSON.parse(inp.value) // Pobieramy wartość z inputa

  let out = ''
  let component = ''

  // If a whole JSON file passed
  if (inputValue[0].data) {
    inputValue.forEach((JSONSegment, i) => {
      let title = JSONSegment.title
      if (title && title !== '') out += '## ' + JSONSegment.title + '\n\n'
      else if (i === 0) {
      } else out += '<hr />\n\n'

      JSONSegment.data.forEach(JSONComponent => {
        component = processComponent(JSONComponent)
        out += component
      })
    })
  }
  // If a single segment passed
  else
    inputValue.forEach(JSONComponent => {
      component = processComponent(JSONComponent)
      out += component
    })

  console.log(out)
  output.textContent = out // Wyświetlamy w output
}

function processComponent(component) {
  switch (component.type) {
    case 'Text':
      return processText(component.value)
    case 'List':
      let items = component.value
      return processText(`- ${items.join('\n- ')}`)
    case 'Header':
      return `### ${component.value}\n\n`
    case 'Divider':
      return '<hr/>\n\n'
    case 'YouTube':
      return `<YT id={"${component.value}"}/>\n\n`
    case 'Image':
      if (component.props)
        return `<Img src={"${component.value}"} description="${component.props.description}"/>\n\n`
      else return `<Img src={"${component.value}"} />\n\n`
    case 'Code':
      return `\`\`\`${component.props.language}\n${component.value}\n\`\`\`\n\n` // Obsługa komponentu Code
    case 'Block':
      let type = component.props.type
      if (type === 'info') type = 'note'
      else if (type === 'warning') type = 'caution'

      // Przetwarzamy zawartość Block rekurencyjnie
      const blockContent = component.value.map(processComponent).join('')

      return `<Aside type="${type}">\n\n${blockContent}</Aside>\n\n`
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

  text += '\n\n'

  return text
}

// Dodajemy nasłuchiwanie na kliknięcie przycisku
button.addEventListener('click', changeToMDX)
