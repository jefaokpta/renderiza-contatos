const ws = new WebSocket(`wss://${host}`)

document.querySelector('#list').addEventListener('click', sendMessage)

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
        data.contacts[0].busy = true // deixando o primeiro contato ocupado
        listContactsApp.contacts = data.contacts
    }
    console.log(data)
})

// O Vue fez toda a renderizacao, tratamento da foto e cor dos contatos
const listContactsApp = new Vue({
    el: '#listContactsApp',
    data: {
        classLivre: 'livre',
        classOcupado: 'ocupado',
        contacts: [],
    },
    methods: {
        handleImgError(event) {
            event.target.src = 'assets/imgs/user.png'
            event.onerror = null // previne o erro de loop infinito
        }
    }
})
