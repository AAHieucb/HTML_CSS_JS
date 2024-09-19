// Full dự án tương tác html css js

let turn = 1
let numbers = []

// Element này sẽ được chèn vào trong <div class="magic-numbers"></div>
const createMagicNumber = (className, role, value) => {
    const node = document.createElement('div')
    node.className = className
    node.innerHTML = `<span>${role}</span><span>${value}</span>`
    return node
}
const magicNumbersNode = document.querySelector('.magic-numbers')
const resultNode = document.querySelector('.result')
const formNode = document.querySelector('form')

formNode.addEventListener('submit', event => {
    // Khi submit phát xảy ra 3 th
    event.preventDefault()
    const value = document.querySelector('form input').value

    const yourNode = createMagicNumber('number number-you', 'Bạn', value)

    document.querySelector('form input').value = ''
    // Nếu là lần đầu tiên thì chỉ cần chèn 1 node là node của bạn
    if (turn === 1) {
        // Công thức phía dưới tương đương Number(value) + 19998
        result = Number('2' + value) - 2
        resultNode.innerHTML = `
    <div class="result-overlay"></div>
    <span>Dự đoán: ${result}</span>
    `
        resultNode.classList.add('active')
        // Thao tác với danh sách các class của 1 node. Xong add 1 class vào danh sách đó
        magicNumbersNode.appendChild(yourNode)
        numbers.push(Number(value))
        turn++
    } else {
        // Nếu là lần thứ 2 trở đi thì chèn 2 node vào là node của bạn và node của mình
        const myNode = createMagicNumber('number number-me', 'Mình', 9999 - Number(value))
        magicNumbersNode.appendChild(yourNode)
        magicNumbersNode.appendChild(myNode)
        numbers.push(Number(value), 9999 - Number(value))
        turn += 2
    }
    // Nếu là lượt cuối thì sẽ chèn thêm element tính tổng
    if (turn === 6) {
        const sumValue = numbers.reduce((current, result) => result + current)
        const sumNode = createMagicNumber('number number-sum', 'Tổng', sumValue)
        magicNumbersNode.appendChild(sumNode)
        // Ẩn cái ô input đi, không cho nhập nữa
        formNode.style.display = 'none'
    }
})

document.querySelector('.btn-reset').addEventListener('click', () => {
    magicNumbersNode.innerHTML = ''
    resultNode.innerHTML = ''
    resultNode.classList.remove('active')
    turn = 1
    numbers = []
    formNode.style = null
})

// Lắng nghe sự kiện nhấn vào khu vực result. Chúng ta sẽ thực hiện làm mờ hoặc xóa làm mờ.
resultNode.addEventListener('click', () => {
    document.querySelector('.result-overlay').classList.toggle('hide')
})
// classList có 3 hàm add, remove, toggle. Toggle là dùng class gì khi chưa có và nếu có r thì xóa đi