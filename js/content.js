/* ============================================================
   EVERYTHING you will want to edit lives in this file:
   dates, song links, the map pills, the hidden things, the
   banter, the hints. Edit it like a table. The logic is in app.js.
   ============================================================ */
window.SITE = {
archive: {
  image: 'assets/backdrops/archive.png',
  ratio: 2.0
},
  /* ---- hidden message count ---- */
  totals: { g: 12 },

  /* ---- Timeline page ----
     x, y  = where each numbered lantern sits on the picture, in %. Add or remove entries freely.
     photo = optional, e.g. 'assets/photos/first-trip.jpg' */
  timeline: {
    image: 'assets/backdrops/timeline.jpg',
    ratio: 1.7768,   /* the picture's width divided by its height */
    intro: 'Follow the lantern-lit path. Tap a lantern to open a memory, or press Begin.',
    points: [
      { x:58, y:88, date:'15 Aug 2017',  title:'The first time I saw you', text:'I did not know it yet, but this is where our story starts.', photo:'assets/photos/first.jpg' },
      { x:67, y:80, date:'7 Jan 2020',   title:'Our first outing',         text:'The first time it was just the two of us.',                   photo:'assets/photos/second.jpg' },
      { x:77, y:73, date:'13 Dec 2022',  title:'We start dating',          text:'The day we became us.',                                       photo:'assets/photos/third.jpg' },
      { x:83, y:67, date:'13 Dec 2025',  title:'I asked',                  text:'Three years to the day, I asked you to marry me.',            photo:'assets/photos/fourth.jpg' },
      { x:87, y:60, date:'11 Oct 2026',  title:'Engaged',                  text:'Now it is official, with our families around us.',            photo:'' },
      { x:86, y:53, date:'TBD',          title:'Married',                  text:'The day this path has been leading to.',                      photo:'' }
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
    youtubeId: 'Qthy9GrbMlY',
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
    greeting: 'To my Kinnari, ❤️',
    paragraphs: [
      "Happy birthday, my love.",
      "Sometimes I wish I could just skip the distance, the time zones, and all the planning it takes to be together. I wish I could be there when you wake up, annoy you in person, make you laugh over the silliest things, and end the day right next to you. Not through a screen, not through a call. Just there.",
      "Until I can do that, I wanted to make you something that feels a little like us. A place filled with our memories, our little moments, the things that make me smile about you, and all the things we still have ahead of us.",
      "When I think about us, I don't just think about the big moments. I think about the ordinary ones, too. The conversations that go on longer than they should, the random things that become inside jokes, the way even the simplest day feels different when you're part of it. Somewhere along the way, you became the person I want to tell everything to, whether it's something important or something completely ridiculous.",
      "And now, when I imagine the future, I don't just picture the big milestones. I picture the everyday life we'll build together. Waking up in the same home, figuring things out as a team, travelling to places we've dreamed about, and making new memories out of days that might seem ordinary to everyone else.",
      "I know we still have distance to get through and a lot of life ahead of us. But I'm excited for all of it, because it's a life I get to build with you.",
      " I hope this next year brings you happiness, new experiences, little surprises, and a hundred reasons to smile. And I hope that whenever you miss me, this little corner of the internet reminds you that, no matter how far apart we are, there's someone on the other side of the world who is always rooting for you, thinking about you, and looking forward to coming home to you.",
      "Happy birthday, Kinnari.",
      "Here's to you, to us, and to all the chapters we haven't written yet.",
      "I love you. ❤️"
    ],
    sign: 'Forever yours,\nSaiyam'
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
      { x:16.1, y:10.7, w:15.1, h:31.2, when:'Someday',    title:'Our first home',           text:'A big, cozy living room, and a big bookshelf waiting to be filled.' },
      { x:17.6, y:43.3, w:12.2, h:28.1,   when:'Soon',       title:'A very good dog',          text:'A golden retriever, obviously. Name pending.' },
      { x:32.8, y:16.6, w:7.4, h:21.4,   when:'Every year', title:'A birthday ritual',        text:'Every 29 October, we give something away. Because the best way to celebrate is to share.' },
      { x:42.7, y:12.2, w:13.6, h:26.4, when:'Someday',    title:'Learn lawn tennis',         text:'We learn it together, and we are both allowed to be terrible at it.' },
      { x:53.7, y:41, w:15.4, h:26.2, when:'Every week', title:'A slow Sunday',            text:'The two of us on the sofa, cuddled up, reading a book.' },
      { x:63.2, y:16.1, w:14, h:27.5, when:'One day',    title:'Sunrise somewhere new',    text:'A place we have never been, and a morning we are both awake for.' },
      { x:32, y:38.7, w:20.1, h:25.3,   when:'21 May 2027',     title:'The big map',              text:'Switzerland, Belgium, the Netherlands, Norway, Turkey, New Zealand, Portugal and Spain.' },
      { x:74.7, y:46.4, w:3.4, h:14.7, when:'Always',     title:'A little promise',              text:'Whichever way we go, we go together.' }
    ]
  },

  /* ---- Next Adventure (the Europe trip) ----
     The date itself is under "dates" above. items = things on the cafe table you can tap
     (x, y, w, h = where each sits on the picture, in %). Add or remove entries freely. */
  trip: {
    image: 'assets/backdrops/next.jpg',
    ratio: 2.0,
    mapImage: 'assets/backdrops/world-map.jpg',
    title: 'Next Adventures',
    intro: 'Our map and little plans for the adventures ahead.',
    items: [
      { x:19.4, y:60,   w:17.4, h:9,  when:'Our next journey', title:'The passports', text:'Tiny books, huge plans, and the start of every story we’ll collect together.' },
      { x:27.3, y:70.5, w:11,   h:29, when:'A little keepsake', title:'The big suitcase', text:'A fridge magnet from every city we visit.' },
      { x:38.4, y:76,   w:10.4, h:23, when:'Our trip tradition', title:'The backpack', text:'One new adventure activity on every trip.' }
    ]
  },

  /* ---- Gifts treasure hunt: answer each riddle to reveal its gift. ---- */
  gifts: [
    { gift:'Socks 1', answer:'socks', riddle:'Two quiet companions for every step you take, keeping you cozy wherever you wake.' },
    { gift:'Socks 2', answer:'socks', riddle:'I come in a pair, but I’m not a pair of shoes. Slip me on, and your feet have less to lose.' },
    { gift:'Tote Bag', answer:'tote bag', riddle:'I carry your little world, from things you need to things you buy. Over your shoulder I go, as the day passes by.' },
    { gift:'Kurti', answer:'kurti', riddle:'Not quite a dress, not quite a tee, a little Indian elegance made for thee.' },
    { gift:'JBL', answer:'earphones', riddle:'I bring your favorite voices close, yet no one else can hear. Your own little world of sound is waiting right here.' },
    { gift:'Passport Cover', answer:'passport cover', riddle:'I dress up the little book that takes you far away. Together, we collect new stamps with every getaway.' },
    { gift:'Stuff Toy 1', answer:'soft friend', riddle:'I have no words, yet I can keep you company. A soft little friend for a hug whenever you need me.' },
    { gift:'Stuff Toy 2', answer:'fluffy friend', riddle:'Another fluffy friend, with a place in your embrace. I may not be alive, but I can still brighten your space.' },
    { gift:'Harry Potter', answer:'harry potter', riddle:'A boy with a wand, a lightning-shaped scar, and a school of magic that feels never too far.' },
    { gift:'Website', answer:'website', riddle:'I live on a screen, made with love and care. Tap through our memories to find me waiting there.' },
    { gift:'Loofah', answer:'loofah', riddle:'I love a little water and a bubbly affair. I help make your shower routine a fresh, foamy affair.' },
    { gift:'Candle', answer:'candle', riddle:'Strike a little flame and watch the mood transform. I bring a gentle glow when evenings turn warm.' },
    { gift:'Chocolate', answer:'chocolate', riddle:'A little piece of happiness, wrapped up tight. One bite is enough to make a day feel right.' },
    { gift:'Ikigai', answer:'book', riddle:'I have no feet, but take you places. I introduce you to worlds and unfamiliar faces.' },
    { gift:'Collagen', answer:'collagen', riddle:'I’m part of a beauty routine, though I’m not makeup or cream. A little daily ritual for a healthy glow and gleam.' },
    { gift:'Phone Cover', answer:'phone cover', riddle:'Your most-used little screen deserves some style and care. I’m its everyday outfit, going everywhere.' },
    { gift:'Pillow', answer:'pillow', riddle:'I’m soft and I’m quiet, and I’m there when you rest. I hold up your head so your dreams are the best.' },,
    { gift:'Bag Charm', answer:'bag charm', riddle:'I hang around wherever your favorite bag goes. A little extra personality that everyone knows.' },
    { gift:'Bag Tags', answer:'bag tags', riddle:'When bags look alike and travel gets busy, I help you spot yours without getting dizzy.' },
    { gift:'Plant', answer:'plant', riddle:'Give me some light, a little water, and time. I’ll grow a little greener while making your space shine.' },
    { gift:'Fake Nails', answer:'nails', riddle:'I give your fingertips a little extra flair, without waiting for your own to grow there.' },
    { gift:'Scrunchie', answer:'scrunchie', riddle:'I gather what falls around your face, then sit on your wrist when I leave my place.' }
  ],

  littleThingsBackdrop: {
    image: 'assets/backdrops/little-things.jpg',
    fallback: 'assets/backdrops/letter.jpg',
    ratio: 1.7768,
    /* 8 envelopes on the table: x, y = top-left in %, r = tilt in degrees */
    envelopes: [
      {x:20,y:62,r:-4},{x:34,y:60,r:3},{x:48,y:62,r:-2},{x:62,y:60,r:4},
      {x:22,y:77,r:3},{x:36,y:79,r:-3},{x:50,y:77,r:2},{x:64,y:79,r:-4}
    ]
  },

  littleThings: [
    'How you try to act serious but end up smiling.',
    'How you get when you’re telling me a story you’re excited about.',
    'The little ways you show affection without making a big deal out of it.',
    'The things you do for others that you probably don’t give yourself enough credit for.',
    'The phrases you say so often that I can practically hear them in your voice.',
    'The little habits that would make me recognize you even without seeing your face.',
    'How I can sometimes tell what kind of day you’ve had just from the way you say hello.',
    'How familiar your face has become to me, and yet I still catch myself looking at you.'
  ],

  /* ---- the two companions that can stand in the corner of every full page ----
     Switched OFF for now: both idle pictures are empty. To bring them back, set
       him.idle = 'assets/characters/him-idle.png'   and   her.idle = 'assets/characters/her-idle.png'
     (and the say / hint pictures: him-smug, him-sheepish, him-glasses, her-smug, her-tuck, her-shy). */
  crew: {
    him: { idle:'', say:[], hint:'' },
    her: { idle:'', say:[], hint:'' }
  },

  /* ---- Spotify ---- */
  playlist: '4QSyHsRLHoqoq9LMt7FgeN',
  /* Next and Shuffle need the individual song links. Paste them below, one per line
     (they look like https://open.spotify.com/track/xxxxxxxx). Leave empty to use only Play/Pause. */
  tracksRaw: `
  `,

  /* ---- the pills on the Explore map ----
     x, y   = where the pill sits on the picture, in %
     tag    = the small label shown on that page
     left   = true makes the label open to the left (for pills near the right edge) */
  pills: [
    { id:'timeline', x:24, y:13, icon:'⏳', title:'Timeline',        desc:'Our story, milestone by milestone.',               tag:'Open from the start' },
    { id:'hundred',  x:41, y:19, icon:'💗', title:'52 Reasons',       desc:'Fifty-two reasons I love you.',             tag:'Unlocked' },
    { id:'letter',   x:10, y:81, icon:'💌', title:'Letter',          desc:'A letter, written just for you.',                  tag:'Unlocked' },
      { id:'movie',    x:62, y:90, icon:'🎬', title:'Movie',           desc:'A short film of us.',                              tag:'Unlocked' },
    { id:'archive',  x:83, y:88, icon:'💌', title:'Message Archive', desc:'Messages from the people who love you.', tag:'Opens after your first find' },
    { id:'future',   x:47, y:70, icon:'✨', title:'Future',          desc:'A dream board of what we want to do together.',    tag:'Unlocked' },
    { id:'next',     x:96, y:23, icon:'🧭', title:'Next Adventures', desc:'Our map and the trips still ahead.',       tag:'Unlocked', left:true },
    { id:'little-things', x:93, y:53, icon:'💗', title:'The Little Things', desc:'The little details I love about you.', tag:'Unlocked', left:true }
  ],

  /* ---- what opens each pill ----
     open  = always open        play = always open, just for fun
     find  = needs n hidden messages found in total ('all' = every hidden message)
     msg   = needs n hidden messages found
     visit = needs another page to have been opened first */
  rules: {
    timeline:{ k:'open' },
    hundred:{ k:'find', n:2 },
    archive:{ k:'msg', n:1 },
    movie:  { k:'find', n:3 },
    future: { k:'find', n:3 },
    next:   { k:'open' },
    'little-things': { k:'open' },
    letter: { k:'find', n:'all' }
  },

  /* ---- the hidden things on the home picture ----
     'g:' = a hidden message from someone. The key must match data-find in index.html.
     hint = [poetic hint (him), blunt hint (her)]. Hints follow this order. */
  finds: {
  // Home: these three keys match the existing flower and puppy hotspots in index.html.
  'g:flowerL': {
    title: 'A message 🌸',
    body: `A girl who taught me to share....who gave the much needed confidence that I M not alone...who made me realise that I have to grow up...show up for someone whose eyes followed me with lots of mischief and so much curiocity....who made me feel responsible for the 1st time....\n\nMy all time favorite human, 1st child, 1st sibling, my enemy, my headache, my safe space ....I just don\'t want you to grow up...stop being smzdar pleasee \n\nI hate you the most okay...happy birthday Genius🤪🤪`,
    hint: ['A little note is tucked among the flowers.', 'Look at the pink flower on the left vine.']
  },
  'g:flowerR': {
    title: 'A message 🌷',
    body: `You are one of the most beautiful things that has ever happened to me. I often feel that I must have done something really good in life to be blessed with a daughter like you. Having you as my daughter is one of the greatest fortunes of my life, and I will always be grateful for it. From the time you were a little girl until today, you have been someone I could always rely on, someone I could trust without a second thought. There is a certain peace in knowing that I have a daughter like you, someone who has always made me feel proud and blessed in ways I cannot put into words.\n\nAs you turn 27, I want you to know that no matter how much you grow, how far you go, or how much life changes, you will always be my little girl. The love I have for you will never change. If there is one thing I wish for you, it is that life gives you all the happiness you deserve. May you always be surrounded by love, may your dreams come true, and may you never lose the beautiful person you are. \n\nI may not always express my feelings, but you should know that having you as my daughter is one of the greatest gifts life has given me. \n\nHappy 27th birthday, You will always be my pride, my happiness, and one of the most precious blessings of my life.
`,
    hint: ['The right-hand vine has a secret.', 'Look at the pink flower near the top right.']
  },
  'g:puppy': {
    title: 'A message 🐶',
    body: `You are a beautiful blessing who has become such a precious part of our family. I may not always express it in words, but you hold a very special place in my heart. Your presence has brought so much warmth, happiness, and love into our home. I wish you all the happiness in the world, my dear. May your life always be filled with love, laughter, beautiful memories, and everything your heart wishes for.\n\nI hope you always feel loved, valued, and cherished, not just today but every single day.Seeing you happy is one of the most beautiful feelings. \n\nOn your special day, I pray that God blesses you with good health, endless happiness, success, and a life full of beautiful moments. \n\nHappy 27th birthday, my dear daughter! \n\nKeep smiling, keep shining, and always remember that you are loved more than words can express.`,
    hint: ['Someone small is keeping a secret.', 'Look at the puppy.']
  },

  // Timeline: upper middle and upper right.
  'g:timeline04': {
    title: 'A message 04',
    body: `You have always been such a good, sweet, and well-mannered girl. From your childhood till today, you have carried the same beautiful nature, always being kind, helpful, and respectful towards everyone around you. It makes me so happy to see the lovely person you have grown into. Your goodness, your simplicity, and the way you care for others are truly special. \n\nI feel so proud and happy for you, my dear. May you always remain the same beautiful soul that you are, and may life bring you endless happiness, love, success, and peace. May God always bless you, protect you, and fulfill all your dreams.\n\n Lots of love and blessings to you, Kinnari.\n\nKeep smiling and keep shining always. ❤️`,
    page: 'timeline', x: 72, y: 25,
    hint: ['A thought is waiting along the path of our story.', 'Look near the upper right of the Timeline picture, above the lanterns.']
  },
  'g:timeline05': {
    title: 'A message 05',
    body: `Aaj aapka janm din hai. Aapko janm din ki bahut bahut badhai ho. Bhagwan aapko lambi umar de aur aapki har manokamna poori kare, meri yahi prarthana hai.
Main Bhagwan se aabhari hoon ki unhone mujhe aapki maa banaya. Main Bhagwan ki shukriya karti hoon ki mujhe aap jaisi pyari beti mili.
Aap ek achhi behen, achhi beti aur achhi saheli ho. Main Bhagwan se prarthana karti hoon ki aap aur bhi achhi bano aur aage bhi achhi banti raho.
Aap safalta ki har seedhi chadhti jao, meri yahi dua hai.
Bhagwan se prarthana karti hoon ki aap hamesha khush raho aur sabko khushi deti raho.
Aur ek maa ko aur kya chahiye? Mujhe tumhare jaisa samajhdaar aur achha bachcha mila, main bahut dhanya ho gayi.
Tum bachpan se bahut achhi ladki ho. Tumhe dost bhi achhe mile hain aur zindagi mein tum hamesha khush raho.
Tumhare liye bas yahi kehna hai ki tum bahut achhi beti ho aur ghar ke sabhi log bhi tumse bahut pyaar karte hain.
Tum hamesha khush raho, muskurati raho aur zindagi mein aage badhti raho.
Yahi prarthana hai ki Bhagwan tumhe zindagi ki har khushi de aur tum hamesha sabka pyaar paati raho.
Zindagi mein tum bhi hamesha sabka sahara bano aur sabka pyaar paati raho.
Yahi prarthana main Bhagwan se karti hoon.

Dher saara pyaar aur aashirwad hamesha tumhare saath.`,
    page: 'timeline', x: 16, y: 76,
    hint: ['There is something to notice at the quiet edge of our story.', 'Look near the lower left of the Timeline picture.']
  },

  // Next Adventures: upper left and lower right.
  'g:next06': {
    title: 'A message 06',
    body: `From all those childhood fights over the smallest things to now talking about literally everything, we’ve come such a long way. I guess growing up has changed a lot of things, and one of the best things is how close we’ve become.

We weren’t always this close, but now I love how we can talk like friends, share things, laugh over the most stupid stuff, and just be ourselves around each other. Sometimes I think about how we used to be as kids and how different things are now, and it makes me so happy.

No matter how much we fought back then, I’m so glad that today I have you not just as my sister, but also as a friend. And honestly, I wouldn’t trade all those childhood memories, fights, silly moments, and everything in between for anything.

I hope 27 brings you all the happiness, love, and beautiful things you deserve. I’ll always be cheering for you, annoying you, and loving you in my own little way.

Love you always, Happy birthday! 🥹❤️`,
    page: 'next', x: 30, y: 45,
    hint: ['A childhood story is tucked into our next adventures.', 'Look in the middle left of Next Adventures, by the flowers.']
  },
  'g:next07': {
    title: 'A message 07',
    body: `I'm so grateful to have you in my life. I hope you know that you're so much more than a friend to me, you're family.

I'm so happy that we get to go through this phase of life together with all the wedding talk and planning. Sharing what we're feeling at this time and trying to figure it all out together means so much to me. There's just something so comforting knowing that you're there with me through all of it. We know this is just the beginning and there are so many more video calls to come, so excited for all of them.

I hope we get to share many more such moments in the future. I hope we get to talk about every big and small thing happening in our lives, watch each other grow, and figure out life together. Even if life ultimately takes us in different directions, I hope we can always be there for each other through all the stages of life and all the situations we find ourselves in.

I wish you all the happiness in the world. No matter how much life changes, wherever we end up, you’ll always be close to my heart.`,
    page: 'next', x: 62, y: 58,
    hint: ['There may be more tucked away near the edge of our plans.', 'Look in the middle of Next Adventures, over the sea.']
  },

  // 52 Reasons: lower right.
  'g:reasons08': {
    title: 'A message 08',
    body: `WRITE MESSAGE 08 HERE`,
    page: 'hundred', x: 10, y: 85,
    hint: ['One of the reasons has a little secret nearby.', 'Look near the lower left of 52 Reasons.']
  },

  // Future: lower left and lower right.
  'g:future09': {
    title: 'A message 09',
    body: `WRITE MESSAGE 09 HERE`,
    page: 'future', x: 22, y: 92,
    hint: ['A dream is hiding something small.', 'Look near the bottom of the Future board, left of centre.']
  },
  'g:future10': {
    title: 'A message 10',
    body: `WRITE MESSAGE 10 HERE`,
    page: 'future', x: 88, y: 32,
    hint: ['There is another detail near the edge of the dream board.', 'Look near the right side of the Future board, near the photos.']
  },

  // Movie: lower left and lower right.
  'g:movie11': {
    title: 'A message 11',
    body: `WRITE MESSAGE 11 HERE`,
    page: 'movie', x: 8, y: 70,
    hint: ['Look beyond the screen for a moment.', 'Check near the left side of Movie, below the screen.']
  },
  'g:movie12': {
    title: 'A message 12',
    body: `WRITE MESSAGE 12 HERE`,
    page: 'movie', x: 92, y: 75,
    hint: ['There is one more detail around the cinema.', 'Check near the right edge of Movie, in the flowers.']
  }
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
