export default function profileFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
  
    const picture = "assets/photographers/"+portrait;
  
    function getUserProfileDOM() {

        // Créé l'élement contenant le nom, la localisation et la tagline du photographe
        const article = document.createElement("article");
        article.setAttribute("class", "profile-header");
        const textArticle = document.createElement("div");
        textArticle.setAttribute("class", "profile-presentation");
        const subArticle = document.createElement("article");
        subArticle.setAttribute("class", "profile-description");
        subArticle.setAttribute("tabindex", 0);


        // Créé l'élément contenant la photo du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("tabindex", 0);
        img.setAttribute("id", "photograph-img");

        // Crée l'élément nom du photographe
        const h1 = document.createElement("h1");
        h1.textContent = name;
        h1.setAttribute("tabindex", 0);

        // Créé l'élément localisation du photographe
        const pLocation = document.createElement("p");
        pLocation.textContent = city +', '+ country;
        pLocation.setAttribute("class", "location")

        // Créé l'élément tagline du photographe
        const pTagline = document.createElement("p");
        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "tag");

        // Créé l'élément bouton de contact
        const btn = document.createElement("button");
        btn.textContent = `Contactez-moi`;
        btn.setAttribute("class", "contact_button");
        btn.setAttribute("id", "contact_button");
        btn.setAttribute("aria-label", "Contact me");

        // Mise en place du header
        article.appendChild(textArticle);
        textArticle.appendChild(h1);
        textArticle.appendChild(subArticle);
        subArticle.appendChild(pLocation);
        subArticle.appendChild(pTagline);
        article.appendChild(btn);
        article.appendChild(img);

        // Ajout du prix dans la barre fixe
        const fixedBar = document.querySelector(".fixed-bar");
        const pPrice = document.createElement("p");
        pPrice.textContent = price+ "€/jour";
        pPrice.setAttribute("class", "price-by-day");
        fixedBar.appendChild(pPrice);

        // Ajout du nom dans la modale de contact
        const contactMe = document.getElementById("contact-me");
        const lineBreak = document.createElement("br");
        const nameContact = document.createElement("span");
        nameContact.textContent = name;
        contactMe.appendChild(lineBreak);
        contactMe.appendChild(nameContact);

        return (article);
    }
    return { name, picture, city, country, tagline, price, id, getUserProfileDOM };
  }