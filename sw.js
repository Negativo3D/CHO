/* Service worker minimo: serve solo a mostrare le notifiche di
   promemoria (la glicemia dopo l'attività fisica) e a riaprire l'app
   quando si tocca la notifica. Nessuna cache: la pagina resta servita
   dalla rete come prima. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(finestre =>
    finestre.length ? finestre[0].focus() : self.clients.openWindow('./index.html')
  ));
});
