if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
  );

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded 🚀', workbox);
    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );

    // Adding staleWhileRevalidate for all js files. Provide faster access from cache while revalidating in the background
    workbox.routing.registerRoute(
      /.*\.js$/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding staleWhileRevalidate for all html files
    workbox.routing.registerRoute(
      /.*\.html/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding staleWhileRevalidate for all css files
    workbox.routing.registerRoute(
      /.*\.css/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding networkFirst for all json data. In offline mode will be fetched from cache
    workbox.routing.registerRoute(
      new RegExp('https://data\\.google\\.org/.*\\.json'),
      new workbox.strategies.NetworkFirst(),
      'GET'
    );

    workbox.routing.registerRoute(
      ({url}) => {
        console.log('SW', url.href);
        return url.href === 'https://interview.switcheo.com/prices.json';
      },
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'prices-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50, // Giới hạn số lượng tài nguyên trong cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Giới hạn thời gian lưu trữ tài nguyên (30 ngày)
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        'https://raw\\.githubusercontent\\.com/Switcheo/token-icons/main/tokens/.*\\.svg'
      ),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'token-icons-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 50, // Giới hạn số lượng tài nguyên trong cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Giới hạn thời gian lưu trữ tài nguyên (30 ngày)
          }),
        ],
      })
    );
  } else {
    console.log('Workbox could not be loaded. Hence, no offline support.');
  }
}
