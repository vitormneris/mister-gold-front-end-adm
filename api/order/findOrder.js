import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {
    fetch('http://localhost:8084/clientes/' + id + '/id', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(data => {
        showData(data)
    })
    .catch(error => {
        console.log(error)
    });
}).catch(error => {
    console.log(error)
})

function showData(client) {
    console.log(client)

    let count = 0
    client.order.forEach(order => {
        count++
        const mainConteiner = document.getElementById("container")

        const divConteiner = document.createElement("div")
    
        order.items.forEach(item => {
            const itemHTML = `
                        <div class="item-container">
                            <div class="left">
                                <div class="item-img"><img src="${item.product.imageUrl}" class="item-img" style="width: 100px; height:100px"></div>
                                <div class="item-name"><h3>${item.product.name}</h3></div>
                            </div>
                            <div class="item-quantity">
                                <label for="item-quantity">Quantidade:</label>
                                <span id="quantity" class="item-quantity")">${item.quantity}</span>
                            </div>
                            <div class="item-price">
                                <label for="item-price">Valor unitário:</label>
                                <h3>R$ ${item.price.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>`
            divConteiner.innerHTML += itemHTML;
        })
    
        const firstPartConteiner = `
            <div class="form-container">
                <h2>Pedido ${count}</h2>
                <hr class="hr" />
                <h3 class="confirmTxt">Por favor, confirme os itens de seu pedido antes de concluir a compra:</h3>
                <hr class="hr" />`
         
        const date = new Date(order.moment);

        const formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    
        const secondPartConteiner = `
                <h2 style="color: black; font-size: 25px; margin: 15px">Total do pedido: <span id="totalPrice"  style="color: blue; font-size: 23px">R$ ${order.totalPrice.toFixed(2)}</span></h2>
                <h2 style="color: black; font-size: 25px; margin: 15px">Momento: <span id="moment" style="color: blue;  font-size: 23px">${formattedDate}</span></h2>
                <h2 style="color: black; font-size: 25px; margin: 15px">Status do pedido: <span id="orderStatus" style="color: blue;  font-size: 23px">${order.orderMessage}</span></h2>
    
                <button class="btn btn-success w-100">Confirmar compra</button>
            </div>`
    
        mainConteiner.innerHTML += firstPartConteiner + divConteiner.outerHTML + secondPartConteiner
    })
   
}
