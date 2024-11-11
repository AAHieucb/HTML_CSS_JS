const scrollers = document.querySelectorAll(".scroller");

// Buộc dùng js để duplicate content, nếu check reduced motions như này
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    // scrollerInner.children tự updated khi DOM update, nên phải copy ra array

    // For each item in the array, clone it add aria-hidden to it add it into the `.scroller-inner` => để ẩn khỏi screen reader
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
