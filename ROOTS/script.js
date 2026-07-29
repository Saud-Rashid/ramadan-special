let selectedItemName = null;
let quantity = '0';

// Item Selection Function
function selectItem(element, name) {
    document.querySelectorAll('.item-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedItemName = name;
    
    const labelDisplay = document.getElementById('selected-item-label');
    labelDisplay.innerText = `Selected: ${name}`;
    labelDisplay.style.color = '#10b981'; // Active color highlight
}

// Append Number from Dialpad
function appendNum(num) {
    if (quantity === '0') {
        quantity = num;
    } else {
        if (quantity.length < 4) { // Limit max digits
            quantity += num;
        }
    }
    updateDisplay();
}

// Clear Display (C Button)
function clearDisplay() {
    quantity = '0';
    updateDisplay();
}

// Delete Single Digit
function deleteLast() {
    if (quantity.length > 1) {
        quantity = quantity.slice(0, -1);
    } else {
        quantity = '0';
    }
    updateDisplay();
}

// Update Screen Display
function updateDisplay() {
    document.getElementById('quantity-display').innerText = quantity;
}

// Submit / Confirm Order
function submitOrder() {
    if (!selectedItemName) {
        alert('⚠️ দয়া করে আগে একটি Drinks আইটেম সিলেক্ট করুন!');
        return;
    }
    if (quantity === '0') {
        alert('⚠️ কমপক্ষে ১টি Glass নির্বাচন করুন!');
        return;
    }

    alert(`✅ অর্ডার কনফার্ম হয়েছে!\n\n🍹 Item: ${selectedItemName}\n🥤 Quantity: ${quantity} Glasses`);
    
    // Reset state
    clearDisplay();
}