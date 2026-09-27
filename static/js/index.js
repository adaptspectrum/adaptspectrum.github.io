window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  var isPhone = false;
  try {
    isPhone = window.matchMedia('(max-width: 700px)').matches;
  } catch (e) {}

  try {
    bulmaCarousel.attach('#results-carousel', {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: false,
      autoplay: !reduceMotion,
      autoplaySpeed: 7000,
      duration: reduceMotion ? 0 : 700,
      pauseOnHover: true,
      pagination: !isPhone,
      navigation: true,
      breakpoints: [
        { changePoint: 700, slidesToShow: 1, slidesToScroll: 1 },
        { changePoint: 1000, slidesToShow: 2, slidesToScroll: 1 },
        { changePoint: 1400, slidesToShow: 3, slidesToScroll: 1 }
      ]
    });
  } catch (err) {
    console.warn('Carousel init failed', err);
  }

  var SHIFTS = {
    appearance: {
      photoA: './static/images/shift/hw_appearance_a.jpg',
      photoB: './static/images/shift/hw_appearance_b.jpg',
      capA: 'Adapted',
      capB: 'Held out',
      rateA: '27/30',
      rateB: '23/30',
      cmdA: '',
      cmdB: '',
      cka: './static/images/cka/openvla_appearance.png'
    },
    novel: {
      photoA: './static/images/shift/hw_novel_a.jpg',
      photoB: './static/images/shift/hw_novel_b.jpg',
      capA: 'Adapted',
      capB: 'Held out',
      rateA: '26/30',
      rateB: '21/30',
      cmdA: '',
      cmdB: '',
      cka: './static/images/cka/openvla_novel.png'
    },
    instruction: {
      photoA: './static/images/shift/hw_language_a.jpg',
      photoB: './static/images/shift/hw_language_b.jpg',
      capA: 'Adapted',
      capB: 'Held out',
      rateA: '21/30',
      rateB: '16/30',
      cmdA: '“Pick the teapot.”',
      cmdB: '“Pick the kettle.”',
      cka: './static/images/cka/openvla_instruction.png'
    },
    combined: {
      photoA: './static/images/shift/hw_mixed_a.jpg',
      photoB: './static/images/shift/hw_mixed_b.jpg',
      capA: 'Adapted',
      capB: 'Held out',
      rateA: '25/30',
      rateB: '20/30',
      cmdA: '',
      cmdB: '',
      cka: './static/images/cka/openvla_combined.png'
    }
  };

  var shiftPicker = document.querySelector('.shift-picker');
  var shiftButtons = Array.prototype.slice.call(document.querySelectorAll('.shift-option'));
  var photoA = document.getElementById('shift-photo-a');
  var photoB = document.getElementById('shift-photo-b');
  var capA = document.getElementById('shift-cap-a');
  var capB = document.getElementById('shift-cap-b');
  var rateAEl = document.getElementById('shift-rate-a');
  var rateBEl = document.getElementById('shift-rate-b');
  var cmdAEl = document.getElementById('shift-cmd-a');
  var cmdBEl = document.getElementById('shift-cmd-b');
  var ckaImg = document.getElementById('shift-cka');

  function setCmd(el, text) {
    if (!el) return;
    if (text) {
      el.textContent = text;
      el.hidden = false;
    } else {
      el.textContent = '';
      el.hidden = true;
    }
  }

  function setShift(name) {
    var shift = SHIFTS[name];
    if (!shift) return;
    shiftButtons.forEach(function(btn) {
      var active = btn.getAttribute('data-shift') === name;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (photoA) {
      photoA.setAttribute('src', shift.photoA);
      photoA.setAttribute('alt', 'Scene A · ' + shift.capA + (shift.cmdA ? ' · ' + shift.cmdA : ''));
    }
    if (photoB) {
      photoB.setAttribute('src', shift.photoB);
      photoB.setAttribute('alt', 'Scene B · ' + shift.capB + (shift.cmdB ? ' · ' + shift.cmdB : ''));
    }
    if (capA) capA.textContent = shift.capA;
    if (capB) capB.textContent = shift.capB;
    if (rateAEl) rateAEl.textContent = shift.rateA;
    if (rateBEl) rateBEl.textContent = shift.rateB;
    setCmd(cmdAEl, shift.cmdA);
    setCmd(cmdBEl, shift.cmdB);
    if (ckaImg) {
      ckaImg.setAttribute('src', shift.cka);
      ckaImg.setAttribute('alt', 'OpenVLA-OFT CKA for ' + name + ' shift.');
    }
  }

  if (shiftPicker) {
    shiftPicker.addEventListener('click', function(event) {
      var button = event.target.closest('.shift-option');
      if (!button || !shiftPicker.contains(button)) return;
      event.preventDefault();
      setShift(button.getAttribute('data-shift'));
    });
  }

  var TASKS = {
    appearance: {
      aStill: './static/images/hw_appearance_a.jpg',
      bVideo: './static/videos/hw_appearance.mp4',
      bPoster: './static/images/hw_appearance_b.jpg',
      rateA: '27/30',
      rateB: '23/30',
      note: 'Appearance shift (lighting, textures). Adapt on Scene A, evaluate held-out Scene B without retraining · 0.493% of parameters.'
    },
    novel: {
      aStill: './static/images/hw_novel_a.jpg',
      bVideo: './static/videos/hw_novel.mp4',
      bPoster: './static/images/hw_novel_b.jpg',
      rateA: '26/30',
      rateB: '21/30',
      note: 'Novel object shift (new geometries). Diagnosis places capacity on vision and the action head · 0.800% of parameters.'
    },
    affordance: {
      aStill: './static/images/hw_affordance_a.jpg',
      bVideo: './static/videos/hw_affordance.mp4',
      bPoster: './static/images/hw_affordance_b.jpg',
      rateA: '13/30',
      rateB: '11/30',
      note: 'Affordance shift (grasp the teapot by the snout). Scene B transfers without retraining · 0.800% of parameters.'
    },
    mixed: {
      aStill: './static/images/hw_mixed_a.jpg',
      bVideo: './static/videos/hw_mixed.mp4',
      bPoster: './static/images/hw_mixed_b.jpg',
      rateA: '25/30',
      rateB: '20/30',
      note: 'Mixed shift (hardest): new geometry and color against a camouflaging background · 1.333% of parameters.'
    }
  };

  var imgA = document.getElementById('hw-scene-a');
  var videoB = document.getElementById('hw-scene-b');
  var rateA = document.getElementById('hw-rate-a');
  var rateB = document.getElementById('hw-rate-b');
  var note = document.getElementById('hw-note');
  var picker = document.querySelector('.task-picker');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.task-option'));

  function setTask(name) {
    var task = TASKS[name];
    if (!task) return;
    buttons.forEach(function(btn) {
      var active = btn.getAttribute('data-task') === name;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (imgA) {
      imgA.setAttribute('src', task.aStill);
      imgA.setAttribute('alt', 'Scene A for ' + name + ' shift.');
    }
    if (videoB) {
      videoB.pause();
      videoB.setAttribute('src', task.bVideo);
      videoB.setAttribute('poster', task.bPoster);
      videoB.load();
      if (!reduceMotion) {
        var play = videoB.play();
        if (play && play.catch) play.catch(function() {});
      }
    }
    if (rateA) rateA.textContent = task.rateA;
    if (rateB) rateB.textContent = task.rateB;
    if (note) note.textContent = task.note;
  }

  if (picker) {
    picker.addEventListener('click', function(event) {
      var button = event.target.closest('.task-option');
      if (!button || !picker.contains(button)) return;
      event.preventDefault();
      setTask(button.getAttribute('data-task'));
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var el = entry.target;
        if (entry.isIntersecting && !reduceMotion) {
          var play = el.play();
          if (play && play.catch) play.catch(function() {});
        } else {
          el.pause();
        }
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('#hw-scene-b, .results-carousel video').forEach(function(el) {
      observer.observe(el);
    });
  }
});
