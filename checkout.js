document.addEventListener('DOMContentLoaded', loadOrder);

function loadOrder() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = '';

    order.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('total-price').textContent = `$${totalPrice}`;
}

document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Validate form fields
    alert('Thank you for your order! Your medicines will be delivered soon.');
    localStorage.clear();
});
