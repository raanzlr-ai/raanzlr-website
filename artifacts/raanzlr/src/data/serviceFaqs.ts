/**
 * Per-service FAQs for the eight service pages that had none.
 *
 * Only `web-development` carried FAQ content (in src/lib/serviceDetails.ts),
 * so eight of nine services shipped no question-shaped content at all — the
 * format buyers search in and answer engines quote.
 *
 * SOURCING RULE: every figure here is one the site already publishes on
 * /en/faq — the pricing bands, the delivery windows, the 30–90 day warranty,
 * the free 30–45 minute consultation, the 30–50% milestone structure. Nothing
 * is invented, and no claim asserts a delivered client result. If a pricing or
 * timeline figure changes on the FAQ page, change it here too.
 */

export interface ServiceFaqItem {
  q: string;
  a: string;
}

type LocalizedFaqs = { en: ServiceFaqItem[]; ar: ServiceFaqItem[] };

export const SERVICE_FAQS: Record<string, LocalizedFaqs> = {
  "ai-chatbots": {
    en: [
      {
        q: "What is the difference between a chatbot and an AI agent?",
        a: "A chatbot follows a scripted decision tree and fails the moment a question falls outside it. An AI agent reads intent, keeps context across a conversation, and can act — checking availability, creating a CRM record, booking a slot. In practice that means fewer dead ends and fewer conversations handed to a person.",
      },
      {
        q: "Can it handle Gulf dialect, not just Modern Standard Arabic?",
        a: "Yes. The agents are built for how people actually type: Modern Standard, Gulf, Levantine and Egyptian Arabic, including switching into English mid-sentence. Dialect handling is part of the build rather than a later add-on, and we test it against your own message history before launch.",
      },
      {
        q: "What happens when the agent cannot answer something?",
        a: "It hands over. You set the rules — a topic it should never attempt, a frustrated tone, an explicit request for a person — and the conversation moves to your team with the full transcript attached. Silent guessing is the failure mode we design against.",
      },
      {
        q: "Which channels can it run on?",
        a: "WhatsApp, your website, and Instagram DMs, with one agent brain shared across them so context follows the customer between channels. Other channels are possible where the platform exposes an API.",
      },
      {
        q: "How long does a chatbot project take and what does it cost?",
        a: "Typically 2–4 weeks for a straightforward agent. A basic AI chatbot generally ranges from $5,000 to $15,000; more advanced builds with CRM integration and custom training range from $15,000 to $50,000 and up. You get a fixed scope and quote after the discovery call.",
      },
    ],
    ar: [
      {
        q: "ما الفرق بين روبوت المحادثة ووكيل الذكاء الاصطناعي؟",
        a: "روبوت المحادثة يتبع شجرة قرارات مكتوبة مسبقاً، ويتوقف عند أول سؤال خارجها. أما وكيل الذكاء الاصطناعي فيفهم نية العميل، ويحتفظ بسياق المحادثة، ويستطيع التنفيذ: التحقق من المواعيد المتاحة، إنشاء سجل في نظام إدارة العملاء، أو حجز موعد. النتيجة عملياً: عدد أقل من المحادثات المتوقفة، وتحويلات أقل إلى الفريق البشري.",
      },
      {
        q: "هل يتعامل مع اللهجة الخليجية وليس العربية الفصحى فقط؟",
        a: "نعم. الوكلاء مبنيون على طريقة كتابة الناس الفعلية: الفصحى، والخليجية، والشامية، والمصرية، بما في ذلك الانتقال إلى الإنجليزية داخل الجملة نفسها. التعامل مع اللهجات جزء من البناء وليس إضافة لاحقة، ونختبره على سجل رسائلكم الفعلي قبل الإطلاق.",
      },
      {
        q: "ماذا يحدث عندما لا يستطيع الوكيل الإجابة؟",
        a: "يحوّل المحادثة. أنتم تحددون القواعد: موضوع لا يجوز له الاقتراب منه، نبرة انزعاج من العميل، أو طلب صريح للتحدث مع شخص. عندها تنتقل المحادثة إلى فريقكم مع النص الكامل. التخمين الصامت هو الخطأ الذي نصمم لتفاديه.",
      },
      {
        q: "على أي قنوات يمكن تشغيله؟",
        a: "واتساب، وموقعكم الإلكتروني، ورسائل إنستغرام المباشرة، بعقل واحد مشترك بينها بحيث ينتقل سياق المحادثة مع العميل من قناة إلى أخرى. يمكن إضافة قنوات أخرى متى وفّرت المنصة واجهة برمجية.",
      },
      {
        q: "كم يستغرق المشروع وكم يكلّف؟",
        a: "عادةً من ٢ إلى ٤ أسابيع للوكيل المباشر. يتراوح روبوت المحادثة الأساسي بين ٥٬٠٠٠ و١٥٬٠٠٠ دولار، بينما تتراوح الحلول الأكثر تقدماً مع ربط أنظمة إدارة العملاء والتدريب المخصص بين ١٥٬٠٠٠ و٥٠٬٠٠٠ دولار فأكثر. تحصلون على نطاق وسعر ثابتين بعد مكالمة الاكتشاف.",
      },
    ],
  },

  "workflow-automation": {
    en: [
      {
        q: "Which processes are worth automating first?",
        a: "The ones that are high volume, rule-based, and currently done by a person copying data between systems — lead routing, invoice generation, approval chains, report assembly. We start with a short audit of how your team actually works and rank candidates by hours saved against build effort.",
      },
      {
        q: "Do you use n8n and Make, or do you build custom?",
        a: "Both, depending on what the process needs. n8n and Make cover most business workflows quickly and stay editable by your team. Custom pipelines make sense when the logic is complex, the volume is high, or the data cannot leave your infrastructure. We tell you which applies before quoting.",
      },
      {
        q: "What happens when an automation fails at 2am?",
        a: "It should fail loudly, not silently. Every workflow we build has error handling, retries where retrying is safe, and an alert to a channel you watch. Failed runs are logged with their input so the case can be replayed once the cause is fixed.",
      },
      {
        q: "Will this replace people on my team?",
        a: "That is your decision, not a promise we make. What automation reliably removes is the repetitive part — data entry, chasing, re-keying. Most teams we speak to want that capacity back for work that needs judgement, rather than a smaller headcount.",
      },
      {
        q: "Can we maintain it ourselves afterwards?",
        a: "Yes, and we build for that. You get the workflows in your own accounts, documentation of what each one does, and a handover session. Optional monthly support is available if you would rather we keep watching it.",
      },
    ],
    ar: [
      {
        q: "ما العمليات التي يستحق أتمتتها أولاً؟",
        a: "العمليات ذات الحجم الكبير والقواعد الواضحة، والتي ينفذها شخص حالياً بنسخ البيانات بين الأنظمة: توزيع العملاء المحتملين، إصدار الفواتير، سلاسل الموافقات، وتجميع التقارير. نبدأ بمراجعة قصيرة لطريقة عمل فريقكم فعلياً، ثم نرتّب المرشحين حسب الساعات الموفَّرة مقابل جهد التنفيذ.",
      },
      {
        q: "هل تستخدمون n8n وMake أم تبنون حلولاً مخصصة؟",
        a: "الاثنان معاً، حسب ما تتطلبه العملية. تغطي n8n وMake معظم سير العمل بسرعة وتبقى قابلة للتعديل من فريقكم. أما المسارات المخصصة فتكون منطقية عندما يكون المنطق معقداً، أو الحجم كبيراً، أو عندما لا يجوز خروج البيانات من بنيتكم التحتية. نوضح أيّهما ينطبق قبل تقديم السعر.",
      },
      {
        q: "ماذا يحدث إذا تعطلت الأتمتة في الثانية صباحاً؟",
        a: "يجب أن يكون التعطل مسموعاً لا صامتاً. كل سير عمل نبنيه يتضمن معالجة للأخطاء، وإعادة محاولة حيثما كانت الإعادة آمنة، وتنبيهاً إلى قناة تتابعونها. تُسجَّل العمليات الفاشلة مع مدخلاتها بحيث يمكن إعادة تشغيل الحالة بعد معالجة السبب.",
      },
      {
        q: "هل ستحل الأتمتة محل أفراد في فريقي؟",
        a: "هذا قراركم، وليس وعداً نقدّمه. ما تزيله الأتمتة فعلياً هو الجزء المتكرر: إدخال البيانات، والمتابعة، وإعادة الكتابة. معظم الفرق التي نتحدث معها تريد استعادة هذه الطاقة لأعمال تحتاج إلى حكم بشري، لا تقليص عدد الموظفين.",
      },
      {
        q: "هل نستطيع صيانتها بأنفسنا لاحقاً؟",
        a: "نعم، ونبني على هذا الأساس. تستلمون سير العمل داخل حساباتكم، مع توثيق لوظيفة كل واحد منها، وجلسة تسليم. الدعم الشهري متاح اختيارياً إن فضّلتم أن نتابع التشغيل عنكم.",
      },
    ],
  },

  "custom-ai": {
    en: [
      {
        q: "What is RAG and do we actually need it?",
        a: "Retrieval-augmented generation means the model answers from your documents rather than from memory. You need it when answers must be grounded in your own contracts, policies or product data, and must cite where they came from. If your questions are general knowledge, you do not need it.",
      },
      {
        q: "Where does our data go?",
        a: "That is a design decision we make with you before building. Options range from a fully self-hosted pipeline where nothing leaves your infrastructure, to a managed model provider under a data processing agreement. We document exactly what is sent where, and residency requirements are a constraint we design around rather than discover late.",
      },
      {
        q: "Do you fine-tune models or use off-the-shelf ones?",
        a: "Usually off-the-shelf with good retrieval, because it is cheaper, faster to ship, and easier to change. Fine-tuning earns its cost when you need a specific output format or domain vocabulary that prompting cannot reach reliably. We will say which case you are in.",
      },
      {
        q: "How do you stop it making things up?",
        a: "Grounding answers in retrieved source passages, returning citations so a reader can check, and setting the system to say it does not know rather than guess. We also build an evaluation set from your real questions so accuracy is measured against your domain before launch, not assumed.",
      },
      {
        q: "How long does a custom AI project take?",
        a: "Typically 6–12 weeks depending on how clean the source data is and how many systems it has to reach. Data preparation is usually the long pole, not the model work. You get a dated plan with milestones after the technical audit.",
      },
    ],
    ar: [
      {
        q: "ما هو RAG وهل نحتاجه فعلاً؟",
        a: "التوليد المعزّز بالاسترجاع يعني أن النموذج يجيب من مستنداتكم بدلاً من ذاكرته. تحتاجونه عندما يجب أن تستند الإجابات إلى عقودكم أو سياساتكم أو بيانات منتجاتكم، وأن تشير إلى مصدرها. أما إذا كانت أسئلتكم معرفة عامة فلا حاجة له.",
      },
      {
        q: "أين تذهب بياناتنا؟",
        a: "هذا قرار تصميمي نتخذه معكم قبل البناء. تتراوح الخيارات بين مسار مستضاف بالكامل لديكم لا تغادر فيه البيانات بنيتكم التحتية، وبين مزوّد نماذج مُدار بموجب اتفاقية معالجة بيانات. نوثّق بدقة ما يُرسل وإلى أين، ونتعامل مع متطلبات إقامة البيانات كقيد نصمم ضمنه لا كمفاجأة متأخرة.",
      },
      {
        q: "هل تدرّبون النماذج أم تستخدمون نماذج جاهزة؟",
        a: "غالباً نماذج جاهزة مع استرجاع جيد، لأنها أقل تكلفة وأسرع إطلاقاً وأسهل تعديلاً. يصبح التدريب المخصص مجدياً عندما تحتاجون صيغة مخرجات محددة أو مصطلحات تخصصية لا يمكن الوصول إليها بالتوجيه وحده. سنوضح لكم أي الحالتين تنطبق.",
      },
      {
        q: "كيف تمنعون النموذج من اختلاق المعلومات؟",
        a: "بربط الإجابات بمقاطع مصدرية مسترجَعة، وإرجاع مراجع يستطيع القارئ التحقق منها، وضبط النظام ليقول إنه لا يعرف بدلاً من التخمين. كما نبني مجموعة تقييم من أسئلتكم الحقيقية بحيث تُقاس الدقة على مجالكم قبل الإطلاق لا أن تُفترض.",
      },
      {
        q: "كم يستغرق مشروع الذكاء الاصطناعي المخصص؟",
        a: "عادةً من ٦ إلى ١٢ أسبوعاً حسب نظافة البيانات المصدرية وعدد الأنظمة التي يجب الوصول إليها. تحضير البيانات هو العائق الأطول غالباً وليس العمل على النموذج. تحصلون على خطة مؤرخة بمراحل واضحة بعد المراجعة التقنية.",
      },
    ],
  },

  "crm-integration": {
    en: [
      {
        q: "Which CRMs do you work with?",
        a: "We integrate through published APIs, which covers the mainstream platforms — HubSpot, Salesforce, Zoho — as well as ERP systems and in-house databases. If a system exposes an API or a database we can reach, it can usually be connected. We confirm feasibility during the audit, before you commit.",
      },
      {
        q: "Our CRM is heavily customised. Is that a problem?",
        a: "It is normal, and it is why we audit first. Custom objects, unusual field mappings and legacy workflows all change the integration design. What we will not do is quote a fixed price before understanding what is actually in there.",
      },
      {
        q: "Do we have to replace our existing systems?",
        a: "No. The usual approach is a middleware layer that connects what you already run, so data moves correctly without a migration project. Replacement only comes up when the existing system genuinely cannot do what you need, and we would say so plainly.",
      },
      {
        q: "How do you handle duplicate and conflicting records?",
        a: "With explicit rules you approve: which system is authoritative for each field, how records are matched, and what happens on conflict. This is decided during design rather than left to whichever sync ran last, because that is where silent data corruption starts.",
      },
      {
        q: "What happens if an integration breaks after handover?",
        a: "Every project includes a warranty period, typically 30–90 days, covering defects in what we built. After that, optional support retainers cover monitoring and fixes. Integrations also break because a third party changes their API, which is why we build alerting rather than assume silence means success.",
      },
    ],
    ar: [
      {
        q: "ما أنظمة إدارة العملاء التي تعملون عليها؟",
        a: "نربط الأنظمة عبر واجهاتها البرمجية المنشورة، وهذا يغطي المنصات الشائعة مثل HubSpot وSalesforce وZoho، إضافة إلى أنظمة تخطيط الموارد وقواعد البيانات الداخلية. إذا كان النظام يوفّر واجهة برمجية أو قاعدة بيانات يمكن الوصول إليها، فغالباً يمكن ربطه. نؤكد الجدوى أثناء المراجعة وقبل أي التزام منكم.",
      },
      {
        q: "نظامنا مخصص بدرجة كبيرة، هل هذا يمثل مشكلة؟",
        a: "هذا أمر معتاد، ولهذا السبب نبدأ بالمراجعة. الكائنات المخصصة، وربط الحقول غير المألوف، وسير العمل القديم، كلها تغيّر تصميم التكامل. ما لن نفعله هو تقديم سعر ثابت قبل فهم ما هو موجود فعلاً.",
      },
      {
        q: "هل يجب استبدال أنظمتنا الحالية؟",
        a: "لا. الأسلوب المعتاد هو طبقة وسيطة تربط ما تشغّلونه اليوم، بحيث تنتقل البيانات بشكل صحيح دون مشروع ترحيل. لا يُطرح الاستبدال إلا إذا كان النظام الحالي عاجزاً فعلاً عمّا تحتاجونه، وعندها سنقولها بوضوح.",
      },
      {
        q: "كيف تتعاملون مع السجلات المكررة والمتعارضة؟",
        a: "بقواعد صريحة تعتمدونها: أي نظام هو المرجع لكل حقل، وكيف تُطابَق السجلات، وماذا يحدث عند التعارض. يُحسم ذلك في مرحلة التصميم لا أن يُترك لآخر عملية مزامنة، لأن هنا تبدأ أخطاء البيانات الصامتة.",
      },
      {
        q: "ماذا لو تعطّل التكامل بعد التسليم؟",
        a: "كل مشروع يشمل فترة ضمان تتراوح عادةً بين ٣٠ و٩٠ يوماً تغطي عيوب ما بنيناه. بعدها تغطي عقود الدعم الاختيارية المراقبة والإصلاح. كما تتعطل التكاملات أحياناً لأن طرفاً ثالثاً غيّر واجهته البرمجية، ولهذا نبني التنبيهات بدل افتراض أن الصمت يعني النجاح.",
      },
    ],
  },

  "mobile-apps": {
    en: [
      {
        q: "Native or cross-platform?",
        a: "Cross-platform for most business apps, because one codebase covers iOS and Android and costs less to maintain. Native earns its cost when you need deep hardware access, heavy graphics, or platform features that arrive first on native. We recommend based on your feature list, not a default.",
      },
      {
        q: "Do you handle App Store and Google Play submission?",
        a: "Yes, including store listings, review responses and the account setup if you do not have it. Store review adds calendar time that is outside our control, so we plan for it rather than promising a launch date that ignores it.",
      },
      {
        q: "How does Arabic RTL work in a mobile app?",
        a: "It is built in from the first screen, not retrofitted. Layout mirrors, navigation direction flips, and mixed Arabic-English strings, numerals and dates all need explicit handling. Retrofitting RTL into a finished app is consistently more expensive than designing for it at the start.",
      },
      {
        q: "How long does a mobile app take?",
        a: "Typically 8–16 weeks depending on feature scope and how many backend systems it touches. You get a milestone plan at kickoff, with review points where you see working software rather than status reports.",
      },
      {
        q: "What happens after launch?",
        a: "A warranty period, typically 30–90 days, covers defects. After that, apps need ongoing work regardless of who built them — OS updates, SDK deprecations and store policy changes all force revisions. Optional maintenance retainers cover that.",
      },
    ],
    ar: [
      {
        q: "تطبيق أصلي أم متعدد المنصات؟",
        a: "متعدد المنصات لمعظم تطبيقات الأعمال، لأن قاعدة شيفرة واحدة تغطي iOS وAndroid وتكلفة صيانتها أقل. يصبح التطبيق الأصلي مجدياً عندما تحتاجون وصولاً عميقاً للعتاد، أو رسومات ثقيلة، أو خصائص تصل إلى المنصات الأصلية أولاً. نوصي بناءً على قائمة خصائصكم لا على خيار افتراضي.",
      },
      {
        q: "هل تتولون النشر على App Store وGoogle Play؟",
        a: "نعم، بما في ذلك صفحات المتجر، والرد على ملاحظات المراجعة، وإنشاء الحسابات إن لم تكن لديكم. مراجعة المتجر تضيف وقتاً خارج سيطرتنا، لذا نخطط له بدل الوعد بتاريخ إطلاق يتجاهله.",
      },
      {
        q: "كيف تعمل الواجهة العربية من اليمين إلى اليسار في التطبيق؟",
        a: "تُبنى من الشاشة الأولى لا تُضاف لاحقاً. ينعكس التخطيط، ويتغير اتجاه التنقل، وتحتاج النصوص والأرقام والتواريخ المختلطة بين العربية والإنجليزية إلى معالجة صريحة. إضافة دعم الاتجاه إلى تطبيق مكتمل أغلى دائماً من التصميم له منذ البداية.",
      },
      {
        q: "كم يستغرق تطوير تطبيق جوال؟",
        a: "عادةً من ٨ إلى ١٦ أسبوعاً حسب نطاق الخصائص وعدد الأنظمة الخلفية التي يتصل بها. تحصلون على خطة مراحل عند الانطلاق، مع نقاط مراجعة ترون فيها برمجية عاملة لا تقارير حالة.",
      },
      {
        q: "ماذا يحدث بعد الإطلاق؟",
        a: "فترة ضمان تتراوح عادةً بين ٣٠ و٩٠ يوماً تغطي العيوب. بعدها تحتاج التطبيقات عملاً مستمراً أياً كان من بناها: تحديثات أنظمة التشغيل، وإيقاف حزم التطوير، وتغيّر سياسات المتاجر، كلها تفرض تعديلات. تغطي عقود الصيانة الاختيارية ذلك.",
      },
    ],
  },

  "ui-ux": {
    en: [
      {
        q: "What do we actually receive from a UX engagement?",
        a: "Research findings, user flows, wireframes, a design system with reusable components, and production-ready interface designs. If we are also building the product, the design system becomes the front-end component library rather than a document nobody opens again.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. Most engagements apply an existing brand to product interfaces rather than replacing it — brand and product design are different jobs. If the brand has gaps that block the product work, such as no defined type scale or state colours, we will flag them and propose the minimum needed.",
      },
      {
        q: "How is Arabic design different from translating an English interface?",
        a: "The layout mirrors, so visual hierarchy, iconography and navigation all have to be reconsidered rather than flipped. Arabic text runs longer than English and needs different line height and type choices. We design both directions together so neither ends up as an afterthought.",
      },
      {
        q: "Do you do user research, or design from a brief?",
        a: "We prefer research, because designing from assumptions is how expensive rebuilds start. That can be as light as five user interviews and an analytics review. If the budget or timeline genuinely does not allow it, we say what we are assuming and where the risk sits.",
      },
      {
        q: "How do you measure whether the design worked?",
        a: "By agreeing before the work starts what should change — task completion, drop-off at a specific step, support tickets on a specific screen — and instrumenting it so the number is observable after launch. Design quality that cannot be checked against anything is just taste.",
      },
    ],
    ar: [
      {
        q: "ماذا نستلم فعلياً من مشروع تجربة المستخدم؟",
        a: "نتائج البحث، ومسارات المستخدم، والمخططات الهيكلية، ونظام تصميم بمكوّنات قابلة لإعادة الاستخدام، وتصاميم واجهات جاهزة للتنفيذ. وإذا كنا نبني المنتج أيضاً، يتحول نظام التصميم إلى مكتبة مكوّنات في الواجهة الأمامية بدل أن يبقى مستنداً لا يفتحه أحد.",
      },
      {
        q: "هل يمكنكم العمل ضمن هويتنا البصرية الحالية؟",
        a: "نعم. معظم المشاريع تطبّق هوية قائمة على واجهات المنتج بدل استبدالها، فتصميم الهوية وتصميم المنتج عملان مختلفان. وإذا كانت الهوية تعاني ثغرات تعيق العمل، مثل غياب سلّم الخطوط أو ألوان الحالات، فسننبّه إليها ونقترح الحد الأدنى المطلوب.",
      },
      {
        q: "بم يختلف التصميم العربي عن ترجمة واجهة إنجليزية؟",
        a: "ينعكس التخطيط، لذا يجب إعادة النظر في التسلسل البصري والأيقونات والتنقل لا مجرد قلبها. كما أن النص العربي أطول من الإنجليزي ويحتاج ارتفاع سطر وخيارات خطوط مختلفة. نصمم الاتجاهين معاً حتى لا يصبح أحدهما إضافة متأخرة.",
      },
      {
        q: "هل تجرون بحثاً مع المستخدمين أم تصممون من موجز؟",
        a: "نفضّل البحث، لأن التصميم على الافتراضات هو ما يقود إلى إعادة بناء مكلفة. وقد يكون البحث خفيفاً بحجم خمس مقابلات ومراجعة للتحليلات. وإذا كانت الميزانية أو المدة لا تسمح فعلاً، نوضح ما نفترضه وأين تقع المخاطرة.",
      },
      {
        q: "كيف تقيسون نجاح التصميم؟",
        a: "بالاتفاق قبل بدء العمل على ما ينبغي أن يتغير: إتمام المهمة، أو نسبة التسرّب عند خطوة محددة، أو تذاكر الدعم على شاشة بعينها، ثم تجهيز القياس ليكون الرقم قابلاً للملاحظة بعد الإطلاق. جودة تصميم لا يمكن التحقق منها ليست سوى ذوق شخصي.",
      },
    ],
  },

  "ai-video-dubbing": {
    en: [
      {
        q: "How is this different from subtitles?",
        a: "Dubbing replaces the spoken audio in the target language, so the viewer watches rather than reads. That matters for social video, training material and anything watched on a phone. Subtitles remain the cheaper option and we will say when they are the better fit.",
      },
      {
        q: "Does it keep the original speaker's voice?",
        a: "Voice cloning can preserve speaker characteristics across languages, subject to the consent of the person being cloned. We ask for that consent explicitly before any voice work, and will not clone a voice without it.",
      },
      {
        q: "Which languages and Arabic varieties are supported?",
        a: "Modern Standard Arabic and major regional varieties, English, Turkish and other widely supported languages. Quality varies by language and by how clean the source audio is, so we run a short sample on your own footage before you commit to a volume.",
      },
      {
        q: "How accurate is it for technical or branded terms?",
        a: "Out of the box, imperfectly — product names, acronyms and industry terms are where automated dubbing usually slips. We take a glossary from you up front and review those terms specifically, because that is the difference between usable output and something that has to be redone.",
      },
      {
        q: "What is the turnaround?",
        a: "Substantially faster than studio dubbing, typically within a day for standard-length content once the glossary and voice settings are agreed. Bulk libraries are scheduled in batches. Review time on your side is usually the deciding factor.",
      },
    ],
    ar: [
      {
        q: "بم يختلف هذا عن الترجمة النصية؟",
        a: "الدبلجة تستبدل الصوت المنطوق باللغة الهدف، فيشاهد المتلقي بدل أن يقرأ. وهذا مهم لفيديوهات التواصل الاجتماعي والمواد التدريبية وكل ما يُشاهَد على الهاتف. تبقى الترجمة النصية الخيار الأقل تكلفة، وسنقول لكم متى تكون هي الأنسب.",
      },
      {
        q: "هل تحافظ على صوت المتحدث الأصلي؟",
        a: "يمكن لاستنساخ الصوت أن يحافظ على خصائص المتحدث عبر اللغات، شريطة موافقة الشخص المعني. نطلب هذه الموافقة صراحةً قبل أي عمل صوتي، ولا نستنسخ صوتاً بدونها.",
      },
      {
        q: "ما اللغات واللهجات العربية المدعومة؟",
        a: "العربية الفصحى وأبرز اللهجات الإقليمية، والإنجليزية، والتركية، ولغات أخرى واسعة الدعم. تتفاوت الجودة بحسب اللغة وبحسب نظافة الصوت المصدري، لذا ننفّذ عينة قصيرة على مادتكم قبل الالتزام بأي كمية.",
      },
      {
        q: "ما مدى دقتها مع المصطلحات التقنية وأسماء العلامات؟",
        a: "دون ضبط، غير دقيقة بما يكفي؛ فأسماء المنتجات والاختصارات والمصطلحات المتخصصة هي مواضع الخلل المعتادة في الدبلجة الآلية. نأخذ منكم مسرداً مسبقاً ونراجع هذه المصطلحات تحديداً، لأن هذا هو الفارق بين مخرجات صالحة للاستخدام وأخرى تحتاج إعادة.",
      },
      {
        q: "كم تستغرق مدة التنفيذ؟",
        a: "أسرع بكثير من الدبلجة الاستوديوية، وعادةً خلال يوم للمحتوى ذي الطول المعتاد بعد الاتفاق على المسرد وإعدادات الصوت. تُجدوَل المكتبات الكبيرة على دفعات. وغالباً يكون وقت المراجعة لديكم هو العامل الحاسم.",
      },
    ],
  },

  dashboards: {
    en: [
      {
        q: "What is a custom dashboard?",
        a: "A dashboard is a screen that pulls live figures from your systems, such as your CRM, ERP, spreadsheets, and databases, and shows the few numbers your team has agreed on. A custom dashboard is built around your own definitions, roles, and languages instead of a generic template.",
      },
      {
        q: "When do I need a custom dashboard instead of an off-the-shelf BI tool?",
        a: "Off-the-shelf tools fit when your data sits in supported sources and standard charts are enough. A custom build makes sense when you need Arabic and English with full RTL layouts, dashboards embedded in your own portal, unusual data sources, or tight role-based access.",
      },
      {
        q: "Which systems can the data come from?",
        a: "CRMs such as HubSpot, Salesforce, and Zoho, ERPs such as Odoo and SAP, spreadsheets, and SQL databases, through their APIs or exports. Feasibility is confirmed in a data audit before any build starts.",
      },
      {
        q: "Can the dashboard work in Arabic?",
        a: "Yes. Labels, number formats, dates, and layouts are built for both Arabic and English, including full right-to-left layouts, rather than mirrored afterwards.",
      },
      {
        q: "How long does it take and what does it cost?",
        a: "It depends on the number of data sources, the number of KPIs, and whether the data needs cleaning first. We scope it after a discovery call and give a written estimate; there is no fixed price list.",
      },
    ],
    ar: [
      {
        q: "ما هي لوحة المعلومات المخصصة؟",
        a: "لوحة المعلومات شاشة تسحب أرقاماً حيّة من أنظمتكم، مثل نظام إدارة العملاء وERP والجداول وقواعد البيانات، وتعرض الأرقام القليلة التي اتفق عليها فريقكم. واللوحة المخصصة تُبنى حول تعريفاتكم وأدواركم ولغاتكم بدلاً من قالب عام.",
      },
      {
        q: "متى أحتاج لوحة مخصصة بدل أداة BI جاهزة؟",
        a: "الأدوات الجاهزة مناسبة حين تكون بياناتكم في مصادر مدعومة وتكفيكم الرسوم القياسية. ويكون البناء المخصص أنسب حين تحتاجون العربية والإنجليزية بتخطيط كامل من اليمين، أو لوحات مدمجة في بوابتكم، أو مصادر بيانات غير معتادة، أو صلاحيات وصول دقيقة حسب الدور.",
      },
      {
        q: "من أي الأنظمة يمكن أن تأتي البيانات؟",
        a: "من أنظمة CRM مثل HubSpot وSalesforce وZoho، وأنظمة ERP مثل Odoo وSAP، والجداول، وقواعد بيانات SQL، عبر واجهاتها البرمجية أو ملفات التصدير. نتأكد من الجدوى في تدقيق البيانات قبل بدء أي بناء.",
      },
      {
        q: "هل تعمل اللوحة بالعربية؟",
        a: "نعم. تُبنى التسميات وصيغ الأرقام والتواريخ والتخطيطات للعربية والإنجليزية معاً، بما فيها التخطيط الكامل من اليمين، بدلاً من عكسها لاحقاً.",
      },
      {
        q: "كم يستغرق المشروع وكم يكلّف؟",
        a: "يعتمد ذلك على عدد مصادر البيانات وعدد المؤشرات وما إذا كانت البيانات تحتاج تنظيفاً أولاً. نحدد النطاق بعد مكالمة اكتشاف ونقدم تقديراً مكتوباً، ولا توجد قائمة أسعار ثابتة.",
      },
    ],
  },

  consulting: {
    en: [
      {
        q: "What does a technical audit actually produce?",
        a: "A written assessment of what you run today, where the real bottlenecks are, and a ranked list of what to change with effort and impact against each item. It is written to be actionable by whoever implements it, including a team that is not us.",
      },
      {
        q: "Will you recommend your own services?",
        a: "Sometimes the answer is that you do not need a build at all, or that an off-the-shelf product solves it for a fraction of the cost. We would rather say that than sell a project that should not exist. An audit you cannot trust has no value to you.",
      },
      {
        q: "How do you decide whether AI is the right tool?",
        a: "By checking whether the problem needs judgement over unstructured input. Rules and automation handle deterministic work more cheaply and more predictably. AI earns its cost on language, classification, extraction and summarisation — and we will tell you when a spreadsheet and a rule would do.",
      },
      {
        q: "Can you work with our in-house engineering team?",
        a: "Yes. That is common — architecture review, a second opinion on a build-versus-buy decision, or specialist input on AI and automation that a generalist team has not had reason to develop. We work alongside your team rather than around it.",
      },
      {
        q: "Is the first conversation free?",
        a: "Yes. There is a free 30–45 minute discovery call to understand what you are trying to solve and whether we are the right people for it. No commitment, and no obligation to continue.",
      },
    ],
    ar: [
      {
        q: "ماذا تُنتج المراجعة التقنية فعلياً؟",
        a: "تقييماً مكتوباً لما تشغّلونه اليوم، وأين تقع الاختناقات الحقيقية، وقائمة مرتّبة بما ينبغي تغييره مع تقدير الجهد والأثر لكل بند. تُكتب لتكون قابلة للتنفيذ من أي جهة تتولّى التطبيق، بما في ذلك فريق غيرنا.",
      },
      {
        q: "هل ستوصون بخدماتكم أنتم؟",
        a: "أحياناً تكون الإجابة أنكم لا تحتاجون بناءً من الأساس، أو أن منتجاً جاهزاً يحل المشكلة بجزء يسير من التكلفة. نفضّل قول ذلك على بيع مشروع لا ينبغي أن يوجد. فالمراجعة التي لا تثقون بها بلا قيمة لكم.",
      },
      {
        q: "كيف تحددون أن الذكاء الاصطناعي هو الأداة الصحيحة؟",
        a: "بالتحقق مما إذا كانت المشكلة تتطلب حكماً على مدخلات غير منظمة. القواعد والأتمتة تعالج العمل الحتمي بتكلفة أقل ونتائج أثبت. أما الذكاء الاصطناعي فيستحق تكلفته في اللغة والتصنيف والاستخراج والتلخيص، وسنقول لكم متى يكفي جدول بيانات وقاعدة بسيطة.",
      },
      {
        q: "هل يمكنكم العمل مع فريقنا الهندسي الداخلي؟",
        a: "نعم، وهذا شائع: مراجعة معمارية، أو رأي ثانٍ في قرار البناء مقابل الشراء، أو خبرة متخصصة في الذكاء الاصطناعي والأتمتة لم يكن لدى فريق عام سبب لتطويرها. نعمل إلى جانب فريقكم لا من حوله.",
      },
      {
        q: "هل المحادثة الأولى مجانية؟",
        a: "نعم. هناك مكالمة اكتشاف مجانية من ٣٠ إلى ٤٥ دقيقة لفهم ما تحاولون حله وما إذا كنا الجهة المناسبة له. دون التزام، ودون أي إلزام بالمتابعة.",
      },
    ],
  },
};

/** FAQs for a service page, or an empty array when the slug has none. */
export function getServiceFaqs(slug: string | undefined, isAr: boolean): ServiceFaqItem[] {
  if (!slug) return [];
  const entry = SERVICE_FAQS[slug];
  if (!entry) return [];
  return isAr ? entry.ar : entry.en;
}
