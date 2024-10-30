export async function getPageContent(url) {
  // This is a really scrappy way to do this.
  // Don't do this in production!
  const response = await fetch(url);
  const text = await response.text();
  // Particularly as it uses regexp
  return /<body[^>]*>([\w\W]*)<\/body>/.exec(text)[1];
}

function isBackNavigation(navigateEvent) {
  if (navigateEvent.navigationType === 'push' || navigateEvent.navigationType === 'replace') {
    return false;
  }
  if (
    navigateEvent.destination.index !== -1 &&
    navigateEvent.destination.index < navigation.currentEntry.index
  ) {
    return true;
  }
  return false;
}

// Intercept navigations
// https://developer.chrome.com/docs/web-platform/navigation-api/
// This is a naive usage of the navigation API, to keep things simple.
export async function onLinkNavigate(callback) {
  navigation.addEventListener('navigate', (event) => {
    // Sự kiện navigate phát ra khi chuyển hướng, ấn tiến lùi page cũng phát ra
    const toUrl = new URL(event.destination.url);
    
    if (location.origin !== toUrl.origin) return;
    
    const fromPath = location.pathname;
    const isBack = isBackNavigation(event);
    
    // event.intercept sẽ làm mất các tính năng mặc định của event và thay thế bằng việc thực hiện hàm nào khác
    event.intercept({
      async handler() {
        if (event.info === 'ignore') return;
        
        await callback({
          toPath: toUrl.pathname,
          fromPath,
          isBack,
        });
      },
    });
  });
}
