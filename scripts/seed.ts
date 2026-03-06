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

  // --- Post Categories ---
  const postCatData = [
    { slug: 'tarot', order: 1, title: { ru: 'Таро', en: 'Tarot', uk: 'Таро' } },
    { slug: 'rituals', order: 2, title: { ru: 'Ритуалы', en: 'Rituals', uk: 'Ритуали' } },
    { slug: 'development', order: 3, title: { ru: 'Развитие', en: 'Development', uk: 'Розвиток' } },
    { slug: 'education', order: 4, title: { ru: 'Обучение', en: 'Education', uk: 'Навчання' } },
    { slug: 'regression', order: 5, title: { ru: 'Регрессия', en: 'Regression', uk: 'Регресія' } },
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

  // --- Posts ---
  const postsData = [
    {
      slug: 'tarot-beginners-guide',
      category: 'tarot',
      readingTime: 5,
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
    },
    {
      slug: 'home-rituals-basics',
      category: 'rituals',
      readingTime: 7,
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
    },
    {
      slug: 'past-lives-regression',
      category: 'regression',
      readingTime: 6,
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
    },
  ]

  for (const post of postsData) {
    const created = await payload.create({
      collection: 'posts',
      data: {
        title: post.title.ru,
        slug: post.slug,
        excerpt: post.excerpt.ru,
        category: postCatIds[post.category],
        status: 'published',
        publishedAt: new Date().toISOString(),
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
