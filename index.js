// Medicine prices (add more as needed)
const prices = {
    'Paracetamol': 1.00,
    'Aspirin': 1.50,
    'Amoxicillin': 2.00,
    'Doxycycline': 2.50,
    'Ibuprofen': 1.20,
    'Tramadol': 2.80,
    'Ciprofloxacin': 3.00,
    'Erythromycin': 2.50,
    'Fluoxetine': 1.75,
    'Sertraline': 2.20,
    'Cetirizine': 1.00,
    'Fexofenadine': 1.30,
    'Amlodipine': 1.50,
    'Lisinopril': 2.00,
    'Losartan': 1.80
};

// Add item to the order
function addItem(name, category) {
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(/ /g, '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    const price = prices[name] || 0;
    const totalPrice = (price * quantity).toFixed(2);

    const tableBody = document.querySelector('#order-table tbody');
    let row = document.querySelector(`#order-table tbody tr[data-item="${name}"]`);

    if (row) {
        // Update existing row
        const quantityCell = row.querySelector('.quantity');
        const priceCell = row.querySelector('.price');
        const existingQuantity = parseFloat(quantityCell.textContent);
        quantityCell.textContent = (existingQuantity + quantity).toFixed(2);
        priceCell.textContent = (price * (existingQuantity + quantity)).toFixed(2);
    } else {
        // Add new row
        row = document.createElement('tr');
        row.dataset.item = name;
        row.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td class="quantity">${quantity.toFixed(2)}</td>
            <td class="price">${totalPrice}</td>
            <td><button class="remove-item" onclick="removeItem('${name}')">Remove</button></td>
        `;
        tableBody.appendChild(row);
    }

    updateTotalPrice();
    quantityInput.value = ''; // Clear the input field
}

// Update total price in the table
function updateTotalPrice() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    let total = 0;
    rows.forEach(row => {
        const priceCell = row.querySelector('.price');
        total += parseFloat(priceCell.textContent);
    });
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

// Save current order as favourites
function addToFavourites() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const favourites = {};
    rows.forEach(row => {
        const name = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.querySelector('.quantity').textContent;
        const price = row.querySelector('.price').textContent;
        favourites[name] = { category, quantity, price };
    });

    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Order saved as favourites.');
}

// Apply favourites to the order table
function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
    const tableBody = document.querySelector('#order-table tbody');
    tableBody.innerHTML = ''; // Clear the current table

    for (const [name, details] of Object.entries(favourites)) {
        const row = document.createElement('tr');
        row.dataset.item = name;
        row.innerHTML = `
            <td>${name}</td>
            <td>${details.category}</td>
            <td class="quantity">${details.quantity}</td>
            <td class="price">${parseFloat(details.price).toFixed(2)}</td>
            <td><button class="remove-item" onclick="removeItem('${name}')">Remove</button></td>
        `;
        tableBody.appendChild(row);
    }

    updateTotalPrice();
    alert('Favourites applied to your order.');
}

// Remove item from the order
function removeItem(name) {
    const row = document.querySelector(`#order-table tbody tr[data-item="${name}"]`);
    if (row) {
        row.remove();
        updateTotalPrice();
    }
}

// Buy Now: Save order and navigate to checkout page
function buyNow() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    if (rows.length === 0) {
        alert('Your cart is empty. Please add items before proceeding.');
        return;
    }

    const order = [];
    let totalPrice = 0;

    rows.forEach(row => {
        const name = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.querySelector('.quantity').textContent;
        const price = row.querySelector('.price').textContent;
        order.push({ name, category, quantity, price });
        totalPrice += parseFloat(price);
    });

    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    window.location.href = 'checkout.html'; // Navigate to checkout page
}

// Clear all data from local storage
function clearLocalStorage() {
    localStorage.clear();
    alert('Local storage has been cleared.');
}
