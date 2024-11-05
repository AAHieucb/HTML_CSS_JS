// Thêm URLPattern Polyfill nếu chưa có
if (!globalThis.URLPattern) {
	const URLPatternPolyfill = await import("https://esm.sh/urlpattern-polyfill");
	globalThis.URLPattern = URLPatternPolyfill.URLPattern;
}

// Path where this app is deployed. Because we don’t deploy at the root of the domain, we need to keep track of this and adjust any URL matching using this value.
const basePath = '/mpa';

(() => {
	let shouldThrow = false;

	// Check phải có Navigation API
	if (!window.navigation) {
		document.querySelector('.warning[data-reason="navigation-api"]').style.display = "block";
		shouldThrow = true;
	}

	// Check css có view transition api
	if (!("CSSViewTransitionRule" in window)) {
		document.querySelector('.warning[data-reason="cross-document-view-transitions"]').style.display = "block";
		shouldThrow = true;
	}

	if (shouldThrow) {
		// Throw sẽ khiến phần code dưới k chạy nũa
		throw new Error('Browser is lacking support …');
	}
})();

// URLPattern giúp check 1 url là page nào
const homePagePattern = new URLPattern(`${basePath}(/)*`, window.origin);
const isHomePage = (url) => {
	return homePagePattern.exec(url);
}
const profilePagePattern = new URLPattern(`${basePath}/:profile`, window.origin);
const isProfilePage = (url) => {
	return profilePagePattern.exec(url);
}

const extractProfileNameFromUrl = (url) => {
	const match = profilePagePattern.exec(url);
	return match?.pathname.groups.profile;
}

// Bình thường ta gán view transition name bằng css cũng được, nhưng ở đây ta gán bằng JS, sau đó chờ cho animation kết thúc rồi xoá thuộc tính đó đi luôn để tối ưu
const setTemporaryViewTransitionNames = async (entries, vtPromise) => {
	for (const [$el, name] of entries) {
		$el.style.viewTransitionName = name;
	}
	await vtPromise;
	for (const [$el, name] of entries) {
		$el.style.viewTransitionName = '';
	}
}

// view transition name hoạt động khi page trước đó và page hiện tại cùng gán 1 name thì animate cái đó. Trong css ta gán 1 phát được luôn, nhưng nếu muốn gán rồi chạy animation xong thì xoá đi thì có thể dùng pageswap và pagereveal. 
// pageswap phát khi load document mới và document cũ unload. Gán cho page hiện tại view-transition-name
// pagereveal là sự kiện phát ra khi nội dung được render bất kể từ đâu. Phát ra sau, ta gán cho page tiếp theo view-transition-name cùng giá trị
window.addEventListener('pageswap', async (e) => {
	// Check phải support mới đuọc
	if (e.viewTransition) {
		const currentUrl = e.activation.from?.url ? new URL(e.activation.from.url.replace('.html', '')) : null;
		const targetUrl = new URL(e.activation.entry.url.replace('.html', ''));

		// Only transition to same basePath ~> SKIP! vì nếu từ web khác đi vào thì bỏ đi
		if (!targetUrl.pathname.startsWith(basePath)) {
			e.viewTransition.skipTransition();
		}

		// Đi từ profile page sang homepage -> gán view transition name cho 2 thẻ muốn animation di chuyển là xong
		if (isProfilePage(currentUrl) && isHomePage(targetUrl)) {
			setTemporaryViewTransitionNames([
				[document.querySelector(`#detail main h1`), 'name'],
				[document.querySelector(`#detail main img`), 'avatar'],
			], e.viewTransition.finished);
		}

		// Đi sang profile page thì gán view transition name cho 2 tag tương ứng
		if (isProfilePage(targetUrl)) {
			const profile = extractProfileNameFromUrl(targetUrl);
			setTemporaryViewTransitionNames([
				[document.querySelector(`#${profile} span`), 'name'],
				[document.querySelector(`#${profile} img`), 'avatar'],
			], e.viewTransition.finished);
		}
	}
});

window.addEventListener('pagereveal', async (e) => {
	if (!navigation.activation.from) return;
	if (e.viewTransition) {
		const fromUrl = new URL(navigation.activation.from.url.replace('.html', ''));
		const currentUrl = new URL(navigation.activation.entry.url.replace('.html', ''));

		// Only transition to/from same basePath ~> SKIP!
		if (!fromUrl.pathname.startsWith(basePath)) {
			e.viewTransition.skipTransition();
		}

		// Went from profile page to homepage
		// ~> Set VT names on the relevant list item
		if (isProfilePage(fromUrl) && isHomePage(currentUrl)) {
			const profile = extractProfileNameFromUrl(fromUrl);
			setTemporaryViewTransitionNames([
				[document.querySelector(`#${profile} span`), 'name'],
				[document.querySelector(`#${profile} img`), 'avatar'],
			], e.viewTransition.ready);
		}

		// Went to profile page
		// ~> Set VT names on the main title and image
		if (isProfilePage(currentUrl)) {
			setTemporaryViewTransitionNames([
				[document.querySelector(`#detail main h1`), 'name'],
				[document.querySelector(`#detail main img`), 'avatar'],
			], e.viewTransition.ready);
		}
	}
});
