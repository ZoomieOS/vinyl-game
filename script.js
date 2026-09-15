(function () {
  "use strict";

  // Order matches the conic-gradient slices in index.html (clockwise from top).
  var genres = [
    { key: "pop", label: "Дрим-поп" },
    { key: "disco", label: "Лоу-фай" },
    { key: "latino", label: "Пост-панк" },
    { key: "rock", label: "Соул/фанк" },
    { key: "rnb", label: "Латино-альт" },
    { key: "indie", label: "Электроника" },
    { key: "jazz", label: "Джаз" },
    { key: "meladze", label: "Меладзе" },
  ];

  var pools = {
    pop: [
      {
        song: "«Space Song» — Beach House",
        query: "Space Song Beach House",
        text: "Трек тянется шесть минут, и ты как-то умеешь делать то же самое с обычным разговором.",
      },
      {
        song: "«Sarah» — Alex G",
        query: "Sarah Alex G",
        text: "Обычно я домучиваю такие тихие песни просто из вежливости. С тобой — совсем не поэтому.",
      },
      {
        song: "«Archie, Marry Me» — Alvvays",
        query: "Archie Marry Me Alvvays",
        text: "До предложения руки и сердца песне ещё далеко, но за скорость симпатии я не ручаюсь.",
      },
    ],
    disco: [
      {
        song: "«Pretty Girl» — Clairo",
        query: "Pretty Girl Clairo",
        text: "Комментировать название или сделать вид, что я выше этого? Выбираю первое.",
      },
      {
        song: "«girls» — girl in red",
        query: "girls girl in red",
        text: "Если у тебя тоже где-то спрятан плейлист «для одного конкретного человека» — подозреваю, кто в нём сегодня.",
      },
      {
        song: "«Everytime» — Boy Pablo",
        query: "Everytime Boy Pablo",
        text: "Название прямо описывает, с какой регулярностью ты лезешь мне в голову без спроса.",
      },
    ],
    latino: [
      {
        song: "«Big Shot» — Fontaines D.C.",
        query: "Big Shot Fontaines D.C.",
        text: "Веди себя как важная персона — тебе, кажется, действительно можно.",
      },
      {
        song: "«Narrator» — Squid",
        query: "Narrator Squid",
        text: "Будь у нашего разговора закадровый голос, он бы явно болел за тебя.",
      },
      {
        song: "«Scratchcard Lanyard» — Dry Cleaning",
        query: "Scratchcard Lanyard Dry Cleaning",
        text: "Твой сарказм звучит так же расслабленно и метко, как вокал в этой песне.",
      },
    ],
    rock: [
      {
        song: "«Free» — Sault",
        query: "Free Sault",
        text: "Рядом с тобой почему-то не нужно ничего изображать — редкая штука.",
      },
      {
        song: "«Twice» — Little Dragon",
        query: "Twice Little Dragon",
        text: "Заметил(а) кое-что дважды за вечер, и оба раза виновата была твоя улыбка.",
      },
      {
        song: "«Virile» — Moses Sumney",
        query: "Virile Moses Sumney",
        text: "Название говорит само за себя, но с таким названием рядом ты держишься на удивление скромно.",
      },
    ],
    rnb: [
      {
        song: "«Soy Yo» — Bomba Estéreo",
        query: "Soy Yo Bomba Estereo",
        text: "У тебя такая же уверенность «я — это я», и спорить с ней бесполезно.",
      },
      {
        song: "«Tú Sí Sabes Quererme» — Natalia Lafourcade",
        query: "Tu Si Sabes Quererme Natalia Lafourcade",
        text: "Гуглить перевод не обязательно, но он тебе на пользу.",
      },
      {
        song: "«Malamente» — Rosalía",
        query: "Malamente Rosalia",
        text: "Название переводится как «плохо». Ты, для сравнения, работаешь строго в обратную сторону.",
      },
    ],
    indie: [
      {
        song: "«Kiara» — Bonobo",
        query: "Kiara Bonobo",
        text: "Трек безобидный на вид, а потом внезапно понимаешь, что слушаешь его пятый раз подряд. Знакомое чувство.",
      },
      {
        song: "«A Walk» — Tycho",
        query: "A Walk Tycho",
        text: "Пойти с тобой в магазин за хлебом — и это уже звучало бы как саундтрек.",
      },
      {
        song: "«Jasmine» — Jai Paul",
        query: "Jasmine Jai Paul",
        text: "Эта запись — легенда именно потому, что редкая. Некоторое сходство прослеживается.",
      },
    ],
    jazz: [
      {
        song: "«My Funny Valentine» — Chet Baker",
        query: "My Funny Valentine Chet Baker",
        text: "Голос не идеальный, интонация чуть мимо — и именно поэтому веришь каждому слову. У тебя похожий эффект.",
      },
      {
        song: "«Feeling Good» — Nina Simone",
        query: "Feeling Good Nina Simone",
        text: "Ты, кажется, умеешь то же самое — заходишь, и в комнате явно светлее.",
      },
      {
        song: "«Waltz for Debby» — Bill Evans",
        query: "Waltz for Debby Bill Evans",
        text: "Три минуты вальса, а ощущение, что времени вообще не проходило. Знакомо.",
      },
    ],
    meladze: [
      {
        song: "«Самба белого мотылька» — Валерий Меладзе",
        query: "Самба белого мотылька Валерий Меладзе",
        text: "Мотылёк из песни летает и не даётся в руки. У тебя, подозреваю, похожая тактика.",
      },
      {
        song: "«Небеса» — Валерий Меладзе",
        query: "Небеса Валерий Меладзе",
        text: "Название пафосное, согласен. Но когда ты улыбаешься, вопросов к автору не остаётся.",
      },
      {
        song: "«Не тревожь мне душу, скрипка» — Валерий Меладзе",
        query: "Не тревожь мне душу скрипка Валерий Меладзе",
        text: "Обычно ко мне музыка так не подбирается. С тобой почему-то работает тот же приём.",
      },
    ],
  };

  var decks = {};
  var opened = 0;
  var currentRotation = 0;
  var spinning = false;

  var wheelEl = document.getElementById("wheel");
  var spinBtn = document.getElementById("spinBtn");
  var hintEl = document.getElementById("hint");
  var cardEl = document.getElementById("trackCard");
  var genreEl = document.getElementById("trackGenre");
  var songEl = document.getElementById("trackSong");
  var complimentEl = document.getElementById("trackCompliment");
  var spotifyEl = document.getElementById("trackSpotify");
  var countEl = document.getElementById("count");
  var playlistEl = document.getElementById("playlist");

  function shuffle(arr) {
    var d = arr.slice();
    for (var i = d.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = d[i];
      d[i] = d[j];
      d[j] = t;
    }
    return d;
  }

  function drawTrack(key) {
    if (!decks[key] || decks[key].length === 0) {
      decks[key] = shuffle(pools[key]);
    }
    return decks[key].pop();
  }

  function positionLabels() {
    var zone = document.querySelector(".wheel-zone");
    var radius = (zone.clientWidth / 2) * 0.62;
    var sliceAngle = 360 / genres.length;
    genres.forEach(function (g, i) {
      var center = i * sliceAngle + sliceAngle / 2; // degrees from top, clockwise
      var rad = ((center - 90) * Math.PI) / 180; // 0deg (top) -> -90 in standard coords
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;
      var el = document.getElementById("lbl" + i);
      if (el) {
        el.style.left = 50 + (x / zone.clientWidth) * 100 + "%";
        el.style.top = 50 + (y / zone.clientWidth) * 100 + "%";
      }
    });
  }

  function buildPlaylist() {
    playlistEl.innerHTML = "";
    genres.forEach(function (g) {
      var b = document.createElement("span");
      b.className = "genre-badge";
      b.id = "badge-" + g.key;
      b.textContent = g.label;
      playlistEl.appendChild(b);
    });
  }

  function markPlaylist(key) {
    var b = document.getElementById("badge-" + key);
    if (b) b.classList.add("hit");
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    hintEl.textContent = "Крутится...";
    cardEl.classList.remove("show");

    var sliceAngle = 360 / genres.length;
    var targetIndex = Math.floor(Math.random() * genres.length);
    var sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
    var jitter = Math.random() * (sliceAngle * 0.5) - sliceAngle * 0.25;
    var mod = ((currentRotation % 360) + 360) % 360;
    var needed = (360 - sliceCenter - mod) % 360;
    var extraSpins = 5 * 360;
    currentRotation += extraSpins + needed + jitter;

    wheelEl.style.transform = "rotate(" + currentRotation + "deg)";

    setTimeout(function () {
      var genre = genres[targetIndex];
      var track = drawTrack(genre.key);
      genreEl.textContent = genre.label;
      songEl.textContent = track.song;
      complimentEl.textContent = track.text;
      spotifyEl.href = "https://open.spotify.com/search/" + encodeURIComponent(track.query);
      spotifyEl.hidden = false;
      cardEl.classList.add("show");
      opened += 1;
      countEl.textContent = String(opened);
      markPlaylist(genre.key);
      hintEl.textContent = "Крути ещё раз — плейлист продолжается";
      spinBtn.disabled = false;
      spinning = false;
    }, 3300);
  }

  spinBtn.addEventListener("click", spin);
  window.addEventListener("resize", positionLabels);

  buildPlaylist();
  positionLabels();
})();
