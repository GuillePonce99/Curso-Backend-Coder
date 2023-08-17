const btnIncrease = document.querySelector(".btn-increase")
const btnDecrease = document.querySelector(".btn-decrease")
const cartIdElem = document.getElementById("title-cart")
const quantityElem = document.querySelector(".btn-addToCart")

let quantity = quantityElem.getAttribute("quantity")

const updateQuantity = () => {
    let element = ""
    element += `<p>${quantity}<p>`
    quantityElem.innerHTML = element
}

btnIncrease.addEventListener("click", async (e) => {

    const ul = e.target.closest('ul')

    const cartId = cartIdElem.getAttribute("cartId")
    const productId = ul.dataset.id

    await fetch(`/api/carts/${cartId}/products/${productId}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "quantity": 1 }),

    })

    quantity = Number(quantity) + 1

    updateQuantity()

    Toastify({
        text: `Actualizado!`,
        duration: 1000,
        className: "info",
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()

})

btnDecrease.addEventListener("click", async (e) => {
    const ul = e.target.closest('ul')

    const cartId = cartIdElem.getAttribute("cartId")
    const productId = ul.dataset.id

    if (Number(quantity) > 1) {
        await fetch(`/api/carts/${cartId}/products/${productId}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "quantity": -1 }),

        })
        quantity = Number(quantity) - 1
        updateQuantity()

        Toastify({
            text: `Actualizado!`,
            duration: 3000,
            className: "info",
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast()

    } else {

        Toastify({
            text: `:(`,
            duration: 3000,
            className: "info",
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to left, #b00017, #5e1f21)"
            }
        }).showToast()

    }
})
