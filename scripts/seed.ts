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
    // === ТАРО ===
    {
      slug: 'tarot-consultation',
      category: 'tarot',
      price: '200 €',
      duration: '60 минут',
      format: 'online' as const,
      order: 1,
      isActive: true,
      ru: {
        title: 'Таро-консультация',
        shortDescription: 'Глубокий анализ ключевых событий вашей жизни через архетипы Таро. Мантическая помощь в поиске ответов на самые важные вопросы.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Таро-консультация — это эффективный инструмент для разрешения внутренних и внешних конфликтов, а также прояснения неочевидных аспектов жизни. Работа с мастером помогает выйти из состояния неопределённости, взглянуть на ситуацию под новым углом и обрести твёрдую опору для принятия решений.' },
          { type: 'paragraph', text: 'Сессия проходит в формате онлайн-звонка. В процессе работы мастер, используя сакральные инструменты и родовые настройки, приоткрывает завесу будущего и помогает найти верные ответы, опираясь на энергетическое поле клиента.' },
          { type: 'heading', text: 'Что входит в консультацию?' },
          { type: 'paragraph', text: 'Мы детально разбираем все ключевые сферы жизни:' },
          { type: 'list', items: [
            'Ресурсы: финансы, карьера, бытовое благополучие и социальный статус.',
            'Личность: психоэмоциональное состояние, духовное и личностное развитие.',
            'Связи: семейные узы и партнёрские отношения.',
            'Энергетика: физическое состояние (здоровье) и скрытые влияния.',
          ]},
          { type: 'heading', text: 'Кому подходит услуга?' },
          { type: 'paragraph', text: 'Консультация будет полезна как людям, далёким от эзотерики, но нуждающимся в ясном векторе развития, так и практикующим специалистам, которые хотят глубже понять свой энергетический путь. В зависимости от запроса просмотр может осуществляться через родовые каналы, поддержку духов-защитников или связь с Высшими аспектами (божествами и покровителями).' },
        ]),
        faq: [],
      },
      en: {
        title: 'Tarot Consultation',
        price: '200 €',
        duration: '60 minutes',
        shortDescription: 'Deep analysis of the key events in your life through Tarot archetypes. Mantic assistance in finding answers to the most important questions.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'A Tarot consultation is an effective tool for resolving internal and external conflicts, as well as clarifying non-obvious aspects of life. Working with the master helps you emerge from uncertainty, view your situation from a new angle, and find a firm foundation for decision-making.' },
          { type: 'paragraph', text: 'The session takes place in an online call format. During the work, the master, using sacred tools and ancestral attunements, lifts the veil of the future and helps find the right answers, drawing on the client\'s energy field.' },
          { type: 'heading', text: 'What is included in the consultation?' },
          { type: 'paragraph', text: 'We examine all key areas of life in detail:' },
          { type: 'list', items: [
            'Resources: finances, career, everyday well-being and social status.',
            'Personality: psycho-emotional state, spiritual and personal development.',
            'Connections: family bonds and partnership relationships.',
            'Energetics: physical condition (health) and hidden influences.',
          ]},
          { type: 'heading', text: 'Who is this service for?' },
          { type: 'paragraph', text: 'The consultation will be beneficial both for people far from esotericism who need a clear direction, and for practicing specialists who want to understand their energetic path more deeply. Depending on the request, the reading may be conducted through ancestral channels, the support of guardian spirits, or connection with Higher Aspects (deities and patrons).' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Таро-консультація',
        price: '200 €',
        duration: '60 хвилин',
        shortDescription: 'Глибокий аналіз ключових подій вашого життя через архетипи Таро. Мантична допомога у пошуку відповідей на найважливіші питання.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Таро-консультація — це ефективний інструмент для вирішення внутрішніх та зовнішніх конфліктів, а також прояснення неочевидних аспектів життя. Робота з майстром допомагає вийти зі стану невизначеності, поглянути на ситуацію під новим кутом та знайти тверду опору для прийняття рішень.' },
          { type: 'paragraph', text: 'Сесія проходить у форматі онлайн-дзвінка. У процесі роботи майстер, використовуючи сакральні інструменти та родові налаштування, відкриває завісу майбутнього та допомагає знайти правильні відповіді, спираючись на енергетичне поле клієнта.' },
          { type: 'heading', text: 'Що входить у консультацію?' },
          { type: 'paragraph', text: 'Ми детально розбираємо всі ключові сфери життя:' },
          { type: 'list', items: [
            'Ресурси: фінанси, кар\'єра, побутовий добробут та соціальний статус.',
            'Особистість: психоемоційний стан, духовний та особистісний розвиток.',
            'Зв\'язки: сімейні узи та партнерські стосунки.',
            'Енергетика: фізичний стан (здоров\'я) та приховані впливи.',
          ]},
          { type: 'heading', text: 'Кому підходить послуга?' },
          { type: 'paragraph', text: 'Консультація буде корисна як людям, далеким від езотерики, але потребуючим чіткого вектора розвитку, так і практикуючим спеціалістам, які хочуть глибше зрозуміти свій енергетичний шлях. Залежно від запиту перегляд може здійснюватись через родові канали, підтримку духів-захисників або зв\'язок із Вищими аспектами (божествами та покровителями).' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'magic-abilities-diagnostics',
      category: 'tarot',
      price: '200 €',
      duration: '60 минут',
      format: 'online' as const,
      order: 2,
      isActive: true,
      ru: {
        title: 'Диагностика магических способностей',
        shortDescription: 'Комплексное исследование вашего магического потенциала, родовых связей и предназначения. Определение ключей силы и тех сущностей, что стоят за вашим плечом.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Диагностика магических способностей — это глубокое погружение в структуру вашей души и наследия. Это не просто «просмотр будущего», а выявление фундаментального потенциала, с которым вы пришли в это воплощение. Исследование позволяет определить ваши личные «ключи силы», предрасположенность к конкретным направлениям ремесла и выявить те ресурсы, которые заложены в вас по праву рождения.' },
          { type: 'paragraph', text: 'Мастер анализирует ваш путь через медиумические методы взаимодействия с миром мёртвых и иными Силами. В процессе могут быть задействованы мантические системы (Таро, Оракулы) и авторские наработки, позволяющие получить доступ к закрытым пластам информации.' },
          { type: 'heading', text: 'Что входит в диагностику?' },
          { type: 'list', items: [
            'Родовой пласт: анализ родовой силы, выявление родовых духов-помощников и действующих контрактов (договоров) вашего Рода.',
            'Покровительство: определение Сил, стоящих за вами, а также выявление защитников и наставников в текущем воплощении.',
            'Личный путь: цели вашей души, ключевые жизненные архетипы и тотемные духи-проводники (звериные архетипы).',
            'Магический профиль: определение склонностей к определённым видам магии и рекомендации по развитию способностей.',
          ]},
          { type: 'heading', text: 'Кому подходит услуга?' },
          { type: 'list', items: [
            'Ищущим: тем, кто далёк от практики, но чувствует в себе скрытую силу и хочет понять свою истинную природу.',
            'Новичкам: тем, кто делает первые шаги в эзотерике и хочет выбрать верное направление, избежав ошибок.',
            'Практикам: тем, кто желает углубить связь со своими силами, прояснить вопросы покровительства и выйти на новый уровень мастерства.',
          ]},
        ]),
        faq: [],
      },
      en: {
        title: 'Diagnosis of Magical Abilities',
        price: '200 €',
        duration: '60 minutes',
        shortDescription: 'A comprehensive study of your magical potential, ancestral connections and destiny. Identification of power keys and the entities that stand behind your shoulder.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'The diagnosis of magical abilities is a deep immersion into the structure of your soul and heritage. This is not simply a "reading of the future", but the identification of the fundamental potential with which you came into this incarnation. The study allows you to determine your personal "keys of power", your predisposition to specific directions of the craft, and identify the resources embedded in you by birthright.' },
          { type: 'paragraph', text: 'The master analyzes your path through mediumistic methods of interaction with the world of the dead and other Forces. In the process, mantic systems (Tarot, Oracles) and original techniques may be employed, allowing access to closed layers of information.' },
          { type: 'heading', text: 'What is included in the diagnosis?' },
          { type: 'list', items: [
            'Ancestral layer: analysis of ancestral power, identification of ancestral helper spirits and active contracts (agreements) of your Kin.',
            'Patronage: identification of the Forces standing behind you, as well as guardians and mentors in your current incarnation.',
            'Personal path: your soul\'s goals, key life archetypes and totemic guide spirits (animal archetypes).',
            'Magical profile: identification of inclinations toward specific types of magic and recommendations for developing abilities.',
          ]},
          { type: 'heading', text: 'Who is this service for?' },
          { type: 'list', items: [
            'Seekers: those far from practice who feel a hidden power within themselves and want to understand their true nature.',
            'Beginners: those taking their first steps in esotericism who want to choose the right direction, avoiding mistakes.',
            'Practitioners: those who wish to deepen their connection with their forces, clarify questions of patronage, and reach a new level of mastery.',
          ]},
        ]),
        faq: [],
      },
      uk: {
        title: 'Діагностика магічних здібностей',
        price: '200 €',
        duration: '60 хвилин',
        shortDescription: 'Комплексне дослідження вашого магічного потенціалу, родових зв\'язків та призначення. Визначення ключів сили та тих сутностей, що стоять за вашим плечем.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Діагностика магічних здібностей — це глибоке занурення у структуру вашої душі та спадщини. Це не просто «перегляд майбутнього», а виявлення фундаментального потенціалу, з яким ви прийшли у це втілення. Дослідження дозволяє визначити ваші особисті «ключі сили», схильність до конкретних напрямів ремесла та виявити ті ресурси, які закладені у вас від народження.' },
          { type: 'paragraph', text: 'Майстер аналізує ваш шлях через медіумічні методи взаємодії зі світом мертвих та іншими Силами. У процесі можуть бути задіяні мантичні системи (Таро, Оракули) та авторські напрацювання, що дозволяють отримати доступ до закритих пластів інформації.' },
          { type: 'heading', text: 'Що входить у діагностику?' },
          { type: 'list', items: [
            'Родовий пласт: аналіз родової сили, виявлення родових духів-помічників та діючих контрактів (договорів) вашого Роду.',
            'Покровительство: визначення Сил, що стоять за вами, а також виявлення захисників та наставників у поточному втіленні.',
            'Особистий шлях: цілі вашої душі, ключові життєві архетипи та тотемні духи-провідники (звіриний архетип).',
            'Магічний профіль: визначення схильностей до певних видів магії та рекомендації щодо розвитку здібностей.',
          ]},
          { type: 'heading', text: 'Кому підходить послуга?' },
          { type: 'list', items: [
            'Шукаючим: тим, хто далекий від практики, але відчуває у собі приховану силу і хоче зрозуміти свою справжню природу.',
            'Новачкам: тим, хто робить перші кроки в езотериці і хоче обрати вірний напрямок, уникнувши помилок.',
            'Практикам: тим, хто бажає поглибити зв\'язок зі своїми силами, прояснити питання покровительства та вийти на новий рівень майстерності.',
          ]},
        ]),
        faq: [],
      },
    },

    // === РИТУАЛИСТИКА ===
    {
      slug: 'everyday-negativity-cleansing',
      category: 'rituals',
      price: 'от 500 €',
      duration: 'Индивидуальный цикл очищения',
      format: 'online' as const,
      order: 1,
      isActive: true,
      ru: {
        title: 'Чистка от бытового негатива',
        shortDescription: 'Глубокое освобождение от истощающих связей, крадников и ментального мусора. Полная перезагрузка энергетической системы и сознания для выхода из застоя и возврата личной силы.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Эта работа представляет собой масштабную «ревизию» и восстановление вашей энергоструктуры. Мы устраняем не только поверхностные загрязнения, но и глубокие деструктивные механизмы, которые блокируют ваше развитие. В процессе работы происходит полное переобновление тонких тел, что позволяет восстановить здоровую циркуляцию энергии во всех сферах жизни.' },
          { type: 'paragraph', text: 'Особое внимание уделяется внешним влияниям: мастер выявляет и уничтожает негативные каналы и связки с людьми, которые истощают ваш ресурс. Если вы чувствуете, что ваши достижения или удача «утекают» к другим, чистка поможет устранить крадники и вернуть вам право на собственный успех.' },
          { type: 'heading', text: 'Что входит в работу' },
          { type: 'list', items: [
            'Энергетический детокс: очищение пластов сознания и подсознания от навязчивых мыслей и программ самоподавления.',
            'Обрыв привязок: ликвидация каналов утечки энергии к токсичным людям и прошлым связям.',
            'Ликвидация крадников: снятие воздействий, направленных на отток ваших финансов, удачи или красоты.',
            'Реанимация сфер жизни: восстановление областей, пострадавших от застоя, внешнего давления и родовых триггеров.',
          ]},
          { type: 'heading', text: 'Кому подходит эта услуга?' },
          { type: 'list', items: [
            'Тем, кто ощущает «застой клиентов» и необъяснимые финансовые блоки.',
            'Тем, кто чувствует себя опустошённым после общения с определёнными людьми.',
            'Тем, кто не может двигаться вперёд из-за внутренней неуверенности и груза прошлых сценариев.',
            'Тем, кто хочет проживать свою жизнь на максимум, вернув себе управление собственной судьбой.',
          ]},
        ]),
        faq: [],
      },
      en: {
        title: 'Cleansing from Everyday Negativity',
        price: 'from 500 €',
        duration: 'Individual cleansing cycle',
        shortDescription: 'Deep liberation from draining connections, energy thieves and mental clutter. A complete reboot of the energy system and consciousness to break out of stagnation and reclaim personal power.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This work represents a large-scale "revision" and restoration of your energy structure. We eliminate not only surface-level contamination, but also deep destructive mechanisms that block your development. In the process, a complete renewal of the subtle bodies occurs, allowing healthy energy circulation to be restored in all areas of life.' },
          { type: 'paragraph', text: 'Special attention is given to external influences: the master identifies and destroys negative channels and ties with people who drain your resources. If you feel that your achievements or luck are "leaking" to others, the cleansing will help eliminate the thieves and return your right to your own success.' },
          { type: 'heading', text: 'What is included in the work' },
          { type: 'list', items: [
            'Energy detox: cleansing the layers of consciousness and subconsciousness from intrusive thoughts and self-suppression programs.',
            'Severing attachments: eliminating channels of energy leakage to toxic people and past connections.',
            'Eliminating energy thieves: removing influences directed at draining your finances, luck or beauty.',
            'Reviving life spheres: restoring areas damaged by stagnation, external pressure and ancestral triggers.',
          ]},
          { type: 'heading', text: 'Who is this service for?' },
          { type: 'list', items: [
            'Those who feel a "client stagnation" and inexplicable financial blocks.',
            'Those who feel drained after communicating with certain people.',
            'Those who cannot move forward due to inner uncertainty and the burden of past scenarios.',
            'Those who want to live life to the fullest, returning control of their own destiny.',
          ]},
        ]),
        faq: [],
      },
      uk: {
        title: 'Чистка від побутового негативу',
        price: 'від 500 €',
        duration: 'Індивідуальний цикл очищення',
        shortDescription: 'Глибоке звільнення від виснажливих зв\'язків, крадників та ментального сміття. Повне перезавантаження енергетичної системи та свідомості для виходу із застою та повернення особистої сили.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Ця робота являє собою масштабну «ревізію» та відновлення вашої енергоструктури. Ми усуваємо не лише поверхневі забруднення, але й глибокі деструктивні механізми, які блокують ваш розвиток. У процесі роботи відбувається повне оновлення тонких тіл, що дозволяє відновити здорову циркуляцію енергії в усіх сферах життя.' },
          { type: 'paragraph', text: 'Особлива увага приділяється зовнішнім впливам: майстер виявляє та знищує негативні канали та зв\'язки з людьми, які виснажують ваш ресурс. Якщо ви відчуваєте, що ваші досягнення або удача «витікають» до інших, чистка допоможе усунути крадників та повернути вам право на власний успіх.' },
          { type: 'heading', text: 'Що входить у роботу' },
          { type: 'list', items: [
            'Енергетичний детокс: очищення пластів свідомості та підсвідомості від нав\'язливих думок і програм самопригнічення.',
            'Обрив прив\'язок: ліквідація каналів витоку енергії до токсичних людей та минулих зв\'язків.',
            'Ліквідація крадників: зняття впливів, спрямованих на відтік ваших фінансів, удачі або краси.',
            'Реанімація сфер життя: відновлення областей, що постраждали від застою, зовнішнього тиску та родових тригерів.',
          ]},
          { type: 'heading', text: 'Кому підходить ця послуга?' },
          { type: 'list', items: [
            'Тим, хто відчуває «застій клієнтів» та незрозумілі фінансові блоки.',
            'Тим, хто почувається спустошеним після спілкування з певними людьми.',
            'Тим, хто не може рухатися вперед через внутрішню невпевненість та тягар минулих сценаріїв.',
            'Тим, хто хоче проживати своє життя на максимум, повернувши собі управління власною долею.',
          ]},
        ]),
        faq: [],
      },
    },
    {
      slug: 'heavy-curse-removal-fate-restoration',
      category: 'rituals',
      price: 'от 1500 € (стоимость включает полный цикл обрядов и период реабилитации)',
      duration: '',
      format: 'offline' as const,
      order: 2,
      isActive: true,
      ru: {
        title: 'Очищение от тяжёлых деструктивных программ и реставрация судьбы',
        shortDescription: 'Бескомпромиссное устранение родовых проклятий, профессиональных порч и некротических привязок. Полный разрыв деструктивных контрактов и восстановление прав на жизнь, удачу и продолжение Рода.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Работа с тяжёлыми магическими поражениями — это многоуровневый процесс, выходящий за рамки стандартных чисток. Здесь речь идёт о вмешательстве в глубокие структуры бытия, где записаны родовые сценарии и кармические узлы. Данная услуга направлена на тех, чья жизнь заблокирована силами высшего порядка или профессионально исполненным деструктивным ритуалом.' },
          { type: 'paragraph', text: 'Мастер проводит полную «инвентаризацию» ваших тонких тел и родовых каналов, выявляя и уничтожая корни негатива, будь то застарелое проклятие, передающееся из поколения в поколение, или современное кладбищенское воздействие на излом судьбы.' },
          { type: 'heading', text: 'Глубинные направления работы' },
          { type: 'list', items: [
            'Ликвидация Родового проклятия: работа с «печатью одиночества», «вдовьим платом», «чёрной полосой» в Роду и программами вымирания. Очищение древа Рода от грехов и долгов предков.',
            'Нейтрализация некротических и бесовских связей: снятие подселений, упокоенных сущностей и бесовских контрактов, которые разрушают психику, здоровье и волю клиента.',
            'Обрыв профессиональных деструктивных узлов: снятие порч на смерть, нищету и безумие. Нейтрализация приворотов через погост, подавления воли и подделов любой сложности.',
            'Освобождение событийных рядов: разрыв негативных циклов, когда человек постоянно попадает в одни и те же катастрофические ситуации.',
          ]},
          { type: 'heading', text: 'Кому необходима эта трансформация?' },
          { type: 'list', items: [
            'Тем, кто чувствует «дыхание смерти» или незримое присутствие чуждой силы в своей жизни.',
            'Семьям, где повторяются трагические судьбы, ранние смерти или неизлечимые зависимости.',
            'Людям, ставшим жертвами осознанной магической войны, потерявшим бизнес, здоровье или рассудок из-за чужих амбиций.',
            'Практикам, совершившим фатальные ошибки и попавшим под «обратный удар» или родовое возмездие.',
          ]},
          { type: 'paragraph', text: 'Это не просто свобода от боли, это второе рождение. После завершения цикла вы получаете чистый горизонт событий, восстановление защиты Рода и возможность выстроить свою жизнь без оглядки на чужие проклятия.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Cleansing from Heavy Destructive Programs & Fate Restoration',
        price: 'from 1500 € (price includes the full ritual cycle and rehabilitation period)',
        duration: '',
        shortDescription: 'Uncompromising elimination of ancestral curses, professional hexes and necrotic attachments. Complete severing of destructive contracts and restoration of rights to life, luck and the continuation of the Kin.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Working with severe magical afflictions is a multi-level process that goes beyond standard cleansings. This involves intervening in the deep structures of existence where ancestral scenarios and karmic knots are recorded. This service is aimed at those whose life is blocked by forces of the highest order or a professionally executed destructive ritual.' },
          { type: 'paragraph', text: 'The master conducts a complete "inventory" of your subtle bodies and ancestral channels, identifying and destroying the roots of negativity, whether it be an old curse passed down through generations, or a modern cemetery working directed at the breaking of fate.' },
          { type: 'heading', text: 'Deep directions of work' },
          { type: 'list', items: [
            'Elimination of the Ancestral curse: working with the "seal of loneliness", "widow\'s veil", "black streak" in the Kin and extinction programs. Cleansing the family tree of the sins and debts of ancestors.',
            'Neutralization of necrotic and demonic connections: removal of intrusions, unquiet dead and demonic contracts that destroy the client\'s psyche, health and will.',
            'Severing professional destructive knots: removal of hexes for death, poverty and madness. Neutralization of cemetery love bindings, will suppression and fixings of any complexity.',
            'Liberation of event series: breaking negative cycles where a person constantly falls into the same catastrophic situations.',
          ]},
          { type: 'heading', text: 'Who needs this transformation?' },
          { type: 'list', items: [
            'Those who feel the "breath of death" or the invisible presence of an alien force in their life.',
            'Families where tragic fates, early deaths or incurable addictions repeat.',
            'People who have become victims of conscious magical warfare, who have lost business, health or sanity due to others\' ambitions.',
            'Practitioners who have made fatal mistakes and come under the "backlash" or ancestral retribution.',
          ]},
          { type: 'paragraph', text: 'This is not simply freedom from pain — it is a second birth. After the cycle is complete, you receive a clear horizon of events, restoration of the Kin\'s protection and the ability to build your life without looking back at others\' curses.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Очищення від важких деструктивних програм та реставрація долі',
        price: 'від 1500 € (вартість включає повний цикл обрядів та період реабілітації)',
        duration: '',
        shortDescription: 'Безкомпромісне усунення родових прокльонів, професійних псувань та некротичних прив\'язок. Повний розрив деструктивних контрактів та відновлення прав на життя, удачу та продовження Роду.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Робота з важкими магічними ураженнями — це багаторівневий процес, що виходить за межі стандартних чисток. Тут йдеться про втручання у глибокі структури буття, де записані родові сценарії та кармічні вузли. Ця послуга спрямована на тих, чиє життя заблоковане силами вищого порядку або професійно виконаним деструктивним ритуалом.' },
          { type: 'paragraph', text: 'Майстер проводить повну «інвентаризацію» ваших тонких тіл та родових каналів, виявляючи та знищуючи коріння негативу, чи то застаріле прокляття, що передається з покоління в покоління, чи то сучасний цвинтарний вплив на злам долі.' },
          { type: 'heading', text: 'Глибинні напрямки роботи' },
          { type: 'list', items: [
            'Ліквідація Родового прокляття: робота з «печаттю самотності», «вдовиним серпанком», «чорною смугою» в Роді та програмами вимирання. Очищення родового дерева від гріхів і боргів предків.',
            'Нейтралізація некротичних та бісівських зв\'язків: зняття підселень, неупокоєних сутностей та бісівських контрактів, що руйнують психіку, здоров\'я та волю клієнта.',
            'Обрив професійних деструктивних вузлів: зняття псувань на смерть, злидні та безумство. Нейтралізація приворотів через погост, пригнічення волі та підробів будь-якої складності.',
            'Звільнення подієвих рядів: розрив негативних циклів, коли людина постійно потрапляє в одні й ті самі катастрофічні ситуації.',
          ]},
          { type: 'heading', text: 'Кому необхідна ця трансформація?' },
          { type: 'list', items: [
            'Тим, хто відчуває «подих смерті» або незриму присутність чужої сили у своєму житті.',
            'Сім\'ям, де повторюються трагічні долі, ранні смерті або невиліковні залежності.',
            'Людям, що стали жертвами усвідомленої магічної війни, які втратили бізнес, здоров\'я або розум через чужі амбіції.',
            'Практикам, що допустилися фатальних помилок та потрапили під «зворотний удар» або родове відплату.',
          ]},
          { type: 'paragraph', text: 'Це не просто свобода від болю — це друге народження. Після завершення циклу ви отримуєте чистий горизонт подій, відновлення захисту Роду та можливість побудувати своє життя без оглядки на чужі прокляття.' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'cemetery-protection-supreme',
      category: 'rituals',
      price: '3000 €',
      duration: '5 лет (срок действия защиты)',
      format: 'offline' as const,
      order: 3,
      isActive: true,
      ru: {
        title: 'Кладбищенская защита высшего порядка',
        shortDescription: 'Абсолютный энергетический щит, возводимый через Силы Кладбища. Непробиваемый барьер, закрывающий от магической агрессии, фатальных ударов судьбы и физических угроз сроком на 5 лет.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Это элитарная форма магической защиты, предполагающая постановку Смертной стражи за плечом клиента. В отличие от стандартных оберегов, данная защита опирается на неисчерпаемую мощь Погостных Сил и поддержку Стражей Смерти. Работа выстраивается таким образом, чтобы любая направленная на вас агрессия — будь то профессиональное колдовство или бытовая ненависть — поглощалась землёй, не достигая вашей энергоструктуры.' },
          { type: 'paragraph', text: 'Защита действует как интеллектуальный фильтр: она не только отражает атаки, но и корректирует событийное поле, отводя от вас «злой рок», несчастные случаи и фатальные стечения обстоятельств.' },
          { type: 'heading', text: 'Функциональные особенности защиты' },
          { type: 'list', items: [
            'Абсолютный иммунитет: полная изоляция от любых видов порчи, проклятий, приворотов, крадников и перекладов. Любое воздействие возвращается агрессору в кратном размере.',
            'Коррекция рока: защита блокирует негативные вероятности (аварии, внезапные болезни, финансовые крахи), буквально «выводя» вас из-под удара обстоятельств.',
            'Стражи Смерти: к вам приставляется Хозяин или Страж места (в зависимости от ритуала), который охраняет ваши границы на тонком плане 24/7.',
            'Социальный фильтр: окружение очищается от скрытых врагов и предателей; люди с деструктивными намерениями просто перестают попадать в ваше поле.',
          ]},
          { type: 'heading', text: 'Кому необходима эта защита?' },
          { type: 'list', items: [
            'Публичным личностям и лидерам: всем, кто находится под прицелом зависти, конкуренции и магических войн.',
            'Практикам: в качестве «брони» при выполнении тяжёлых работ или в периоды жёсткого противостояния.',
            'Тем, кто ценит стабильность: людям, желающим один раз решить вопрос безопасности и на 5 лет забыть о необходимости постоянных чисток и подделов.',
          ]},
          { type: 'paragraph', text: 'Работа проводится в несколько этапов с предварительным выкупом места и установлением контакта с Силами. Это трудоёмкий процесс, требующий от мастера колоссальных затрат энергии и мастерства.' },
          { type: 'quote', text: 'Я практикую индивидуальный ритуальный подход к каждому случаю. Если по личным убеждениям, религиозным взглядам или внутренним опасениям вы не приемлете работу через кладбище — это не является препятствием для решения вашего вопроса. По вашему запросу кладбищенские методы могут быть полностью замещены альтернативными путями. Результат остаётся неизменным.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Supreme Cemetery Protection',
        price: '3000 €',
        duration: '5 years (protection duration)',
        shortDescription: 'An absolute energy shield erected through the Forces of the Cemetery. An impenetrable barrier protecting from magical aggression, fatal blows of fate and physical threats for 5 years.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This is an elite form of magical protection that involves placing a Death Sentinel at the client\'s shoulder. Unlike standard charms, this protection relies on the inexhaustible power of the Graveyard Forces and the support of the Guardians of Death. The work is constructed so that any aggression directed at you — whether professional sorcery or everyday hatred — is absorbed by the earth without reaching your energy structure.' },
          { type: 'paragraph', text: 'The protection functions as an intelligent filter: it not only repels attacks but also corrects the field of events, diverting from you "ill fate", accidents and fatal confluences of circumstances.' },
          { type: 'heading', text: 'Functional features of the protection' },
          { type: 'list', items: [
            'Absolute immunity: complete isolation from all types of hexes, curses, love bindings, energy thieves and transferences. Any working is returned to the aggressor multiplied.',
            'Fate correction: the protection blocks negative probabilities (accidents, sudden illnesses, financial crashes), literally "removing" you from the line of fire.',
            'Guardians of Death: a Host or Guardian of the place is assigned to you (depending on the ritual), who protects your boundaries on the subtle plane 24/7.',
            'Social filter: your environment is cleansed of hidden enemies and traitors; people with destructive intentions simply stop entering your field.',
          ]},
          { type: 'heading', text: 'Who needs this protection?' },
          { type: 'list', items: [
            'Public figures and leaders: all those who are targeted by envy, competition and magical warfare.',
            'Practitioners: as "armor" when performing heavy work or during periods of intense confrontation.',
            'Those who value stability: people who want to resolve the security question once and for 5 years forget about the need for constant cleansings and repairs.',
          ]},
          { type: 'paragraph', text: 'The work is conducted in several stages with a preliminary ransom of the place and establishment of contact with the Forces. This is a labor-intensive process requiring colossal expenditure of energy and mastery from the master.' },
          { type: 'quote', text: 'I practice an individual ritual approach to each case. If for personal convictions, religious views or internal concerns you do not accept working through the cemetery — this is not an obstacle to resolving your issue. At your request, cemetery methods can be completely replaced by alternative paths. The result remains unchanged.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Цвинтарний захист вищого порядку',
        price: '3000 €',
        duration: '5 років (термін дії захисту)',
        shortDescription: 'Абсолютний енергетичний щит, що зводиться через Сили Цвинтаря. Непробивний бар\'єр, що закриває від магічної агресії, фатальних ударів долі та фізичних загроз терміном на 5 років.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Це елітарна форма магічного захисту, що передбачає постановку Смертної варти за плечем клієнта. На відміну від стандартних оберегів, даний захист спирається на невичерпну міць Погостних Сил та підтримку Вартових Смерті. Робота вибудовується таким чином, щоб будь-яка спрямована на вас агресія — чи то професійне чаклунство, чи то побутова ненависть — поглиналась землею, не досягаючи вашої енергоструктури.' },
          { type: 'paragraph', text: 'Захист діє як інтелектуальний фільтр: він не лише відбиває атаки, але й коригує подієве поле, відводячи від вас «злий рок», нещасні випадки та фатальні збіги обставин.' },
          { type: 'heading', text: 'Функціональні особливості захисту' },
          { type: 'list', items: [
            'Абсолютний імунітет: повна ізоляція від будь-яких видів псування, прокльонів, приворотів, крадників та перекладів. Будь-який вплив повертається агресору у кратному розмірі.',
            'Корекція року: захист блокує негативні вірогідності (аварії, раптові хвороби, фінансові крахи), буквально «виводячи» вас з-під удару обставин.',
            'Вартові Смерті: до вас приставляється Господар або Страж місця (залежно від ритуалу), який охороняє ваші межі на тонкому плані 24/7.',
            'Соціальний фільтр: оточення очищається від прихованих ворогів та зрадників; люди з деструктивними намірами просто перестають потрапляти у ваше поле.',
          ]},
          { type: 'heading', text: 'Кому необхідний цей захист?' },
          { type: 'list', items: [
            'Публічним особам та лідерам: всім, хто перебуває під прицілом заздрощів, конкуренції та магічних воєн.',
            'Практикам: як «броня» при виконанні важких робіт або в періоди жорсткого протистояння.',
            'Тим, хто цінує стабільність: людям, що бажають вирішити питання безпеки раз і на 5 років забути про необхідність постійних чисток та підробів.',
          ]},
          { type: 'paragraph', text: 'Робота проводиться у кілька етапів з попереднім викупом місця та встановленням контакту з Силами. Це трудомісткий процес, що вимагає від майстра колосальних витрат енергії та майстерності.' },
          { type: 'quote', text: 'Я практикую індивідуальний ритуальний підхід до кожного випадку. Якщо за особистими переконаннями, релігійними поглядами або внутрішніми побоюваннями ви не приймаєте роботу через цвинтар — це не є перешкодою для вирішення вашого питання. На ваш запит цвинтарні методи можуть бути повністю замінені альтернативними шляхами. Результат залишається незмінним.' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'opening-the-roads',
      category: 'rituals',
      price: '1500 €',
      duration: 'Закладка фундамента новых событий происходит в течение лунного цикла после проведения ритуала',
      format: 'offline' as const,
      order: 4,
      isActive: true,
      ru: {
        title: 'Открытие дорог',
        shortDescription: 'Глобальное устранение блокировок, препятствующих вашему развитию. Ритуал высвобождает застойную энергию и выстраивает новые событийные ветки для реализации в финансах, карьере и личной жизни.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Ритуал «Открытие дорог» — это фундаментальная работа по трансформации вашей реальности. Если вы чувствуете, что бьётесь в «стеклянный потолок», а ваши усилия не приносят ожидаемых плодов, значит, ваши событийные пути заблокированы — ментально, энергетически или через стороннее воздействие.' },
          { type: 'paragraph', text: 'Данная работа полностью ликвидирует состояние стагнации. Мастер проводит глубокую проработку всех векторов вашей жизни, буквально «расчищая» пространство перед вами. Это сравнимо с выходом из густого тумана на освещённую скоростную магистраль: исчезают случайные помехи, а цели становятся достижимыми.' },
          { type: 'heading', text: 'Что даёт этот ритуал' },
          { type: 'list', items: [
            'Финансовый прорыв: ликвидация денежных блоков, приток новых выгодных предложений и устранение препятствий, мешавших росту доходов.',
            'Социальная реализация: восстановление потока удачи в карьере и бизнесе. Вы начинаете оказываться в нужное время в нужном месте.',
            'Личная трансформация: обновление чувственной сферы, выход из застойных или деструктивных отношений и открытие путей к гармоничному партнёрству.',
            'Эффект «Свежего ветра»: вы обретаете ясность видения, прилив сил и вдохновение для реализации тех идей, которые раньше казались невыполнимыми.',
          ]},
          { type: 'heading', text: 'Кому необходима эта работа?' },
          { type: 'list', items: [
            'Тем, кто застрял в «мёртвой точке» и не видит выхода из сложившихся обстоятельств.',
            'Предпринимателям, чей бизнес перестал масштабироваться без видимых на то причин.',
            'Людям, которые чувствуют, что их жизнь проходит «мимо», а возможности достаются другим.',
            'Тем, кто готов к резкому качественному скачку и полной смене жизненной парадигмы.',
          ]},
          { type: 'paragraph', text: 'Ритуал меняет структуру вашего взаимодействия с миром, делая ваш путь открытым, а возможности — осязаемыми. Вы получаете доступ к ресурсам, которые ранее были скрыты или заблокированы.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Opening the Roads',
        price: '1500 €',
        duration: 'The foundation of new events is laid within a lunar cycle after the ritual',
        shortDescription: 'Global elimination of blockages preventing your development. The ritual releases stagnant energy and builds new event branches for realization in finances, career and personal life.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'The "Opening the Roads" ritual is a fundamental work for transforming your reality. If you feel that you are hitting a "glass ceiling" and your efforts are not bearing the expected fruits, then your event paths are blocked — mentally, energetically or through external influence.' },
          { type: 'paragraph', text: 'This work completely eliminates the state of stagnation. The master conducts a deep working through of all vectors of your life, literally "clearing" the space before you. It is comparable to emerging from thick fog onto a lit expressway: random obstacles disappear and goals become achievable.' },
          { type: 'heading', text: 'What this ritual gives' },
          { type: 'list', items: [
            'Financial breakthrough: elimination of money blocks, influx of new profitable opportunities and removal of obstacles that had been preventing income growth.',
            'Social realization: restoration of the flow of luck in career and business. You begin to be in the right place at the right time.',
            'Personal transformation: renewal of the sensory sphere, exit from stagnant or destructive relationships and opening of paths to harmonious partnership.',
            'The "Fresh Wind" effect: you gain clarity of vision, a surge of energy and inspiration for realizing ideas that previously seemed impossible.',
          ]},
          { type: 'heading', text: 'Who needs this work?' },
          { type: 'list', items: [
            'Those stuck at a "dead point" who see no way out of the current circumstances.',
            'Entrepreneurs whose business has stopped scaling for no apparent reason.',
            'People who feel that life is passing them by and opportunities go to others.',
            'Those ready for a sharp qualitative leap and a complete change of life paradigm.',
          ]},
          { type: 'paragraph', text: 'The ritual changes the structure of your interaction with the world, making your path open and your possibilities tangible. You gain access to resources that were previously hidden or blocked.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Відкриття доріг',
        price: '1500 €',
        duration: 'Закладення фундаменту нових подій відбувається протягом місячного циклу після проведення ритуалу',
        shortDescription: 'Глобальне усунення блокувань, що перешкоджають вашому розвитку. Ритуал вивільняє застійну енергію та вибудовує нові подієві гілки для реалізації у фінансах, кар\'єрі та особистому житті.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Ритуал «Відкриття доріг» — це фундаментальна робота з трансформації вашої реальності. Якщо ви відчуваєте, що б\'єтесь у «скляну стелю», а ваші зусилля не приносять очікуваних плодів, значить ваші подієві шляхи заблоковані — ментально, енергетично або через сторонній вплив.' },
          { type: 'paragraph', text: 'Дана робота повністю ліквідує стан стагнації. Майстер проводить глибоке опрацювання всіх векторів вашого життя, буквально «розчищаючи» простір перед вами. Це порівнянно з виходом із густого туману на освітлену швидкісну магістраль: зникають випадкові перешкоди, а цілі стають досяжними.' },
          { type: 'heading', text: 'Що дає цей ритуал' },
          { type: 'list', items: [
            'Фінансовий прорив: ліквідація грошових блоків, приплив нових вигідних пропозицій та усунення перешкод, що заважали зростанню доходів.',
            'Соціальна реалізація: відновлення потоку удачі в кар\'єрі та бізнесі. Ви починаєте опинятися у потрібний час у потрібному місці.',
            'Особиста трансформація: оновлення чуттєвої сфери, вихід із застійних або деструктивних стосунків та відкриття шляхів до гармонійного партнерства.',
            'Ефект «Свіжого вітру»: ви здобуваєте ясність бачення, приплив сил та натхнення для реалізації тих ідей, які раніше здавалися нездійсненними.',
          ]},
          { type: 'heading', text: 'Кому необхідна ця робота?' },
          { type: 'list', items: [
            'Тим, хто застряг у «мертвій точці» і не бачить виходу зі сформованих обставин.',
            'Підприємцям, чий бізнес перестав масштабуватись без видимих на те причин.',
            'Людям, які відчувають, що їхнє життя проходить «повз», а можливості дістаються іншим.',
            'Тим, хто готовий до різкого якісного стрибка та повної зміни життєвої парадигми.',
          ]},
          { type: 'paragraph', text: 'Ритуал змінює структуру вашої взаємодії зі світом, роблячи ваш шлях відкритим, а можливості — відчутними. Ви отримуєте доступ до ресурсів, які раніше були приховані або заблоковані.' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'privorot',
      category: 'rituals',
      price: 'от 2 000 € до 30 000 € (варьируется в зависимости от иерархического статуса объекта и сложности ритуального протокола)',
      duration: 'Рассчитывается индивидуально после вскрытия полей объекта',
      format: 'both' as const,
      order: 5,
      isActive: true,
      ru: {
        title: 'Приворот',
        shortDescription: 'Радикальный слом естественных защит объекта с последующим демонтажем волевых центров. Полная перезапись внутреннего кода человека: создание безусловной доминанты влюблённости и зависимости от клиента на месте уничтоженных программ сопротивления.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Данная работа — это высшая форма некромагического воздействия, направленная на принудительную перестройку судьбы и психики объекта. Метод применяется в ситуациях критического сопротивления, когда любые иные методы воздействия исчерпаны.' },
          { type: 'paragraph', text: 'В основе ритуала лежит принцип «Смерти и Возрождения». Через обращение к Силам Смерти производится глубокая чистка и обнуление волевого ресурса человека. На месте выжженных страхов, обид и сторонних привязанностей мастер формирует новый фундамент личности.' },
          { type: 'heading', text: 'Этапы фундаментальной трансформации' },
          { type: 'list', items: [
            'Аннигиляция воли: тотальный паралич механизмов принятия решений. Снятие всех видов защит (природных, эгрегориальных, родовых).',
            'Событийная изоляция: выжигание всех сторонних привязанностей. Друзья, родственники и иные симпатии перестают существовать в ценностном поле объекта.',
            'Матричное замещение: встраивание новой эмоциональной матрицы. Создаётся эффект «истинной любви», при котором объект убеждён, что его тяга — это его собственное выстраданное чувство.',
            'Некро-фиксация: закрепление результата через кладбищенские печати. Гарантирует, что созданная связь не будет разрушена временем или попытками сторонней магической помощи.',
          ]},
          { type: 'heading', text: 'Для кого эта услуга' },
          { type: 'paragraph', text: 'Для тех, кто требует абсолютного результата и не приемлет отказов. Для тех, кто осознаёт масштаб вмешательства и желает получить партнёра, чьи мысли, чувства и действия будут полностью подчинены воле заказчика.' },
          { type: 'quote', text: 'Я практикую индивидуальный ритуальный подход к каждому случаю. Если по личным убеждениям, религиозным взглядам или внутренним опасениям вы не приемлете работу через кладбище — это не является препятствием для решения вашего вопроса. По вашему запросу кладбищенские методы могут быть полностью замещены альтернативными путями. Результат остаётся неизменным.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Love Binding',
        price: 'from 2,000 € to 30,000 € (varies depending on the hierarchical status of the subject and the complexity of the ritual protocol)',
        duration: 'Calculated individually after opening the subject\'s fields',
        shortDescription: 'Radical breaking of the subject\'s natural defenses followed by dismantling of will centers. Complete rewriting of a person\'s inner code: creation of an unconditional dominance of infatuation and dependence on the client in place of destroyed resistance programs.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This work is the highest form of necromantic influence aimed at forced restructuring of the destiny and psyche of the subject. The method is applied in situations of critical resistance, when all other methods of influence have been exhausted.' },
          { type: 'paragraph', text: 'At the core of the ritual lies the principle of "Death and Rebirth". Through appeal to the Forces of Death, a deep cleansing and zeroing of the person\'s will resource is performed. In place of the burned-out fears, grievances and external attachments, the master forms a new foundation of personality.' },
          { type: 'heading', text: 'Stages of fundamental transformation' },
          { type: 'list', items: [
            'Annihilation of will: total paralysis of decision-making mechanisms. Removal of all types of defenses (natural, egregorial, ancestral).',
            'Event isolation: burning out all extraneous attachments. Friends, relatives and other sympathies cease to exist in the subject\'s value field.',
            'Matrix replacement: embedding of a new emotional matrix. An effect of "true love" is created, in which the subject is convinced that their attraction is their own hard-won and only true feeling.',
            'Necro-fixation: consolidation of results through cemetery seals. This guarantees that the created bond will not be destroyed by time or attempts at external magical assistance.',
          ]},
          { type: 'heading', text: 'Who is this service for' },
          { type: 'paragraph', text: 'For those who demand an absolute result and do not accept refusals. For those who understand the scale of the intervention and wish to obtain a partner whose thoughts, feelings and actions will be completely subordinated to the client\'s will.' },
          { type: 'quote', text: 'I practice an individual ritual approach to each case. If for personal convictions, religious views or internal concerns you do not accept working through the cemetery — this is not an obstacle to resolving your issue. At your request, cemetery methods can be completely replaced by alternative paths. The result remains unchanged.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Приворот',
        price: 'від 2 000 € до 30 000 € (варіюється залежно від ієрархічного статусу об\'єкта та складності ритуального протоколу)',
        duration: 'Розраховується індивідуально після розкриття полів об\'єкта',
        shortDescription: 'Радикальний злам природних захистів об\'єкта з подальшим демонтажем вольових центрів. Повне перезаписування внутрішнього коду людини: створення безумовної домінанти закоханості та залежності від клієнта на місці знищених програм опору.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Дана робота — це вища форма некромагічного впливу, спрямована на примусову перебудову долі та психіки об\'єкта. Метод застосовується у ситуаціях критичного опору, коли будь-які інші методи впливу вичерпані.' },
          { type: 'paragraph', text: 'В основі ритуалу лежить принцип «Смерті та Відродження». Через звернення до Сил Смерті проводиться глибоке очищення та обнулення вольового ресурсу людини. На місці випалених страхів, образ та сторонніх прив\'язаностей майстер формує новий фундамент особистості.' },
          { type: 'heading', text: 'Етапи фундаментальної трансформації' },
          { type: 'list', items: [
            'Анігіляція волі: тотальний параліч механізмів прийняття рішень. Зняття всіх видів захистів (природних, егрегоріальних, родових).',
            'Подієва ізоляція: випалювання всіх сторонніх прив\'язаностей. Друзі, родичі та інші симпатії перестають існувати у ціннісному полі об\'єкта.',
            'Матричне заміщення: вбудовування нової емоційної матриці. Створюється ефект «справжнього кохання», при якому об\'єкт переконаний, що його потяг — це його власне, вистраждане і єдино вірне почуття.',
            'Некро-фіксація: закріплення результату через цвинтарні печатки. Це гарантує, що створений зв\'язок не буде зруйнований часом або спробами сторонньої магічної допомоги.',
          ]},
          { type: 'heading', text: 'Для кого ця послуга' },
          { type: 'paragraph', text: 'Для тих, хто вимагає абсолютного результату та не приймає відмов. Для тих, хто усвідомлює масштаб втручання та бажає отримати партнера, чиї думки, почуття та дії будуть повністю підпорядковані волі замовника.' },
          { type: 'quote', text: 'Я практикую індивідуальний ритуальний підхід до кожного випадку. Якщо за особистими переконаннями, релігійними поглядами або внутрішніми побоюваннями ви не приймаєте роботу через цвинтар — це не є перешкодою для вирішення вашого питання. На ваш запит цвинтарні методи можуть бути повністю замінені альтернативними шляхами. Результат залишається незмінним.' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'destructive-curses-supreme',
      category: 'rituals',
      price: 'от 1 500 € до неограниченного бюджета (зависит от статуса цели, наличия защит и тяжести выбранного финала)',
      duration: '',
      format: 'offline' as const,
      order: 6,
      isActive: true,
      ru: {
        title: 'Деструктивные воздействия высшего порядка (Порчи)',
        shortDescription: 'Бескомпромиссное сокрушение любых сфер жизни цели. Направленное разрушение здоровья, финансов, социальных связей или полная ликвидация личности. Работа с гарантией невозможности снятия.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Деструктивная магия в моём исполнении — это не временные неприятности для вашего оппонента, а необратимый процесс демонтажа его реальности. Каждая работа выстраивается индивидуально под ваш запрос: от тотального финансового краха и социальной изоляции до критического поражения здоровья и полного жизненного тупика.' },
          { type: 'paragraph', text: 'Методы воздействия выбираются исходя из конечной цели, которую вы ставите передо мной. Силы, привлекаемые для работы, обеспечивают глубокое проникновение в структуру судьбы объекта, делая процесс разрушения неизбежным и планомерным.' },
          { type: 'heading', text: 'Ключевые особенности работ' },
          { type: 'list', items: [
            'Индивидуальный протокол: вы сами определяете глубину и характер ущерба. Инструментарий подбирается под сложность задачи — от закрытия путей до полного извода.',
            'Абсолютная герметичность: на каждое воздействие устанавливаются авторские погостные печати и замки, которые блокируют любые попытки стороннего вмешательства.',
            'Необратимость: работы защищены от «просмотров» и попыток снятия другими практиками.',
            'Отсутствие отката для заказчика: весь обратный удар и кармическая нагрузка полностью перекрываются защитными протоколами.',
          ]},
          { type: 'heading', text: 'Варианты воздействия' },
          { type: 'list', items: [
            'Разрушение бизнеса и финансовое обнуление.',
            'Изгнание и социальная смерть (потеря репутации, семьи, друзей).',
            'Поражение физического и психического здоровья.',
            'Ликвидация защиты и удачи (человек становится «открытой мишенью» для любого негатива).',
          ]},
        ]),
        faq: [],
      },
      en: {
        title: 'Supreme Destructive Curses',
        price: 'from 1,500 € to unlimited budget (depends on the target\'s status, presence of protections and severity of the chosen outcome)',
        duration: '',
        shortDescription: 'Uncompromising destruction of any spheres of the target\'s life. Directed destruction of health, finances, social connections or complete liquidation of personality. Work with a guarantee of impossibility of removal.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Destructive magic in my execution is not temporary troubles for your opponent, but an irreversible process of dismantling their reality. Each work is individually tailored to your request: from total financial ruin and social isolation to critical health damage and complete life deadlock.' },
          { type: 'paragraph', text: 'Methods of influence are chosen based on the final goal you set before me. The Forces engaged for the work ensure deep penetration into the structure of the subject\'s destiny, making the process of destruction inevitable and systematic.' },
          { type: 'heading', text: 'Key features of the works' },
          { type: 'list', items: [
            'Individual protocol: you yourself determine the depth and nature of the damage. The toolkit is selected for the complexity of the task — from closing paths to complete extirpation.',
            'Absolute hermeticism: proprietary graveyard seals and locks are placed on each working, blocking any attempts at external interference.',
            'Irreversibility: the works are protected from "readings" and removal attempts by other practitioners.',
            'No backlash for the client: all return strikes and karmic load are completely covered by protective protocols.',
          ]},
          { type: 'heading', text: 'Variants of influence' },
          { type: 'list', items: [
            'Destruction of business and financial zeroing.',
            'Exile and social death (loss of reputation, family, friends).',
            'Damage to physical and mental health.',
            'Liquidation of protection and luck (the person becomes an "open target" for any negativity).',
          ]},
        ]),
        faq: [],
      },
      uk: {
        title: 'Деструктивні впливи вищого порядку (Псування)',
        price: 'від 1 500 € до необмеженого бюджету (залежить від статусу цілі, наявності захистів та тяжкості обраного фіналу)',
        duration: '',
        shortDescription: 'Безкомпромісне знищення будь-яких сфер життя цілі. Спрямоване руйнування здоров\'я, фінансів, соціальних зв\'язків або повна ліквідація особистості. Робота з гарантією неможливості зняття.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Деструктивна магія у моєму виконанні — це не тимчасові неприємності для вашого опонента, а незворотній процес демонтажу його реальності. Кожна робота вибудовується індивідуально під ваш запит: від тотального фінансового краху та соціальної ізоляції до критичного ураження здоров\'я та повного життєвого глухого кута.' },
          { type: 'paragraph', text: 'Методи впливу обираються виходячи з кінцевої мети, яку ви ставите переді мною. Сили, що залучаються для роботи, забезпечують глибоке проникнення у структуру долі об\'єкта, роблячи процес руйнування неминучим та планомірним.' },
          { type: 'heading', text: 'Ключові особливості робіт' },
          { type: 'list', items: [
            'Індивідуальний протокол: ви самі визначаєте глибину та характер шкоди. Інструментарій підбирається під складність завдання — від закриття шляхів до повного виводу.',
            'Абсолютна герметичність: на кожен вплив встановлюються авторські погостні печатки та замки, що блокують будь-які спроби стороннього втручання.',
            'Незворотність: роботи захищені від «переглядів» та спроб зняття іншими практиками.',
            'Відсутність відкату для замовника: весь зворотний удар та кармічне навантаження повністю перекриваються захисними протоколами.',
          ]},
          { type: 'heading', text: 'Варіанти впливу' },
          { type: 'list', items: [
            'Руйнування бізнесу та фінансове обнулення.',
            'Вигнання та соціальна смерть (втрата репутації, сім\'ї, друзів).',
            'Ураження фізичного та психічного здоров\'я.',
            'Ліквідація захисту та удачі (людина стає «відкритою мішенню» для будь-якого негативу).',
          ]},
        ]),
        faq: [],
      },
    },
    {
      slug: 'golden-allure-absolute-attractiveness',
      category: 'rituals',
      price: '3000 €',
      duration: 'Долгосрочное удержание структуры морока с мягким входом в событийный ряд',
      format: 'offline' as const,
      order: 7,
      isActive: true,
      ru: {
        title: 'Золотой Морок: Абсолютная аттрактивность',
        shortDescription: 'Создание сверхмощного поля притяжения и эстетического очарования. Элитарный ритуал, превращающий вас в центр притяжения для окружающих, вызывая искреннее восхищение и желание быть рядом.',
        fullDescription: lexical([
          { type: 'paragraph', text: '«Золотой Морок» — это ювелирная работа с вашим социальным и энергетическим обликом. В отличие от стандартных оморочек, данный ритуал не просто накладывает временную маску, а меняет само излучение ваших тонких тел. Вы становитесь подобны «сакральному мёду»: люди подсознательно тянутся к вам, стремясь получить ваше внимание, одобрение или просто находиться в вашем поле.' },
          { type: 'paragraph', text: 'Мастер выстраивает структуру морока таким образом, чтобы ваше присутствие вызывало у окружающих прилив дофамина и безотчётное доверие. Это идеальный инструмент для тех, кому необходимо безусловное расположение общества.' },
          { type: 'heading', text: 'Преимущества данной работы' },
          { type: 'list', items: [
            'Всеобщая симпатия: вы становитесь одинаково притягательны как для мужчин, так и для женщин. Окружающие начинают видеть в вас эталон привлекательности и харизмы.',
            'Блокировка негатива: ваше сияние не вызывает зависти, злобы или осуждения. Вместо конкуренции люди испытывают к вам искреннее благоговение.',
            'Социальный лифт: к вам начинают прислушиваться, ваши просьбы выполняются охотнее, а двери, которые раньше были закрыты, открываются сами собой.',
            'Эффект «Свечения»: морок работает мягко и естественно. Окружающим будет казаться, что вы просто обладаете невероятным внутренним светом и природным магнетизмом.',
          ]},
          { type: 'heading', text: 'Кому необходим этот ритуал?' },
          { type: 'list', items: [
            'Лидерам и публичным персонам для укрепления своего влияния.',
            'Тем, кто хочет получать «весь сок» от жизни: лучшие предложения, внимание статусных партнёров и лёгкое решение любых вопросов.',
            'Всем, кто желает стереть из восприятия окружающих свои недостатки и подсветить достоинства до уровня идеала.',
          ]},
        ]),
        faq: [],
      },
      en: {
        title: 'Golden Allure: Absolute Attractiveness',
        price: '3000 €',
        duration: 'Long-term maintenance of the allure structure with a gentle entry into the event series',
        shortDescription: 'Creation of an ultra-powerful field of attraction and aesthetic enchantment. An elite ritual that transforms you into a center of attraction for those around you, evoking genuine admiration and a desire to be near.',
        fullDescription: lexical([
          { type: 'paragraph', text: '"Golden Allure" is a jeweler\'s work with your social and energetic image. Unlike standard glamour workings, this ritual does not simply overlay a temporary mask, but changes the very radiation of your subtle bodies. You become like "sacred honey": people subconsciously gravitate toward you, seeking your attention, approval or simply to be in your field.' },
          { type: 'paragraph', text: 'The master constructs the allure structure so that your presence evokes in those around you a dopamine surge and instinctive trust. This is the ideal tool for those who need unconditional approval from society.' },
          { type: 'heading', text: 'Advantages of this work' },
          { type: 'list', items: [
            'Universal sympathy: you become equally attractive to both men and women. Those around you begin to see in you a standard of attractiveness and charisma.',
            'Blocking negativity: your radiance does not provoke envy, malice or condemnation. Instead of competition, people experience genuine reverence toward you.',
            'Social elevator: people begin to listen to you, your requests are fulfilled more readily, and doors that were previously closed open by themselves.',
            'The "Radiance" effect: the allure works softly and naturally. Those around you will feel that you simply possess incredible inner light and natural magnetism.',
          ]},
          { type: 'heading', text: 'Who needs this ritual?' },
          { type: 'list', items: [
            'Leaders and public figures for strengthening their influence.',
            'Those who want to get "the best of everything" from life: the best offers, attention from high-status partners and easy resolution of any questions.',
            'All who wish to erase their flaws from others\' perception and highlight their advantages to the level of an ideal.',
          ]},
        ]),
        faq: [],
      },
      uk: {
        title: 'Золотий Морок: Абсолютна атрактивність',
        price: '3000 €',
        duration: 'Довгострокове утримання структури мороку з м\'яким входом у подієвий ряд',
        shortDescription: 'Створення надпотужного поля тяжіння та естетичного чарування. Елітарний ритуал, що перетворює вас на центр тяжіння для оточуючих, викликаючи щире захоплення та бажання бути поруч.',
        fullDescription: lexical([
          { type: 'paragraph', text: '«Золотий Морок» — це ювелірна робота з вашим соціальним та енергетичним виглядом. На відміну від стандартних оморочок, даний ритуал не просто накладає тимчасову маску, а змінює саме випромінювання ваших тонких тіл. Ви стаєте подібними до «сакрального меду»: люди підсвідомо тягнуться до вас, прагнучи отримати вашу увагу, схвалення або просто перебувати у вашому полі.' },
          { type: 'paragraph', text: 'Майстер вибудовує структуру мороку таким чином, щоб ваша присутність викликала у оточуючих приплив дофаміну та безоглядну довіру. Це ідеальний інструмент для тих, кому необхідне безумовне розташування суспільства.' },
          { type: 'heading', text: 'Переваги даної роботи' },
          { type: 'list', items: [
            'Загальна симпатія: ви стаєте однаково привабливими як для чоловіків, так і для жінок. Оточуючі починають бачити у вас еталон привабливості та харизми.',
            'Блокування негативу: ваше сяйво не викликає заздрощів, злоби або осуду. Замість конкуренції люди відчувають до вас щиру пошану.',
            'Соціальний ліфт: до вас починають прислухатися, ваші прохання виконуються охочіше, а двері, що раніше були зачинені, відчиняються самі по собі.',
            'Ефект «Сяяння»: морок працює м\'яко та природно. Оточуючим здаватиметься, що ви просто маєте неймовірне внутрішнє світло та природний магнетизм.',
          ]},
          { type: 'heading', text: 'Кому необхідний цей ритуал?' },
          { type: 'list', items: [
            'Лідерам та публічним персонам для зміцнення свого впливу.',
            'Тим, хто хоче отримувати «весь сік» від життя: кращі пропозиції, увагу статусних партнерів та легке вирішення будь-яких питань.',
            'Всім, хто бажає стерти зі сприйняття оточуючих свої недоліки та підсвітити переваги до рівня ідеалу.',
          ]},
        ]),
        faq: [],
      },
    },
    {
      slug: 'situational-illusion-perception-control',
      category: 'rituals',
      price: 'от 1 500 € до 3 500 € (зависит от масштаба аудитории и сложности скрываемого события)',
      duration: 'Адаптируется под конкретную задачу заказчика',
      format: 'offline' as const,
      order: 8,
      isActive: true,
      ru: {
        title: 'Ситуативный Морок: Управление восприятием',
        shortDescription: 'Создание контролируемой иллюзии для решения конкретных задач. Позволяет скрыть нежелательные факты, события или сформировать у окружающих строго определённый образ заказчика.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Ситуативный Морок — это ювелирная работа с чужим вниманием и восприятием реальности. Ритуал предназначен для тех случаев, когда необходимо направить мысли и взгляды окружающих по ложному следу или, напротив, заставить их поверить в созданную вами легенду. Это идеальный инструмент для защиты репутации, сохранения тайн и стратегического влияния на мнение важных для вас людей.' },
          { type: 'paragraph', text: 'Мастер выстраивает вокруг вас или конкретного события «информационный щит», который мягко, но уверенно подменяет истинные факты желаемой картиной. Окружающие будут видеть, слышать и запоминать только то, что выгодно вам.' },
          { type: 'heading', text: 'Возможности ритуала' },
          { type: 'list', items: [
            'Сокрытие тайн: создание «слепой зоны» вокруг определённых событий, фактов вашей биографии или текущих действий.',
            'Проекция образа: прошивка в сознание людей нужных вам качеств (статусность, компетентность, надёжность, невинность).',
            'Искажение реальности: морок позволяет «сгладить» последствия ошибок или представить спорные ситуации в выгодном для вас свете.',
            'Отвод внимания: ритуал заставляет ненужных свидетелей или проверяющих терять интерес к объекту.',
          ]},
          { type: 'heading', text: 'Кому необходима эта услуга?' },
          { type: 'list', items: [
            'Людям, находящимся в эпицентре интриг, проверок или судебных разбирательств.',
            'Тем, кому нужно быстро и убедительно изменить свой социальный статус или имидж в глазах конкретной группы людей.',
            'Всем, кто владеет конфиденциальной информацией и нуждается в абсолютной гарантии её сохранности.',
          ]},
        ]),
        faq: [],
      },
      en: {
        title: 'Situational Illusion: Perception Control',
        price: 'from 1,500 € to 3,500 € (depends on the scale of the audience and the complexity of the concealed event)',
        duration: 'Adapted to the specific task of the client',
        shortDescription: 'Creation of a controlled illusion for solving specific tasks. Allows hiding undesirable facts, events or forming a strictly defined image of the client in the minds of those around them.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'The Situational Illusion is a jeweler\'s work with others\' attention and perception of reality. The ritual is intended for cases when it is necessary to direct the thoughts and gazes of those around you down a false trail, or conversely, to make them believe in a legend you have created. This is the ideal tool for protecting reputation, preserving secrets and strategically influencing the opinions of people important to you.' },
          { type: 'paragraph', text: 'The master builds around you or a specific event an "information shield" that softly but confidently substitutes the true facts with the desired picture. Those around you will see, hear and remember only what is advantageous to you.' },
          { type: 'heading', text: 'Capabilities of the ritual' },
          { type: 'list', items: [
            'Concealing secrets: creating a "blind zone" around certain events, facts of your biography or current actions.',
            'Projecting an image: embedding into people\'s consciousness the qualities you need (status, competence, reliability, innocence).',
            'Reality distortion: the illusion allows "smoothing out" the consequences of mistakes or presenting controversial situations in a light favorable to you.',
            'Diverting attention: the ritual causes unnecessary witnesses or inspectors to lose interest in the subject.',
          ]},
          { type: 'heading', text: 'Who needs this service?' },
          { type: 'list', items: [
            'People at the epicenter of intrigues, investigations or legal proceedings.',
            'Those who need to quickly and convincingly change their social status or image in the eyes of a specific group of people.',
            'All who possess confidential information and need an absolute guarantee of its security.',
          ]},
        ]),
        faq: [],
      },
      uk: {
        title: 'Ситуативний Морок: Управління сприйняттям',
        price: 'від 1 500 € до 3 500 € (залежить від масштабу аудиторії та складності події, що приховується)',
        duration: 'Адаптується під конкретне завдання замовника',
        shortDescription: 'Створення контрольованої ілюзії для вирішення конкретних завдань. Дозволяє приховати небажані факти, події або сформувати у оточуючих суворо визначений образ замовника.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Ситуативний Морок — це ювелірна робота з чужою увагою та сприйняттям реальності. Ритуал призначений для тих випадків, коли необхідно спрямувати думки та погляди оточуючих хибним слідом або, навпаки, змусити їх повірити у створену вами легенду. Це ідеальний інструмент для захисту репутації, збереження таємниць та стратегічного впливу на думку важливих для вас людей.' },
          { type: 'paragraph', text: 'Майстер вибудовує навколо вас або конкретної події «інформаційний щит», який м\'яко, але впевнено підміняє справжні факти бажаною картиною. Оточуючі бачитимуть, чутимуть та запам\'ятовуватимуть лише те, що вигідно вам.' },
          { type: 'heading', text: 'Можливості ритуалу' },
          { type: 'list', items: [
            'Приховування таємниць: створення «сліпої зони» навколо певних подій, фактів вашої біографії або поточних дій.',
            'Проекція образу: прошивка у свідомість людей потрібних вам якостей (статусність, компетентність, надійність, невинність).',
            'Спотворення реальності: морок дозволяє «згладити» наслідки помилок або представити спірні ситуації у вигідному для вас світлі.',
            'Відведення уваги: ритуал змушує непотрібних свідків або перевіряючих втрачати інтерес до об\'єкта.',
          ]},
          { type: 'heading', text: 'Кому необхідна ця послуга?' },
          { type: 'list', items: [
            'Людям, що знаходяться в епіцентрі інтриг, перевірок або судових розглядів.',
            'Тим, кому потрібно швидко та переконливо змінити свій соціальний статус або імідж в очах конкретної групи людей.',
            'Всім, хто володіє конфіденційною інформацією та потребує абсолютної гарантії її збереження.',
          ]},
        ]),
        faq: [],
      },
    },
    {
      slug: 'exorcism-entity-banishment-supreme',
      category: 'rituals',
      price: 'от 5000 € (стоимость обусловлена высоким риском для мастера и сложностью протоколов защиты)',
      duration: 'Весь цикл включает подготовку, основной обряд изгнания и период реабилитации под наблюдением мастера',
      format: 'both' as const,
      order: 9,
      isActive: true,
      ru: {
        title: 'Экзорцизм и изгнание сущностей высшего порядка',
        shortDescription: 'Безоговорочное извлечение и ликвидация инородных структур, подселений и паразитирующих сущностей из энергоинформационного поля человека. Радикальное освобождение сознания и тела.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Это сложнейший и опасный вид магической работы, направленный на устранение прямых угроз вашей духовной и физической целостности. Изгнание проводится в случаях глубокого поражения сущностями различной природы: от неупокоенных мертвецов и бесовских подселений до древних паразитарных структур и сущностей иерархического порядка.' },
          { type: 'paragraph', text: 'Процесс подразумевает полное вскрытие ваших полей и принудительное расторжение всех контрактов и связей, удерживающих сущность внутри вашей системы. Это не мягкая чистка, а полноценная экзекуция инородного сознания.' },
          { type: 'heading', text: 'Особенности проведения' },
          { type: 'list', items: [
            'Личное участие: данный обряд проводится только с вашим непосредственным участием. Мастеру необходим прямой доступ к вашим проводникам энергии.',
            'Расторжение пактов: мы не просто «выгоняем» гостя, а уничтожаем сами юридические и магические основания его нахождения в вашем поле.',
            'Восстановление целостности: после изгнания проводится немедленное латание «разрывов» в энергетике и установка мощнейших блокирующих печатей.',
          ]},
          { type: 'heading', text: 'Кому необходима эта работа?' },
          { type: 'list', items: [
            'Тем, кто ощущает присутствие «чужого» внутри себя, слышит голоса или совершает несвойственные себе поступки.',
            'Людям с диагнозами, которые не поддаются медицине и имеют явный эзотерический корень (внезапные приступы, провалы в памяти, резкая смена личности).',
            'Практикам, получившим подселение в ходе магических войн или ошибок в ритуалах.',
            'Тем, чья жизнь стремительно разрушается из-за аномальной утечки ресурса в пользу паразитирующей силы.',
          ]},
          { type: 'paragraph', text: 'Результат: возвращение контроля над собственным разумом и телом. Прекращение энергетического истощения, восстановление психического здоровья и полная зачистка вашего пространства от следов присутствия иных Сил.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Exorcism and Supreme Entity Banishment',
        price: 'from 5000 € (price reflects the high risk to the master and the complexity of protection protocols)',
        duration: 'The full cycle includes preparation, the main banishment rite and a rehabilitation period under the master\'s supervision',
        shortDescription: 'Unconditional extraction and liquidation of foreign structures, intrusions and parasitic entities from a person\'s energy-informational field. Radical liberation of consciousness and body.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This is the most complex and dangerous type of magical work, aimed at eliminating direct threats to your spiritual and physical integrity. Banishment is conducted in cases of deep affliction by entities of various nature: from unquiet dead and demonic intrusions to ancient parasitic structures and entities of hierarchical order.' },
          { type: 'paragraph', text: 'The process involves the complete opening of your fields and the forced dissolution of all contracts and connections holding the entity within your system. This is not a gentle cleansing, but a full-scale execution of an alien consciousness that destroys your will, health and personality.' },
          { type: 'heading', text: 'Features of the process' },
          { type: 'list', items: [
            'Personal participation: this rite is conducted only with your direct participation. The master needs direct access to your energy conductors.',
            'Dissolution of pacts: we do not simply "expel" the guest, but destroy the very legal and magical grounds for its presence in your field.',
            'Restoration of integrity: after the banishment, immediate patching of "ruptures" in the energetics is conducted and the most powerful blocking seals are installed.',
          ]},
          { type: 'heading', text: 'Who needs this work?' },
          { type: 'list', items: [
            'Those who sense the presence of "something alien" inside themselves, hear voices or perform actions uncharacteristic of themselves.',
            'People with diagnoses that do not respond to medicine and have a clear esoteric root (sudden attacks, memory blackouts, sharp personality changes).',
            'Practitioners who have received an intrusion during magical wars or ritual mistakes.',
            'Those whose life is rapidly deteriorating due to anomalous resource leakage in favor of a parasitic force.',
          ]},
          { type: 'paragraph', text: 'Result: restoration of control over one\'s own mind and body. Cessation of energetic exhaustion, restoration of mental health and complete clearance of your space from traces of the presence of other Forces.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Екзорцизм та вигнання сутностей вищого порядку',
        price: 'від 5000 € (вартість обумовлена високим ризиком для майстра та складністю протоколів захисту)',
        duration: 'Весь цикл включає підготовку, основний обряд вигнання та період реабілітації під наглядом майстра',
        shortDescription: 'Безоглядне вилучення та ліквідація чужорідних структур, підселень та паразитуючих сутностей із енергоінформаційного поля людини. Радикальне звільнення свідомості та тіла.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Це найскладніший та небезпечний вид магічної роботи, спрямований на усунення прямих загроз вашій духовній та фізичній цілісності. Вигнання проводиться у випадках глибокого ураження сутностями різної природи: від неупокоєних мерців та бісівських підселень до давніх паразитарних структур та сутностей ієрархічного порядку.' },
          { type: 'paragraph', text: 'Процес передбачає повне розкриття ваших полів та примусове розторгнення всіх контрактів та зв\'язків, що утримують сутність всередині вашої системи. Це не м\'яке очищення, а повноцінна екзекуція чужорідної свідомості.' },
          { type: 'heading', text: 'Особливості проведення' },
          { type: 'list', items: [
            'Особиста участь: даний обряд проводиться лише з вашою безпосередньою участю. Майстру необхідний прямий доступ до ваших провідників енергії.',
            'Розторгнення пактів: ми не просто «виганяємо» гостя, а знищуємо самі юридичні та магічні підстави його перебування у вашому полі.',
            'Відновлення цілісності: після вигнання проводиться негайне латання «розривів» в енергетиці та встановлення найпотужніших блокуючих печаток.',
          ]},
          { type: 'heading', text: 'Кому необхідна ця робота?' },
          { type: 'list', items: [
            'Тим, хто відчуває присутність «чужого» всередині себе, чує голоси або здійснює невластиві собі вчинки.',
            'Людям із діагнозами, що не піддаються медицині та мають явний езотеричний корінь (раптові напади, провали пам\'яті, різка зміна особистості).',
            'Практикам, що отримали підселення під час магічних воєн або помилок у ритуалах.',
            'Тим, чиє життя стрімко руйнується через аномальний витік ресурсу на користь паразитуючої сили.',
          ]},
          { type: 'paragraph', text: 'Результат: повернення контролю над власним розумом та тілом. Припинення енергетичного виснаження, відновлення психічного здоров\'я та повне зачищення вашого простору від слідів присутності інших Сил.' },
        ]),
        faq: [],
      },
    },
    {
      slug: 'energy-revival-death-deflection',
      category: 'rituals',
      price: 'от 3 000 €',
      duration: 'Индивидуальный цикл сопровождения до стабилизации состояния',
      format: 'both' as const,
      order: 10,
      isActive: true,
      ru: {
        title: 'Энергетическая реанимация и Отвод смерти',
        shortDescription: 'Экстремальная работа по восстановлению жизненного ресурса при тяжёлых заболеваниях. Магическая поддержка организма, направленная на блокировку программы ухода и перенаправление критических ударов судьбы.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Данный комплекс направлен на работу с самой тонкой и опасной гранью человеческого бытия. В ситуациях, когда физическое тело истощено болезнью (в том числе онкологическими процессами), магическая помощь концентрируется на удержании жизненной искры и восстановлении воли к жизни.' },
          { type: 'paragraph', text: 'Работа включает в себя Отвод смерти — сакральный ритуал, позволяющий сместить вектор фатальных событий и выиграть время для восстановления организма. Мастер работает с событийным рядом, «закрывая» клиента от преждевременного финала и укрепляя его связь с миром живых.' },
          { type: 'heading', text: 'Что включает в себя работа' },
          { type: 'list', items: [
            'Энергоподдержка при онкологии: очищение тонких тел от программ «саморазрушения», подпитка истощённых ресурсов и снятие магических причин, спровоцировавших болезнь.',
            'Отвод Смерти: ритуал перенаправления фатальной энергии, позволяющий отвести «чёрное крыло» и дать организму шанс на стабилизацию.',
            'Укрепление Витальности: работа с Родовыми каналами и Силами Жизни для восстановления естественной защиты и иммунитета на тонком плане.',
            'Психоэмоциональный щит: устранение страха, апатии и программ смирения с болезнью, которые часто блокируют процесс выздоровления.',
          ]},
          { type: 'heading', text: 'Важные условия' },
          { type: 'list', items: [
            'Личное участие: работа требует колоссальной концентрации со стороны клиента. Обряд проводится только с вашим личным участием.',
            'Синхронизация: магическая работа выступает как мощнейший катализатор и поддержка вашего духа, пока медицина занимается вашим телом.',
          ]},
        ]),
        faq: [
          {
            question: 'Является ли эта услуга альтернативой медицинскому лечению?',
            answer: 'Нет. Данная услуга не является альтернативой медицинскому лечению. Вы обязаны продолжать терапию, назначенную врачами. Магия работает на уровне причин и энергий, медицина — на уровне физики. Только комплексный подход даёт шанс на успех.',
          },
        ],
      },
      en: {
        title: 'Energy Revival and Death Deflection',
        price: 'from 3,000 €',
        duration: 'Individual support cycle until condition stabilizes',
        shortDescription: 'Extreme work for restoring life resources in serious illnesses. Magical support of the organism aimed at blocking the departure program and redirecting critical blows of fate.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This complex is aimed at working with the most delicate and dangerous edge of human existence. In situations where the physical body is exhausted by illness (including oncological processes), magical assistance concentrates on holding the life spark and restoring the will to live.' },
          { type: 'paragraph', text: 'The work includes the Deflection of Death — a sacred ritual that allows shifting the vector of fatal events and buying time for the organism\'s recovery. The master works with the event series, "closing" the client from premature finale and strengthening their connection with the world of the living.' },
          { type: 'heading', text: 'What the work includes' },
          { type: 'list', items: [
            'Energy support in oncology: cleansing the subtle bodies of "self-destruction" programs, nourishing depleted resources and removing magical causes (if any) that provoked the illness.',
            'Deflection of Death: a ritual for redirecting fatal energy, allowing the "black wing" to be deflected and giving the organism a chance for stabilization.',
            'Strengthening Vitality: work with Ancestral channels and Life Forces to restore natural protection and immunity on the subtle plane.',
            'Psycho-emotional shield: elimination of fear, apathy and programs of resignation to illness, which often block the recovery process.',
          ]},
          { type: 'heading', text: 'Important conditions' },
          { type: 'list', items: [
            'Personal participation: the work requires colossal concentration from the client. The rite is conducted only with your personal participation.',
            'Synchronization: magical work acts as a powerful catalyst and support for your spirit, while medicine works on your body.',
          ]},
        ]),
        faq: [
          {
            question: 'Is this service an alternative to medical treatment?',
            answer: 'No. This service is not an alternative to medical treatment. You are obligated to continue the therapy prescribed by doctors. Magic works on the level of causes and energies, medicine works on the physical level. Only a comprehensive approach gives a chance for success.',
          },
        ],
      },
      uk: {
        title: 'Енергетична реанімація та Відведення смерті',
        price: 'від 3 000 €',
        duration: 'Індивідуальний цикл супроводу до стабілізації стану',
        shortDescription: 'Екстремальна робота з відновлення життєвого ресурсу при важких захворюваннях. Магічна підтримка організму, спрямована на блокування програми відходу та перенаправлення критичних ударів долі.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Даний комплекс спрямований на роботу з найтоншою та найнебезпечнішою гранню людського буття. У ситуаціях, коли фізичне тіло виснажене хворобою (у тому числі онкологічними процесами), магічна допомога концентрується на утриманні життєвої іскри та відновленні волі до життя.' },
          { type: 'paragraph', text: 'Робота включає Відведення смерті — сакральний ритуал, що дозволяє змістити вектор фатальних подій та виграти час для відновлення організму. Майстер працює з подієвим рядом, «закриваючи» клієнта від передчасного фіналу та зміцнюючи його зв\'язок зі світом живих.' },
          { type: 'heading', text: 'Що включає в себе робота' },
          { type: 'list', items: [
            'Енергопідтримка при онкології: очищення тонких тіл від програм «саморуйнування», підживлення виснажених ресурсів та зняття магічних причин (якщо такі є), що спровокували хворобу.',
            'Відведення Смерті: ритуал перенаправлення фатальної енергії, що дозволяє відвести «чорне крило» та дати організму шанс на стабілізацію.',
            'Зміцнення Вітальності: робота з Родовими каналами та Силами Життя для відновлення природного захисту та імунітету на тонкому плані.',
            'Психоемоційний щит: усунення страху, апатії та програм примирення з хворобою, які часто блокують процес одужання.',
          ]},
          { type: 'heading', text: 'Важливі умови' },
          { type: 'list', items: [
            'Особиста участь: робота вимагає колосальної концентрації з боку клієнта. Обряд проводиться лише з вашою особистою участю.',
            'Синхронізація: магічна робота виступає як наймогутніший каталізатор та підтримка вашого духу, поки медицина займається вашим тілом.',
          ]},
        ]),
        faq: [
          {
            question: 'Чи є ця послуга альтернативою медичному лікуванню?',
            answer: 'Ні. Дана послуга не є альтернативою медичному лікуванню. Ви зобов\'язані продовжувати терапію, призначену лікарями. Магія працює на рівні причин та енергій, медицина — на рівні фізики. Лише комплексний підхід дає шанс на успіх.',
          },
        ],
      },
    },

    // === СОПРОВОЖДЕНИЕ ===
    {
      slug: 'personal-magical-support-total-control',
      category: 'support',
      price: '15 000 € / месяц',
      duration: '1 месяц (доступность: не более 1–2 человек в месяц)',
      format: 'both' as const,
      order: 1,
      isActive: true,
      ru: {
        title: 'Персональное магическое сопровождение: Total Control',
        shortDescription: 'Месяц эксклюзивного ведения вашей жизни мастером. Полный аутсорсинг магической безопасности и событийного ряда. Решение любых задач в режиме реального времени и круглосуточная поддержка.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Это формат высшего доверия и максимальной эффективности. В рамках персонального сопровождения вы передаёте контроль над энергетической и событийной безопасностью в руки мастера. Это не просто набор ритуалов, а непрерывная работа по выстраиванию вашей реальности, защите ваших интересов и устранению любых препятствий в момент их возникновения.' },
          { type: 'paragraph', text: 'Весь месяц мастер находится в вашем поле, становясь вашим личным щитом и инструментом достижения целей.' },
          { type: 'heading', text: 'Что входит в пакет сопровождения' },
          { type: 'list', items: [
            'Ритуальное решение любых задач: ритуалы выполняются по первому требованию без доплаты — открытие дорог, оморочка на переговоры, экстренная чистка и всё что угодно.',
            'Непрерывная диагностика: ежедневный мониторинг вашего состояния и событийных веток. Проблемы купируются ещё до того, как проявятся на физическом плане.',
            'Приоритет 24/7: личный номер мастера для связи в любое время суток.',
            'Абсолютная защита: на протяжении всего месяца удерживается купол активной защиты, блокирующий любые попытки негативных воздействий.',
            'Коррекция судьбы: оперативная правка вашего пути для достижения максимального результата в кратчайшие сроки.',
          ]},
          { type: 'heading', text: 'Для кого эта услуга?' },
          { type: 'paragraph', text: 'Для владельцев крупного бизнеса, публичных персон и людей, находящихся в состоянии затяжных магических или социальных войн, где любая ошибка может стоить слишком дорого. Для тех, кто ценит своё время и хочет иметь за спиной силу, способную решить любой вопрос одним ритуалом.' },
        ]),
        faq: [
          {
            question: 'Сколько клиентов принимается одновременно?',
            answer: 'Не более 1–2 человек в месяц для сохранения максимальной концентрации мастера и качества работы.',
          },
        ],
      },
      en: {
        title: 'Personal Magical Support: Total Control',
        price: '15,000 € / month',
        duration: '1 month (availability: no more than 1–2 people per month)',
        shortDescription: 'A month of exclusive management of your life by the master. Complete outsourcing of magical security and the event series. Resolution of any tasks in real time and round-the-clock support.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This is a format of highest trust and maximum efficiency. Within the framework of personal support, you transfer control over energetic and event security into the master\'s hands. This is not simply a set of rituals, but continuous work on building your reality, protecting your interests and eliminating any obstacles at the moment they arise.' },
          { type: 'paragraph', text: 'Throughout the entire month, the master is in your field, becoming your personal shield and instrument for achieving goals.' },
          { type: 'heading', text: 'What is included in the support package' },
          { type: 'list', items: [
            'Ritual resolution of any tasks: rituals are performed on first request without additional payment — road opening, glamour for negotiations, emergency cleansing and anything else.',
            'Continuous diagnostics: daily monitoring of your condition and event branches. Problems are cut short before they manifest on the physical plane.',
            '24/7 priority: personal number of the master for contact at any time of day.',
            'Absolute protection: throughout the entire month, a dome of active protection is maintained, blocking any attempts at negative influences.',
            'Fate correction: prompt adjustment of your path for achieving maximum results in minimum time.',
          ]},
          { type: 'heading', text: 'Who is this service for?' },
          { type: 'paragraph', text: 'For owners of major businesses, public figures and people in a state of protracted magical or social warfare, where any mistake can cost too dearly. For those who value their time and want to have behind them a force capable of resolving any issue with a single ritual.' },
        ]),
        faq: [
          {
            question: 'How many clients are accepted simultaneously?',
            answer: 'No more than 1-2 per month to maintain the maximum concentration of the master and quality of work.',
          },
        ],
      },
      uk: {
        title: 'Персональний магічний супровід: Total Control',
        price: '15 000 € / місяць',
        duration: '1 місяць (доступність: не більше 1–2 осіб на місяць)',
        shortDescription: 'Місяць ексклюзивного ведення вашого життя майстром. Повний аутсорсинг магічної безпеки та подієвого ряду. Вирішення будь-яких завдань у режимі реального часу та цілодобова підтримка.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Це формат вищої довіри та максимальної ефективності. У рамках персонального супроводу ви передаєте контроль над енергетичною та подієвою безпекою до рук майстра. Це не просто набір ритуалів, а безперервна робота з вибудовування вашої реальності, захисту ваших інтересів та усунення будь-яких перешкод у момент їх виникнення.' },
          { type: 'paragraph', text: 'Весь місяць майстер перебуває у вашому полі, стаючи вашим особистим щитом та інструментом досягнення цілей.' },
          { type: 'heading', text: 'Що входить у пакет супроводу' },
          { type: 'list', items: [
            'Ритуальне вирішення будь-яких завдань: ритуали виконуються на першу вимогу без додаткової оплати — відкриття доріг, оморочка на переговори, екстрена чистка та будь-що інше.',
            'Безперервна діагностика: щоденний моніторинг вашого стану та подієвих гілок. Проблеми купіруються ще до того, як проявляться на фізичному плані.',
            'Пріоритет 24/7: особистий номер майстра для зв\'язку в будь-який час доби.',
            'Абсолютний захист: протягом усього місяця утримується купол активного захисту, що блокує будь-які спроби негативних впливів.',
            'Корекція долі: оперативне виправлення вашого шляху для досягнення максимального результату в найкоротші терміни.',
          ]},
          { type: 'heading', text: 'Для кого ця послуга?' },
          { type: 'paragraph', text: 'Для власників великого бізнесу, публічних осіб та людей, що знаходяться у стані затяжних магічних або соціальних воєн, де будь-яка помилка може коштувати надто дорого. Для тих, хто цінує свій час і хоче мати за спиною силу, здатну вирішити будь-яке питання одним ритуалом.' },
        ]),
        faq: [
          {
            question: 'Скільки клієнтів приймається одночасно?',
            answer: 'Не більше 1–2 на місяць для збереження максимальної концентрації майстра та якості роботи.',
          },
        ],
      },
    },

    // === ОБУЧЕНИЕ ===
    {
      slug: 'personal-mentorship-masters-path',
      category: 'education',
      price: '3000 € / месяц',
      duration: 'от 3 до 6 месяцев (зависит от обучаемости и скорости усвоения материала)',
      format: 'online' as const,
      order: 1,
      isActive: true,
      ru: {
        title: 'Личное наставничество. Путь Мастера',
        shortDescription: 'Фундаментальное обучение практической магии и колдовству «из рук в руки». Передача знаний от основ энергетики до высших церемониальных ритуалов. Прямое курирование вашего становления как практика.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Это обучение — не просто лекции, это глубокое погружение в традицию и индивидуальная огранка вашего магического дара. Задача наставника — не только передать теорию, но и пробудить вашу личную силу, выстроить магическое мировоззрение и научить вас безопасно и эффективно взаимодействовать с Силами.' },
          { type: 'paragraph', text: 'Мы пройдём путь от азов работы с энергиями до сложнейших деструктивных и ритуальных техник. Наставник помогает диагностировать контракты, выявить стоящих за вами Покровителей и научит прямому взаимодействию с ними.' },
          { type: 'heading', text: 'Программа обучения включает' },
          { type: 'list', items: [
            'Основы и Энергетика: стихийная магия, чакральная система, законы мироздания и работа с личным потенциалом.',
            'Мантика: профессиональная работа с Таро, рунами и оракулами.',
            'Инструментарий: свечная магия (полный цикл), магия зеркал, планетарная магия и травничество.',
            'Работа с Силами: взаимодействие с сущностями, духами и Богами. Генезис и правильное построение заговорных текстов.',
            'Практическое колдовство: весь спектр работ — от восковых отливок до профессиональных порчельных воздействий.',
          ]},
          { type: 'heading', text: 'Формат обучения' },
          { type: 'list', items: [
            'Лекции: 6 глубоких лекций в месяц (1–2 раза в неделю).',
            'Практика: постоянное курирование ваших ритуалов с исправлением ошибок и направлением в процессе.',
            'Домашние задания: обязательная отработка материала для закрепления навыков.',
            'Инициация: по завершении курса проводятся необходимые посвящения (раскрест, инициация в канал и т.д.).',
          ]},
          { type: 'paragraph', text: 'Обучение магии неизбежно ведёт к трансформации всех сфер вашей жизни. Будьте готовы к тому, что ваш мир начнёт меняться вместе с вами.' },
          { type: 'heading', text: 'Спецблок А — «Искусство Свечной Магии»' },
          { type: 'paragraph', text: 'Для тех, кто хочет сделать упор на стихию Огня: структура и генезис заговорного слова, цветовая и планетарная принадлежность свечей, индивидуальный подбор трав, проведение ритуалов от очищения до подчинения.' },
          { type: 'heading', text: 'Спецблок Б — «Искусство Зеркальной магии»' },
          { type: 'paragraph', text: 'Работа с зеркалами — выход за пределы физического мира и взаимодействие с энергиями Зазеркалья. Архитектура Зазеркалья, зеркальные щиты и деструктив, проводники и сущности, создание личного Зазеркалья и техника сохранности.' },
          { type: 'paragraph', text: 'По завершении обучения вы выходите готовым практиком с чётким пониманием своей силы и прав на магическую работу.' },
        ]),
        faq: [],
      },
      en: {
        title: 'Personal Mentorship. The Master\'s Path',
        price: '3000 € / month',
        duration: 'from 3 to 6 months (depends on learning ability and pace of material absorption)',
        shortDescription: 'Fundamental training in practical magic and sorcery "hand to hand". Transfer of knowledge from the basics of energetics to the highest ceremonial rituals. Direct mentoring of your development as a practitioner.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'This training is not just lectures, but a deep immersion in tradition and individual shaping of your magical gift. The task of the mentor is not only to transfer theory, but to awaken your personal power, build a magical worldview and teach you to safely and effectively interact with the Forces.' },
          { type: 'paragraph', text: 'We will travel the path from the basics of working with energies to the most complex destructive and ritual techniques. The mentor helps diagnose your contracts, identify the Patrons standing behind you and teaches direct interaction with them.' },
          { type: 'heading', text: 'Training program includes' },
          { type: 'list', items: [
            'Foundations and Energetics: elemental magic, the chakra system, laws of creation and working with personal potential.',
            'Mantics: professional work with Tarot, runes and oracles.',
            'Toolkit: candle magic (full cycle), mirror magic, planetary magic and herbalism.',
            'Working with Forces: interaction with entities, spirits and Gods. Genesis and proper construction of conjuration texts.',
            'Practical sorcery: the full spectrum of works — from wax castings to professional curse workings.',
          ]},
          { type: 'heading', text: 'Training format' },
          { type: 'list', items: [
            'Lectures: 6 deep lectures per month (1-2 times per week).',
            'Practice: constant mentoring of your rituals with error correction and guidance in the process.',
            'Homework: mandatory practice of material for skill consolidation.',
            'Initiation: upon completion of the course, the necessary consecrations are performed (uncrossing, initiation into channel, etc.).',
          ]},
          { type: 'paragraph', text: 'Magical training inevitably leads to transformation of all spheres of your life. Be prepared for your world to begin changing along with you.' },
          { type: 'heading', text: 'Special Block A — "The Art of Candle Magic"' },
          { type: 'paragraph', text: 'For those who want to focus on the element of Fire: structure and genesis of the conjuration word, color and planetary attribution of candles, individual selection of herbs, conducting rituals from cleansing to domination.' },
          { type: 'heading', text: 'Special Block B — "The Art of Mirror Magic"' },
          { type: 'paragraph', text: 'Working with mirrors — going beyond the physical world and interacting with the energies of the Mirror World. Architecture of the Mirror World, mirror shields and destructive techniques, guides and entities, creating a personal Mirror World and safety protocols.' },
          { type: 'paragraph', text: 'Upon completion of training, you emerge as a ready practitioner with a clear understanding of your power and rights to magical work.' },
        ]),
        faq: [],
      },
      uk: {
        title: 'Особисте наставництво. Шлях Майстра',
        price: '3000 € / місяць',
        duration: 'від 3 до 6 місяців (залежить від навченості та швидкості засвоєння матеріалу)',
        shortDescription: 'Фундаментальне навчання практичній магії та чаклунству «з рук у руки». Передача знань від основ енергетики до вищих церемоніальних ритуалів. Пряме курування вашого становлення як практика.',
        fullDescription: lexical([
          { type: 'paragraph', text: 'Це навчання — не просто лекції, це глибоке занурення у традицію та індивідуальне огранювання вашого магічного дару. Завдання наставника — не лише передати теорію, але й пробудити вашу особисту силу, вибудувати магічний світогляд та навчити вас безпечно та ефективно взаємодіяти з Силами.' },
          { type: 'paragraph', text: 'Ми пройдемо шлях від азів роботи з енергіями до найскладніших деструктивних та ритуальних технік. Наставник допомагає діагностувати ваші контракти, виявити Покровителів, що стоять за вами, та навчає прямій взаємодії з ними.' },
          { type: 'heading', text: 'Програма навчання включає' },
          { type: 'list', items: [
            'Основи та Енергетика: стихійна магія, чакральна система, закони світобудови та робота з особистим потенціалом.',
            'Мантика: професійна робота з Таро, рунами та оракулами.',
            'Інструментарій: свічна магія (повний цикл), магія дзеркал, планетарна магія та траволікування.',
            'Робота з Силами: взаємодія з сутностями, духами та Богами. Генезис та правильна побудова замовних текстів.',
            'Практичне чаклунство: весь спектр робіт — від воскових відливань до професійних псуванських впливів.',
          ]},
          { type: 'heading', text: 'Формат навчання' },
          { type: 'list', items: [
            'Лекції: 6 глибоких лекцій на місяць (1-2 рази на тиждень).',
            'Практика: постійне курування ваших ритуалів із виправленням помилок та направленням у процесі.',
            'Домашні завдання: обов\'язкове відпрацювання матеріалу для закріплення навичок.',
            'Ініціація: після завершення курсу проводяться необхідні посвяти (розхрест, ініціація у канал тощо).',
          ]},
          { type: 'paragraph', text: 'Навчання магії неминуче веде до трансформації всіх сфер вашого життя. Будьте готові до того, що ваш світ почне змінюватися разом із вами.' },
          { type: 'heading', text: 'Спецблок А — «Мистецтво Свічної Магії»' },
          { type: 'paragraph', text: 'Для тих, хто хоче зробити акцент на стихію Вогню: структура та генезис замовного слова, кольорова та планетарна приналежність свічок, індивідуальний підбір трав, проведення ритуалів від очищення до підкорення.' },
          { type: 'heading', text: 'Спецблок Б — «Мистецтво Дзеркальної магії»' },
          { type: 'paragraph', text: 'Робота з дзеркалами — вихід за межі фізичного світу та взаємодія з енергіями Задзеркалля. Архітектура Задзеркалля, дзеркальні щити та деструктив, провідники та сутності, створення особистого Задзеркалля та техніка збереження.' },
          { type: 'paragraph', text: 'Після завершення навчання ви виходите готовим практиком із чітким розумінням своєї сили та прав на магічну роботу.' },
        ]),
        faq: [],
      },
    },
  ]

  for (const svc of servicesData) {
    const created = await payload.create({
      collection: 'services',
      data: {
        title: svc.ru.title,
        slug: svc.slug,
        shortDescription: svc.ru.shortDescription,
        fullDescription: svc.ru.fullDescription,
        faq: svc.ru.faq,
        category: categoryIds[svc.category],
        price: svc.price,
        duration: svc.duration || undefined,
        format: svc.format,
        isActive: svc.isActive,
        order: svc.order,
      },
      locale: 'ru',
    })

    for (const locale of ['en', 'uk'] as const) {
      await payload.update({
        collection: 'services',
        id: created.id,
        data: {
          title: svc[locale].title,
          shortDescription: svc[locale].shortDescription,
          fullDescription: svc[locale].fullDescription,
          faq: svc[locale].faq,
          price: svc[locale].price,
          duration: svc[locale].duration,
        },
        locale,
      })
    }

    console.log(`Created service: ${svc.ru.title}`)
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
  type LexicalBlock =
    | { type: 'heading'; text: string; tag?: string }
    | { type: 'paragraph'; text: string }
    | { type: 'quote'; text: string }
    | { type: 'list'; items: string[] }

  function lexical(blocks: LexicalBlock[]) {
    const dir = 'ltr' as const
    return {
      root: {
        type: 'root',
        children: blocks.map((b) => {
          if (b.type === 'list') {
            return {
              type: 'list',
              listType: 'bullet',
              start: 1,
              tag: 'ul',
              children: b.items.map((item, i) => ({
                type: 'listitem',
                value: i + 1,
                children: [{ type: 'text', text: item, version: 1 }],
                direction: dir,
                format: '' as const,
                indent: 0,
                version: 1,
              })),
              direction: dir,
              format: '' as const,
              indent: 0,
              version: 1,
            }
          }
          const textNode = { type: 'text', text: b.text, version: 1 }
          if (b.type === 'heading') {
            return { type: 'heading', tag: b.tag || 'h2', children: [textNode], direction: dir, format: '' as const, indent: 0, version: 1 }
          }
          if (b.type === 'quote') {
            return { type: 'quote', children: [textNode], direction: dir, format: '' as const, indent: 0, version: 1 }
          }
          return { type: 'paragraph', children: [textNode], direction: dir, format: '' as const, indent: 0, version: 1, textFormat: 0, textStyle: '' }
        }),
        direction: dir,
        format: '' as const,
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
    {
      slug: 'energy-protection-guide',
      category: 'support',
      readingTime: 6,
      publishedAt: '2026-03-05T10:00:00.000Z',
      title: {
        ru: 'Энергетическая защита: как не терять силы',
        en: 'Energy Protection: How to Preserve Your Power',
        uk: 'Енергетичний захист: як не втрачати сили',
      },
      excerpt: {
        ru: 'Практические техники энергетической защиты для повседневной жизни: щиты, заземление, работа с границами.',
        en: 'Practical energy protection techniques for everyday life: shields, grounding, working with boundaries.',
        uk: 'Практичні техніки енергетичного захисту для повсякденного життя: щити, заземлення, робота з межами.',
      },
      content: {
        ru: lexical([
          { type: 'heading', text: 'Почему мы теряем энергию?' },
          { type: 'paragraph', text: 'Каждый день мы взаимодействуем с десятками людей, и каждое такое взаимодействие — это обмен энергией. Бывает, что после разговора с определённым человеком вы чувствуете себя полностью опустошённым, хотя ничего плохого не произошло. Это верный признак энергетической утечки.' },
          { type: 'paragraph', text: 'Причины потери энергии могут быть разными: токсичные отношения, работа в негативной среде, отсутствие личных границ, постоянная тревога и стресс. Первый шаг к защите — осознание того, где именно вы теряете силы.' },
          { type: 'heading', text: 'Техника заземления' },
          { type: 'paragraph', text: 'Заземление — это базовая практика, с которой начинается любая энергетическая работа. Встаньте босиком на землю или пол. Представьте, что из ваших стоп вниз уходят корни — глубоко в землю. Почувствуйте, как земля даёт вам опору и стабильность. Дышите глубоко и ровно в течение 5 минут.' },
          { type: 'paragraph', text: 'Эту практику можно делать утром перед началом дня и вечером для сброса накопленного напряжения. Со временем вы научитесь заземляться за несколько секунд даже в середине рабочего дня.' },
          { type: 'heading', text: 'Энергетический щит' },
          { type: 'paragraph', text: 'Визуализация защитного кокона — одна из самых эффективных техник. Закройте глаза и представьте, что вас окружает сфера золотистого света. Она пропускает только позитивную энергию и отражает всё негативное. Почувствуйте тепло и безопасность внутри этой сферы.' },
          { type: 'quote', text: 'Защита — это не стена между вами и миром. Это фильтр, который позволяет принимать хорошее и отпускать плохое.' },
          { type: 'heading', text: 'Работа с границами' },
          { type: 'paragraph', text: 'Энергетическая защита невозможна без здоровых границ. Учитесь говорить «нет» без чувства вины. Не берите на себя чужие эмоции и проблемы. Если после общения с человеком вам стабильно плохо — это сигнал пересмотреть формат отношений.' },
          { type: 'paragraph', text: 'Помните: забота о собственной энергии — это не эгоизм, а необходимость. Вы не сможете помочь другим, если сами опустошены.' },
        ]),
        en: lexical([
          { type: 'heading', text: 'Why Do We Lose Energy?' },
          { type: 'paragraph', text: 'Every day we interact with dozens of people, and each interaction is an energy exchange. Sometimes after talking to a certain person you feel completely drained, even though nothing bad happened. This is a sure sign of an energy leak.' },
          { type: 'paragraph', text: 'The causes of energy loss can vary: toxic relationships, working in a negative environment, lack of personal boundaries, constant anxiety and stress. The first step to protection is recognizing exactly where you\'re losing your power.' },
          { type: 'heading', text: 'Grounding Technique' },
          { type: 'paragraph', text: 'Grounding is a fundamental practice that starts any energy work. Stand barefoot on the ground or floor. Imagine roots growing down from your feet — deep into the earth. Feel how the earth gives you support and stability. Breathe deeply and evenly for 5 minutes.' },
          { type: 'paragraph', text: 'This practice can be done in the morning before starting the day and in the evening to release accumulated tension. Over time, you\'ll learn to ground yourself in seconds, even in the middle of a workday.' },
          { type: 'heading', text: 'Energy Shield' },
          { type: 'paragraph', text: 'Visualizing a protective cocoon is one of the most effective techniques. Close your eyes and imagine a sphere of golden light surrounding you. It only lets positive energy through and reflects everything negative. Feel the warmth and safety inside this sphere.' },
          { type: 'quote', text: 'Protection is not a wall between you and the world. It\'s a filter that allows you to accept the good and release the bad.' },
          { type: 'heading', text: 'Working with Boundaries' },
          { type: 'paragraph', text: 'Energy protection is impossible without healthy boundaries. Learn to say "no" without guilt. Don\'t take on other people\'s emotions and problems. If you consistently feel bad after communicating with someone — that\'s a signal to reconsider the relationship format.' },
          { type: 'paragraph', text: 'Remember: taking care of your own energy is not selfishness — it\'s a necessity. You can\'t help others if you\'re depleted yourself.' },
        ]),
        uk: lexical([
          { type: 'heading', text: 'Чому ми втрачаємо енергію?' },
          { type: 'paragraph', text: 'Щодня ми взаємодіємо з десятками людей, і кожна така взаємодія — це обмін енергією. Буває, що після розмови з певною людиною ви відчуваєте себе повністю спустошеним, хоча нічого поганого не сталося. Це вірна ознака енергетичного витоку.' },
          { type: 'paragraph', text: 'Причини втрати енергії можуть бути різними: токсичні стосунки, робота в негативному середовищі, відсутність особистих меж, постійна тривога та стрес. Перший крок до захисту — усвідомлення того, де саме ви втрачаєте сили.' },
          { type: 'heading', text: 'Техніка заземлення' },
          { type: 'paragraph', text: 'Заземлення — це базова практика, з якої починається будь-яка енергетична робота. Встаньте босоніж на землю або підлогу. Уявіть, що з ваших стоп вниз ідуть коріння — глибоко в землю. Відчуйте, як земля дає вам опору та стабільність. Дихайте глибоко і рівно протягом 5 хвилин.' },
          { type: 'paragraph', text: 'Цю практику можна робити вранці перед початком дня та ввечері для скидання накопиченої напруги. З часом ви навчитесь заземлюватися за кілька секунд навіть посеред робочого дня.' },
          { type: 'heading', text: 'Енергетичний щит' },
          { type: 'paragraph', text: 'Візуалізація захисного кокона — одна з найефективніших технік. Закрийте очі та уявіть, що вас оточує сфера золотистого світла. Вона пропускає лише позитивну енергію та відбиває все негативне. Відчуйте тепло та безпеку всередині цієї сфери.' },
          { type: 'quote', text: 'Захист — це не стіна між вами та світом. Це фільтр, який дозволяє приймати добре та відпускати погане.' },
          { type: 'heading', text: 'Робота з межами' },
          { type: 'paragraph', text: 'Енергетичний захист неможливий без здорових меж. Вчіться говорити «ні» без почуття провини. Не беріть на себе чужі емоції та проблеми. Якщо після спілкування з людиною вам стабільно погано — це сигнал переглянути формат стосунків.' },
          { type: 'paragraph', text: 'Пам\'ятайте: турбота про власну енергію — це не егоїзм, а необхідність. Ви не зможете допомогти іншим, якщо самі спустошені.' },
        ]),
      },
    },
    {
      slug: 'intuition-development',
      category: 'education',
      readingTime: 8,
      publishedAt: '2026-03-06T10:00:00.000Z',
      title: {
        ru: 'Развитие интуиции: практическое руководство',
        en: 'Developing Intuition: A Practical Guide',
        uk: 'Розвиток інтуїції: практичний посібник',
      },
      excerpt: {
        ru: 'Как развить интуицию и научиться слышать внутренний голос: упражнения, медитации и практики на каждый день.',
        en: 'How to develop intuition and learn to hear your inner voice: exercises, meditations and daily practices.',
        uk: 'Як розвинути інтуїцію та навчитися чути внутрішній голос: вправи, медитації та практики на кожен день.',
      },
      content: {
        ru: lexical([
          { type: 'heading', text: 'Что такое интуиция?' },
          { type: 'paragraph', text: 'Интуиция — это способность получать знание без логического анализа. Это тот самый «внутренний голос», который подсказывает верное решение ещё до того, как вы успели всё обдумать. У каждого человека есть интуиция, но не каждый умеет к ней прислушиваться.' },
          { type: 'paragraph', text: 'В эзотерической традиции интуиция связана с работой третьего глаза — шестой чакры Аджна. Когда этот центр активен, вы получаете доступ к информации, которая выходит за рамки обычного восприятия.' },
          { type: 'heading', text: 'Почему мы перестаём слышать себя' },
          { type: 'paragraph', text: 'Современный мир перегружает наш разум информацией. Социальные сети, новости, постоянный шум — всё это заглушает тонкий голос интуиции. Мы привыкли опираться на логику и чужие мнения, забывая о том, что самый мудрый советчик находится внутри нас.' },
          { type: 'paragraph', text: 'Чтобы услышать интуицию, нужно создать внутреннюю тишину. Именно поэтому все духовные традиции включают практики медитации и молчания.' },
          { type: 'heading', text: 'Упражнение «Утренние страницы»' },
          { type: 'paragraph', text: 'Каждое утро, сразу после пробуждения, возьмите блокнот и пишите всё, что приходит в голову. Не редактируйте, не анализируйте — просто пишите поток сознания в течение 15–20 минут. Это очищает разум от «шума» и помогает услышать глубинные послания.' },
          { type: 'paragraph', text: 'Через две-три недели вы заметите, что среди обычных мыслей начинают появляться удивительные инсайты и идеи, которые вы бы никогда не получили через логический анализ.' },
          { type: 'heading', text: 'Медитация на третий глаз' },
          { type: 'paragraph', text: 'Сядьте удобно, закройте глаза. Сосредоточьте внимание на точке между бровями. Дышите глубоко и ровно. Представьте в этой точке свет цвета индиго — глубокий синий с фиолетовым оттенком. С каждым вдохом свет становится ярче. Практикуйте 10–15 минут ежедневно.' },
          { type: 'quote', text: 'Интуиция — это не мистический дар избранных. Это навык, который можно и нужно развивать, как мышцу.' },
          { type: 'heading', text: 'Практика «Карта без вопроса»' },
          { type: 'paragraph', text: 'Если вы работаете с картами Таро или оракулом — попробуйте тянуть карту без конкретного вопроса. Просто посмотрите на образ и запишите первое, что пришло в голову. Не ищите значение в книге — доверьтесь своему восприятию. Это отличная тренировка интуитивного канала.' },
          { type: 'heading', text: 'Как отличить интуицию от страха' },
          { type: 'paragraph', text: 'Интуиция приходит спокойно и ясно — как знание, которое просто есть. Страх всегда сопровождается тревогой, напряжением в теле, навязчивыми мыслями. Если «внутренний голос» кричит и паникует — скорее всего, это не интуиция, а эмоциональная реакция.' },
          { type: 'paragraph', text: 'Учитесь различать эти два состояния. Со временем вы будете безошибочно отличать голос мудрости от голоса страха.' },
        ]),
        en: lexical([
          { type: 'heading', text: 'What is Intuition?' },
          { type: 'paragraph', text: 'Intuition is the ability to gain knowledge without logical analysis. It\'s that "inner voice" that suggests the right decision before you\'ve had time to think it through. Every person has intuition, but not everyone knows how to listen to it.' },
          { type: 'paragraph', text: 'In esoteric tradition, intuition is connected to the work of the third eye — the sixth chakra, Ajna. When this center is active, you gain access to information that goes beyond ordinary perception.' },
          { type: 'heading', text: 'Why We Stop Hearing Ourselves' },
          { type: 'paragraph', text: 'The modern world overloads our minds with information. Social media, news, constant noise — all of this drowns out the subtle voice of intuition. We\'ve become accustomed to relying on logic and other people\'s opinions, forgetting that the wisest advisor lives within us.' },
          { type: 'paragraph', text: 'To hear intuition, you need to create inner silence. That\'s why all spiritual traditions include practices of meditation and silence.' },
          { type: 'heading', text: '"Morning Pages" Exercise' },
          { type: 'paragraph', text: 'Every morning, immediately after waking up, grab a notebook and write everything that comes to mind. Don\'t edit, don\'t analyze — just write a stream of consciousness for 15-20 minutes. This clears the mind of "noise" and helps you hear deeper messages.' },
          { type: 'paragraph', text: 'After two or three weeks, you\'ll notice that among ordinary thoughts, amazing insights and ideas begin to appear — ones you would never have reached through logical analysis.' },
          { type: 'heading', text: 'Third Eye Meditation' },
          { type: 'paragraph', text: 'Sit comfortably, close your eyes. Focus your attention on the point between your eyebrows. Breathe deeply and evenly. Imagine an indigo light at this point — deep blue with a violet tint. With each breath, the light grows brighter. Practice 10-15 minutes daily.' },
          { type: 'quote', text: 'Intuition is not a mystical gift of the chosen few. It\'s a skill that can and should be developed, like a muscle.' },
          { type: 'heading', text: '"Card Without a Question" Practice' },
          { type: 'paragraph', text: 'If you work with Tarot or oracle cards — try pulling a card without a specific question. Simply look at the image and write down the first thing that comes to mind. Don\'t look up the meaning in a book — trust your perception. This is excellent training for the intuitive channel.' },
          { type: 'heading', text: 'How to Distinguish Intuition from Fear' },
          { type: 'paragraph', text: 'Intuition comes calmly and clearly — as knowledge that simply exists. Fear is always accompanied by anxiety, bodily tension, and obsessive thoughts. If the "inner voice" is screaming and panicking — most likely it\'s not intuition, but an emotional reaction.' },
          { type: 'paragraph', text: 'Learn to distinguish between these two states. Over time, you\'ll unerringly tell the voice of wisdom from the voice of fear.' },
        ]),
        uk: lexical([
          { type: 'heading', text: 'Що таке інтуїція?' },
          { type: 'paragraph', text: 'Інтуїція — це здатність отримувати знання без логічного аналізу. Це той самий «внутрішній голос», який підказує вірне рішення ще до того, як ви встигли все обдумати. У кожної людини є інтуїція, але не кожен вміє до неї прислухатися.' },
          { type: 'paragraph', text: 'В езотеричній традиції інтуїція пов\'язана з роботою третього ока — шостої чакри Аджна. Коли цей центр активний, ви отримуєте доступ до інформації, яка виходить за межі звичайного сприйняття.' },
          { type: 'heading', text: 'Чому ми перестаємо чути себе' },
          { type: 'paragraph', text: 'Сучасний світ перевантажує наш розум інформацією. Соціальні мережі, новини, постійний шум — все це заглушує тонкий голос інтуїції. Ми звикли опиратися на логіку та чужі думки, забуваючи про те, що наймудріший порадник знаходиться всередині нас.' },
          { type: 'paragraph', text: 'Щоб почути інтуїцію, потрібно створити внутрішню тишу. Саме тому всі духовні традиції включають практики медитації та мовчання.' },
          { type: 'heading', text: 'Вправа «Ранкові сторінки»' },
          { type: 'paragraph', text: 'Щоранку, одразу після пробудження, візьміть блокнот і пишіть усе, що спадає на думку. Не редагуйте, не аналізуйте — просто пишіть потік свідомості протягом 15–20 хвилин. Це очищує розум від «шуму» та допомагає почути глибинні послання.' },
          { type: 'paragraph', text: 'Через два-три тижні ви помітите, що серед звичайних думок починають з\'являтися дивовижні інсайти та ідеї, які ви б ніколи не отримали через логічний аналіз.' },
          { type: 'heading', text: 'Медитація на третє око' },
          { type: 'paragraph', text: 'Сядьте зручно, закрийте очі. Зосередьте увагу на точці між бровами. Дихайте глибоко і рівно. Уявіть у цій точці світло кольору індиго — глибокий синій з фіолетовим відтінком. З кожним вдихом світло стає яскравішим. Практикуйте 10–15 хвилин щодня.' },
          { type: 'quote', text: 'Інтуїція — це не містичний дар обраних. Це навичка, яку можна і потрібно розвивати, як м\'яз.' },
          { type: 'heading', text: 'Практика «Карта без питання»' },
          { type: 'paragraph', text: 'Якщо ви працюєте з картами Таро або оракулом — спробуйте тягнути карту без конкретного питання. Просто подивіться на образ і запишіть перше, що спало на думку. Не шукайте значення в книзі — довіртеся своєму сприйняттю. Це чудове тренування інтуїтивного каналу.' },
          { type: 'heading', text: 'Як відрізнити інтуїцію від страху' },
          { type: 'paragraph', text: 'Інтуїція приходить спокійно і ясно — як знання, яке просто є. Страх завжди супроводжується тривогою, напругою в тілі, нав\'язливими думками. Якщо «внутрішній голос» кричить і панікує — скоріше за все, це не інтуїція, а емоційна реакція.' },
          { type: 'paragraph', text: 'Вчіться розрізняти ці два стани. З часом ви будете безпомилково відрізняти голос мудрості від голосу страху.' },
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
