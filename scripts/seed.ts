import { getPayload, type Payload } from 'payload'

const seed = async (payload: Payload) => {
  console.log('Seeding database...')

  // Clean existing data
  const collections = [
    'services',
    'service-categories',
    'posts',
    'post-categories',
    'pages',
    'testimonials',
  ] as const

  for (const collection of collections) {
    const existing = await payload.find({ collection, limit: 100 })
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id })
    }
  }

  // --- Admin user ---
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@morinorman.com' } },
  })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@morinorman.com',
        password: 'password123',
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('Created admin user')
  }

  // --- Service Categories ---
  const categoryData = [
    {
      slug: 'tarot',
      icon: 'cards',
      order: 1,
      title: { ru: 'Таро', en: 'Tarot', uk: 'Таро' },
      shortDescription: {
        ru: 'Расклады на картах Таро для понимания ситуации, поиска ответов и принятия решений.',
        en: 'Tarot card readings for understanding situations, finding answers and making decisions.',
        uk: 'Розклади на картах Таро для розуміння ситуації, пошуку відповідей та прийняття рішень.',
      },
    },
    {
      slug: 'rituals',
      icon: 'candle',
      order: 2,
      title: { ru: 'Ритуалистика', en: 'Rituals', uk: 'Ритуалістика' },
      shortDescription: {
        ru: 'Ритуалы и обряды для привлечения желаемого, очищения и защиты энергетического поля.',
        en: 'Rituals and ceremonies for attracting desires, cleansing and protecting the energy field.',
        uk: 'Ритуали та обряди для залучення бажаного, очищення та захисту енергетичного поля.',
      },
    },
    {
      slug: 'support',
      icon: 'compass',
      order: 3,
      title: { ru: 'Сопровождение', en: 'Support', uk: 'Супровід' },
      shortDescription: {
        ru: 'Персональное сопровождение на пути духовного развития и трансформации.',
        en: 'Personal guidance on the path of spiritual development and transformation.',
        uk: 'Персональний супровід на шляху духовного розвитку та трансформації.',
      },
    },
    {
      slug: 'education',
      icon: 'book',
      order: 4,
      title: { ru: 'Обучение', en: 'Education', uk: 'Навчання' },
      shortDescription: {
        ru: 'Курсы и мастер-классы по Таро, эзотерике и духовным практикам.',
        en: 'Courses and workshops on Tarot, esoterics and spiritual practices.',
        uk: 'Курси та майстер-класи з Таро, езотерики та духовних практик.',
      },
    },
    {
      slug: 'regress',
      icon: 'spiral',
      order: 5,
      title: { ru: 'Регресс', en: 'Regression', uk: 'Регрес' },
      shortDescription: {
        ru: 'Регрессивная терапия для исследования прошлых жизней и глубинных причин проблем.',
        en: 'Regression therapy for exploring past lives and deep-rooted causes of issues.',
        uk: 'Регресивна терапія для дослідження минулих життів та глибинних причин проблем.',
      },
    },
  ]

  const categoryIds: Record<string, number> = {}

  for (const cat of categoryData) {
    const created = await payload.create({
      collection: 'service-categories',
      data: {
        title: cat.title.ru,
        slug: cat.slug,
        shortDescription: cat.shortDescription.ru,
        icon: cat.icon,
        order: cat.order,
      },
      locale: 'ru',
    })

    // Set EN and UK translations
    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'service-categories',
        id: created.id,
        data: {
          title: cat.title[locale],
          shortDescription: cat.shortDescription[locale],
        },
        locale,
      })
    }

    categoryIds[cat.slug] = created.id as number
    console.log(`Created category: ${cat.title.ru}`)
  }

  // --- Services ---
  const servicesData = [
    // Tarot
    {
      slug: 'tarot-classic',
      category: 'tarot',
      price: 'от 2000 грн',
      duration: '60 мин',
      format: 'both' as const,
      order: 1,
      title: { ru: 'Классический расклад Таро', en: 'Classic Tarot Reading', uk: 'Класичний розклад Таро' },
      shortDescription: {
        ru: 'Полный расклад на текущую ситуацию с подробным анализом всех позиций.',
        en: 'Full reading on the current situation with detailed analysis of all positions.',
        uk: 'Повний розклад на поточну ситуацію з детальним аналізом усіх позицій.',
      },
    },
    {
      slug: 'tarot-relationship',
      category: 'tarot',
      price: 'от 2500 грн',
      duration: '90 мин',
      format: 'online' as const,
      order: 2,
      title: { ru: 'Расклад на отношения', en: 'Relationship Reading', uk: 'Розклад на стосунки' },
      shortDescription: {
        ru: 'Глубокий анализ отношений между партнёрами, перспективы и рекомендации.',
        en: 'Deep analysis of partner relationships, perspectives and recommendations.',
        uk: 'Глибокий аналіз стосунків між партнерами, перспективи та рекомендації.',
      },
    },
    // Rituals
    {
      slug: 'ritual-cleansing',
      category: 'rituals',
      price: 'от 3000 грн',
      duration: '120 мин',
      format: 'offline' as const,
      order: 1,
      title: { ru: 'Ритуал очищения', en: 'Cleansing Ritual', uk: 'Ритуал очищення' },
      shortDescription: {
        ru: 'Глубокое энергетическое очищение от негативных воздействий и привязок.',
        en: 'Deep energy cleansing from negative influences and attachments.',
        uk: 'Глибоке енергетичне очищення від негативних впливів та прив\'язок.',
      },
    },
    {
      slug: 'ritual-attraction',
      category: 'rituals',
      price: 'от 3500 грн',
      duration: '90 мин',
      format: 'both' as const,
      order: 2,
      title: { ru: 'Ритуал привлечения', en: 'Attraction Ritual', uk: 'Ритуал залучення' },
      shortDescription: {
        ru: 'Ритуал для привлечения любви, денег, удачи или нужных событий в жизнь.',
        en: 'Ritual for attracting love, money, luck or desired events into life.',
        uk: 'Ритуал для залучення кохання, грошей, удачі або потрібних подій у життя.',
      },
    },
    // Support
    {
      slug: 'monthly-support',
      category: 'support',
      price: 'от 8000 грн/мес',
      duration: '4 сессии',
      format: 'online' as const,
      order: 1,
      title: { ru: 'Месячное сопровождение', en: 'Monthly Support', uk: 'Місячний супровід' },
      shortDescription: {
        ru: 'Персональное сопровождение с еженедельными сессиями и поддержкой между ними.',
        en: 'Personal guidance with weekly sessions and support in between.',
        uk: 'Персональний супровід з щотижневими сесіями та підтримкою між ними.',
      },
    },
    {
      slug: 'crisis-session',
      category: 'support',
      price: 'от 2500 грн',
      duration: '90 мин',
      format: 'both' as const,
      order: 2,
      title: { ru: 'Кризисная сессия', en: 'Crisis Session', uk: 'Кризова сесія' },
      shortDescription: {
        ru: 'Экстренная помощь в сложных жизненных ситуациях и эмоциональных кризисах.',
        en: 'Emergency help in difficult life situations and emotional crises.',
        uk: 'Екстрена допомога у складних життєвих ситуаціях та емоційних кризах.',
      },
    },
    // Education
    {
      slug: 'tarot-course-basic',
      category: 'education',
      price: 'от 5000 грн',
      duration: '8 занятий',
      format: 'online' as const,
      order: 1,
      title: { ru: 'Курс Таро: Начало', en: 'Tarot Course: Basics', uk: 'Курс Таро: Початок' },
      shortDescription: {
        ru: 'Базовый курс по работе с картами Таро для начинающих. От теории к практике.',
        en: 'Basic Tarot card course for beginners. From theory to practice.',
        uk: 'Базовий курс з роботи з картами Таро для початківців. Від теорії до практики.',
      },
    },
    {
      slug: 'masterclass-ritual',
      category: 'education',
      price: 'от 1500 грн',
      duration: '3 часа',
      format: 'both' as const,
      order: 2,
      title: { ru: 'Мастер-класс по ритуалам', en: 'Rituals Workshop', uk: 'Майстер-клас з ритуалів' },
      shortDescription: {
        ru: 'Практический мастер-класс по проведению домашних ритуалов и обрядов.',
        en: 'Practical workshop on conducting home rituals and ceremonies.',
        uk: 'Практичний майстер-клас з проведення домашніх ритуалів та обрядів.',
      },
    },
    // Regress
    {
      slug: 'regression-session',
      category: 'regress',
      price: 'от 4000 грн',
      duration: '2-3 часа',
      format: 'offline' as const,
      order: 1,
      title: { ru: 'Сеанс регрессии', en: 'Regression Session', uk: 'Сеанс регресії' },
      shortDescription: {
        ru: 'Путешествие в прошлые жизни для поиска корневых причин текущих проблем.',
        en: 'Journey into past lives to find root causes of current problems.',
        uk: 'Подорож у минулі життя для пошуку кореневих причин поточних проблем.',
      },
    },
    {
      slug: 'regression-deep',
      category: 'regress',
      price: 'от 6000 грн',
      duration: '3-4 часа',
      format: 'offline' as const,
      order: 2,
      title: { ru: 'Глубинная регрессия', en: 'Deep Regression', uk: 'Глибинна регресія' },
      shortDescription: {
        ru: 'Расширенный сеанс с глубоким погружением в несколько прошлых жизней.',
        en: 'Extended session with deep immersion into multiple past lives.',
        uk: 'Розширений сеанс з глибоким зануренням у декілька минулих життів.',
      },
    },
  ]

  for (const svc of servicesData) {
    const created = await payload.create({
      collection: 'services',
      data: {
        title: svc.title.ru,
        slug: svc.slug,
        shortDescription: svc.shortDescription.ru,
        category: categoryIds[svc.category],
        price: svc.price,
        duration: svc.duration,
        format: svc.format,
        isActive: true,
        order: svc.order,
      },
      locale: 'ru',
    })

    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'services',
        id: created.id,
        data: {
          title: svc.title[locale],
          shortDescription: svc.shortDescription[locale],
        },
        locale,
      })
    }

    console.log(`Created service: ${svc.title.ru}`)
  }

  // --- Post Categories (aligned with service categories) ---
  const postCatData = [
    { slug: 'tarot', order: 1, title: { ru: 'Таро', en: 'Tarot', uk: 'Таро' } },
    { slug: 'rituals', order: 2, title: { ru: 'Ритуалы', en: 'Rituals', uk: 'Ритуали' } },
    { slug: 'support', order: 3, title: { ru: 'Сопровождение', en: 'Support', uk: 'Супровід' } },
    { slug: 'education', order: 4, title: { ru: 'Обучение', en: 'Education', uk: 'Навчання' } },
    { slug: 'regress', order: 5, title: { ru: 'Регресс', en: 'Regression', uk: 'Регрес' } },
  ]

  const postCatIds: Record<string, number> = {}

  for (const pc of postCatData) {
    const created = await payload.create({
      collection: 'post-categories',
      data: {
        title: pc.title.ru,
        slug: pc.slug,
        order: pc.order,
      },
      locale: 'ru',
    })

    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'post-categories',
        id: created.id,
        data: { title: pc.title[locale] },
        locale,
      })
    }

    postCatIds[pc.slug] = created.id as number
    console.log(`Created post category: ${pc.title.ru}`)
  }

  // --- Helper: build Lexical rich text ---
  function lexical(blocks: Array<{ type: 'heading' | 'paragraph' | 'quote'; text: string; tag?: string }>) {
    return {
      root: {
        type: 'root',
        children: blocks.map((b) => {
          const textNode = { type: 'text', text: b.text, version: 1 }
          if (b.type === 'heading') {
            return { type: 'heading', tag: b.tag || 'h2', children: [textNode], direction: 'ltr', format: '', indent: 0, version: 1 }
          }
          if (b.type === 'quote') {
            return { type: 'quote', children: [textNode], direction: 'ltr', format: '', indent: 0, version: 1 }
          }
          return { type: 'paragraph', children: [textNode], direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0, textStyle: '' }
        }),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    }
  }

  // --- Posts ---
  const postsData = [
    {
      slug: 'tarot-beginners-guide',
      category: 'tarot',
      readingTime: 5,
      publishedAt: '2026-02-20T10:00:00.000Z',
      title: {
        ru: 'Таро для начинающих: с чего начать',
        en: 'Tarot for Beginners: Where to Start',
        uk: 'Таро для початківців: з чого почати',
      },
      excerpt: {
        ru: 'Разбираемся в основах Таро: выбор колоды, первые расклады и частые ошибки новичков.',
        en: 'Understanding Tarot basics: choosing a deck, first readings and common beginner mistakes.',
        uk: 'Розбираємось в основах Таро: вибір колоди, перші розклади та часті помилки новачків.',
      },
      content: {
        ru: lexical([
          { type: 'heading', text: 'Что такое Таро?' },
          { type: 'paragraph', text: 'Таро — это система из 78 карт, каждая из которых несёт определённый символический смысл. 22 карты Старших Арканов описывают глобальные жизненные архетипы и этапы духовного пути. 56 карт Младших Арканов отражают повседневные события и ситуации.' },
          { type: 'heading', text: 'Как выбрать свою первую колоду' },
          { type: 'paragraph', text: 'Для начала я рекомендую классическую колоду Райдера-Уэйта — она наиболее изучена, по ней написано больше всего литературы, и её символизм интуитивно понятен. Возьмите колоду в руки, перетасуйте — вы должны чувствовать отклик.' },
          { type: 'paragraph', text: 'Не спешите покупать авторские колоды с нестандартной символикой. Сначала освойте классику — это ваш фундамент.' },
          { type: 'heading', text: 'Первые шаги в практике' },
          { type: 'paragraph', text: 'Начните с простого расклада «Карта дня». Каждое утро вытягивайте одну карту и записывайте свои ассоциации. Вечером сверьтесь с событиями дня. За месяц вы запомните значения основных карт и начнёте чувствовать их энергию.' },
          { type: 'quote', text: 'Карты не предсказывают будущее — они показывают энергии, которые действуют в вашей жизни прямо сейчас.' },
          { type: 'heading', text: 'Частые ошибки новичков' },
          { type: 'paragraph', text: 'Самая главная ошибка — пытаться запомнить все значения наизусть. Таро — это язык символов, и его нужно чувствовать, а не зубрить. Вторая ошибка — делать расклады на один и тот же вопрос снова и снова, надеясь получить «правильный» ответ.' },
          { type: 'paragraph', text: 'Доверяйте первому впечатлению и не бойтесь ошибаться — каждый расклад делает вас опытнее.' },
        ]),
        en: lexical([
          { type: 'heading', text: 'What is Tarot?' },
          { type: 'paragraph', text: 'Tarot is a system of 78 cards, each carrying a specific symbolic meaning. The 22 Major Arcana cards describe global life archetypes and stages of the spiritual path. The 56 Minor Arcana cards reflect everyday events and situations.' },
          { type: 'heading', text: 'How to Choose Your First Deck' },
          { type: 'paragraph', text: 'For beginners, I recommend the classic Rider-Waite deck — it is the most studied, has the most literature written about it, and its symbolism is intuitively clear. Hold the deck in your hands, shuffle it — you should feel a connection.' },
          { type: 'paragraph', text: 'Don\'t rush to buy author decks with non-standard symbolism. Master the classics first — this is your foundation.' },
          { type: 'heading', text: 'First Steps in Practice' },
          { type: 'paragraph', text: 'Start with a simple "Card of the Day" spread. Every morning, draw one card and write down your associations. In the evening, compare with the day\'s events. Within a month, you\'ll remember the meanings of the main cards and begin to feel their energy.' },
          { type: 'quote', text: 'Cards don\'t predict the future — they show the energies acting in your life right now.' },
          { type: 'heading', text: 'Common Beginner Mistakes' },
          { type: 'paragraph', text: 'The biggest mistake is trying to memorize all meanings by heart. Tarot is a language of symbols, and it needs to be felt, not crammed. The second mistake is doing readings on the same question again and again, hoping to get the "right" answer.' },
          { type: 'paragraph', text: 'Trust your first impression and don\'t be afraid to make mistakes — every reading makes you more experienced.' },
        ]),
        uk: lexical([
          { type: 'heading', text: 'Що таке Таро?' },
          { type: 'paragraph', text: 'Таро — це система з 78 карт, кожна з яких несе певний символічний зміст. 22 карти Старших Арканів описують глобальні життєві архетипи та етапи духовного шляху. 56 карт Молодших Арканів відображають повсякденні події та ситуації.' },
          { type: 'heading', text: 'Як обрати свою першу колоду' },
          { type: 'paragraph', text: 'Для початку я рекомендую класичну колоду Райдера-Вейта — вона найбільш вивчена, по ній написано найбільше літератури, і її символізм інтуїтивно зрозумілий. Візьміть колоду в руки, перетасуйте — ви маєте відчути відгук.' },
          { type: 'paragraph', text: 'Не поспішайте купувати авторські колоди з нестандартною символікою. Спочатку освойте класику — це ваш фундамент.' },
          { type: 'heading', text: 'Перші кроки в практиці' },
          { type: 'paragraph', text: 'Почніть з простого розкладу «Карта дня». Щоранку витягуйте одну карту та записуйте свої асоціації. Увечері звірте з подіями дня. За місяць ви запам\'ятаєте значення основних карт і почнете відчувати їхню енергію.' },
          { type: 'quote', text: 'Карти не передбачають майбутнє — вони показують енергії, які діють у вашому житті прямо зараз.' },
          { type: 'heading', text: 'Часті помилки новачків' },
          { type: 'paragraph', text: 'Найголовніша помилка — намагатися запам\'ятати всі значення напам\'ять. Таро — це мова символів, і її потрібно відчувати, а не зубрити. Друга помилка — робити розклади на одне й те саме питання знову і знову, сподіваючись отримати «правильну» відповідь.' },
          { type: 'paragraph', text: 'Довіряйте першому враженню і не бійтеся помилятися — кожен розклад робить вас досвідченішим.' },
        ]),
      },
    },
    {
      slug: 'home-rituals-basics',
      category: 'rituals',
      readingTime: 7,
      publishedAt: '2026-02-25T10:00:00.000Z',
      title: {
        ru: 'Домашние ритуалы: безопасность и основы',
        en: 'Home Rituals: Safety and Basics',
        uk: 'Домашні ритуали: безпека та основи',
      },
      excerpt: {
        ru: 'Как правильно проводить ритуалы дома, какие меры предосторожности соблюдать.',
        en: 'How to properly conduct rituals at home, what precautions to follow.',
        uk: 'Як правильно проводити ритуали вдома, які запобіжні заходи дотримувати.',
      },
      content: {
        ru: lexical([
          { type: 'heading', text: 'Зачем нужны ритуалы?' },
          { type: 'paragraph', text: 'Ритуал — это осознанное действие, направленное на работу с энергией. Это не магия из фильмов, а инструмент концентрации намерения. Когда вы зажигаете свечу с определённой целью, вы фокусируете свою волю и энергию на конкретном результате.' },
          { type: 'heading', text: 'Подготовка пространства' },
          { type: 'paragraph', text: 'Прежде чем проводить любой ритуал, нужно подготовить пространство. Уберите комнату, проветрите её. Зажгите ароматическую палочку или благовоние — сандал, ладан или шалфей прекрасно очищают пространство. Отключите телефон и уберите всё, что может отвлекать.' },
          { type: 'heading', text: 'Базовые инструменты' },
          { type: 'paragraph', text: 'Для начала вам понадобятся: свечи (белая — универсальная), соль (морская или каменная), вода (лучше родниковая или отстоянная), благовония. Каждый элемент символизирует одну из стихий и помогает создать правильный энергетический баланс.' },
          { type: 'quote', text: 'Главный инструмент любого ритуала — ваше намерение. Без чёткого намерения самые дорогие свечи останутся просто воском.' },
          { type: 'heading', text: 'Правила безопасности' },
          { type: 'paragraph', text: 'Никогда не проводите ритуалы в плохом настроении, в состоянии гнева или обиды. Ваши эмоции усиливаются во время ритуала. Не проводите ритуалы, направленные на других людей без их согласия. Не пытайтесь повторять сложные обряды, которые видели в интернете — начинайте с простого.' },
          { type: 'heading', text: 'Простой ритуал очищения' },
          { type: 'paragraph', text: 'Зажгите белую свечу. Насыпьте вокруг неё круг из соли. Сядьте напротив и представьте, как пламя свечи сжигает весь негатив, накопившийся за день. Посидите так 10–15 минут, наблюдая за пламенем. Затем поблагодарите огонь и потушите свечу. Соль соберите и смойте водой.' },
          { type: 'paragraph', text: 'Этот простой ритуал можно проводить ежедневно. Он помогает снять напряжение и очистить энергетическое поле.' },
        ]),
        en: lexical([
          { type: 'heading', text: 'Why Do We Need Rituals?' },
          { type: 'paragraph', text: 'A ritual is a conscious action aimed at working with energy. It\'s not movie magic, but a tool for concentrating intention. When you light a candle with a specific purpose, you focus your will and energy on a concrete result.' },
          { type: 'heading', text: 'Preparing the Space' },
          { type: 'paragraph', text: 'Before conducting any ritual, you need to prepare the space. Clean the room, ventilate it. Light an incense stick — sandalwood, frankincense, or sage perfectly cleanse the space. Turn off your phone and remove anything that might distract you.' },
          { type: 'heading', text: 'Basic Tools' },
          { type: 'paragraph', text: 'To start, you\'ll need: candles (white is universal), salt (sea or rock), water (spring water is best), incense. Each element symbolizes one of the elements and helps create the right energy balance.' },
          { type: 'quote', text: 'The main tool of any ritual is your intention. Without a clear intention, even the most expensive candles remain just wax.' },
          { type: 'heading', text: 'Safety Rules' },
          { type: 'paragraph', text: 'Never perform rituals in a bad mood, in a state of anger or resentment. Your emotions are amplified during ritual. Don\'t perform rituals directed at other people without their consent. Don\'t try to repeat complex ceremonies you\'ve seen online — start simple.' },
          { type: 'heading', text: 'A Simple Cleansing Ritual' },
          { type: 'paragraph', text: 'Light a white candle. Pour a circle of salt around it. Sit opposite and imagine the candle flame burning away all the negativity accumulated during the day. Sit like this for 10-15 minutes, watching the flame. Then thank the fire and extinguish the candle. Collect the salt and wash it away with water.' },
          { type: 'paragraph', text: 'This simple ritual can be performed daily. It helps relieve tension and cleanse your energy field.' },
        ]),
        uk: lexical([
          { type: 'heading', text: 'Навіщо потрібні ритуали?' },
          { type: 'paragraph', text: 'Ритуал — це усвідомлена дія, спрямована на роботу з енергією. Це не магія з фільмів, а інструмент концентрації наміру. Коли ви запалюєте свічку з певною метою, ви фокусуєте свою волю та енергію на конкретному результаті.' },
          { type: 'heading', text: 'Підготовка простору' },
          { type: 'paragraph', text: 'Перш ніж проводити будь-який ритуал, потрібно підготувати простір. Приберіть кімнату, провітріть її. Запаліть ароматичну паличку — сандал, ладан або шавлія чудово очищують простір. Вимкніть телефон і приберіть усе, що може відволікати.' },
          { type: 'heading', text: 'Базові інструменти' },
          { type: 'paragraph', text: 'Для початку вам знадобляться: свічки (біла — універсальна), сіль (морська або кам\'яна), вода (краще джерельна), пахощі. Кожен елемент символізує одну зі стихій і допомагає створити правильний енергетичний баланс.' },
          { type: 'quote', text: 'Головний інструмент будь-якого ритуалу — ваш намір. Без чіткого наміру навіть найдорожчі свічки залишаться просто воском.' },
          { type: 'heading', text: 'Правила безпеки' },
          { type: 'paragraph', text: 'Ніколи не проводьте ритуали в поганому настрої, у стані гніву чи образи. Ваші емоції посилюються під час ритуалу. Не проводьте ритуали, спрямовані на інших людей без їхньої згоди. Не намагайтеся повторювати складні обряди, які бачили в інтернеті — починайте з простого.' },
          { type: 'heading', text: 'Простий ритуал очищення' },
          { type: 'paragraph', text: 'Запаліть білу свічку. Насипте навколо неї коло із солі. Сядьте навпроти й уявіть, як полум\'я свічки спалює весь негатив, накопичений за день. Посидьте так 10–15 хвилин, спостерігаючи за полум\'ям. Потім подякуйте вогню та загасіть свічку. Сіль зберіть та змийте водою.' },
          { type: 'paragraph', text: 'Цей простий ритуал можна проводити щодня. Він допомагає зняти напругу та очистити енергетичне поле.' },
        ]),
      },
    },
    {
      slug: 'past-lives-regression',
      category: 'regress',
      readingTime: 6,
      publishedAt: '2026-03-03T10:00:00.000Z',
      title: {
        ru: 'Прошлые жизни: что открывает регрессия',
        en: 'Past Lives: What Regression Reveals',
        uk: 'Минулі життя: що відкриває регресія',
      },
      excerpt: {
        ru: 'Что такое регрессивная терапия, как она работает и чего ожидать от первого сеанса.',
        en: 'What regression therapy is, how it works, and what to expect from your first session.',
        uk: 'Що таке регресивна терапія, як вона працює та чого очікувати від першого сеансу.',
      },
      content: {
        ru: lexical([
          { type: 'heading', text: 'Что такое регрессивная терапия?' },
          { type: 'paragraph', text: 'Регрессивная терапия — это метод, при котором человек погружается в изменённое состояние сознания и получает доступ к воспоминаниям прошлых жизней. Это не гипноз в классическом понимании — вы остаётесь в сознании, слышите мой голос и можете прервать сеанс в любой момент.' },
          { type: 'paragraph', text: 'Цель регрессии — не просто «посмотреть прошлые жизни» из любопытства, а найти корневые причины проблем, которые повторяются в этой жизни: страхи, блоки, повторяющиеся сценарии в отношениях.' },
          { type: 'heading', text: 'Как проходит сеанс' },
          { type: 'paragraph', text: 'Сеанс длится 2–3 часа. Первые 30 минут — это беседа: мы обсуждаем ваш запрос, что вы хотите найти или понять. Затем я провожу расслабление и мягко направляю вас в те воспоминания, которые важны для вашего запроса.' },
          { type: 'paragraph', text: 'Большинство людей видят образы, как во сне, и при этом чётко осознают, что находятся в кабинете. Некоторые чувствуют эмоции или телесные ощущения. Каждый опыт уникален.' },
          { type: 'quote', text: 'Регрессия — это не путешествие во времени. Это путешествие внутрь себя, в глубины подсознания, где хранятся ответы на вопросы, которые мы не можем решить на поверхности.' },
          { type: 'heading', text: 'Чего ожидать от первого сеанса' },
          { type: 'paragraph', text: 'Не ожидайте голливудского кино с яркими деталями. Первый сеанс — это знакомство с методом. Вы можете увидеть фрагменты, почувствовать эмоции, получить символические образы. Всё это — ценная информация.' },
          { type: 'paragraph', text: 'После сеанса может наступить период интеграции: вы будете осмысливать полученный опыт. Могут приходить инсайты через сны или в моменты тишины. Я рекомендую вести дневник в первую неделю после регрессии.' },
          { type: 'heading', text: 'Кому подходит регрессия' },
          { type: 'paragraph', text: 'Регрессия подходит всем, кто готов к самопознанию. Она особенно эффективна при необъяснимых страхах и фобиях, повторяющихся сценариях в отношениях, ощущении «жизни не своей жизнью», хронических проблемах, не поддающихся обычной терапии.' },
        ]),
        en: lexical([
          { type: 'heading', text: 'What is Regression Therapy?' },
          { type: 'paragraph', text: 'Regression therapy is a method where a person enters an altered state of consciousness and gains access to past life memories. It\'s not hypnosis in the classical sense — you remain conscious, hear my voice, and can stop the session at any moment.' },
          { type: 'paragraph', text: 'The goal of regression is not simply to "view past lives" out of curiosity, but to find root causes of problems that repeat in this life: fears, blocks, recurring relationship patterns.' },
          { type: 'heading', text: 'How a Session Works' },
          { type: 'paragraph', text: 'A session lasts 2-3 hours. The first 30 minutes are a conversation: we discuss your request, what you want to find or understand. Then I guide you through relaxation and gently direct you to the memories important for your query.' },
          { type: 'paragraph', text: 'Most people see images like in a dream while clearly knowing they\'re in the office. Some feel emotions or bodily sensations. Each experience is unique.' },
          { type: 'quote', text: 'Regression is not time travel. It\'s a journey inward, into the depths of the subconscious, where answers to questions we can\'t solve on the surface are stored.' },
          { type: 'heading', text: 'What to Expect from Your First Session' },
          { type: 'paragraph', text: 'Don\'t expect a Hollywood movie with vivid details. The first session is an introduction to the method. You might see fragments, feel emotions, receive symbolic images. All of this is valuable information.' },
          { type: 'paragraph', text: 'After the session, an integration period may follow: you\'ll be processing the experience. Insights may come through dreams or in moments of silence. I recommend keeping a journal for the first week after regression.' },
          { type: 'heading', text: 'Who is Regression For?' },
          { type: 'paragraph', text: 'Regression is suitable for anyone ready for self-discovery. It\'s especially effective for unexplained fears and phobias, recurring relationship patterns, feeling like you\'re "living someone else\'s life," and chronic issues that don\'t respond to conventional therapy.' },
        ]),
        uk: lexical([
          { type: 'heading', text: 'Що таке регресивна терапія?' },
          { type: 'paragraph', text: 'Регресивна терапія — це метод, при якому людина занурюється у змінений стан свідомості та отримує доступ до спогадів минулих життів. Це не гіпноз у класичному розумінні — ви залишаєтесь при свідомості, чуєте мій голос і можете перервати сеанс у будь-який момент.' },
          { type: 'paragraph', text: 'Мета регресії — не просто «подивитися минулі життя» з цікавості, а знайти кореневі причини проблем, які повторюються в цьому житті: страхи, блоки, повторювані сценарії у стосунках.' },
          { type: 'heading', text: 'Як проходить сеанс' },
          { type: 'paragraph', text: 'Сеанс триває 2–3 години. Перші 30 хвилин — це бесіда: ми обговорюємо ваш запит, що ви хочете знайти чи зрозуміти. Потім я проводжу розслаблення і м\'яко направляю вас до тих спогадів, які важливі для вашого запиту.' },
          { type: 'paragraph', text: 'Більшість людей бачать образи, як уві сні, і при цьому чітко усвідомлюють, що перебувають у кабінеті. Дехто відчуває емоції або тілесні відчуття. Кожен досвід унікальний.' },
          { type: 'quote', text: 'Регресія — це не подорож у часі. Це подорож усередину себе, в глибини підсвідомості, де зберігаються відповіді на питання, які ми не можемо вирішити на поверхні.' },
          { type: 'heading', text: 'Чого очікувати від першого сеансу' },
          { type: 'paragraph', text: 'Не очікуйте голлівудського кіно з яскравими деталями. Перший сеанс — це знайомство з методом. Ви можете побачити фрагменти, відчути емоції, отримати символічні образи. Все це — цінна інформація.' },
          { type: 'paragraph', text: 'Після сеансу може настати період інтеграції: ви будете осмислювати отриманий досвід. Можуть приходити інсайти через сни або в моменти тиші. Я рекомендую вести щоденник перший тиждень після регресії.' },
          { type: 'heading', text: 'Кому підходить регресія' },
          { type: 'paragraph', text: 'Регресія підходить усім, хто готовий до самопізнання. Вона особливо ефективна при нез\'ясовних страхах та фобіях, повторюваних сценаріях у стосунках, відчутті «життя не своїм життям», хронічних проблемах, що не піддаються звичайній терапії.' },
        ]),
      },
    },
  ]

  for (let i = 0; i < postsData.length; i++) {
    const post = postsData[i]
    const created = await payload.create({
      collection: 'posts',
      data: {
        title: post.title.ru,
        slug: post.slug,
        excerpt: post.excerpt.ru,
        content: post.content.ru,
        category: postCatIds[post.category],
        status: 'published',
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
      },
      locale: 'ru',
    })

    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'posts',
        id: created.id,
        data: {
          title: post.title[locale],
          excerpt: post.excerpt[locale],
          content: post.content[locale],
        },
        locale,
      })
    }

    console.log(`Created post: ${post.title.ru}`)
  }

  // --- Testimonials ---
  const testimonialsData = [
    {
      clientName: 'Анна К.',
      category: 'tarot',
      rating: 5,
      order: 1,
      text: {
        ru: 'Невероятно точный расклад! Всё, что было сказано, сбылось в течение месяца. Очень благодарна за помощь.',
        en: 'Incredibly accurate reading! Everything said came true within a month. Very grateful for the help.',
        uk: 'Неймовірно точний розклад! Все, що було сказано, збулося протягом місяця. Дуже вдячна за допомогу.',
      },
    },
    {
      clientName: 'Марина Д.',
      category: 'rituals',
      rating: 5,
      order: 2,
      text: {
        ru: 'После ритуала очищения почувствовала невероятную лёгкость. Как будто камень с души сняли.',
        en: 'After the cleansing ritual I felt incredible lightness. As if a weight was lifted from my soul.',
        uk: 'Після ритуалу очищення відчула неймовірну легкість. Наче камінь з душі зняли.',
      },
    },
    {
      clientName: 'Олег В.',
      category: 'support',
      rating: 5,
      order: 3,
      text: {
        ru: 'Месяц сопровождения полностью изменил мою жизнь. Нашёл своё призвание и обрёл внутренний покой.',
        en: 'A month of support completely changed my life. Found my calling and gained inner peace.',
        uk: 'Місяць супроводу повністю змінив моє життя. Знайшов своє покликання та знайшов внутрішній спокій.',
      },
    },
    {
      clientName: 'Екатерина Л.',
      category: 'education',
      rating: 5,
      order: 4,
      text: {
        ru: 'Курс по Таро был очень структурированным и понятным. Теперь делаю расклады для друзей!',
        en: 'The Tarot course was very structured and clear. Now I do readings for friends!',
        uk: 'Курс з Таро був дуже структурованим та зрозумілим. Тепер роблю розклади для друзів!',
      },
    },
    {
      clientName: 'Ирина С.',
      category: 'regress',
      rating: 5,
      order: 5,
      text: {
        ru: 'Регрессия помогла мне понять причину страхов, которые преследовали меня всю жизнь. Рекомендую!',
        en: 'Regression helped me understand the cause of fears that haunted me all my life. Highly recommend!',
        uk: 'Регресія допомогла мені зрозуміти причину страхів, які переслідували мене все життя. Рекомендую!',
      },
    },
    {
      clientName: 'Дмитрий Н.',
      category: 'tarot',
      rating: 4,
      order: 6,
      text: {
        ru: 'Обратился скептиком, ушёл с полным пониманием ситуации. Расклад оказался точнее, чем я ожидал.',
        en: 'Came as a skeptic, left with full understanding of the situation. The reading was more accurate than expected.',
        uk: 'Звернувся скептиком, пішов з повним розумінням ситуації. Розклад виявився точнішим, ніж я очікував.',
      },
    },
  ]

  for (const t of testimonialsData) {
    const created = await payload.create({
      collection: 'testimonials',
      data: {
        clientName: t.clientName,
        text: t.text.ru,
        serviceCategory: categoryIds[t.category],
        rating: t.rating,
        isActive: true,
        order: t.order,
      },
      locale: 'ru',
    })

    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'testimonials',
        id: created.id,
        data: { text: t.text[locale] },
        locale,
      })
    }

    console.log(`Created testimonial: ${t.clientName}`)
  }

  // --- About Page ---
  const aboutPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Обо мне',
      slug: 'about',
      status: 'published',
    },
    locale: 'ru',
  })

  for (const locale of ['en', 'uk'] as const) {
    await payload.update({
      collection: 'pages',
      id: aboutPage.id,
      data: {
        title: locale === 'en' ? 'About Me' : 'Про мене',
      },
      locale,
    })
  }

  console.log('Created page: About')
  console.log('\nSeed completed successfully!')
}

async function run() {
  const config = await import('../payload.config').then((m) => m.default)
  const payload = await getPayload({ config })
  await seed(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
