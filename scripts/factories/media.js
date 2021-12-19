function mediaFactory(data) {
    const { date, id, image, likes, photographerId, price, title, video } = data;
  
    function getMediaCardDOM() {
        const article = document.createElement("article");
        article.setAttribute("id", id);

        if (image) {
            const picture = "./assets/images/" + image;
            const img = document.createElement("img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", title +", closeup view");
            img.setAttribute("tabindex", 0);
            img.setAttribute("class", "media");
            img.dataset.id = id;

            article.appendChild(img);

            const mediaLegend = document.createElement("div");
            mediaLegend.setAttribute("class", "media-body")
            article.appendChild(mediaLegend);

            const titleMedia = document.createElement("p");
            titleMedia.textContent = title;
            titleMedia.setAttribute("tabindex", 0);
            titleMedia.setAttribute("class", "legend");
            mediaLegend.appendChild(titleMedia);

            const likesMedia = document.createElement("p");
            likesMedia.textContent = likes;
            likesMedia.setAttribute("tabindex", 0);
            likesMedia.setAttribute("class", "likes");

            mediaLegend.appendChild(likesMedia);

            const heart = document.createElement("p");
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.setAttribute("class", "heart");
            heart.setAttribute("tabindex", 0);
            heart.setAttribute("aria-label", ` likes`);

            mediaLegend.appendChild(heart);
        }

        if (video) {
        }

        return (article);
    }
    return {date, id, image, likes, photographerId, price, title, video, getMediaCardDOM};
  }