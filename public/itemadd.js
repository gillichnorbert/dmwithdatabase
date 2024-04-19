const nameInput = document.querySelector("#itemName");
const amountInput= document.querySelector("#itemAmount");
const priceInput= document.querySelector("#itemPrice");
const categoryInput= document.querySelector("#itemCategory");

function addItem() {
    const url = MongoUri + "/" + dbname.collectionname;
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            amount: amountInput.value,
            price: priceInput.value,
            category: categoryInput.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add item');
        }
        return response.json();
    })
    .then(data => {
        console.log('Employee added:', data);
        // Esetlegesen frissítheted a felhasználói felületet az új elem hozzáadása után
        // pl. újra lekérdezheted az összes elemet és megjelenítheted őket a felületen
    })
    .catch(error => console.error('Error adding employee:', error));
}
