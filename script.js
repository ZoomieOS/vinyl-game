(function () {
  "use strict";

  var STORAGE_KEY = "vinylRoulette.v2";

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
      { song: "«Space Song» — Beach House", query: "Space Song Beach House", text: "Трек тянется шесть минут, и ты как-то умеешь делать то же самое с обычным разговором." },
      { song: "«Sarah» — Alex G", query: "Sarah Alex G", text: "Обычно я домучиваю такие тихие песни просто из вежливости. С тобой — совсем не поэтому." },
      { song: "«Archie, Marry Me» — Alvvays", query: "Archie Marry Me Alvvays", text: "До предложения руки и сердца песне ещё далеко, но за скорость симпатии я не ручаюсь." },
      { song: "«Heaven or Las Vegas» — Cocteau Twins", query: "Heaven or Las Vegas Cocteau Twins", text: "Ни слова не разобрать, но с тобой то же чувство — красиво и без объяснений." },
      { song: "«Show Me How» — Men I Trust", query: "Show Me How Men I Trust", text: "У тебя редкий талант — делать простые вещи подозрительно притягательными." },
      { song: "«Fade Into You» — Mazzy Star", query: "Fade Into You Mazzy Star", text: "Название слишком точное для случайного совпадения." },
      { song: "«Alison» — Slowdive", query: "Alison Slowdive", text: "Трек размыт настолько, что легко потеряться. С тобой то же самое, но приятнее." },
      { song: "«Ladykillers» — Lush", query: "Ladykillers Lush", text: "Название не совсем про тебя, но осторожность иногда не помешает." },
      { song: "«Doused» — DIIV", query: "Doused DIIV", text: "Звучит так, будто всё происходит под водой. Рядом с тобой — похожее чувство невесомости." },
      { song: "«Chinatown» — Wild Nothing", query: "Chinatown Wild Nothing", text: "Песня про то, как что-то ищешь и вдруг находишь. Кажется, понимаю, о чём." },
    ],
    disco: [
      { song: "«Pretty Girl» — Clairo", query: "Pretty Girl Clairo", text: "Комментировать название или сделать вид, что я выше этого? Выбираю первое." },
      { song: "«girls» — girl in red", query: "girls girl in red", text: "Если у тебя тоже где-то спрятан плейлист «для одного конкретного человека» — подозреваю, кто в нём сегодня." },
      { song: "«Everytime» — Boy Pablo", query: "Everytime Boy Pablo", text: "Название прямо описывает, с какой регулярностью ты лезешь мне в голову без спроса." },
      { song: "«Best Friend» — Rex Orange County", query: "Best Friend Rex Orange County", text: "Рано так говорить, но вайб этой песни мне определённо нравится." },
      { song: "«Lovers Rock» — TV Girl", query: "Lovers Rock TV Girl", text: "У тебя обаяние уровня трека, который внезапно решает весь вечер." },
      { song: "«Chamber of Reflection» — Mac DeMarco", query: "Chamber of Reflection Mac DeMarco", text: "Название подходит для комнаты, где я думаю о тебе дольше, чем планировал(а)." },
      { song: "«Coffee» — beabadoobee", query: "Coffee beabadoobee", text: "Трек короткий, но застревает надолго. Узнаю симптомы." },
      { song: "«Lo Que Siento» — Cuco", query: "Lo Que Siento Cuco", text: "Не всё нужно переводить, чтобы понять, о чём песня." },
      { song: "«Can I Call You Tonight?» — Dayglow", query: "Can I Call You Tonight Dayglow", text: "Вопрос из названия вполне себе актуальный." },
      { song: "«comethru» — Jeremy Zucker", query: "comethru Jeremy Zucker", text: "Название звучит как инструкция, и я, кажется, готов(а) её выполнить." },
    ],
    latino: [
      { song: "«Big Shot» — Fontaines D.C.", query: "Big Shot Fontaines D.C.", text: "Веди себя как важная персона — тебе, кажется, действительно можно." },
      { song: "«Narrator» — Squid", query: "Narrator Squid", text: "Будь у нашего разговора закадровый голос, он бы явно болел за тебя." },
      { song: "«Scratchcard Lanyard» — Dry Cleaning", query: "Scratchcard Lanyard Dry Cleaning", text: "Твой сарказм звучит так же расслабленно и метко, как вокал в этой песне." },
      { song: "«Concrete» — Shame", query: "Concrete Shame", text: "Ты держишься увереннее, чем большинство людей, которых я знаю. Уважение." },
      { song: "«Athens, France» — Black Country, New Road", query: "Athens France Black Country New Road", text: "Как и эта песня, ты явно сложнее, чем кажешься на первый взгляд — и это комплимент." },
      { song: "«Colossus» — IDLES", query: "Colossus IDLES", text: "Начинается тихо, потом сносит всё вокруг. Подозрительно похоже на твоё появление в комнате." },
      { song: "«The Overload» — Yard Act", query: "The Overload Yard Act", text: "Трек про то, как всего стало слишком много. Ты, для контраста, никогда не бываешь лишней." },
      { song: "«Sports» — Viagra Boys", query: "Sports Viagra Boys", text: "Название нелепое, а трек почему-то работает. Есть в этом что-то общее с моей симпатией к тебе." },
      { song: "«Anxiety» — Preoccupations", query: "Anxiety Preoccupations", text: "Обычно я не признаюсь в этом под песню вслух. Тебе, наверное, можно." },
      { song: "«A Private Understanding» — Protomartyr", query: "A Private Understanding Protomartyr", text: "Название точно описывает то, что происходит между нами последние пару разговоров." },
    ],
    rock: [
      { song: "«Free» — Sault", query: "Free Sault", text: "Рядом с тобой почему-то не нужно ничего изображать — редкая штука." },
      { song: "«Twice» — Little Dragon", query: "Twice Little Dragon", text: "Заметил(а) кое-что дважды за вечер, и оба раза виновата была твоя улыбка." },
      { song: "«Virile» — Moses Sumney", query: "Virile Moses Sumney", text: "Название говорит само за себя, но с таким названием рядом ты держишься на удивление скромно." },
      { song: "«Raisins Under the Sun» — Yussef Dayes", query: "Raisins Under the Sun Yussef Dayes", text: "У тебя такой же непредсказуемый и классный ритм в разговоре." },
      { song: "«Pace» — Nubya Garcia", query: "Pace Nubya Garcia", text: "Ты умеешь задавать темп разговору — редкий навык." },
      { song: "«Busy Earnin'» — Jungle", query: "Busy Earnin Jungle", text: "Название прямо описывает, чем ты занята, пока я пытаюсь придумать комплимент получше." },
      { song: "«Them Changes» — Thundercat", query: "Them Changes Thundercat", text: "Песня про то, как сердце скачет туда-сюда. Ты, кажется, имеешь к этому отношение." },
      { song: "«Nakamarra» — Hiatus Kaiyote", query: "Nakamarra Hiatus Kaiyote", text: "Трек сложный, необычный и совсем не похож на остальные. Комплимент, если что." },
      { song: "«Cosmic Sans» — Cory Wong", query: "Cosmic Sans Cory Wong", text: "Название — шутка про шрифт. У тебя тоже неожиданно хорошее чувство юмора для случайного знакомства." },
      { song: "«Multiply» — Jamie Lidell", query: "Multiply Jamie Lidell", text: "Название точно описывает эффект от разговора с тобой на моё настроение." },
    ],
    rnb: [
      { song: "«Soy Yo» — Bomba Estéreo", query: "Soy Yo Bomba Estereo", text: "У тебя та же уверенность «я — это я», и спорить с ней бесполезно." },
      { song: "«Tú Sí Sabes Quererme» — Natalia Lafourcade", query: "Tu Si Sabes Quererme Natalia Lafourcade", text: "Гуглить перевод не обязательно, но он тебе на пользу." },
      { song: "«Malamente» — Rosalía", query: "Malamente Rosalia", text: "Название переводится как «плохо». Ты, для сравнения, работаешь строго в обратную сторону." },
      { song: "«Distrito Zona Norte» — Systema Solar", query: "Distrito Zona Norte Systema Solar", text: "Твоя энергия работает как эта музыка — сложно объяснить, но невозможно не поддаться." },
      { song: "«Micaela» — Chico Trujillo", query: "Micaela Chico Trujillo", text: "Там поют чужое имя, а я почему-то думаю о твоём." },
      { song: "«Freedom Is Free» — Chicano Batman", query: "Freedom Is Free Chicano Batman", text: "Название подходящее — рядом с тобой почему-то легче дышится." },
      { song: "«Business Woman» — Nathy Peluso", query: "Business Woman Nathy Peluso", text: "Ты держишься с такой же уверенностью, даже когда речь не о делах." },
      { song: "«Telepatía» — Kali Uchis", query: "Telepatia Kali Uchis", text: "Название переводится как «телепатия» — иногда кажется, что это не так уж далеко от правды." },
      { song: "«Tu Falta De Querer» — Mon Laferte", query: "Tu Falta De Querer Mon Laferte", text: "Название мрачноватое, но явно не про эту переписку." },
      { song: "«De Donde Vengo Yo» — ChocQuibTown", query: "De Donde Vengo Yo ChocQuibTown", text: "Песня о гордости за то, откуда ты родом. Гордиться тобой, кажется, несложно в принципе." },
    ],
    indie: [
      { song: "«Kiara» — Bonobo", query: "Kiara Bonobo", text: "Трек безобидный на вид, а потом внезапно понимаешь, что слушаешь его пятый раз подряд. Знакомое чувство." },
      { song: "«A Walk» — Tycho", query: "A Walk Tycho", text: "Пойти с тобой в магазин за хлебом — и это уже звучало бы как саундтрек." },
      { song: "«Jasmine» — Jai Paul", query: "Jasmine Jai Paul", text: "Эта запись — легенда именно потому, что редкая. Некоторое сходство прослеживается." },
      { song: "«Can't Do Without You» — Caribou", query: "Cant Do Without You Caribou", text: "Название слегка забегает вперёд, но направление мне нравится." },
      { song: "«Blaed» — Kiasmos", query: "Blaed Kiasmos", text: "Ты действуешь как этот трек — сдержанно, а потом вдруг накрывает." },
      { song: "«Say It» — Flume", query: "Say It Flume", text: "Название — практически инструкция, если вдруг захочешь мне что-то сказать." },
      { song: "«A Moment Apart» — ODESZA", query: "A Moment Apart ODESZA", text: "Трек длинный, атмосферный и явно рассчитан на то, чтобы задержаться в голове. Как и ты." },
      { song: "«Baby» — Four Tet", query: "Baby Four Tet", text: "Название банальное, а трек — нет. С тобой похожая история: ожидания превышены." },
      { song: "«Glue» — Bicep", query: "Glue Bicep", text: "Название удачное — вечер с тобой действительно держится на чём-то похожем." },
      { song: "«Emerald Rush» — Jon Hopkins", query: "Emerald Rush Jon Hopkins", text: "Трек про внезапный прилив чего-то хорошего. Примерно это я и чувствую сейчас." },
    ],
    jazz: [
      { song: "«My Funny Valentine» — Chet Baker", query: "My Funny Valentine Chet Baker", text: "Голос не идеальный, интонация чуть мимо — и именно поэтому веришь каждому слову. У тебя похожий эффект." },
      { song: "«Feeling Good» — Nina Simone", query: "Feeling Good Nina Simone", text: "Ты, кажется, умеешь то же самое — заходишь, и в комнате явно светлее." },
      { song: "«Waltz for Debby» — Bill Evans", query: "Waltz for Debby Bill Evans", text: "Три минуты вальса, а ощущение, что времени вообще не проходило. Знакомо." },
      { song: "«Dream a Little Dream of Me» — Ella Fitzgerald", query: "Dream a Little Dream of Me Ella Fitzgerald", text: "Название подходящее — кажется, я запомню этот разговор дольше, чем стоило бы." },
      { song: "«Naima» — John Coltrane", query: "Naima John Coltrane", text: "Колтрейн посвятил жене целую композицию. Кажется, я начинаю понимать почему." },
      { song: "«So What» — Miles Davis", query: "So What Miles Davis", text: "Название с характером. У тебя, подозреваю, похожая реакция на большинство моих шуток." },
      { song: "«Solitude» — Billie Holiday", query: "Solitude Billie Holiday", text: "Песня про одиночество, но слушать её с тобой почему-то совсем не одиноко." },
      { song: "«'Round Midnight» — Thelonious Monk", query: "Round Midnight Thelonious Monk", text: "Трек написан для позднего часа и хорошей компании. Один пункт уже выполнен." },
      { song: "«Take Five» — Dave Brubeck", query: "Take Five Dave Brubeck", text: "Название — прямое указание взять паузу. Пять минут точно можно потратить на разговор с тобой." },
      { song: "«Cantaloupe Island» — Herbie Hancock", query: "Cantaloupe Island Herbie Hancock", text: "Мелодия расслабленная ровно настолько, насколько расслабленно я чувствую себя рядом с тобой." },
    ],
    meladze: [
      { song: "«Самба белого мотылька» — Валерий Меладзе", query: "Самба белого мотылька Валерий Меладзе", text: "У тебя такая же лёгкая походка, как у мотылька из этой песни — не поймать, но хочется." },
      { song: "«Не тревожь мне душу, скрипка» — Валерий Меладзе", query: "Не тревожь мне душу скрипка Валерий Меладзе", text: "Обычно ко мне музыка так не подбирается. С тобой почему-то работает тот же приём." },
      { song: "«Как ты красива сегодня» — Валерий Меладзе", query: "Как ты красива сегодня Валерий Меладзе", text: "Название говорящее — присоединяюсь без возражений." },
      { song: "«Сэра» — Валерий Меладзе", query: "Сэра Валерий Меладзе", text: "Не знаю никакой Сэры, но твоё имя мне нравится куда больше." },
      { song: "«Небеса» — Валерий Меладзе", query: "Небеса Валерий Меладзе", text: "Название пафосное, согласен. Но когда ты улыбаешься, вопросов к автору не остаётся." },
      { song: "«Лимбо» — Валерий Меладзе", query: "Лимбо Валерий Меладзе", text: "Между «просто общаемся» и чем-то большим — примерно там мы сейчас и зависли." },
      { song: "«Золотистый локон» — Валерий Меладзе", query: "Золотистый локон Валерий Меладзе", text: "Не уверен(а) насчёт локона, но что-то золотистое в тебе точно есть." },
      { song: "«Река времени» — Валерий Меладзе", query: "Река времени Валерий Меладзе", text: "Обычно время течёт незаметно. Рядом с тобой оно почему-то ощущается острее." },
      { song: "«Чёрная кошка» — Валерий Меладзе", query: "Черная кошка Валерий Меладзе", text: "Плохая примета — это не про тебя. Скорее наоборот." },
      { song: "«Королева автострады» — Валерий Меладзе", query: "Королева автострады Валерий Меладзе", text: "Громкое звание, но, кажется, тебе бы подошло без вопросов." },
    ],
  };

  var TRACKS_PER_GENRE = 10;
  var TOTAL_TRACKS = genres.length * TRACKS_PER_GENRE;

  // ---- persisted state ------------------------------------------------

  function emptyState() {
    var queues = {};
    var seen = {};
    genres.forEach(function (g) {
      queues[g.key] = [];
      seen[g.key] = [];
    });
    return { queues: queues, seen: seen, opened: 0, rotation: 0 };
  }

  var storageAvailable = true;
  try {
    var testKey = "__vr_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
  } catch (e) {
    storageAvailable = false;
  }

  function loadState() {
    if (!storageAvailable) return emptyState();
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      var parsed = JSON.parse(raw);
      var state = emptyState();
      if (parsed && typeof parsed === "object") {
        if (parsed.queues) {
          genres.forEach(function (g) {
            if (Array.isArray(parsed.queues[g.key])) state.queues[g.key] = parsed.queues[g.key];
          });
        }
        if (parsed.seen) {
          genres.forEach(function (g) {
            if (Array.isArray(parsed.seen[g.key])) state.seen[g.key] = parsed.seen[g.key];
          });
        }
        if (typeof parsed.opened === "number") state.opened = parsed.opened;
        if (typeof parsed.rotation === "number") state.rotation = parsed.rotation;
      }
      return state;
    } catch (e) {
      return emptyState();
    }
  }

  function saveState() {
    if (!storageAvailable) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore quota / privacy-mode errors */
    }
  }

  var state = loadState();
  var currentRotation = state.rotation || 0;
  var spinning = false;

  // ---- DOM refs ---------------------------------------------------------

  var wheelEl = document.getElementById("wheel");
  var spinBtn = document.getElementById("spinBtn");
  var hintEl = document.getElementById("hint");
  var cardEl = document.getElementById("trackCard");
  var genreEl = document.getElementById("trackGenre");
  var songEl = document.getElementById("trackSong");
  var complimentEl = document.getElementById("trackCompliment");
  var spotifyEl = document.getElementById("trackSpotify");
  var countEl = document.getElementById("count");
  var totalEl = document.getElementById("total");
  var playlistEl = document.getElementById("playlist");
  var completionBanner = document.getElementById("completionBanner");
  var resetBtn = document.getElementById("resetBtn");

  totalEl.textContent = String(TOTAL_TRACKS);

  // ---- helpers ------------------------------------------------------

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
    var queue = state.queues[key];
    if (!queue || queue.length === 0) {
      queue = shuffle(Array.from({ length: TRACKS_PER_GENRE }, function (_, i) { return i; }));
    }
    var idx = queue.pop();
    state.queues[key] = queue;
    if (state.seen[key].indexOf(idx) === -1) {
      state.seen[key].push(idx);
    }
    return pools[key][idx];
  }

  function totalSeen() {
    var n = 0;
    genres.forEach(function (g) { n += state.seen[g.key].length; });
    return n;
  }

  function buildPlaylist() {
    playlistEl.innerHTML = "";
    genres.forEach(function (g) {
      var b = document.createElement("span");
      b.className = "genre-badge";
      b.id = "badge-" + g.key;
      var labelEl = document.createElement("span");
      labelEl.textContent = g.label;
      var countBadgeEl = document.createElement("span");
      countBadgeEl.className = "badge-count";
      countBadgeEl.id = "badge-count-" + g.key;
      b.appendChild(labelEl);
      b.appendChild(countBadgeEl);
      playlistEl.appendChild(b);
    });
  }

  function refreshBadges() {
    genres.forEach(function (g) {
      var n = state.seen[g.key].length;
      var b = document.getElementById("badge-" + g.key);
      var c = document.getElementById("badge-count-" + g.key);
      if (c) c.textContent = n + "/" + TRACKS_PER_GENRE;
      if (b) {
        b.classList.toggle("hit", n > 0);
        b.classList.toggle("complete", n >= TRACKS_PER_GENRE);
      }
    });
  }

  function refreshProgress() {
    var seen = totalSeen();
    countEl.textContent = String(seen);
    completionBanner.hidden = seen < TOTAL_TRACKS;
  }

  function positionLabels() {
    var zone = document.querySelector(".wheel-zone");
    var radius = (zone.clientWidth / 2) * 0.62;
    var sliceAngle = 360 / genres.length;
    genres.forEach(function (g, i) {
      var center = i * sliceAngle + sliceAngle / 2;
      var rad = ((center - 90) * Math.PI) / 180;
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;
      var el = document.getElementById("lbl" + i);
      if (el) {
        el.style.left = 50 + (x / zone.clientWidth) * 100 + "%";
        el.style.top = 50 + (y / zone.clientWidth) * 100 + "%";
      }
    });
  }

  // ---- spin -----------------------------------------------------------

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

      state.opened += 1;
      state.rotation = currentRotation;
      saveState();

      refreshBadges();
      refreshProgress();

      hintEl.textContent = "Крути ещё раз — плейлист продолжается";
      spinBtn.disabled = false;
      spinning = false;
    }, 3300);
  }

  // ---- reset (two-step inline confirm, no native dialog) ---------------

  var confirmingReset = false;
  var confirmTimer = null;

  function resetProgress() {
    state = emptyState();
    currentRotation = 0;
    saveState();

    cardEl.classList.remove("show");
    spotifyEl.hidden = true;
    hintEl.textContent = "Один оборот — один трек в твою честь";
    wheelEl.style.transition = "none";
    wheelEl.style.transform = "rotate(0deg)";
    // eslint-disable-next-line no-unused-expressions
    wheelEl.offsetHeight; // force reflow before restoring the transition
    wheelEl.style.transition = "";

    refreshBadges();
    refreshProgress();
  }

  resetBtn.addEventListener("click", function () {
    if (!confirmingReset) {
      confirmingReset = true;
      resetBtn.textContent = "Точно сбросить? Нажми ещё раз";
      resetBtn.classList.add("confirming");
      confirmTimer = setTimeout(function () {
        confirmingReset = false;
        resetBtn.textContent = "Сбросить прогресс";
        resetBtn.classList.remove("confirming");
      }, 4000);
      return;
    }
    clearTimeout(confirmTimer);
    confirmingReset = false;
    resetBtn.textContent = "Сбросить прогресс";
    resetBtn.classList.remove("confirming");
    resetProgress();
  });

  // ---- init -------------------------------------------------------------

  spinBtn.addEventListener("click", spin);
  window.addEventListener("resize", positionLabels);

  buildPlaylist();
  positionLabels();
  refreshBadges();
  refreshProgress();

  if (currentRotation) {
    wheelEl.style.transition = "none";
    wheelEl.style.transform = "rotate(" + currentRotation + "deg)";
    requestAnimationFrame(function () {
      wheelEl.style.transition = "";
    });
  }
})();
