// Replace the remaining sample copy and details before publishing.
const weddingContent = {
  coupleNames: 'Myint Htwe <i>&amp;</i> Khin Htet Aung',
  dateLong: 'November 22, 2026',
  dateIso: '2026-11-22T09:00:00+06:30',
  openingText: 'With joyful hearts, we invite you to celebrate the beginning of our forever.',
  story: 'Two hearts, one story, and a lifetime of memories still to come.',
  eventTime: '9:00 AM – 11:00 AM',
  ceremonyDate: 'November 22, 2026',
  venueName: 'Excel Treasure Hotel',
  venueAddress: 'Excel Treasure Hotel',
  dressCode: 'Garden party attire in soft, warm colors. Please avoid white and ivory.',
  rsvpDeadline: 'November 20, 2027',
  qrCaption: 'For those who wish to give a monetary gift, please scan the QR code. Your kindness is deeply appreciated.',
  closingText: 'Thank you for being part of our special day. With love, Myint &amp; Khin.'
};

document.querySelectorAll('[data-copy]').forEach((element) => {
  const key = element.dataset.copy;
  if (Object.hasOwn(weddingContent, key)) element.innerHTML = weddingContent[key];
});

const opening = document.getElementById('opening');
const invitation = document.querySelector('.invitation');
const openButton = document.getElementById('open-invitation');
const music = document.getElementById('wedding-music');
const musicToggle = document.getElementById('music-toggle');
const musicLabel = musicToggle.querySelector('.music-label');
const musicIcon = musicToggle.querySelector('.music-icon');
let invitationOpened = false;

function updateMusicControl(isPlaying) {
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
  musicLabel.textContent = isPlaying ? 'Pause music' : 'Play music';
  musicIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
}

openButton.addEventListener('click', async () => {
  if (invitationOpened) return;
  invitationOpened = true;
  opening.classList.add('is-hidden');
  invitation.removeAttribute('inert');
  invitation.classList.add('is-open');
  document.body.classList.add('invitation-open');
  try {
    await music.play();
    updateMusicControl(true);
  } catch (error) {
    // Autoplay can still be restricted by browser or device settings; the music button remains available.
    updateMusicControl(false);
  }
  document.getElementById('main').focus({ preventScroll: true });
});

music.addEventListener('play', () => updateMusicControl(true));
music.addEventListener('pause', () => updateMusicControl(false));
musicToggle.addEventListener('click', async () => {
  if (!music.paused) {
    music.pause();
    return;
  }
  try {
    await music.play();
  } catch (error) {
    updateMusicControl(false);
  }
});

const countdownDate = new Date(weddingContent.dateIso).getTime();
const countdownParts = ['days', 'hours', 'minutes', 'seconds'];
function updateCountdown() {
  let remaining = Math.max(0, countdownDate - Date.now());
  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  [days, hours, minutes, seconds].forEach((value, index) => {
    document.getElementById(countdownParts[index]).textContent = String(value);
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
document.querySelectorAll('.gallery-item').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
