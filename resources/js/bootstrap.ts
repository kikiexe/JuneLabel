import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Guest ID Management
const GUEST_ID_KEY = 'guest_cart_id';
let guestId = localStorage.getItem(GUEST_ID_KEY);

if (!guestId) {
  // Generate simple UUID v4
  guestId = crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
  localStorage.setItem(GUEST_ID_KEY, guestId);
}

window.axios.defaults.headers.common['X-Guest-ID'] = guestId;
