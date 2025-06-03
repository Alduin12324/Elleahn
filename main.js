console.log("Sushi Menu App carregado!");
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}