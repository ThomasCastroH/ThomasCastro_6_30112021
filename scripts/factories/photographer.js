function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const span = document.createElement( 'span' );
        const h3 = document.createElement( 'h3' );
        h3.textContent = city +', ' + country;
        const paragraphe = document.createElement( 'p' );
        paragraphe.textContent = tagline;
        const rate = document.createElement( 'p' );
        rate.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(span);
        span.appendChild(h3);
        span.appendChild(paragraphe);
        span.appendChild(rate);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}