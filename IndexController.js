
function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }
}

export default function IndexController(container) {
  this._container = container;
  var indexController = this;
}

IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker){
    console.log('No service-worker on this browser');
    return;
  };
  var indexController = this;
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch( err => {
    //registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
};
