const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector(".card-container");

// Dùng IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    // if(entry.isIntersecting) observer.unobserve(entry.target);
  })
}, {
  threshold: 0.5, // mức độ giao phải 1 nửa thẻ mới coi là isIntersecting là true
  // { threshold: [0, 0.25, 0.5, 0.75, 1] } => Bth chỉ gọi 1 lần, bh sẽ gọi lại mỗi khi tỉ lệ giao thay đổi qua các mốc

  rootMargin: "+100px", // co kích thước thẻ root view port. Vd dùng lazy load image thì cho root là +100px, khi đó ảnh vẫn lazy load nhưng cách viewport 100px thì load luôn trước để tăng trải nghiệm. Để giá trị âm gây lỗi

  // root: document.querySelector('body') // thay đổi thẻ root, mặc định là thẻ :root, thẻ là root phải có scrollable hoặc ta dùng draggable, nếu k thì vô dụng
})

cards.forEach(card => {
  observer.observe(card)
})

const lastCardObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  if(!lastCard.isIntersecting) return;
  loadNewCards();
  console.log(lastCard.target);
  lastCardObserver.unobserve(lastCard.target);
  console.log(document.querySelector(".card:last-child"));
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, { })

function loadNewCards() {
  for(let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}

lastCardObserver.observe(document.querySelector(".card:last-child"));
