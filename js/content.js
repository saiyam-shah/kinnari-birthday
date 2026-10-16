/* ============================================================
   EVERYTHING you will want to edit lives in this file:
   dates, song links, the map pills, the hidden things, the
   banter, the hints. Edit it like a table. The logic is in app.js.
   ============================================================ */
window.SITE = {

  /* ---- dates (YYYY-MM-DDTHH:MM:SS, your local time) ---- */
  dates: {
    wedding: '2027-05-15T00:00:00',
    trip:    '2027-05-21T00:00:00'
  },

  /* ---- the counters at the top: how many memories / messages exist in total ---- */
  totals: { m: 12, g: 12 },

  /* ---- Timeline page ----
     x, y  = where each numbered lantern sits on the picture, in %. Add or remove entries freely.
     photo = optional, e.g. 'assets/photos/first-trip.jpg' */
  timeline: {
    image: 'assets/backdrops/timeline.jpg',
    ratio: 1.7768,   /* the picture's width divided by its height */
    intro: 'Follow the lantern-lit path. Tap a lantern to open a memory, or press Begin.',
    points: [
      { x:58, y:88, date:'Date 1', title:'Where it all began',  text:'Placeholder: how and when it started, in a line or two.',      photo:'' },
      { x:67, y:80, date:'Date 2', title:'Our first trip',      text:'Placeholder: a moment you both still laugh about.',           photo:'' },
      { x:77, y:73, date:'Date 3', title:'The hard part',       text:'Placeholder: a time that made you stronger together.',        photo:'' },
      { x:83, y:67, date:'Date 4', title:'Moving closer',       text:'Placeholder: the day things got serious.',                    photo:'' },
      { x:87, y:60, date:'Date 5', title:'The question',        text:'Placeholder: the proposal, in your words.',                   photo:'' },
      { x:86, y:53, date:'Date 6', title:'And now',             text:'Placeholder: where you are today, and where the path leads.', photo:'' }
    ]
  },

  /* ---- Suitcase of Memories page ----
     Each item sits inside the suitcase and opens one memory.
     x, y  = where it sits on the picture, in %      rot = tilt in degrees
     icon  = the emoji used as a placeholder until you have a real picture
     image = optional picture of the item (a PNG with a transparent background), e.g. 'assets/items/ticket.png'
     photo = optional photo shown inside the memory card, e.g. 'assets/photos/paris.jpg' */
  suitcase: {
    image: 'assets/backdrops/suitcase.jpg',
    ratio: 2.0,
    intro: 'Unzip the suitcase. Every item opens a memory.',
    items: [
      { x:38, y:64, rot:-7, icon:'🎟️', image:'', title:'A ticket stub', date:'Date', text:'Placeholder: the story behind this ticket.',         photo:'' },
      { x:49, y:65, rot:4,  icon:'🐚', image:'', title:'A shell',       date:'Date', text:'Placeholder: where you found it, and who found it first.', photo:'' },
      { x:60, y:64, rot:-3, icon:'📸', image:'', title:'A polaroid',    date:'Date', text:'Placeholder: the picture, and what was happening just outside the frame.', photo:'' },
      { x:47, y:36, rot:-4, icon:'🧣', image:'', title:'A scarf',       date:'Date', text:'Placeholder: the day it was needed.',                photo:'' },
      { x:57, y:38, rot:5,  icon:'🔑', image:'', title:'A key',         date:'Date', text:'Placeholder: what it opens.',                        photo:'' },
      { x:67, y:36, rot:-6, icon:'📖', image:'', title:'A page',        date:'Date', text:'Placeholder: a line you both remember.',             photo:'' }
    ]
  },

  /* ---- Movie page ----
     youtubeId = the video (upload it to YouTube as Unlisted, copy the part after v=)
     screen    = where the cinema screen sits on the picture, in % (x, y = top-left corner, w = width) */
  movie: {
    image: 'assets/backdrops/movie.jpg',
    ratio: 2.0,
    youtubeId: '',
    title: 'A short film of us',
    caption: 'Dim the lights. Press play.',
    screen: { x:32.9, y:15.8, w:33.5 }
  },

  /* ---- Letter page ----
     Write your letter here: one entry in "paragraphs" per paragraph.
     envelope = where the sealed envelope sits on the picture, in % (x, y = top-left corner, w, h = size) */
  letter: {
    image: 'assets/backdrops/letter.jpg',
    ratio: 2.0,
    envelope: { x:75, y:80, w:18, h:13 },
    greeting: 'My Kinnari,',
    paragraphs: [
      'Placeholder: the first paragraph of your letter. Say the thing you would say if you had the whole evening.',
      'Placeholder: a memory only the two of you would recognise, and what it taught you about her.',
      'Placeholder: what you hope for the two of you, from the wedding onwards.'
    ],
    sign: 'Always yours, Saiyam'
  },

  /* ---- 52 Reasons I Love You ----
     items = one line per reason (the page counts them). She pulls them out of the jar at random.
     jar   = where the jar sits on the picture, in % (x, y = top-left corner, w, h = size) */
  hundred: {
    image: 'assets/backdrops/hundred.jpg',
    ratio: 2.0,
    title: '52 reasons I love you',
    noun: 'Reason',
    jar: { x:56.4, y:31, w:17.6, h:52 },
    intro: 'Tap the jar. Every folded heart is one reason.',
    items: [
      "You make the distance between India and the USA feel a little smaller.",
      "You're the person I want to share every little thing with.",
      "You make ordinary moments feel special.",
      "You're the person I want beside me when something amazing happens.",
      "You're also the person I want beside me when nothing goes according to plan.",
      "You give me something beautiful to look forward to.",
      "You make the idea of home feel less like a place and more like a person.",
      "You're worth every mile between us.",
      "I love that we're building a future together, one decision at a time.",
      "You make forever feel exciting rather than scary.",
      "I love having our own little world, even when we're in different countries.",
      "You're part of so many of my future plans that I can't imagine them without you.",
      "I love that we're creating our own story rather than following someone else's.",
      "You make me excited about all the adventures we haven't had yet.",
      "I love imagining all the places we'll explore together.",
      "I can't wait for the little routines we'll build when we're finally in the same place.",
      "I love that our story has so many chapters left to write.",
      "You're the person I want to collect a lifetime of memories with.",
      "I love that we're turning the idea of getting married into a real, shared future.",
      "You're my favourite person to imagine growing old with.",
      "I love your taste in places and experiences.",
      "I love planning trips with you and imagining what we'll discover.",
      "I love that we can dream about Italy, beautiful coastlines, and places we've yet to see.",
      "I love the thought of discovering new cities through your eyes.",
      "I want to be there for the big adventures and the tiny detours.",
      "I love that our memories can bring us closer even when we're apart.",
      "I love having little things that remind me of you throughout my day.",
      "I love that we have a story worth preserving, not just remembering.",
      "I love that we're creating traditions that belong only to us.",
      "I love the idea of looking back at our early days together years from now.",
      "I love your long, beautiful hair.",
      "I love the little details that make you unmistakably you.",
      "I love seeing you smile.",
      "I love imagining your reaction when something surprises you.",
      "I love the thought of making you laugh when you least expect it.",
      "I love that there's always more for me to learn about you.",
      "I love that you're not just someone I love, but someone I get to keep discovering.",
      "I love sharing experiences with you, even when we're experiencing them through a screen.",
      "I love having someone with whom I can make plans that stretch years into the future.",
      "I love that we're making decisions together about the life we want.",
      "I love that your happiness matters so much to me.",
      "I love finding little ways to make you feel special.",
      "I love that celebrating you gives me an excuse to be ridiculously creative.",
      "I love making things for you that are personal to our story.",
      "I love that even a website can become a place filled with pieces of us.",
      "I love that our relationship inspires me to create things I wouldn't otherwise imagine.",
      "I love that I get to call you my fiancée.",
      "I love the thought of one day not having to say goodbye at an airport.",
      "I love imagining a life where the distance is replaced by everyday togetherness.",
      "I love that the future I'm working toward has you in it.",
      "I love that, out of all the people I could have met, I get to build this life with you.",
      "And most importantly, I love you not just for the life we're going to have, but for the person you are and the story we've already shared."
    ]
  },

  /* ---- Future (dream board) ----
     dreams = one entry per item pinned on the board. x, y, w, h = where it sits on the picture, in %.
     when = the small line above the title (e.g. 'Next year', 'Someday'). Add or remove entries freely. */
  future: {
    image: 'assets/backdrops/future.jpg',
    ratio: 2.0,
    intro: 'Everything pinned here is something we want to do together. Tap a card to open it.',
    dreams: [
      { x:21.8, y:18.6, w:10.7, h:24.5, when:'Someday',    title:'Our first home',           text:'Placeholder: what the place looks like, and who gets the good chair.' },
      { x:40.7, y:19.2, w:9.4,  h:23,   when:'Soon',       title:'A very good dog',          text:'Placeholder: a golden retriever, obviously. Name pending.' },
      { x:64.9, y:24.2, w:9.1,  h:23,   when:'Every year', title:'A birthday ritual',        text:'Placeholder: one thing we do on every 29 October, no matter what.' },
      { x:21,   y:52.5, w:10.5, h:24.8, when:'Someday',    title:'Learn something together', text:'Placeholder: a class, a language, a sport we are both terrible at.' },
      { x:45.4, y:58.4, w:9.6,  h:23.5, when:'Every week', title:'A slow Sunday',            text:'Placeholder: what a perfect ordinary Sunday looks like.' },
      { x:62.3, y:61.8, w:8.2,  h:21.6, when:'One day',    title:'Sunrise somewhere new',    text:'Placeholder: a place we want to be awake for.' },
      { x:50.9, y:32.7, w:13.6, h:27,   when:'21 May',     title:'The big map',              text:'Placeholder: Europe first, then everywhere else on the list.' },
      { x:32,   y:41.9, w:5.5,  h:15.6, when:'Always',     title:'The compass',              text:'Placeholder: whichever way we go, we go together.' }
    ]
  },

  /* ---- Next Adventure (the Europe trip) ----
     The date itself is under "dates" above. items = things on the cafe table you can tap
     (x, y, w, h = where each sits on the picture, in %). Add or remove entries freely. */
  trip: {
    image: 'assets/backdrops/next.jpg',
    ratio: 2.0,
    dateLabel: '21 May',
    title: 'Until we fly to Europe',
    intro: 'Tap the passports, the suitcase and the backpack to see the plan.',
    items: [
      { x:19.4, y:60,   w:17.4, h:9,  when:'The route',   title:'The passports',  text:'Placeholder: the cities we are visiting, in order, and one thing to do in each.' },
      { x:27.3, y:70.5, w:11,   h:29, when:'The list',    title:'The big suitcase', text:'Placeholder: what we are packing, and what she is absolutely not allowed to bring.' },
      { x:38.4, y:76,   w:10.4, h:23, when:'The rule',    title:'The backpack',   text:'Placeholder: the one rule of this trip. For example: no phones at dinner.' }
    ]
  },

  /* ---- the two companions that stand in the corner of every full page ----
     idle = the resting picture      say = pictures used while talking (taken in turn)      hint = picture used for hints
     Her pictures are flipped so she faces him. */
  crew: {
    him: { idle:'assets/characters/him-idle.png', say:['assets/characters/him-smug.png','assets/characters/him-sheepish.png','assets/characters/him-glasses.png'], hint:'assets/characters/him-glasses.png' },
    her: { idle:'assets/characters/her-idle.png', say:['assets/characters/her-smug.png','assets/characters/her-tuck.png','assets/characters/her-shy.png'], hint:'assets/characters/her-smug.png' }
  },

  /* ---- Spotify ---- */
  playlist: '4QSyHsRLHoqoq9LMt7FgeN',
  /* Next and Shuffle need the individual song links. Paste them below, one per line
     (they look like https://open.spotify.com/track/xxxxxxxx). Leave empty to use only Play/Pause. */
  tracksRaw: `
  `,

  /* ---- your final video: paste the YouTube video ID (the part after v=) ---- */
  youtubeId: '',

  /* ---- the pills on the Explore map ----
     x, y   = where the pill sits on the picture, in %
     tag    = the small label shown on that page
     left   = true makes the label open to the left (for pills near the right edge) */
  pills: [
    { id:'timeline', x:24, y:13, icon:'⏳', title:'Timeline',        desc:'Our story, milestone by milestone.',               tag:'Open from the start' },
    { id:'hundred',  x:41, y:19, icon:'💗', title:'52 Reasons',       desc:'Fifty-two reasons I love you.',             tag:'Unlocked' },
    { id:'letter',   x:10, y:81, icon:'💌', title:'Letter',          desc:'A letter, written just for you.',                  tag:'Unlocked' },
    { id:'movie',    x:62, y:90, icon:'🎬', title:'Movie',           desc:'A short film of us.',                              tag:'Unlocked' },
    { id:'archive',  x:83, y:88, icon:'🐶', title:'Kinnari Archive', desc:'Messages from the people who love you.',           tag:'Unlocked' },
    { id:'places',   x:68, y:72, icon:'📍', title:'Places',          desc:'A map with a pin for every place we have been.',   tag:'Open from the start' },
    { id:'future',   x:47, y:70, icon:'✨', title:'Future',          desc:'A dream board of what we want to do together.',    tag:'Unlocked' },
    { id:'count',    x:89, y:40, icon:'⏰', title:'Countdown',       desc:'Live countdown to our wedding.',                   tag:'Just for fun', left:true },
    { id:'next',     x:55, y:80, icon:'🧭', title:'Next Adventure',  desc:'Europe, right after the wedding.',                 tag:'Unlocked' },
    { id:'fin',      x:96, y:10, icon:'🎁', title:'Final surprise',  desc:'A video, from me.',                                tag:'The last stop', left:true }
  ],

  /* ---- what opens each pill ----
     open  = always open        play = always open, just for fun
     find  = needs n hidden things found in total ('all' = every hidden thing)
     msg   = needs n hidden messages found
     visit = needs another page to have been opened first */
  rules: {
    timeline:{ k:'open' },  places:{ k:'open' },  count:{ k:'play' },
    hundred:{ k:'find', n:2 },
    archive:{ k:'msg',  n:1 },
    movie:  { k:'find', n:3 },
    future: { k:'find', n:4 },
    next:   { k:'find', n:4 },
    letter: { k:'find', n:'all' },
    fin:    { k:'visit', v:'letter' }
  },

  /* ---- the hidden things on the home picture ----
     'm:' = a memory, 'g:' = a message from someone. The key must match data-find in index.html.
     hint = [poetic hint (him), blunt hint (her)]. Hints follow this order. */
  finds: {
    'm:blanket': { title:'A memory 🧺', body:'Placeholder: a keepsake photo and caption.',
                   hint:['Something small is hiding in the folds of that striped blanket.','The blanket. The striped one. Just click it.'] },
    'm:tower':   { title:'A memory 🏰', body:'Placeholder: a place you two remember.',
                   hint:['Look across the water, to where the old tower stands guard.','The tower with the dome. On the hill. Click it.'] },
    'm:leaves':  { title:'A memory 🍃', body:'Placeholder: a small moment from your story.',
                   hint:['The leaves in the corner are hiding more than shade.','Bottom left. Leaves. Click them.'] },
    'g:flowerL': { title:'A message 🌸', body:'Placeholder: a message from someone who loves Kinnari.',
                   hint:['One flower on the left vine looks far too pretty to be only a flower.','Left vine, pink flower. Click it.'] },
    'g:flowerR': { title:'A message 🌷', body:'Placeholder: another message tucked away for her.',
                   hint:['The vine on the right has a secret of its own.','Right vine, near the top. Pink flower. Go.'] },
    'g:puppy':   { title:'A message 🐶', body:'Placeholder: a message from the puppy (and whoever trained him).',
                   hint:['Someone small has been waiting very patiently by the wall.','The puppy. Click the puppy. Obviously.'] }
  },

  /* ---- banter: each scene is a short back-and-forth. 1 = him (left), 2 = her ----
     These are placeholder lines. Rewrite them in your own voice. */
  scenes: [
    [[1,'Reminder: this whole website was my idea.'],[2,'Your idea. My taste. Let us be accurate.'],[1,'Fair. Your taste is excellent. Look who you picked.']],
    [[2,'You rehearsed that line, did you not.'],[1,'Twice. In the mirror. Do not tell anyone.'],[2,'Your secret is safe. My teasing is not.']],
    [[1,'I picked the sunset, by the way.'],[2,'You pick a sunset the way you pick a restaurant. Slowly, then I decide.'],[1,'And you always decide well. See: me.']],
    [[2,'Stop looking so pleased with yourself.'],[1,'I cannot help it. It is a very good website.'],[2,'It is. It is also a very good thing that you are cute.']]
  ]
};
