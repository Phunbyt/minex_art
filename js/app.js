class Pagefunction {
    constructor() {
        this.toggleButton = document.querySelector(".hamburger");
        this.nav = document.querySelector(".nav");
        this.burgers = document.querySelectorAll(".burg");
        this.skills = document.querySelector(".skills");
        this.projectImg = document.querySelectorAll(".project-img");
        this.projectName = document.querySelectorAll(".project-name");
    }

    debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            let context = this,
                args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    displayNav() {
        this.nav.classList.toggle("active");
        this.burgers.forEach((burg) => {
            burg.classList.toggle("active");
        });
    }

    graphBar(e) {
        this.bars = document.querySelectorAll(".bar");

        // console.log(this.bars);

        this.bars.forEach((bar) => {
            const animateAt = window.scrollY + window.innerHeight - bar.scrollHeight;
            const barBtm = bar.offsetTop + bar.scrollHeight;

            const isShown = animateAt > bar.offsetTop;
            const isNotScrolledPast = window.scrollY < barBtm;

            if (isShown && isNotScrolledPast) {
                bar.classList.add("active");
            } else {
                bar.classList.remove("active");
            }
        });
    }

    revealName(e) {
        let imageDiv = e.target.parentElement.parentElement;
        imageDiv.children[1].classList.add("active");
    }

    closeName(e) {
        let imageDiv = e.target.parentElement.parentElement;
        imageDiv.children[1].classList.remove("active");
    }
}

const pageWork = new Pagefunction();

pageWork.toggleButton.addEventListener("click", function() {
    pageWork.displayNav();
});

pageWork.projectImg.forEach((image) => {
    image.addEventListener("mouseover", function(e) {
        pageWork.revealName(e);
    });
});
pageWork.projectImg.forEach((image) => {
    image.addEventListener("mouseout", function(e) {
        pageWork.closeName(e);
    });
});

window.addEventListener("scroll", pageWork.debounce(pageWork.graphBar));