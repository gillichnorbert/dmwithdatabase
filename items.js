document.addEventListener('DOMContentLoaded', function () {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            const itemPlace = document.getElementById('itemPlace');
            const cardContainer = document.createElement('div');
            cardContainer.className = 'row';
            itemPlace.appendChild(cardContainer);

            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card-item';
                card.innerHTML = `
                    <div class="card ${item.category}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <h6 class="card-subtitle">${item.amount}</h6>
                            <p class="card-text">${item.price} Ft</p>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
});
