export function OrderNotification(client_name, product_image) {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification(client_name, {
      body: 'Mijoz mahsulotni sotib olishga istak bildirdi',
      icon: product_image,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification grantend');
      }
    });
  }
}
