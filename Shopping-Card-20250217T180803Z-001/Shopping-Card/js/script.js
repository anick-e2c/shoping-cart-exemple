document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les boutons "+" et "-"
    const addButtons = document.querySelectorAll('.fa-plus-circle');
    const removeButtons = document.querySelectorAll('.fa-minus-circle');

    // Sélectionner l'élément du prix total
    const totalPriceElement = document.getElementById('price-end');

    // Sélectionner toutes les icônes de suppression (fa-trash-alt)
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');

    // Sélectionner le conteneur des produits
    const listProducts = document.querySelector('.list-products');



    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        let totalPrice = 0;

        // Parcourir tous les produits
        document.querySelectorAll('.card').forEach((product) => {
            const quantity = parseInt(product.querySelector('.quantity').textContent);
            const unitPrice = parseFloat(product.querySelector('.unit-price').textContent);
            totalPrice += quantity * unitPrice;
            
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


    // Fonction pour supprimer le premier élément 'card-body'
    /*function removeFirstCardBody() {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {

            // Trouver le premier élément 'card-body'
            const firstCardBody = listProducts.querySelector('.card-body');
            
            if (firstCardBody) {

                firstCardBody.classList.add('removing');
                setTimeout( () => {
                    firstCardBody.remove(); // Supprimer l'élément du DOM
                    updateTotalPrice(); // Mettre à jour le prix total
                    console.log('Premier produit supprimé !');

                }, 300)

            } else {
                console.log('Aucun produit à supprimer.');
            }
        }
    
    }*/


    // Sélectionner toutes les icônes de poubelle
    const trashIcons = document.querySelectorAll('.fa-trash-alt');
    
    // Ajouter des écouteurs d'événements pour les icônes de poubelle
    /*trashIcons.forEach((icon) => {
        icon.addEventListener('click', removeFirstCardBody);
    });*/

    // Cette methode supprime que le 2ème élément de card-body
    trashIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {

                // Trouver la carte parente à supprimer associé à l'icône cliquée 
                const card = icon.closest('.card');
                
                if (card) {
                    //cardBody.classList.add('removing');
                    setTimeout(() => {
                        card.remove(); // Supprimer la carte du DOM
                        updateTotalPrice(); // Mettre à jour le prix total
                        updateCartAfterRemoval(card);

                    },300) // Correspond à la durée de l'animation
                }
            }
        });
    });


    // LE LoCALSTORAGE

    // Fonction pour mettre à jour le panier dans localStorage (optionnel)
      function updateCartAfterRemoval(card) {
        // Récupérer le nom du produit à supprimer
        const productName = card.querySelector('.card-title').textContent;
    
        // Récupérer le panier depuis localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Filtrer le panier pour supprimer le produit
        cart = cart.filter((product) => product.name !== productName);
    
        // Sauvegarder le panier mis à jour dans localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        console.log('Panier mis à jour dans localStorage.');
    } 

    
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