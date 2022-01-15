export default function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Créé l'élément contenant la carte du photographe
        const article = document.createElement( 'article' );

        // Créé le lien vers la page du photographe
        const link = document.createElement( 'a' );
        link.setAttribute("href", "photographer.html?id="+id);
        link.setAttribute("aria-label", name);
        link.setAttribute("class", "card");

        // Créé l'élément de la photo du photographe
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("id", "photograph-img")
        img.setAttribute("alt", "picture of the photograph: " + name);

        // Créé l'élément nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // Créé l'élément contenant la localisation, la tagline et le tarif
        const span = document.createElement( 'span' );

        // Créé l'élément localisation
        const location = document.createElement( 'h3' );
        location.textContent = `${city}, ${country}`;

        // Créé l'élément tagline
        const paragraphe = document.createElement( 'p' );
        paragraphe.textContent = tagline;

        // Créé l'élément tarif
        const rate = document.createElement( 'p' );
        rate.textContent = price + "€/jour";

        // Mise en page de la carte du photographe
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(span);
        span.appendChild(location);
        span.appendChild(paragraphe);
        span.appendChild(rate);
        return (article);
    }
    return { name, picture, id, city, country, tagline, price, getUserCardDOM }
}