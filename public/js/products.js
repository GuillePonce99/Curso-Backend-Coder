const cartIdText = document.getElementById("cartId")
const btnAdd = document.querySelectorAll(".btn-addToCart")
const btnCart = document.getElementById("btn-cart")

const updateCart = (cid, products) => {
    cartBody = {
        "cartId": cid,
        "products": products
    }

}

const getCartId = () => {

    let ls = localStorage.cart
    let data

    if (ls === undefined) {
        return ls
    } else {
        data = JSON.parse(ls)
        return data.cartId
    }
}

const setCart = () => {
    localStorage.setItem("cart", JSON.stringify(cartBody))
}

const updateCartNumber = () => {
    let ls = localStorage.cart
    let data
    let number = ""
    let element = ``
    if (ls === undefined) {
        return 0
    } else {
        data = JSON.parse(ls)
        number += data.products.length
        element += `

        <div>🛒</div>
        <a href="/carts/${data.cartId}" class="cartId">${number}</a>
        `
        btnCart.dat
        return btnCart.innerHTML = element
    }
}
updateCartNumber()

let cartBody

btnCart.addEventListener("click", async (e) => {
    const cid = getCartId()
    await fetch(`/carts/${cid}`)
})

btnAdd.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const ul = e.target.closest('ul')

        const productId = ul.dataset.id

        console.log(productId);

        let cartId = getCartId()
        let products = []

        if (cartId === undefined) {

            await fetch(`/api/carts`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' }

            }).then(res => res.json()).then(data => {

                const { id } = data

                cid = id

                //updateCartNumber(cartId)

                updateCart(cid, products)

                setCart();

                Toastify({
                    text: `CARRITO N°: ${cid} creado con exito `,
                    duration: 3000,
                    className: "info",
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()

            }).catch(error => {

                if (error) {

                    Toastify({
                        text: `Error al crear un carrito`,
                        duration: 3000,
                        className: "info",
                        close: true,
                        gravity: "top",
                        position: "center",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to left, #b00017, #5e1f21)"
                        }
                    }).showToast();

                }

            })


        }

        cartId = getCartId()

        await fetch(`/api/carts/${cartId}/product/${productId}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        }).then(res => res.json()).then(data => {

            updateCart(cartId, data.data.products)

            setCart()

            updateCartNumber()

            Toastify({
                text: `Agregado exitosamente!`,
                duration: 3000,
                className: "info",
                close: true,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }

            }).showToast()

        }).catch((error) => {

            if (error) {

                Toastify({
                    text: 'Error al agregar el producto al carrito',
                    className: "success",
                    close: true,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "linear-gradient(to left, #b00017, #5e1f21)",
                    }
                }).showToast();

                console.log(error);

            }
        })


    })

});

//console.log(`cart id: ${cartId}   products: ${products}   cartBody:  `);


/*


*/
