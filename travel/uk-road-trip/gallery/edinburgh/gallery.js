const galleryImages = Array.from(
    document.querySelectorAll(".photo-cell img")
);

const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentImageIndex = 0;


/* ==================================================
   SHOW IMAGE
   ================================================== */

function showImage(index) {

    if (galleryImages.length === 0) {
        return;
    }

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src =
        galleryImages[currentImageIndex].src;
}


/* ==================================================
   OPEN LIGHTBOX
   ================================================== */

function openLightbox(index) {

    showImage(index);

    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");
}


/* ==================================================
   CLOSE LIGHTBOX
   ================================================== */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");

    lightboxImage.src = "";
}


/* ==================================================
   CLICK PHOTOGRAPH
   ================================================== */

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* ==================================================
   CLOSE BUTTON
   ================================================== */

if (closeButton) {

    closeButton.addEventListener(
        "click",
        closeLightbox
    );

}


/* ==================================================
   PREVIOUS
   ================================================== */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showImage(currentImageIndex - 1);

        }
    );

}


/* ==================================================
   NEXT
   ================================================== */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showImage(currentImageIndex + 1);

        }
    );

}


/* ==================================================
   CLICK BACKGROUND TO CLOSE
   ================================================== */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );

}


/* ==================================================
   KEYBOARD
   ================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains("active")
        ) {
            return;
        }


        /* ESC */

        if (event.key === "Escape") {

            closeLightbox();

        }


        /* LEFT */

        if (event.key === "ArrowLeft") {

            showImage(currentImageIndex - 1);

        }


        /* RIGHT */

        if (event.key === "ArrowRight") {

            showImage(currentImageIndex + 1);

        }

    }
);
