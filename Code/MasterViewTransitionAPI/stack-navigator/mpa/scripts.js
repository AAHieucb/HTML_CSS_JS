const basePath = '/stack-navigator/mpa';

// K liên quan đến view transition api
document.addEventListener("DOMContentLoaded", (e) => {
	let shouldThrow = false;
	// navigation API là các cái navigation.forward(); navigation.back(); check có support hay không
	if (!window.navigation) {
		document.querySelector('.warning[data-reason="navigation-api"]').style.display = "block";
		shouldThrow = false;
	}
	if (!("CSSViewTransitionRule" in window)) {
		document.querySelector('.warning[data-reason="cross-document-view-transitions"]').style.display = "block";
		shouldThrow = true;
	}
	if (shouldThrow) {
		// Như kiểu process.exit() 
		throw new Error('Browser is lacking support …');
	}
});

// K liên quan đến view transition api
document.addEventListener('click', (e) => {
	if (e.target.matches('a.back')) {
		e.preventDefault();
		// Fallback for browsers that don’t have the Navigation API. 
		// navigation.back(); chả khác gì history.go(-1), chỉ là nó là API 
		if (!window.navigation) {
			history.go(-1);
			return;
		}
		// Navigation API giúp go back forward các thứ, phải check nếu vào pages này luôn thì redirect từ page.html sang index.html
		if (navigation.canGoBack) {
			navigation.back();
		} else {
			navigation.navigate(`${basePath}/`);
		}
	}
});

// Thắc mắc là MPA mỗi lần tải pages sẽ mất local data từ pages cũ, giải pháp là lưu vào session storage là được
// Ở đây khi đổi pages thì lưu vào storage là đang push hay pop hay reload để nó biết mà chạy animation tương ứng khi mới vào
window.addEventListener("pageswap", async (e) => {
	// Nếu có navigation api thì check được ngay k nói, nếu k hỗ trợ thì ta phải lưu thủ công trạng thái vào storage
	if (!window.navigation) {
		// pageswap cho biết url chuyển từ đâu sang đâu
		const transitionClass = determineTransitionClass(e.activation.from, e.activation.entry);
		console.log(`pageSwap: ${transitionClass}`);
		localStorage.setItem("transitionClass", transitionClass);
	}
});

// MPA View Transitions!
window.addEventListener("pagereveal", async (e) => {
	
	// K hỗ trợ navigation api thì phải lấy từ localstorage
	if (!window.navigation && e.viewTransition) {
		// Gán vào thẻ root data-transition="pop/push/reload"
		const transitionClass = localStorage.getItem("transitionClass"); 
		document.documentElement.dataset.transition = transitionClass;
		// pagereveal là sự kiện bắt xử lý khi render ghi đè lên view transition, dùng e.viewTransition.finished để chạy view transition luôn
		await e.viewTransition.finished;
		delete document.documentElement.dataset.transition;
		return;
	}

	// Khi đi từ same origin, e.viewTransition của pagereveal sẽ có giá trị=
	if (e.viewTransition) {
		// Nếu có hỗ trợ Navigation API thfi check được luôn, nếu k đến từ nơi nào cả thì skipTransition, tức gõ url vào browser trực tiếp sẽ k có animation
		if (!navigation.activation?.from) {
			e.viewTransition.skipTransition();
			return;
		}

		// Xác định trực tiếp trạng thái từ navigation api và gọi thôi
		// Thay vì làm như này, dùng e.viewTransition.types ok hơn: https://developer.chrome.com/docs/web-platform/view-transitions/cross-document#view-transition-types
		const transitionClass = determineTransitionClass(navigation.activation.from, navigation.currentEntry);
		document.documentElement.dataset.transition = transitionClass;
		await e.viewTransition.finished;
		delete document.documentElement.dataset.transition;
	}

	// User comes from different origin or did a reload
	else {
		// Do a reload animation
		if (navigation.activation.navigationType == 'reload') {
			document.documentElement.dataset.transition = "reload"; // set vào tag html
			const t = document.startViewTransition(() => {
				// K đổi DOM gì hết, chỉ cần trigger view transition mặc định
			});
			try {
				await t.finished;
				delete document.documentElement.dataset.transition;
			} catch (e) {
				console.log(e);
			}
			return;
		}

		// @TODO: manually create a “welcome” viewTransition here?
	}
});


// Check xem là reload, push hay pop
const determineTransitionClass = (oldNavigationEntry, newNavigationEntry) => {
	if (!oldNavigationEntry || !newNavigationEntry) {
		return 'unknown';
	}

	const currentURL = new URL(oldNavigationEntry.url);
	const destinationURL = new URL(newNavigationEntry.url);

	const currentPathname = currentURL.pathname.replace(basePath, '').replace("/index.html", "/");
	const destinationPathname = destinationURL.pathname.replace(basePath, '').replace("/index.html", "/");

	if (currentPathname === destinationPathname) {
		return "reload";
	} else if (currentPathname === "/" && destinationPathname.startsWith('/detail')) {
		return "push";
	} else if (currentPathname.startsWith('/detail') && destinationPathname === "/") {
		return "pop";
	} else if (currentPathname.startsWith('/detail') && destinationPathname.startsWith('/detail')) {
		if (isUABackButton(oldNavigationEntry, newNavigationEntry)) {
			return "pop";
		} else {
			return "push";
		}
	} else {
		console.warn('Unmatched Route Handling!');
		console.log({
			currentPathname,
			destinationPathname,
		});
		return "none";
	}
};
// Determine if the UA back button was used to navigate
const isUABackButton = (oldNavigationEntry, newNavigationEntry) => {
	return (newNavigationEntry.index < oldNavigationEntry.index);
};
// Determine if the UA forward button was used to navigate
const isUAForwardButton = (oldNavigationEntry, newNavigationEntry) => {
	return (newNavigationEntry.index > oldNavigationEntry.index);
};
