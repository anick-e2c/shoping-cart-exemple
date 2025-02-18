document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les boutons "+" et "-"
    const addButtons = document.querySelectorAll('.fa-plus-circle');
    const removeButtons = document.querySelectorAll('.fa-minus-circle');

    // Sélectionner l'élément du prix total
    const totalPriceElement = document.getElementById('price-end');

    // Sélectionner toutes les icônes de suppression (fa-trash-alt)
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');


    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        let totalPrice = 0;

        // Parcourir tous les produits
        document.querySelectorAll('.card-body').forEach((product) => {
            const quantity = parseInt(product.querySelector('.quantity').textContent);
            const unitPrice = parseFloat(product.querySelector('.unit-price').textContent);
            totalPrice += quantity * unitPrice;
            console.log(`lhjkhjkhj${totalPrice}`)
        });

        // Mettre à jour l'affichage du prix total
        totalPriceElement.textContent = `${totalPrice} $`;
    }


    // Ajouter des écouteurs d'événements pour les boutons "+"
    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const quantityElement = button.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity += 1; // Incrémenter la quantité
            quantityElement.textContent = quantity;
            updateTotalPrice(); // Mettre à jour le prix total
        });
    });


    // Ajouter des écouteurs d'événements pour les boutons "-"
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const quantityElement = button.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity -= 1; // Décrémenter la quantité (ne pas aller en dessous de 0)
                quantityElement.textContent = quantity;
                updateTotalPrice(); // Mettre à jour le prix total
            }
        });
    });


    // Sélectionner toutes les icônes de poubelle
    const trashIcons = document.querySelectorAll('.fa-trash-alt');
     // Ajouter des écouteurs d'événements pour les icônes de poubelle
     trashIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {

                // Trouver la carte parente à supprimer
                const cardBody = icon.closest('.card-body');
                if (cardBody) {
                    cardBody.classList.add('removing');
                    setTimeout(() => {
                        cardBody.remove(); // Supprimer la carte du DOM
                        updateTotalPrice(); // Mettre à jour le prix total
                    },300) // Correspond à la durée de l'animation
                }
            }
        });
    });

    
    // Sélectionner toutes les icônes de cœur (fa-heart)
    const heartIcons = document.querySelectorAll('.fa-heart');

    // Ajouter des écouteurs d'événements pour les icônes de cœur
    heartIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            // Basculer la classe 'active' pour appliquer ou retirer la couleur rose
            icon.classList.toggle('active');
        });
    });
})