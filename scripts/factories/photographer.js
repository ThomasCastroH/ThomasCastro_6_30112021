function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex", "0");

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "picture of the photographer");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const span = document.createElement( 'span' );

        const location = document.createElement( 'h3' );
        location.textContent = city +', ' + country;

        const paragraphe = document.createElement( 'p' );
        paragraphe.textContent = tagline;

        const rate = document.createElement( 'p' );
        rate.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(span);
        span.appendChild(location);
        span.appendChild(paragraphe);
        span.appendChild(rate);
        return (article);
    }
    return { name, picture, id, city, country, tagline, price, getUserCardDOM }
}