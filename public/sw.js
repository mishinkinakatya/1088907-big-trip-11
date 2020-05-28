const CACHE_PREFIX = `big-trip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const STATUS_CODE_OK = 200;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/bundle.js`,
          `/css/style.css`,
          `/img/logo.png`,
          `/img/header-bg.png`,
          `/img/header-bg@2x.png`,
          `/img/photos/1.jpg`,
          `/img/photos/2.jpg`,
          `/img/photos/3.jpg`,
          `/img/photos/4.jpg`,
          `/img/photos/5.jpg`,
          `/img/icons/bus.png`,
          `/img/icons/check-in.png`,
          `/img/icons/drive.png`,
          `/img/icons/flight.png`,
          `/img/icons/restaurant.png`,
          `/img/icons/ship.png`,
          `/img/icons/sightseeing.png`,
          `/img/icons/taxi.png`,
          `/img/icons/train.png`,
          `/img/icons/transport.png`,
        ]);
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      caches.keys()
        .then(
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      return key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME ? caches.delete(key) : null;
                    })
                .filter((key) => key !== null)
            )
        )
  );
});

self.addEventListener(`fetch`, (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== STATUS_CODE_OK || response.type !== `basic`) {
              return response;
            }

            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
              // eslint-disable-next-line max-nested-callbacks
              .then((cache) => cache.put(request, clonedResponse));

            return response;
          });
      })
  );
});
