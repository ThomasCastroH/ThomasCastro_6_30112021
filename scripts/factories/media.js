export default function mediaFactory(data) {
    const { date, id, image, likes, photographerId, price, title, video } = data;
  
    function getMediaCardDOM() {

        // Créé le conteneur des médias
        const article = document.createElement("article");
        article.setAttribute("id", id);

        // Dans le cas ou le media est une photo
        if (image) {

            // Récupère le chemin vers l'image
            const picturePath = "./assets/images/" + image;

            // Créé l'élément contenant la photo
            const img = document.createElement("img");
            img.setAttribute("src", picturePath)
            img.setAttribute("alt", title +", closeup view")
            img.setAttribute("tabindex", 0)
            img.setAttribute("class", "media")
            img.setAttribute("data-title", title)
            article.appendChild(img);
            img.dataset.id = id;
        }

        // Dans le cas ou le media est une video
        if (video) {

            // Récupère le chemin vers l'image
            const videoPath = "./assets/images/" + video;

            // Créé l'élément contenant la photo
            const vid = document.createElement("video");
            vid.setAttribute("src", videoPath);
            vid.setAttribute("alt", title +", closeup view");
            vid.setAttribute("tabindex", 0);
            vid.setAttribute("class", "media");
            vid.setAttribute("data-title", title)
            article.appendChild(vid);
            vid.dataset.id = id;
        }
        
        // Créé l'élément contenant le titre, les likes et le coeur
        const mediaLegend = document.createElement("div");
        mediaLegend.setAttribute("class", "media-body")
        article.appendChild(mediaLegend);

        // Créé l'élément titre de la photo
        const titleMedia = document.createElement("p");
        titleMedia.textContent = title;
        titleMedia.setAttribute("tabindex", 0);
        titleMedia.setAttribute("class", "legend");
        mediaLegend.appendChild(titleMedia);

        // Créé l'élément nombre de likes
        const likesMedia = document.createElement("p");
        likesMedia.textContent = likes;
        likesMedia.setAttribute("tabindex", 0);
        likesMedia.setAttribute("class", "likes");
        mediaLegend.appendChild(likesMedia);

        // Créé l'élément coeur
        const heart = document.createElement("p");
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.setAttribute("class", "heart");
        heart.setAttribute("tabindex", 0);
        heart.setAttribute("alt", 'likes');
        heart.setAttribute("aria-label", 'likes');
        mediaLegend.appendChild(heart);
        
        return (article);
    }
    return {date, id, image, likes, photographerId, price, title, video, getMediaCardDOM};
  }