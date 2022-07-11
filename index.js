const ws = new WebSocket(`wss://${host}`)

document.querySelector('#list').addEventListener('click', sendMessage)
const ul = document.querySelector('ul')

ws.addEventListener('open', () => {
    ws.send(JSON.stringify({
        action: 'ONLINE',
        agent: '2000',
        controlNumber: '100023',
        categories: [1,2,3,0]
    }))
})

function sendMessage() {
    ws.send(JSON.stringify({
        action: 'LIST_ALL_CONTACTS',
        agent: '2000',
        controlNumber: '100023',
    }))

}

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    if(data.action === 'LIST_ALL_CONTACTS') {
        data.contacts[0].busy = true // para testar o status do contato
        data.contacts.forEach(addContact)
        document.querySelectorAll('.jefao-error').forEach(img => {
            img.addEventListener('error', handleImgError)
        })
    }
    console.log(data)
})

function addContact(contact) {
    const li = document.createElement('li')
    li.innerHTML = buildHTML(contact)
    ul.appendChild(li)
}
// darkseagreen palevioletred
function buildHTML(contact) {
    return `<div class="card mb-3" style="max-width: 540px; background-color: ${contact.busy?'palevioletred':'darkseagreen'}" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${contact.imgUrl}" class="img-fluid rounded-start jefao-error" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${contact.name}</h5>
                            <p class="card-text">${contact.whatsapp} </p>
                        </div>
                    </div>
                </div>
            </div>`
}

function handleImgError(event) {
    event.target.src = 'assets/imgs/user.png'
    event.onerror = null // previne o erro de loop infinito
}


