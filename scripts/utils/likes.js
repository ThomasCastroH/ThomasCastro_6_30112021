export default function addLikes(totalLikes) {
    const hearts = document.querySelectorAll(".heart");
    const totalLike = document.querySelector(".total-likes");

    const LikeFunction = (element) => {
        const likeCount = element.previousSibling;
        const classes = likeCount.classList;
        const result = classes.toggle("hearts");

        if (result) {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number += 1)}`;
        totalLike.textContent = (totalLikes += 1);
        const elementLikes = element;
        elementLikes.style.color = "#db8876";

        } else {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number -= 1)}`;
        totalLike.textContent = `${(totalLikes -= 1)}`;
        const elementLikes = element;
        elementLikes.style.color = "#901c1c";
        }
    };
    // Evenement d'ajout de like
    hearts.forEach((element) => {
        element.addEventListener("click", () => {
            LikeFunction(element);
        });
        element.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            LikeFunction(element);
        }
        });
    });
}