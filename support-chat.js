/* ============================================
   GALAXY ASSIST — AI Support Chat
   Specialized in Bee Pro Hub (GoHighLevel)
   Loaded only on /support page
   ============================================ */

const GALAXY_ASSIST_CONFIG = {
    webhookUrl: '/api/galaxy-assist',
    timeoutMs: 15000,
    systemPrompt: `You are Galaxy Assist, the AI support agent for Galaxy IT & Marketing (Worcester, MA). You help clients use Bee Pro Hub — a white-labeled GoHighLevel (GHL) platform. You are an EXPERT on every feature of GoHighLevel and answer questions accurately and helpfully.

==============================================
RULES OF ENGAGEMENT
==============================================
1. Answer in the same language the user writes (English, Spanish, or Portuguese — auto-detect).
2. Keep answers conversational and concise (2-5 sentences for simple questions, longer ONLY when the user needs full setup steps).
3. Be direct and helpful — like a knowledgeable friend, not a robot.
4. NEVER invent features that don't exist. If unsure, say "I'm not 100% sure about that specific thing — best to confirm with the Galaxy team on the WhatsApp group" instead of guessing.
5. If a question is about something the Galaxy team handles for the client (see GALAXY-TEAM-MANAGED list below), point them there cheerfully.
6. Use simple <b>bold</b> for menu paths (e.g., <b>Settings → My Staff</b>) and bullet lists with <br> when listing steps.
7. Don't use "Step 1, Step 2" labeling — write naturally.

==============================================
HOW TO HANDLE ANY MESSAGE STYLE
==============================================
Clients write however they want — be ready for ALL of these and ALWAYS give a useful answer:

**Typos / abbreviations / slang (Portuguese, Spanish, English):**
- PT: "vc"=você, "oq"=o que, "td"=tudo, "blz"=beleza, "kk"/"kkk"=laughing, "ne"=né, "tbm"=também, "msm"=mesmo, "qd"=quando, "pq"=porque, "p"=para, "n"=não, "vlw"=valeu, "obg"=obrigado, "tipo assim", "saca?", "cara"
- ES: "q"=que, "xq"=por qué, "tb"=también, "x"=por, "salu2"=saludos
- EN: "u"=you, "ur"=your, "rn"=right now, "tho"=though, "lol", "thx"=thanks
- Mistyped GHL terms: "wokflow"=workflow, "calendario"=calendar, "auntomatizar"=automatizar, "go higlevel"=gohighlevel
→ Mentally fix the typo and answer the real question.

**Just a keyword or fragment:** Examples: "whatsapp", "calendario", "report", "automatizar", "spam"
→ Pick the most likely topic and give a focused answer + offer to go deeper. Don't ask "could you clarify?" — that's annoying.

**Vague / "doesn't work" complaints:** "nao funciona", "ta dando erro", "nao consigo", "como faz?"
→ Ask ONE specific clarifying question (which feature/screen are you on?) AND offer the 2 most likely fixes. Don't make them play 20 questions.

**Multi-question messages:** "como configuro x e tambem como vejo y e o z?"
→ Answer all in order, separated by clear breaks. Keep each part tight.

**Frustrated / emotional:** "nao consigo!!", "isso ta muito ruim", "to perdendo tempo"
→ Acknowledge the frustration warmly first ("entendo, vamos resolver"), then give the answer. Don't be defensive about the platform.

**Voice-to-text (long, no punctuation):** "oi cara queria saber como faço pra mandar uma mensagem pro meu cliente que pediu orçamento ontem mas eu n sei se ele recebeu o email"
→ Find the actual question buried in there and answer it directly. Reference what they're trying to do.

**Off-topic but related to running the business:** "vale a pena anunciar no facebook?", "qual o melhor horario pra postar?"
→ Give a quick honest take, then route to the Galaxy team for strategy specifics ("nosso time pode te ajudar a planejar isso direitinho").

**Completely off-topic** (e.g. asking about politics, weather, unrelated tech):
→ Politely redirect: "Sou especializado no Bee Pro Hub — pra essa pergunta um Google ajuda mais. Posso te ajudar com algo do seu CRM?"

**One-word "sim", "não", "ok", "tá":**
→ This is a follow-up to your previous answer. Continue the thread naturally — offer the next step or related help.

ALWAYS RETURN AN ANSWER. Never say "I don't understand" — even if the message is unclear, infer the most likely intent and respond. If genuinely lost, give the WhatsApp group as the answer ("não captei 100% — o time consegue te ajudar mais rápido pelo grupo do WhatsApp").

==============================================
COMPLETE GHL / BEE PRO HUB FEATURE REFERENCE
==============================================

LEFT SIDEBAR MENU (these ARE the menu items — never invent others):

>> DASHBOARD
- Customizable widgets: contact count, opportunity value, conversion funnel, source breakdown, calendar activity, payment totals
- Add widgets via the gear icon → Add Widget. Drag to rearrange.

>> CONVERSATIONS (unified inbox)
- All channels in one view: SMS, Email, WhatsApp, Facebook Messenger, Instagram DM, Google Business Profile messages, Webchat (chat widget)
- Filters by channel, unread, assigned, starred
- Compose: type "/" to insert saved Snippets (canned replies). Use {{merge_fields}} for personalization
- Internal notes: yellow note pad — visible only to team
- AI Suggestions: GHL can suggest replies based on conversation context (Settings → Conversation AI)
- Manual takeover: pause a workflow when a human is replying
- Schedule a message: click the clock icon to send later

>> CALENDARS
- Event Types: Standard (1-on-1), Round Robin (rotates among team), Class Booking (group session), Service Booking (with resource), Collective (multiple required attendees)
- Calendar settings per event: duration, buffer, max bookings/day, custom availability windows
- Each calendar has a public booking page URL (share with clients)
- Notifications per calendar: confirmation, reminders (e.g., 24h + 1h before), no-show follow-up, post-appointment review request
- Cancel/reschedule: clients self-serve via the link in their confirmation email/SMS, or staff can do it from Calendars → Appointments
- Sync with external: Google Calendar, Outlook, iCloud (per user, in Profile)

>> CONTACTS
- Add contact: top right "+ Add Contact"
- Smart Lists: filtered views that auto-update. Filter by tag, source, custom field, last activity, opportunity stage, etc. Save with a name to reuse
- Bulk Actions: select multiple contacts → Send SMS/Email, Add Tag, Add to Workflow, Export, Delete
- Import: top right Import button → CSV upload → map columns (name, phone, email, tags, custom fields) → optionally add a tag to all
- Export: 3-dot menu → Export → CSV emailed to you
- Companies: parent records that group multiple contacts (e.g., a business with 3 employee contacts)
- Manage Tags: Settings → Tags. Tags are free-form labels for segmentation
- Merge Duplicates: Bulk Actions → Merge

>> OPPORTUNITIES (Pipelines)
- Kanban view: drag-drop deals between stages
- Status: Open, Won, Lost, Abandoned (different from stage which is just where in the pipeline)
- Each opportunity links to one contact and has: monetary value, owner (assigned to), pipeline, stage, source, lost reason
- Create new pipeline: Settings → Pipelines → + New Pipeline. Add stages with names like "New Lead", "Qualified", "Proposal Sent", "Won"
- Pipeline reports: see opportunities by source, stage, owner; conversion rate per stage; deal velocity

>> PAYMENTS
- Connect Stripe (or PayPal, Authorize.net, NMI, Square) first: Settings → Integrations → Payment Processors
- Products: define what you sell — one-time, recurring, with pricing tiers
- Invoices: one-time bill. Send via email/SMS with payment link
- Estimates: quote that the client can accept and convert to invoice. NO e-signature field on Estimates
- Subscriptions: recurring billing. Manage in Payments → Subscriptions. Pause, cancel, change card from there
- Coupons: discount codes for products
- Transactions: history of all payments with status (paid, failed, refunded)
- Orders: list of completed sales
- Documents & Contracts: separate menu inside Payments. ONLY place with e-signature. Create template, drop signature/date/text fields, send for signing

>> MARKETING
- Social Planner: schedule posts to Facebook, Instagram, Google Business Profile, LinkedIn, TikTok, Twitter/X. Connect each via Settings → Integrations
- Email Campaigns: drag-drop email builder, send to lists, track opens/clicks, A/B test
- Email Templates: reusable designs
- SMS Campaigns: bulk SMS with personalization
- Trigger Links: short URLs that track clicks AND can fire workflows when clicked. Build at Marketing → Trigger Links
- Affiliate Manager: invite affiliates, give commission, track referrals
- Brand Boards: white-label color/logo presets

>> AUTOMATION
- Workflows: visual builder with Triggers + Actions
- Common triggers: Form Submitted, Contact Created, Tag Added, Opportunity Stage Changed, Appointment Booked/Cancelled/Status Changed, Trigger Link Clicked, Customer Replied, Email Opened, Date Reached, Webhook
- Common actions: Send SMS / Email / WhatsApp, Add/Remove Tag, Create/Update Opportunity, Move Stage, Assign Owner, Wait (5 min, 1 day, until specific time), If/Else (branch on conditions), Send to Webhook, Update Custom Field, Create Task, Notify User, AI Reply
- Goal events: exit conditions (e.g., "exit if contact replies")
- Wait actions for delays — workflows can span days/weeks
- Test mode: dry run a workflow without sending real messages
- Re-enrollment: control whether a contact can enter the same workflow twice

>> SITES
- Funnels: multi-step landing pages with conversion focus
- Websites: full multi-page sites
- Forms: standalone or embedded forms — feed contacts into pipelines/workflows
- Surveys: multi-page question flows (different from forms)
- Chat Widget: embeddable chat bubble for the website
- QR Codes: generate QR codes pointing anywhere (Trigger Links, calendar booking, etc.)
- URL Redirects: short links and redirects
- Blogs: simple blog/CMS
- Client Portal: gated area for paying members

>> MEMBERSHIPS
- Courses: video lessons organized into modules
- Products: digital downloads
- Member access: tied to payment (one-time or subscription)
- Drip content: release lessons over time

>> REPUTATION
- Reviews list: shows all reviews from connected sources (Google Business Profile, Facebook). Reply directly from here
- Send Requests: bulk or individual review request via SMS or email. Templates editable
- Listings: manage business info across multiple directories (Yelp, Bing, etc.) — paid add-on
- Auto-trigger review requests via workflow (after appointment completed, opportunity won, tag added)

>> REPORTING
- Google Ads Reporting: connect Google Ads → see spend, impressions, clicks, conversions
- Facebook Ads Reporting: similar for Meta Ads
- Attribution Report: which source brought which contact and revenue
- Call Reporting: call history, duration, recordings, who answered
- Appointment Reports: booked vs no-show, by team member
- Agent Reporting: messages sent, replies, response time per team member

>> SETTINGS (left sidebar gear icon)
- Business Profile: name, address, timezone, logo
- My Staff: add/remove team members, set roles (Admin, User), per-user permissions
- Team Roles: define custom permission sets
- Phone Numbers: buy numbers, configure A2P 10DLC, voicemail greeting, call recording, missed-call text-back
- Email Services: configure sending email (Mailgun, SendGrid, or GHL's built-in), domain authentication
- Domains: connect custom domains for funnels/websites
- URL Redirects: short links
- Custom Fields: define extra contact data fields (text, number, date, dropdown, multi-select, file upload)
- Custom Values: account-wide variables ({{custom_value.business_phone}}, etc.) for templates
- Snippets: saved canned replies (used in Conversations with "/")
- Tags: manage all contact tags
- Pipelines: create/edit pipelines and stages
- Conversation AI: configure the auto-reply bot
- Integrations: connect Stripe, QuickBooks, Google, Facebook, Zapier, Make, etc.
- API Keys: for developers
- Audit Logs: who did what, when

==============================================
COMMON CLIENT QUESTIONS & ACCURATE ANSWERS
==============================================

Q: "How do I see where my leads came from?"
→ Open the contact in Contacts and check the Source field on the right panel. For an overview, go to Reporting → Attribution Report. Galaxy's monthly email report also includes source breakdown.

Q: "My emails are going to spam, what do I do?"
→ This is usually missing domain authentication (SPF/DKIM/DMARC). The Galaxy team sets this up — send your domain in the WhatsApp group.

Q: "Can I send WhatsApp from Bee Pro Hub?"
→ Yes, via the official WhatsApp Business API. Setup requires Meta verification of a business account + phone number — Galaxy team handles this.

Q: "How do I get more reviews automatically?"
→ Galaxy team can build a workflow that sends review requests after appointments are completed or opportunities are won. Send the request in WhatsApp.

Q: "Can I add a digital signature to my invoice?"
→ No, Estimates and Invoices don't have signature fields. For e-signatures, use Documents & Contracts (in the Payments menu) — create a contract template with signature fields and send for signing.

Q: "How do I connect Stripe?"
→ Settings → Integrations → Payment Processors → Stripe → Connect. You'll be redirected to Stripe to authorize.

Q: "Why aren't my SMS sending to US numbers?"
→ Probably A2P 10DLC registration is missing or pending. Galaxy team registers your business with US carriers — without it, SMS get blocked. Send a WhatsApp asking us to register.

Q: "How do I see who clicked my email?"
→ Open the contact → Activity tab. Or Marketing → Email Campaigns → click a campaign → see opens/clicks.

Q: "Can I bulk-send SMS to all my contacts?"
→ Yes. Contacts → filter or use Smart List → Bulk Actions → Send SMS. Use {{contact.first_name}} for personalization. (Needs A2P registration for US numbers.)

Q: "How do I cancel a customer's subscription?"
→ Payments → Subscriptions → find the subscription → click → Cancel.

Q: "How do I change my password?"
→ Profile icon (top right) → Profile → Security → Change Password. Same place to enable 2FA.

Q: "How do I add my team to the account?"
→ Settings → My Staff → + Add Employee. Set name, email, role (Admin or User), permissions.

Q: "Where do I see all my appointments?"
→ Calendars → Appointments. Filter by calendar, status, team member, date.

Q: "What's the difference between a workflow and a trigger?"
→ Workflows are the modern visual builder (Automation → Workflows) — recommended. Triggers are the legacy system, still works but harder to maintain. Use Workflows for new automations.

Q: "Can I see calls and call recordings?"
→ Reporting → Call Reporting. Or open a contact → Activity tab to see calls with that specific contact. Recordings playable inline if recording was enabled per number.

==============================================
GALAXY-TEAM-MANAGED (redirect to WhatsApp group cheerfully)
==============================================
- Website / funnel design or content edits
- New workflow / automation creation or major edits
- Google Business Profile changes (hours, address, photos, posts)
- WhatsApp Business API verification
- A2P 10DLC SMS registration
- Email DNS / domain authentication (SPF, DKIM, DMARC)
- Stripe / payment processor initial connection
- Snapshot installation
- Custom integrations / API work
- Conversation AI persona setup

==============================================
WHEN YOU GENUINELY DON'T KNOW
==============================================
Don't guess. Say something like: "Honestly not 100% sure on that specific thing — the Galaxy team can give you the exact answer. Drop a message in the WhatsApp group and they'll help you right away."

This is MUCH better than inventing a wrong answer that the client will then try and fail with.`
};

/* ---- Built-in Knowledge Base ---- */
/* phrases = 10pts, keywords = 1pt. Covers all GHL features. */
/* Items marked team:true → redirect to WhatsApp group */
const KNOWLEDGE_BASE = [
    {
        id: 'review-request',
        phrases: ['review request', 'request review', 'send review', 'ask review', 'get review', 'get more review', 'pedido de avaliação', 'pedir avaliação', 'enviar avaliação', 'solicitar reseña', 'pedir reseña', 'enviar reseña', 'solicitud de reseña', 'pedido de review', 'pedir review', 'como peço review', 'como pedir review', 'como envio review', 'como consigo review', 'como pedir avaliação', 'como peço avaliação', 'como consigo avaliação', 'como solicito reseña', 'como pido reseña'],
        keywords: ['review', 'avaliação', 'reseña', 'reputation', 'reputação', 'rating', 'estrela', 'star'],
        answer: {
            en: "Sure! To send review requests, go to <b>Reputation</b> on the left menu, then click the <b>Requests</b> tab. From there, hit <b>Send Request</b>, pick the contacts you want, customize your SMS or email message, and send it off. The cool part? You can automate this — ask our team to set up a workflow that sends review requests automatically after every appointment.",
            es: "¡Claro! Para enviar solicitudes de reseña, ve a <b>Reputation</b> en el menú izquierdo y haz clic en la pestaña <b>Requests</b>. Desde ahí, dale a <b>Send Request</b>, elige los contactos, personaliza el mensaje por SMS o email, y envía. Lo mejor es que esto se puede automatizar — pide a nuestro equipo que configure un workflow que envíe solicitudes automáticas después de cada cita.",
            pt: "Claro! Pra enviar pedidos de avaliação, vai em <b>Reputation</b> no menu lateral e clica na aba <b>Requests</b>. Daí é só clicar em <b>Send Request</b>, escolher os contatos, personalizar a mensagem (pode ser SMS ou email) e enviar. O mais legal é que dá pra automatizar isso — pede pro nosso time configurar um workflow que envia pedidos de review automaticamente depois de cada atendimento."
        },
        followup: {
            en: "You can track which review requests were sent and whether the client opened them right in the <b>Reputation</b> section. If they haven't responded, you can resend it. And if you want a steady flow of reviews coming in without thinking about it, ask our team to automate it — we can set it up so every completed appointment triggers a review request automatically.",
            es: "Puedes ver qué solicitudes se enviaron y si el cliente las abrió en la sección <b>Reputation</b>. Si no han respondido, puedes reenviar. Y si quieres un flujo constante de reseñas sin pensarlo, pide a nuestro equipo que lo automatice — configuramos un workflow que envía solicitudes automáticas después de cada cita.",
            pt: "Dá pra acompanhar quais pedidos foram enviados e se o cliente abriu ali mesmo na seção <b>Reputation</b>. Se ainda não responderam, pode reenviar. E se quer um fluxo constante de avaliações sem precisar pensar nisso, pede pro nosso time automatizar — a gente configura um workflow que manda pedido de review automaticamente depois de cada atendimento."
        }
    },
    {
        id: 'respond-review',
        phrases: ['respond review', 'reply review', 'answer review', 'responder avaliação', 'responder reseña', 'responder review', 'como respondo avaliação', 'como respondo review', 'como respondo reseña', 'responder uma avaliação', 'reply to review', 'respond to review', 'respondo uma avaliação', 'respondo avaliação', 'respondo reseña', 'respondo review', 'reply a review'],
        keywords: [],
        answer: {
            en: "To reply to a Google review, open <b>Reputation</b> on the left menu — you'll see all your reviews right there. Click on the one you want to respond to, type your reply, and hit <b>Reply</b>. Quick tip: try to respond within 24 hours. Google notices that, and it actually helps your local ranking!",
            es: "Para responder una reseña de Google, abre <b>Reputation</b> en el menú izquierdo — verás todas tus reseñas ahí. Haz clic en la que quieras responder, escribe tu respuesta y dale <b>Reply</b>. Un consejo: intenta responder dentro de 24 horas. Google lo nota y ayuda a tu posicionamiento local.",
            pt: "Pra responder uma avaliação do Google, abre <b>Reputation</b> no menu lateral — vai ver todas as avaliações ali. Clica na que quer responder, escreve sua resposta e clica em <b>Reply</b>. Uma dica: tenta responder em até 24 horas. O Google percebe isso e ajuda no seu posicionamento local!"
        }
    },
    {
        id: 'contacts-crm',
        phrases: ['add contact', 'import contact', 'smart list', 'manage contact', 'manage lead', 'adicionar contato', 'importar contato', 'gerenciar contato', 'agregar contacto', 'importar contacto', 'gestionar contacto', 'como adiciono contato', 'como importo contato', 'como crio smart list', 'como adiciono tag', 'como gerencio lead', 'como agrego contacto', 'como importo contacto', 'create smart list', 'add tag', 'bulk tag', 'criar tag', 'crear tag'],
        keywords: ['contact', 'contato', 'contacto', 'lead', 'crm', 'import', 'importar', 'smart list', 'tag', 'pipeline'],
        answer: {
            en: "Your CRM lives in <b>Contacts</b> on the left menu — that's where all your leads are. You can add a new contact by clicking <b>+ Add Contact</b> at the top right, or import a whole list via CSV using the <b>Import</b> button. If you want to organize them, try creating a <b>Smart List</b> — it automatically filters contacts by tags, dates, or pipeline stage. Need to tag people in bulk? Select multiple contacts with the checkboxes, click <b>Actions</b>, then <b>Add Tag</b>. What specifically do you need to do?",
            es: "Tu CRM está en <b>Contacts</b> en el menú izquierdo — ahí están todos tus leads. Puedes agregar un contacto nuevo con <b>+ Add Contact</b> arriba a la derecha, o importar una lista completa por CSV con el botón <b>Import</b>. Para organizarlos, crea una <b>Smart List</b> — filtra automáticamente por tags, fechas o etapa del pipeline. ¿Necesitas poner tags en masa? Selecciona varios contactos, clic en <b>Actions</b> → <b>Add Tag</b>. ¿Qué necesitas hacer específicamente?",
            pt: "Seu CRM fica em <b>Contacts</b> no menu lateral — é onde ficam todos os seus leads. Pra adicionar alguém novo, clica em <b>+ Add Contact</b> no canto superior direito. Pra importar uma lista inteira, usa o botão <b>Import</b> e sobe um CSV. Se quiser organizar, cria uma <b>Smart List</b> — ela filtra os contatos automaticamente por tags, datas ou etapa do pipeline. Precisa colocar tag em vários de uma vez? Seleciona os contatos com as caixinhas, clica em <b>Actions</b> → <b>Add Tag</b>. O que especificamente você precisa fazer?"
        },
        followup: {
            en: "Each contact has a full profile — click on any contact to see their activity: all messages sent/received, emails opened, forms submitted, appointments, notes from your team, and their tags. You can also add custom fields to track whatever matters for your business (like service type or budget). To filter and find specific groups, Smart Lists are your best friend — they auto-update as contacts match your conditions.",
            es: "Cada contacto tiene un perfil completo — haz clic en cualquiera para ver su actividad: mensajes enviados/recibidos, emails abiertos, formularios enviados, citas, notas del equipo y sus tags. También puedes agregar campos personalizados para rastrear lo que importa (tipo de servicio, presupuesto). Para filtrar y encontrar grupos específicos, las Smart Lists son tu mejor herramienta — se actualizan solas.",
            pt: "Cada contato tem um perfil completo — clica em qualquer um pra ver a atividade: todas as mensagens enviadas/recebidas, emails abertos, formulários preenchidos, agendamentos, notas da equipe, e as tags. Você também pode criar campos personalizados pra acompanhar o que importa pro seu negócio (tipo de serviço, orçamento, etc.). Pra filtrar e encontrar grupos específicos, as Smart Lists são sua melhor ferramenta — elas se atualizam sozinhas conforme os contatos batem com seus critérios."
        }
    },
    {
        id: 'conversations',
        phrases: ['send message', 'send sms', 'send email', 'reply message', 'enviar mensagem', 'enviar sms', 'responder mensagem', 'enviar mensaje', 'responder mensaje', 'unified inbox', 'caixa de entrada', 'como envio mensagem', 'como envio sms', 'como respondo mensagem', 'como mando mensagem', 'como envío mensaje', 'como mando mensaje', 'como respondo um lead', 'como falo com lead', 'message a lead', 'message lead'],
        keywords: ['conversation', 'conversa', 'conversación', 'inbox', 'mensagem', 'mensaje', 'sms', 'whatsapp', 'chat'],
        answer: {
            en: "Go to <b>Conversations</b> on the left menu — that's your unified inbox where all messages come in. Search for the contact, then at the bottom you'll see channel options: <b>SMS</b>, <b>Email</b>, or <b>WhatsApp</b>. Pick the one you want, type your message (you can use saved templates too), and hit send. Everything — SMS, email, WhatsApp, Facebook DMs, Instagram DMs — all comes into this one place, so you never miss anything.",
            es: "Ve a <b>Conversations</b> en el menú izquierdo — es tu bandeja unificada donde llegan todos los mensajes. Busca el contacto, y abajo verás las opciones de canal: <b>SMS</b>, <b>Email</b>, o <b>WhatsApp</b>. Elige el que quieras, escribe tu mensaje (puedes usar plantillas guardadas también), y envía. Todo — SMS, email, WhatsApp, Facebook DMs, Instagram DMs — llega a este mismo lugar.",
            pt: "Vai em <b>Conversations</b> no menu lateral — é sua caixa de entrada unificada onde chegam todas as mensagens. Procura o contato, e lá embaixo vai ver as opções de canal: <b>SMS</b>, <b>Email</b>, ou <b>WhatsApp</b>. Escolhe o que quer, escreve sua mensagem (pode usar templates salvos também), e envia. Tudo — SMS, email, WhatsApp, Facebook DMs, Instagram DMs — chega nesse mesmo lugar, então você nunca perde nada."
        },
        followup: {
            en: "To know if the person received/read your message: for <b>emails</b>, you can see open tracking — look for the little eye icon or check in the contact's activity log. For <b>SMS</b>, you'll see a delivery status (sent, delivered). For <b>WhatsApp</b>, the double blue checkmarks mean it was read. All of this is visible right in the conversation thread. If a message bounced or failed, you'll see a red alert on it.",
            es: "Para saber si la persona recibió/leyó tu mensaje: en <b>emails</b>, puedes ver el tracking de apertura — busca el ícono del ojo o revisa en el log de actividad del contacto. En <b>SMS</b>, verás el estado de entrega (enviado, entregado). En <b>WhatsApp</b>, las dos palomitas azules significan que fue leído. Todo esto es visible en el hilo de la conversación. Si un mensaje rebotó o falló, verás una alerta roja.",
            pt: "Pra saber se a pessoa recebeu/leu sua mensagem: nos <b>emails</b>, dá pra ver o rastreamento de abertura — procura o ícone de olho ou confere no log de atividade do contato. No <b>SMS</b>, você vê o status de entrega (enviado, entregue). No <b>WhatsApp</b>, as duas marquinhas azuis significam que foi lido. Tudo isso aparece ali mesmo no fio da conversa. Se uma mensagem voltou ou falhou, vai ter um alerta vermelho."
        }
    },
    {
        id: 'automations',
        phrases: ['create automation', 'create workflow', 'follow up', 'follow-up', 'criar automação', 'criar workflow', 'crear automatización', 'crear workflow', 'drip campaign', 'como crio automação', 'como crio workflow', 'como faço follow up', 'como creo automatización', 'como creo workflow', 'build automation', 'set up automation', 'configurar automação'],
        keywords: ['automation', 'automação', 'automatización', 'workflow', 'trigger', 'gatilho', 'sequence', 'sequência'],
        answer: {
            en: "Automations are built and managed by our team — that way we make sure everything runs perfectly and nothing breaks. If you need a new automation (like automatic follow-ups, review requests after appointments, welcome sequences for new leads), just send us a message on the <b>WhatsApp group</b> explaining what you'd like. Tell us what should trigger it and what should happen, and we'll set it up for you.",
            es: "Las automatizaciones las construye y gestiona nuestro equipo — así nos aseguramos de que todo funcione perfecto. Si necesitas una nueva (como follow-ups automáticos, solicitudes de reseñas después de citas, secuencias de bienvenida), solo mándanos un mensaje en el <b>grupo de WhatsApp</b> explicando lo que necesitas. Dinos qué debe activarlo y qué debe pasar, y lo configuramos por ti.",
            pt: "As automações são criadas e gerenciadas pelo nosso time — assim a gente garante que tudo roda certinho sem nada quebrar. Se você precisa de uma automação nova (tipo follow-up automático, pedido de review depois de atendimento, sequência de boas-vindas pra leads novos), é só mandar uma mensagem no <b>grupo do WhatsApp</b> explicando o que precisa. Diz o que deve disparar e o que deve acontecer, e a gente configura pra você."
        }
    },
    {
        id: 'calendars',
        phrases: ['booking calendar', 'set up calendar', 'create calendar', 'appointment reminder', 'configurar calendário', 'criar calendário', 'configurar calendario', 'crear calendario', 'agendar chamada', 'como configuro calendário', 'como crio calendário', 'como configuro agendamento', 'como configuro calendario', 'como creo calendario', 'set up booking', 'create booking page'],
        keywords: ['calendar', 'calendário', 'calendario', 'appointment', 'agendamento', 'booking', 'reminder', 'lembrete', 'disponibilidade', 'availability'],
        answer: {
            en: "Go to <b>Calendars</b> on the left menu. If you need a new one, click <b>+ Create Calendar</b> — you can choose between simple, round robin, or service-based types. Set your available days and hours, how long each slot is, and any buffer time between appointments. Once it's saved, you get a booking link you can share with clients. Want automatic reminders so people don't no-show? Edit the calendar, go to Notifications, and turn on SMS or email reminders — like 24h and 1h before.",
            es: "Ve a <b>Calendars</b> en el menú izquierdo. Si necesitas uno nuevo, clic en <b>+ Create Calendar</b> — puedes elegir entre simple, round robin o por servicio. Configura los días y horarios disponibles, duración de cada slot, y tiempo buffer entre citas. Una vez guardado, obtienes un link de reserva para compartir con clientes. ¿Quieres recordatorios automáticos? Edita el calendario, ve a Notifications, y activa SMS o email — como 24h y 1h antes.",
            pt: "Vai em <b>Calendars</b> no menu lateral. Se precisa criar um novo, clica em <b>+ Create Calendar</b> — dá pra escolher entre simples, round robin ou por serviço. Configura os dias e horários disponíveis, quanto tempo dura cada slot, e intervalo entre agendamentos. Depois de salvar, você recebe um link de reserva pra compartilhar com clientes. Quer lembretes automáticos pra evitar faltas? Edita o calendário, vai em Notifications, e ativa lembrete por SMS ou email — tipo 24h e 1h antes."
        }
    },
    {
        id: 'website-funnel',
        phrases: ['edit website', 'edit funnel', 'edit page', 'build funnel', 'connect domain', 'editar site', 'editar funil', 'editar página', 'editar sitio', 'editar embudo', 'conectar domínio', 'conectar dominio', 'como edito site', 'como edito meu site', 'como edito funil', 'como edito página', 'como edito sitio', 'como edito embudo', 'como edito mi sitio', 'como edito mi web', 'mi sitio web', 'meu site', 'change website', 'update website', 'alterar site', 'mudar site', 'editar mi sitio', 'editar meu site'],
        keywords: ['website', 'site', 'sitio', 'funnel', 'funil', 'embudo', 'landing page', 'builder', 'domain', 'domínio', 'dns'],
        answer: {
            en: "Website and funnel edits are done by our team to make sure everything stays looking great and working properly. Just send a message to our <b>WhatsApp group</b> with what you'd like to change — which page, what text or images you want updated, and a screenshot if you have one. We'll take care of it and let you know when it's live!",
            es: "Las ediciones del sitio web y embudos las hace nuestro equipo para que todo siga viéndose bien y funcionando correctamente. Solo manda un mensaje al <b>grupo de WhatsApp</b> con lo que quieras cambiar — qué página, qué texto o imágenes actualizar, y una captura si tienes. ¡Nosotros nos encargamos y te avisamos cuando esté listo!",
            pt: "As edições de site e funil são feitas pelo nosso time pra garantir que tudo continue bonito e funcionando direitinho. É só mandar uma mensagem no <b>grupo do WhatsApp</b> dizendo o que quer mudar — qual página, que texto ou imagem quer atualizar, e um print de tela se tiver. A gente faz e avisa quando estiver no ar!"
        }
    },
    {
        id: 'reports',
        phrases: ['read report', 'check report', 'view dashboard', 'see report', 'attribution report', 'ver relatório', 'ler relatório', 'checar relatório', 'ver reporte', 'leer reporte', 'check ranking', 'ver ranking', 'como leio relatório', 'como leio meus relatórios', 'como vejo relatório', 'como vejo meus relatórios', 'como vejo meu ranking', 'como vejo meu reporte', 'como leo mis reportes', 'como veo mis reportes', 'como veo mi ranking', 'meus relatórios', 'mis reportes', 'my report', 'my dashboard', 'meu dashboard', 'meu painel'],
        keywords: ['report', 'relatório', 'informe', 'reporte', 'dashboard', 'painel', 'analytics', 'attribution', 'ranking', 'performance', 'desempenho'],
        answer: {
            en: "Head over to <b>Reporting</b> on the left menu — that's where all your numbers live. You've got a few different reports there: the <b>Attribution Report</b> shows exactly where your leads are coming from (Google, Facebook, organic, referrals), the <b>Google/Facebook Ads</b> tabs show how your ad budget is performing, <b>Appointment Report</b> tracks bookings and no-shows, and <b>Call Report</b> shows all your call activity. You can filter everything by date range. I'd start with Attribution — it tells you which channels are actually bringing in business.",
            es: "Ve a <b>Reporting</b> en el menú izquierdo — ahí viven todos tus números. Tienes varios reportes: el <b>Attribution Report</b> muestra exactamente de dónde vienen tus leads (Google, Facebook, orgánico, referencias), las pestañas de <b>Google/Facebook Ads</b> muestran cómo rinde tu presupuesto, <b>Appointment Report</b> rastrea reservas y no-shows, y <b>Call Report</b> muestra toda la actividad de llamadas. Todo se puede filtrar por fechas. Yo empezaría con Attribution — te dice qué canales realmente traen negocio.",
            pt: "Vai em <b>Reporting</b> no menu lateral — é onde ficam todos os seus números. Tem vários relatórios lá: o <b>Attribution Report</b> mostra exatamente de onde vêm seus leads (Google, Facebook, orgânico, indica��ões), as abas de <b>Google/Facebook Ads</b> mostram como tá o desempenho do seu investimento em anúncios, o <b>Appointment Report</b> acompanha agendamentos e faltas, e o <b>Call Report</b> mostra toda a atividade de chamadas. Dá pra filtrar tudo por período. Eu começaria pelo Attribution — ele te diz quais canais realmente trazem negócio."
        },
        followup: {
            en: "To dig deeper into any report: use the <b>date filter</b> at the top to compare different time periods (like this month vs. last month). The Attribution Report is especially useful — it shows you exactly how many leads came from each source and what they're worth. If the numbers don't look right or you need help interpreting something, just screenshot the report and send it to our <b>WhatsApp group</b> — we'll help you understand what's going on.",
            es: "Para profundizar: usa el <b>filtro de fechas</b> arriba para comparar períodos (este mes vs. el pasado). El Attribution Report es el más útil — muestra exactamente cuántos leads vinieron de cada fuente. Si los números no cuadran o necesitas ayuda interpretando algo, haz captura y mándala al <b>grupo de WhatsApp</b>.",
            pt: "Pra aprofundar em qualquer relatório: usa o <b>filtro de data</b> lá em cima pra comparar períodos diferentes (tipo esse mês vs. mês passado). O Attribution Report é o mais útil — mostra exatamente quantos leads vieram de cada fonte e quanto valem. Se os números não tiverem fazendo sentido ou precisar de ajuda pra interpretar alguma coisa, tira um print do relatório e manda no <b>grupo do WhatsApp</b> — a gente te ajuda a entender o que tá acontecendo."
        }
    },
    {
        id: 'gbp',
        phrases: ['google business', 'business profile', 'google post', 'google photo', 'add photo gbp', 'foto google', 'post google', 'google meu negócio', 'perfil google', 'perfil de negocio', 'como atualizo google', 'como posto no google', 'como adiciono foto google', 'como actualizo google', 'como publico en google', 'foto no google', 'postar no google', 'meu perfil google', 'mi perfil google', 'update google profile', 'google listing', 'adicionar foto', 'agregar foto', 'add photo'],
        keywords: ['gbp', 'gmb', 'google business', 'business profile', 'foto', 'photo'],
        answer: {
            en: "For your Google Business Profile — if you need to add photos, create posts, or update your business info (hours, address, categories), just send what you need to our <b>WhatsApp group</b> and we'll handle it for you. Now, for <b>reviews</b>, that one you can do yourself! Go to <b>Reputation</b> on the left menu, click on any review, type your reply, and hit Reply. Try to respond within 24 hours — Google loves that and it helps your local ranking. To see how your profile is performing, check <b>Reporting</b>.",
            es: "Para tu Google Business Profile — si necesitas agregar fotos, crear publicaciones, o actualizar info del negocio (horarios, dirección, categorías), solo manda lo que necesitas al <b>grupo de WhatsApp</b> y nosotros lo hacemos. Ahora, para las <b>reseñas</b>, ¡eso sí puedes hacerlo tú! Ve a <b>Reputation</b> en el menú, haz clic en cualquier reseña, escribe tu respuesta, y dale Reply. Intenta responder en menos de 24 horas — a Google le gusta y ayuda a tu posicionamiento.",
            pt: "Pro seu Google Business Profile — se precisa adicionar fotos, criar posts, ou atualizar as informações do negócio (horário, endereço, categorias), é só mandar o que precisa no <b>grupo do WhatsApp</b> que a gente faz pra você. Agora, pra <b>avaliações</b>, essa parte você mesmo pode fazer! Vai em <b>Reputation</b> no menu lateral, clica em qualquer avaliação, escreve sua resposta e clica em Reply. Tenta responder em até 24 horas — o Google gosta disso e ajuda no seu posicionamento local. Pra ver como tá o desempenho do perfil, confere em <b>Reporting</b>."
        }
    },
    {
        id: 'payments',
        phrases: ['send invoice', 'create invoice', 'payment link', 'enviar fatura', 'criar fatura', 'enviar factura', 'crear factura', 'link de pagamento', 'link de pago', 'como envio fatura', 'como crio fatura', 'como cobro', 'como envío factura', 'como creo factura', 'como cobro cliente', 'conectar stripe', 'connect stripe', 'subscription', 'assinatura recorrente', 'cobrar cliente'],
        keywords: ['payment', 'pagamento', 'pago', 'invoice', 'fatura', 'factura', 'stripe', 'subscription', 'assinatura'],
        answer: {
            en: "To send an invoice:<br><b>Step 1:</b> Go to <b>Payments</b> → <b>Invoices</b><br><b>Step 2:</b> Click <b>+ New Invoice</b><br><b>Step 3:</b> Add client, line items, amounts, due date<br><b>Step 4:</b> Click <b>Send</b> — client gets email with payment link<br><br>Make sure Stripe is connected: <b>Settings</b> → <b>Payments</b> → <b>Stripe</b>. You can also create <b>Payment Links</b> and <b>Subscriptions</b> for recurring billing.",
            es: "Para enviar una factura:<br><b>Paso 1:</b> Ve a <b>Payments</b> → <b>Invoices</b><br><b>Paso 2:</b> Clic en <b>+ New Invoice</b><br><b>Paso 3:</b> Agrega cliente, líneas, montos, vencimiento<br><b>Paso 4:</b> Clic en <b>Send</b> — el cliente recibe email con link de pago<br><br>Asegúrate que Stripe esté conectado: <b>Settings</b> → <b>Payments</b> → <b>Stripe</b>.",
            pt: "Pra enviar uma fatura:<br><b>Passo 1:</b> Vá em <b>Payments</b> → <b>Invoices</b><br><b>Passo 2:</b> Clique em <b>+ New Invoice</b><br><b>Passo 3:</b> Adicione cliente, itens, valores, data de vencimento<br><b>Passo 4:</b> Clique em <b>Send</b> — o cliente recebe email com link de pagamento<br><br>Certifique-se que o Stripe está conectado: <b>Settings</b> → <b>Payments</b> → <b>Stripe</b>. Você também pode criar <b>Payment Links</b> e <b>Subscriptions</b> pra cobranças recorrentes."
        }
    },
    {
        id: 'social',
        phrases: ['schedule post', 'social media post', 'post facebook', 'post instagram', 'agendar post', 'programar post', 'publicar post', 'como agendo post', 'como publico post', 'como posto no facebook', 'como posto no instagram', 'como programo post', 'como publico en redes', 'social planner', 'planner social'],
        keywords: ['social planner', 'social', 'publicação', 'publicación', 'facebook', 'instagram', 'linkedin', 'tiktok'],
        answer: {
            en: "To schedule a social media post:<br><b>Step 1:</b> Go to <b>Marketing</b> → <b>Social Planner</b><br><b>Step 2:</b> Click <b>+ New Post</b><br><b>Step 3:</b> Write your caption, add images or video<br><b>Step 4:</b> Select accounts (Facebook, Instagram, Google, LinkedIn, TikTok)<br><b>Step 5:</b> Choose date and time (or Post Now)<br><b>Step 6:</b> Click <b>Schedule</b><br><br>The calendar view shows all your scheduled posts.",
            es: "Para programar un post en redes:<br><b>Paso 1:</b> Ve a <b>Marketing</b> → <b>Social Planner</b><br><b>Paso 2:</b> Clic en <b>+ New Post</b><br><b>Paso 3:</b> Escribe el caption, agrega imágenes o video<br><b>Paso 4:</b> Selecciona cuentas (Facebook, Instagram, Google, LinkedIn, TikTok)<br><b>Paso 5:</b> Elige fecha y hora<br><b>Paso 6:</b> Clic en <b>Schedule</b>",
            pt: "Pra agendar um post nas redes sociais:<br><b>Passo 1:</b> Vá em <b>Marketing</b> → <b>Social Planner</b><br><b>Passo 2:</b> Clique em <b>+ New Post</b><br><b>Passo 3:</b> Escreva a legenda, adicione imagens ou vídeo<br><b>Passo 4:</b> Selecione as contas (Facebook, Instagram, Google, LinkedIn, TikTok)<br><b>Passo 5:</b> Escolha data e hora (ou Poste Agora)<br><b>Passo 6:</b> Clique em <b>Schedule</b><br><br>A visualização de calendário mostra todos os posts agendados."
        }
    },
    {
        id: 'forms',
        phrases: ['create form', 'build form', 'form submission', 'criar formulário', 'crear formulario', 'como crio formulário', 'como crio form', 'como creo formulario', 'fazer formulário', 'hacer formulario', 'build a form', 'embed form'],
        keywords: ['form', 'formulário', 'formulario', 'survey', 'pesquisa', 'encuesta'],
        answer: {
            en: "To create a form:<br><b>Step 1:</b> Go to <b>Sites</b> → <b>Forms</b><br><b>Step 2:</b> Click <b>+ New Form</b><br><b>Step 3:</b> Drag and drop fields (name, email, phone, custom fields)<br><b>Step 4:</b> Set up notifications<br><b>Step 5:</b> Grab the embed code or share the direct link<br><br>All submissions go to <b>Contacts</b> automatically and can trigger workflows.",
            es: "Para crear un formulario:<br><b>Paso 1:</b> Ve a <b>Sites</b> → <b>Forms</b><br><b>Paso 2:</b> Clic en <b>+ New Form</b><br><b>Paso 3:</b> Arrastra campos (nombre, email, teléfono)<br><b>Paso 4:</b> Configura notificaciones<br><b>Paso 5:</b> Copia el código embed o comparte el link<br><br>Los envíos van a <b>Contacts</b> automáticamente.",
            pt: "Pra criar um formulário:<br><b>Passo 1:</b> Vá em <b>Sites</b> → <b>Forms</b><br><b>Passo 2:</b> Clique em <b>+ New Form</b><br><b>Passo 3:</b> Arraste e solte campos (nome, email, telefone, campos personalizados)<br><b>Passo 4:</b> Configure notificações<br><b>Passo 5:</b> Copie o código embed ou compartilhe o link direto<br><br>Todos os envios vão pra <b>Contacts</b> automaticamente e podem disparar workflows."
        }
    },
    {
        id: 'membership',
        phrases: ['create course', 'create membership', 'criar curso', 'crear curso', 'membership area', 'como crio curso', 'como creo curso', 'como faço curso', 'como hago curso', 'area de membros', 'área de miembros', 'drip content'],
        keywords: ['membership', 'course', 'curso', 'community', 'comunidade', 'lesson', 'aula'],
        answer: {
            en: "To create courses/memberships:<br><b>Step 1:</b> Go to <b>Memberships</b><br><b>Step 2:</b> Click <b>+ New Product</b><br><b>Step 3:</b> Add categories and lessons<br><b>Step 4:</b> Upload videos, text, or files<br><b>Step 5:</b> Set up offers (free, one-time payment, or subscription)<br><b>Step 6:</b> Share with your audience<br><br>You can drip content over time and track student progress.",
            es: "Para crear cursos/membresías:<br><b>Paso 1:</b> Ve a <b>Memberships</b><br><b>Paso 2:</b> Clic en <b>+ New Product</b><br><b>Paso 3:</b> Agrega categorías y lecciones<br><b>Paso 4:</b> Sube videos, texto o archivos<br><b>Paso 5:</b> Configura ofertas (gratis, pago único o suscripción)<br><b>Paso 6:</b> Comparte con tu audiencia",
            pt: "Pra criar cursos/memberships:<br><b>Passo 1:</b> Vá em <b>Memberships</b><br><b>Passo 2:</b> Clique em <b>+ New Product</b><br><b>Passo 3:</b> Adicione categorias e aulas<br><b>Passo 4:</b> Faça upload de vídeos, texto ou arquivos<br><b>Passo 5:</b> Configure ofertas (grátis, pagamento único ou assinatura)<br><b>Passo 6:</b> Compartilhe com seu público<br><br>Você pode liberar conteúdo ao longo do tempo (drip) e acompanhar o progresso dos alunos."
        }
    },
    // ===== TEAM / USERS =====
    {
        id: 'team-users',
        phrases: ['add team', 'add user', 'add member', 'add employee', 'add staff', 'adicionar pessoa', 'adicionar membro', 'adicionar equipe', 'adicionar usuário', 'agregar persona', 'agregar miembro', 'agregar usuario', 'agregar equipo', 'invite user', 'convidar usuário', 'invitar usuario', 'minha equipe', 'mi equipo', 'my team', 'team member', 'membro da equipe', 'miembro del equipo', 'remove user', 'remover usuário', 'user permissions', 'permissões', 'permisos'],
        keywords: ['team', 'equipe', 'equipo', 'user', 'usuário', 'usuario', 'member', 'membro', 'miembro', 'staff', 'employee', 'funcionário', 'empleado', 'permission', 'permissão', 'permiso', 'role', 'cargo'],
        answer: {
            en: "Sure! To add someone to your team, click the <b>Settings</b> gear icon at the bottom left, then go to <b>My Staff</b>. Click <b>+ Add Employee</b>, fill in their name, email, and phone, and choose their role — Admin gets full access, User is more limited. Hit Save and they'll get an invite email to join. You can also control exactly what they can see — edit the user and toggle which sections they have access to (Contacts, Conversations, Calendars, etc.).",
            es: "¡Claro! Para agregar a alguien al equipo, haz clic en el ícono de <b>Settings</b> (engranaje abajo a la izquierda), luego ve a <b>My Staff</b>. Clic en <b>+ Add Employee</b>, llena nombre, email y teléfono, y elige su rol — Admin tiene acceso total, User es más limitado. Dale Save y recibirán un email de invitación. También puedes controlar exactamente qué pueden ver — edita el usuario y activa/desactiva las secciones.",
            pt: "Claro! Pra adicionar alguém na equipe, clica no ícone de <b>Settings</b> (engrenagem lá embaixo à esquerda), depois vai em <b>My Staff</b>. Clica em <b>+ Add Employee</b>, preenche o nome, email e telefone da pessoa, e escolhe o cargo — Admin tem acesso total, User é mais limitado. Salva e a pessoa recebe um email de convite pra entrar. Você também pode controlar exatamente o que ela vê — é só editar o usuário e ligar/desligar quais seções ela pode acessar (Contacts, Conversations, Calendars, etc.)."
        }
    },
    // ===== SETTINGS =====
    {
        id: 'settings',
        phrases: ['business settings', 'account settings', 'company settings', 'configurações da conta', 'configurações do negócio', 'configuraciones de cuenta', 'change business info', 'mudar informações', 'cambiar información', 'business name', 'nome da empresa', 'nombre de empresa', 'timezone', 'fuso horário', 'zona horaria'],
        keywords: ['settings', 'configuração', 'configuración', 'config', 'account', 'conta', 'cuenta'],
        answer: {
            en: "To access your account settings:<br><b>Step 1:</b> Click <b>Settings</b> (gear icon, bottom left)<br><b>Step 2:</b> Click <b>Business Profile</b> to update:<br>• Business name, address, phone, email<br>• Logo and branding<br>• Timezone and language<br>• Business hours<br><br>Other important settings:<br>• <b>My Staff</b> — manage team members<br>• <b>Domains</b> — connect custom domains<br>• <b>Integrations</b> — connect Google, Facebook, Stripe, etc.<br>• <b>Phone Numbers</b> — manage your business phone lines",
            es: "Para acceder a configuraciones:<br><b>Paso 1:</b> Clic en <b>Settings</b> (engranaje, abajo a la izquierda)<br><b>Paso 2:</b> Clic en <b>Business Profile</b> para actualizar:<br>• Nombre, dirección, teléfono, email<br>• Logo y marca<br>• Zona horaria e idioma<br><br>Otras configuraciones:<br>• <b>My Staff</b> — gestionar equipo<br>• <b>Domains</b> — conectar dominios<br>• <b>Integrations</b> — conectar Google, Facebook, Stripe",
            pt: "Pra acessar as configurações da conta:<br><b>Passo 1:</b> Clique em <b>Settings</b> (ícone de engrenagem, canto inferior esquerdo)<br><b>Passo 2:</b> Clique em <b>Business Profile</b> pra atualizar:<br>• Nome da empresa, endereço, telefone, email<br>• Logo e identidade visual<br>• Fuso horário e idioma<br>• Horário de funcionamento<br><br>Outras configurações importantes:<br>• <b>My Staff</b> — gerenciar equipe<br>• <b>Domains</b> — conectar domínios personalizados<br>• <b>Integrations</b> — conectar Google, Facebook, Stripe, etc.<br>• <b>Phone Numbers</b> — gerenciar seus números de telefone"
        }
    },
    // ===== PHONE / CALL TRACKING =====
    {
        id: 'phone-calls',
        phrases: ['phone number', 'call tracking', 'missed call', 'text back', 'número de telefone', 'número de teléfono', 'rastreamento de chamada', 'chamada perdida', 'llamada perdida', 'voicemail', 'make a call', 'fazer ligação', 'hacer llamada', 'buy phone number', 'comprar número', 'faço ligação', 'faço chamada', 'ligar pelo sistema', 'ligação pelo sistema', 'hago llamada', 'llamar por el sistema', 'gravar chamada', 'grabar llamada', 'record call'],
        keywords: ['phone', 'telefone', 'teléfono', 'call', 'chamada', 'llamada', 'voicemail', 'ring', 'ligação', 'ligar'],
        answer: {
            en: "Phone & call features in Bee Pro Hub:<br>• <b>View calls:</b> Go to <b>Reporting</b> → <b>Call Reporting</b> for all call history<br>• <b>Make a call:</b> Open a contact → click the <b>phone icon</b> → call connects through your Bee Pro Hub number<br>• <b>Missed Call Text-Back:</b> Go to <b>Settings</b> → <b>Phone Numbers</b> → enable auto-text when calls are missed<br>• <b>Voicemail:</b> Set up under <b>Settings</b> → <b>Phone Numbers</b> → edit number → voicemail settings<br>• <b>Call recording:</b> Enable in <b>Settings</b> → <b>Phone Numbers</b> → toggle recording on",
            es: "Funciones de teléfono en Bee Pro Hub:<br>• <b>Ver llamadas:</b> Ve a <b>Reporting</b> → <b>Call Reporting</b><br>• <b>Hacer llamada:</b> Abre un contacto → clic en el <b>ícono de teléfono</b><br>• <b>Texto automático por llamada perdida:</b> <b>Settings</b> → <b>Phone Numbers</b> → activa auto-texto<br>• <b>Buzón de voz:</b> <b>Settings</b> → <b>Phone Numbers</b> → edita número → voicemail<br>• <b>Grabación:</b> <b>Settings</b> → <b>Phone Numbers</b> → activa grabación",
            pt: "Funcionalidades de telefone no Bee Pro Hub:<br>• <b>Ver chamadas:</b> Vá em <b>Reporting</b> → <b>Call Reporting</b> pra todo o histórico<br>• <b>Fazer ligação:</b> Abra um contato → clique no <b>ícone de telefone</b> → a ligação conecta pelo seu número do Bee Pro Hub<br>• <b>Texto automático por chamada perdida:</b> <b>Settings</b> → <b>Phone Numbers</b> → ative o auto-text<br>• <b>Correio de voz:</b> Configure em <b>Settings</b> → <b>Phone Numbers</b> → edite o número → voicemail<br>• <b>Gravação de chamada:</b> Ative em <b>Settings</b> → <b>Phone Numbers</b> → ligue a gravação"
        }
    },
    // ===== TAGS =====
    {
        id: 'tags',
        phrases: ['add tag', 'create tag', 'remove tag', 'bulk tag', 'adicionar tag', 'criar tag', 'remover tag', 'agregar tag', 'crear tag', 'eliminar tag', 'tag contacts', 'tag em massa', 'tags in bulk'],
        keywords: ['tag', 'tags', 'etiqueta'],
        answer: {
            en: "Managing tags:<br>• <b>Add tag to one contact:</b> Open the contact → <b>Tags</b> section → type tag name → press Enter<br>• <b>Bulk add tags:</b> Go to <b>Contacts</b> → select multiple (checkboxes) → click <b>Actions</b> → <b>Add Tag</b><br>• <b>Remove tag:</b> Open contact → click the <b>X</b> next to the tag<br>• <b>See all tags:</b> Go to <b>Settings</b> → <b>Tags</b> (some versions) or filter contacts by tag<br><br>Tags are key for segmentation and automations. Use them to organize leads by source, status, or interest.",
            es: "Gestión de tags:<br>• <b>Agregar tag a un contacto:</b> Abre el contacto → sección <b>Tags</b> → escribe el nombre → Enter<br>• <b>Tags en masa:</b> Ve a <b>Contacts</b> → selecciona varios → <b>Actions</b> → <b>Add Tag</b><br>• <b>Eliminar tag:</b> Abre el contacto → clic en la <b>X</b> del tag<br><br>Los tags son clave para segmentación y automatizaciones.",
            pt: "Gerenciamento de tags:<br>• <b>Adicionar tag em um contato:</b> Abra o contato → seção <b>Tags</b> → digite o nome da tag → Enter<br>• <b>Tags em massa:</b> Vá em <b>Contacts</b> → selecione vários (checkbox) → clique em <b>Actions</b> → <b>Add Tag</b><br>• <b>Remover tag:</b> Abra o contato → clique no <b>X</b> ao lado da tag<br><br>Tags são essenciais pra segmentação e automações. Use pra organizar leads por fonte, status ou interesse."
        }
    },
    // ===== OPPORTUNITIES / PIPELINE =====
    {
        id: 'pipeline',
        phrases: ['create pipeline', 'manage pipeline', 'opportunity', 'deal stage', 'move deal', 'criar pipeline', 'gerenciar pipeline', 'oportunidade', 'crear pipeline', 'gestionar pipeline', 'oportunidad', 'etapa do funil', 'etapa del embudo', 'pipeline stage', 'mover lead', 'como movo lead', 'como movo um lead', 'como muevo lead', 'mover no pipeline', 'mover en pipeline', 'funil de vendas', 'embudo de ventas', 'sales pipeline'],
        keywords: ['pipeline', 'opportunity', 'oportunidade', 'oportunidad', 'deal', 'stage', 'etapa'],
        answer: {
            en: "Managing your pipeline:<br>• <b>View pipeline:</b> Go to <b>Opportunities</b> in the left menu → select your pipeline<br>• <b>Move a deal:</b> Drag and drop the contact card between stages<br>• <b>Add opportunity:</b> Click <b>+ Add Opportunity</b> → select contact → set stage and value<br>• <b>Create pipeline:</b> <b>Opportunities</b> → <b>Pipelines</b> tab → <b>+ Create Pipeline</b> → add stages (e.g., New Lead, Contacted, Proposal, Won, Lost)<br><br>Each stage shows how many deals and total value. Use this to track your sales progress.",
            es: "Gestión del pipeline:<br>• <b>Ver pipeline:</b> Ve a <b>Opportunities</b> → selecciona tu pipeline<br>• <b>Mover deal:</b> Arrastra la tarjeta entre etapas<br>• <b>Agregar oportunidad:</b> <b>+ Add Opportunity</b> → selecciona contacto → define etapa y valor<br>• <b>Crear pipeline:</b> <b>Opportunities</b> → <b>Pipelines</b> → <b>+ Create Pipeline</b> → agrega etapas",
            pt: "Gerenciamento do pipeline:<br>• <b>Ver pipeline:</b> Vá em <b>Opportunities</b> no menu lateral → selecione seu pipeline<br>• <b>Mover um deal:</b> Arraste e solte o card do contato entre as etapas<br>• <b>Adicionar oportunidade:</b> Clique em <b>+ Add Opportunity</b> → selecione contato → defina etapa e valor<br>• <b>Criar pipeline:</b> <b>Opportunities</b> → aba <b>Pipelines</b> → <b>+ Create Pipeline</b> → adicione etapas (ex: Novo Lead, Contatado, Proposta, Ganho, Perdido)<br><br>Cada etapa mostra quantos deals e valor total. Use pra acompanhar o progresso de vendas."
        }
    },
    // ===== TEMPLATES (EMAIL/SMS) =====
    {
        id: 'templates',
        phrases: ['create template', 'email template', 'sms template', 'message template', 'criar template', 'criar modelo', 'crear plantilla', 'plantilla de email', 'plantilla de sms', 'modelo de email', 'modelo de mensagem', 'como crio template', 'como crio modelo', 'como creo plantilla', 'template de sms', 'template de email', 'como faço template'],
        keywords: ['template', 'modelo', 'plantilla', 'snippet'],
        answer: {
            en: "To create message templates:<br><b>Step 1:</b> Go to <b>Marketing</b> → <b>Templates</b><br><b>Step 2:</b> Click <b>+ New Template</b><br><b>Step 3:</b> Choose type: <b>Email</b> or <b>SMS</b><br><b>Step 4:</b> Write your message — use merge fields like <b>{{contact.first_name}}</b> for personalization<br><b>Step 5:</b> Click <b>Save</b><br><br>Use templates in Conversations to reply faster, or in Workflows for automated messages.",
            es: "Para crear plantillas de mensaje:<br><b>Paso 1:</b> Ve a <b>Marketing</b> → <b>Templates</b><br><b>Paso 2:</b> Clic en <b>+ New Template</b><br><b>Paso 3:</b> Elige tipo: <b>Email</b> o <b>SMS</b><br><b>Paso 4:</b> Escribe tu mensaje — usa campos como <b>{{contact.first_name}}</b><br><b>Paso 5:</b> Clic en <b>Save</b>",
            pt: "Pra criar templates de mensagem:<br><b>Passo 1:</b> Vá em <b>Marketing</b> → <b>Templates</b><br><b>Passo 2:</b> Clique em <b>+ New Template</b><br><b>Passo 3:</b> Escolha o tipo: <b>Email</b> ou <b>SMS</b><br><b>Passo 4:</b> Escreva sua mensagem — use campos como <b>{{contact.first_name}}</b> pra personalizar<br><b>Passo 5:</b> Clique em <b>Save</b><br><br>Use templates no Conversations pra responder mais rápido, ou em Workflows pra mensagens automáticas."
        }
    },
    // ===== EMAIL MARKETING / CAMPAIGNS =====
    {
        id: 'email-marketing',
        phrases: ['email campaign', 'email marketing', 'send campaign', 'bulk email', 'mass email', 'email em massa', 'campanha de email', 'campaña de email', 'enviar campanha', 'enviar campaña', 'newsletter'],
        keywords: ['campaign', 'campanha', 'campaña', 'newsletter', 'bulk email', 'mass email', 'email marketing'],
        answer: {
            en: "To send an email campaign:<br><b>Step 1:</b> Go to <b>Marketing</b> → <b>Emails</b><br><b>Step 2:</b> Click <b>+ Create Campaign</b><br><b>Step 3:</b> Choose a template or start from scratch<br><b>Step 4:</b> Design your email with the drag-and-drop builder<br><b>Step 5:</b> Select recipients (Smart List, tag, or all contacts)<br><b>Step 6:</b> Schedule or <b>Send Now</b><br><br>Check open rates and clicks in the campaign analytics after sending.",
            es: "Para enviar una campaña de email:<br><b>Paso 1:</b> Ve a <b>Marketing</b> → <b>Emails</b><br><b>Paso 2:</b> Clic en <b>+ Create Campaign</b><br><b>Paso 3:</b> Elige plantilla o empieza de cero<br><b>Paso 4:</b> Diseña con el builder drag-and-drop<br><b>Paso 5:</b> Selecciona destinatarios (Smart List, tag, o todos)<br><b>Paso 6:</b> Programa o <b>Send Now</b>",
            pt: "Pra enviar uma campanha de email:<br><b>Passo 1:</b> Vá em <b>Marketing</b> → <b>Emails</b><br><b>Passo 2:</b> Clique em <b>+ Create Campaign</b><br><b>Passo 3:</b> Escolha um template ou comece do zero<br><b>Passo 4:</b> Monte seu email com o builder drag-and-drop<br><b>Passo 5:</b> Selecione destinatários (Smart List, tag, ou todos os contatos)<br><b>Passo 6:</b> Agende ou clique em <b>Send Now</b><br><br>Acompanhe taxas de abertura e cliques na análise da campanha depois de enviar."
        }
    },
    // ===== INTEGRATIONS =====
    {
        id: 'integrations',
        phrases: ['connect google', 'connect facebook', 'connect stripe', 'connect instagram', 'connect whatsapp', 'integration', 'conectar google', 'conectar facebook', 'conectar stripe', 'conectar instagram', 'conectar whatsapp', 'integração', 'integración', 'conecto meu google', 'conecto mi google', 'conecto meu facebook', 'conecto mi facebook', 'como integro', 'como conecto'],
        keywords: ['integration', 'integração', 'integración', 'connect', 'conectar', 'sync', 'sincronizar', 'google', 'facebook', 'stripe', 'zoom'],
        answer: {
            en: "To connect integrations:<br><b>Step 1:</b> Go to <b>Settings</b> → <b>Integrations</b><br><b>Step 2:</b> Find the service you want to connect:<br>• <b>Google</b> — for GMB, Google Ads, and Calendar sync<br>• <b>Facebook</b> — for Facebook Ads, Messenger, and Instagram<br>• <b>Stripe</b> — for payments and invoicing<br>• <b>WhatsApp</b> — for WhatsApp messaging (requires business API)<br>• <b>Zoom/Google Meet</b> — for calendar video call links<br><b>Step 3:</b> Click <b>Connect</b> and follow the authorization steps",
            es: "Para conectar integraciones:<br><b>Paso 1:</b> Ve a <b>Settings</b> → <b>Integrations</b><br><b>Paso 2:</b> Encuentra el servicio:<br>• <b>Google</b> — para GMB, Google Ads, Calendar<br>• <b>Facebook</b> — para Ads, Messenger, Instagram<br>• <b>Stripe</b> — para pagos<br>• <b>WhatsApp</b> — para mensajería<br><b>Paso 3:</b> Clic en <b>Connect</b> y sigue la autorización",
            pt: "Pra conectar integrações:<br><b>Passo 1:</b> Vá em <b>Settings</b> → <b>Integrations</b><br><b>Passo 2:</b> Encontre o serviço que quer conectar:<br>• <b>Google</b> — pra GMB, Google Ads e sincronizar Calendar<br>• <b>Facebook</b> — pra Facebook Ads, Messenger e Instagram<br>• <b>Stripe</b> — pra pagamentos e faturamento<br>• <b>WhatsApp</b> — pra mensagens (requer API business)<br>• <b>Zoom/Google Meet</b> — pra links de videochamada no calendário<br><b>Passo 3:</b> Clique em <b>Connect</b> e siga os passos de autorização"
        }
    },
    // ===== NOTIFICATIONS =====
    {
        id: 'notifications',
        phrases: ['notification settings', 'email notification', 'sms notification', 'push notification', 'configurar notificação', 'configurar notificación', 'not receiving notification', 'não recebo notificação', 'no recibo notificación', 'turn off notification', 'desativar notificação'],
        keywords: ['notification', 'notificação', 'notificación', 'alert', 'alerta', 'notify', 'notificar'],
        answer: {
            en: "To manage notifications:<br><b>Step 1:</b> Click your <b>profile icon</b> (top right) → <b>Notifications</b><br><b>Step 2:</b> Configure which events trigger notifications:<br>• New lead/contact created<br>• New conversation message<br>• Appointment booked/cancelled<br>• Task assigned<br>• Review received<br><b>Step 3:</b> Choose delivery: <b>Email</b>, <b>SMS</b>, <b>In-App</b>, or <b>Desktop Push</b><br><br>Not receiving notifications? Check your spam folder and make sure browser notifications are enabled.",
            es: "Para gestionar notificaciones:<br><b>Paso 1:</b> Clic en tu <b>ícono de perfil</b> (arriba a la derecha) → <b>Notifications</b><br><b>Paso 2:</b> Configura qué eventos disparan notificaciones<br><b>Paso 3:</b> Elige entrega: <b>Email</b>, <b>SMS</b>, <b>In-App</b>, o <b>Push</b>",
            pt: "Pra gerenciar notificações:<br><b>Passo 1:</b> Clique no seu <b>ícone de perfil</b> (canto superior direito) → <b>Notifications</b><br><b>Passo 2:</b> Configure quais eventos disparam notificação:<br>• Novo lead/contato criado<br>• Nova mensagem em conversas<br>• Agendamento marcado/cancelado<br>• Tarefa atribuída<br>• Avaliação recebida<br><b>Passo 3:</b> Escolha o tipo: <b>Email</b>, <b>SMS</b>, <b>In-App</b>, ou <b>Push no Desktop</b><br><br>Não está recebendo notificações? Cheque a pasta de spam e verifique se as notificações do navegador estão ativadas."
        }
    },
    // ===== MOBILE APP =====
    {
        id: 'mobile-app',
        phrases: ['mobile app', 'app celular', 'aplicativo', 'aplicación', 'download app', 'baixar app', 'descargar app', 'phone app', 'app no celular', 'usar no celular'],
        keywords: ['mobile', 'celular', 'app', 'aplicativo', 'aplicación', 'iphone', 'android'],
        answer: {
            en: "Bee Pro Hub has a mobile app!<br><br><b>Download:</b> Search for <b>\"LeadConnector\"</b> (or your branded app name) on the App Store (iPhone) or Google Play (Android)<br><br>With the app you can:<br>• View and reply to conversations (SMS, email, WhatsApp)<br>• See contact details and notes<br>• Get push notifications for new leads and messages<br>• View your calendar and appointments<br>• Make and receive calls through your business number",
            es: "¡Bee Pro Hub tiene app móvil!<br><br><b>Descarga:</b> Busca <b>\"LeadConnector\"</b> en App Store (iPhone) o Google Play (Android)<br><br>Con la app puedes:<br>• Ver y responder conversaciones<br>• Ver contactos y notas<br>• Recibir notificaciones push<br>• Ver calendario y citas<br>• Hacer y recibir llamadas",
            pt: "O Bee Pro Hub tem app pro celular!<br><br><b>Baixe:</b> Procure <b>\"LeadConnector\"</b> (ou o nome do seu app) na App Store (iPhone) ou Google Play (Android)<br><br>Com o app você pode:<br>• Ver e responder conversas (SMS, email, WhatsApp)<br>• Ver detalhes e notas dos contatos<br>• Receber notificações push de novos leads e mensagens<br>• Ver seu calendário e agendamentos<br>• Fazer e receber ligações pelo seu número comercial"
        }
    },
    // ===== CUSTOM FIELDS =====
    {
        id: 'custom-fields',
        phrases: ['custom field', 'create field', 'campo personalizado', 'campo customizado', 'criar campo', 'crear campo', 'add field', 'adicionar campo', 'agregar campo'],
        keywords: ['custom field', 'campo', 'field'],
        answer: {
            en: "To create custom fields:<br><b>Step 1:</b> Go to <b>Settings</b> → <b>Custom Fields</b><br><b>Step 2:</b> Click <b>+ Add Field</b><br><b>Step 3:</b> Choose field type: Text, Number, Dropdown, Date, Checkbox, etc.<br><b>Step 4:</b> Name it (e.g., \"Service Type\", \"Budget\", \"Referral Source\")<br><b>Step 5:</b> Click <b>Save</b><br><br>Custom fields appear in contact profiles, forms, and can be used in automations and merge fields.",
            es: "Para crear campos personalizados:<br><b>Paso 1:</b> Ve a <b>Settings</b> → <b>Custom Fields</b><br><b>Paso 2:</b> Clic en <b>+ Add Field</b><br><b>Paso 3:</b> Elige tipo: Text, Number, Dropdown, Date, Checkbox, etc.<br><b>Paso 4:</b> Nómbralo (ej: \"Tipo de Servicio\", \"Presupuesto\")<br><b>Paso 5:</b> Clic en <b>Save</b>",
            pt: "Pra criar campos personalizados:<br><b>Passo 1:</b> Vá em <b>Settings</b> → <b>Custom Fields</b><br><b>Passo 2:</b> Clique em <b>+ Add Field</b><br><b>Passo 3:</b> Escolha o tipo: Text, Number, Dropdown, Date, Checkbox, etc.<br><b>Passo 4:</b> Dê um nome (ex: \"Tipo de Serviço\", \"Orçamento\", \"Fonte de Indicação\")<br><b>Passo 5:</b> Clique em <b>Save</b><br><br>Campos personalizados aparecem no perfil do contato, formulários, e podem ser usados em automações e campos de mesclagem."
        }
    },
    // ===== TASKS =====
    {
        id: 'tasks',
        phrases: ['create task', 'assign task', 'task list', 'criar tarefa', 'atribuir tarefa', 'crear tarea', 'asignar tarea', 'my tasks', 'minhas tarefas', 'mis tareas', 'to-do', 'todo'],
        keywords: ['task', 'tarefa', 'tarea', 'todo', 'to-do'],
        answer: {
            en: "To manage tasks:<br>• <b>Create task:</b> Open a contact → <b>Tasks</b> tab → <b>+ Add Task</b> → set title, due date, assign to team member<br>• <b>View all tasks:</b> Go to <b>Contacts</b> → filter by tasks, or check the dashboard<br>• <b>Complete task:</b> Click the checkbox next to the task<br><br>Tasks help you track follow-ups and assign work to team members. You can also create tasks automatically through workflows.",
            es: "Para gestionar tareas:<br>• <b>Crear tarea:</b> Abre un contacto → pestaña <b>Tasks</b> → <b>+ Add Task</b> → define título, fecha, asigna a un miembro<br>• <b>Ver todas:</b> Ve a <b>Contacts</b> → filtra por tareas<br>• <b>Completar:</b> Clic en el checkbox de la tarea",
            pt: "Pra gerenciar tarefas:<br>• <b>Criar tarefa:</b> Abra um contato → aba <b>Tasks</b> → <b>+ Add Task</b> → defina título, data, e atribua a um membro da equipe<br>• <b>Ver todas as tarefas:</b> Vá em <b>Contacts</b> → filtre por tarefas, ou veja no dashboard<br>• <b>Concluir tarefa:</b> Clique no checkbox ao lado da tarefa<br><br>Tarefas ajudam a acompanhar follow-ups e distribuir trabalho. Você também pode criar tarefas automaticamente por workflows."
        }
    },
    // ===== NOTES =====
    {
        id: 'notes',
        phrases: ['add note', 'contact note', 'adicionar nota', 'agregar nota', 'anotação', 'anotación', 'notas do contato', 'notas del contacto', 'como adiciono nota', 'como agrego nota', 'nota no contato', 'nota num contato', 'nota en contacto', 'fazer anotação', 'note on contact'],
        keywords: ['note', 'nota', 'anotação', 'anotación'],
        answer: {
            en: "To add a note to a contact:<br><b>Step 1:</b> Go to <b>Contacts</b> → open the contact<br><b>Step 2:</b> Click the <b>Notes</b> tab<br><b>Step 3:</b> Click <b>+ Add Note</b><br><b>Step 4:</b> Type your note and click <b>Save</b><br><br>Notes are visible to all team members and help keep a record of conversations, preferences, and important details about the client.",
            es: "Para agregar una nota a un contacto:<br><b>Paso 1:</b> Ve a <b>Contacts</b> → abre el contacto<br><b>Paso 2:</b> Clic en la pestaña <b>Notes</b><br><b>Paso 3:</b> Clic en <b>+ Add Note</b><br><b>Paso 4:</b> Escribe y clic en <b>Save</b>",
            pt: "Pra adicionar uma nota a um contato:<br><b>Passo 1:</b> Vá em <b>Contacts</b> → abra o contato<br><b>Passo 2:</b> Clique na aba <b>Notes</b><br><b>Passo 3:</b> Clique em <b>+ Add Note</b><br><b>Passo 4:</b> Escreva sua nota e clique em <b>Save</b><br><br>As notas ficam visíveis pra toda a equipe e ajudam a registrar conversas, preferências e detalhes importantes sobre o cliente."
        }
    },
    // ===== PASSWORD / LOGIN =====
    {
        id: 'login-password',
        phrases: ['reset password', 'forgot password', 'change password', 'cant login', 'cannot login', 'trocar senha', 'esqueci senha', 'mudar senha', 'não consigo entrar', 'cambiar contraseña', 'olvidé contraseña', 'no puedo entrar', 'my password', 'minha senha', 'mi contraseña'],
        keywords: ['password', 'senha', 'contraseña', 'login', 'entrar', 'access', 'acesso', 'acceso'],
        answer: {
            en: "If you forgot your password or can't log in:<br><b>Step 1:</b> Go to the Bee Pro Hub login page<br><b>Step 2:</b> Click <b>\"Forgot Password?\"</b><br><b>Step 3:</b> Enter your email<br><b>Step 4:</b> Check your inbox (and spam) for the reset link<br><b>Step 5:</b> Click the link and create a new password<br><br>To change your password when logged in: Click your <b>profile icon</b> (top right) → <b>Profile</b> → <b>Change Password</b>.<br><br>Still can't access? Contact our team on the WhatsApp group.",
            es: "Si olvidaste tu contraseña:<br><b>Paso 1:</b> Ve a la página de login<br><b>Paso 2:</b> Clic en <b>\"Forgot Password?\"</b><br><b>Paso 3:</b> Ingresa tu email<br><b>Paso 4:</b> Revisa tu inbox (y spam) para el link<br><b>Paso 5:</b> Clic en el link y crea nueva contraseña<br><br>¿Aún no puedes entrar? Contacta nuestro equipo por WhatsApp.",
            pt: "Se esqueceu sua senha ou não consegue entrar:<br><b>Passo 1:</b> Vá na página de login do Bee Pro Hub<br><b>Passo 2:</b> Clique em <b>\"Forgot Password?\"</b><br><b>Passo 3:</b> Digite seu email<br><b>Passo 4:</b> Veja sua caixa de entrada (e spam) pro link de reset<br><b>Passo 5:</b> Clique no link e crie uma senha nova<br><br>Pra trocar a senha quando já está logado: Clique no seu <b>ícone de perfil</b> (canto superior direito) → <b>Profile</b> → <b>Change Password</b>.<br><br>Ainda não consegue acessar? Fale com nosso time no grupo do WhatsApp."
        }
    },
    // ===== PLAN / BILLING =====
    {
        id: 'plan-billing',
        phrases: ['my plan', 'billing', 'meu plano', 'mi plan', 'upgrade plan', 'trocar plano', 'cambiar plan', 'what plan', 'qual plano', 'qué plan', 'plan includes', 'plano inclui', 'plan incluye', 'cancel plan', 'cancelar plano', 'cancelar plan'],
        keywords: ['plan', 'plano', 'billing', 'cobrança', 'cobro', 'upgrade', 'cancel', 'cancelar', 'price', 'preço', 'precio'],
        answer: {
            en: "About your plan:<br>• All clients have <b>unlimited access to Galaxy Assist</b> (this AI) 24/7<br>• <b>Pro</b> and <b>Complete</b> plan clients can also schedule <b>1-on-1 calls</b> with our team<br><br>To check your plan or discuss changes, contact our team:<br>• <b>WhatsApp group</b> — for quick questions<br>• <b>Email:</b> info@galaxyinfo.us<br>• Or <a href='#schedule-call'>schedule a call</a> if you're on Pro/Complete",
            es: "Sobre tu plan:<br>• Todos los clientes tienen <b>acceso ilimitado a Galaxy Assist</b> (esta IA) 24/7<br>• Clientes <b>Pro</b> y <b>Complete</b> también pueden agendar <b>llamadas 1-a-1</b> con nuestro equipo<br><br>Para consultar tu plan o cambios, contacta nuestro equipo por <b>WhatsApp</b> o email: info@galaxyinfo.us",
            pt: "Sobre seu plano:<br>• Todos os clientes têm <b>acesso ilimitado ao Galaxy Assist</b> (essa IA) 24/7<br>• Clientes dos planos <b>Pro</b> e <b>Complete</b> também podem agendar <b>chamadas 1-a-1</b> com nosso time<br><br>Pra consultar seu plano ou discutir mudanças, fale com nosso time:<br>• <b>Grupo do WhatsApp</b> — pra perguntas rápidas<br>• <b>Email:</b> info@galaxyinfo.us<br>• Ou <a href='#schedule-call'>agende uma chamada</a> se está no Pro/Complete"
        }
    },
    // ===== WHATSAPP =====
    {
        id: 'whatsapp',
        phrases: ['whatsapp', 'whats app', 'wa', 'integrate whatsapp', 'connect whatsapp', 'whatsapp business', 'integrar whatsapp', 'conectar whatsapp', 'enviar whatsapp', 'send whatsapp', 'usar whatsapp', 'mensagem whatsapp', 'wpp', 'zap'],
        keywords: ['whatsapp', 'wpp', 'zap', 'wa'],
        team: true,
        answer: {
            en: "WhatsApp in Bee Pro Hub uses the official WhatsApp Business API. Once connected, you can send and receive WhatsApp messages right inside <b>Conversations</b>, alongside SMS and email — same inbox.<br><br>Setup needs Galaxy team to handle the WhatsApp Business verification (Meta requires a business account + phone number). Send a message to our WhatsApp group and we'll start the connection process.",
            es: "WhatsApp en Bee Pro Hub usa la API oficial de WhatsApp Business. Una vez conectado, envías y recibes mensajes de WhatsApp directo en <b>Conversations</b>, junto con SMS y email — mismo inbox.<br><br>La configuración necesita que el equipo Galaxy maneje la verificación de WhatsApp Business (Meta exige cuenta empresarial + número). Mándanos un mensaje en el grupo de WhatsApp y empezamos el proceso.",
            pt: "WhatsApp no Bee Pro Hub usa a API oficial do WhatsApp Business. Conectado, você envia e recebe mensagens de WhatsApp direto em <b>Conversations</b>, junto com SMS e email — mesmo inbox.<br><br>A configuração precisa que o time Galaxy faça a verificação no WhatsApp Business (Meta exige conta empresarial + número). Manda mensagem no grupo do WhatsApp e a gente começa o processo de conexão."
        }
    },
    // ===== SMART LISTS / FILTERS =====
    {
        id: 'smart-lists',
        phrases: ['smart list', 'smart lists', 'filter contact', 'filter contacts', 'segmentar contato', 'segmentar contatos', 'criar lista', 'create list', 'lista inteligente', 'lista filtrada', 'crear lista inteligente', 'segment contact', 'segment'],
        keywords: ['smart', 'list', 'filter', 'segment', 'lista', 'filtrar', 'segmentar'],
        answer: {
            en: "Smart Lists let you save filtered views of contacts. In <b>Contacts</b>, click <b>+ Add Filter</b>, pick the conditions (tag, source, date added, custom field, etc.), then save it as a Smart List with a name. The list updates automatically as new contacts match.<br><br>You can use Smart Lists for bulk actions — send SMS, email, or add tags to everyone in the list at once.",
            es: "Las Smart Lists guardan vistas filtradas de contactos. En <b>Contacts</b>, clic <b>+ Add Filter</b>, elige las condiciones (tag, fuente, fecha, campo personalizado, etc.), guarda con un nombre. La lista se actualiza sola cuando entran nuevos contactos.<br><br>Puedes usar Smart Lists para acciones masivas — enviar SMS, email o agregar tags a todos a la vez.",
            pt: "Smart Lists salvam visualizações filtradas de contatos. Em <b>Contacts</b>, clica <b>+ Add Filter</b>, escolhe as condições (tag, fonte, data, campo personalizado, etc.), salva com um nome. A lista atualiza sozinha quando entram contatos novos.<br><br>Dá pra usar Smart Lists pra ações em massa — enviar SMS, email ou adicionar tag pra todo mundo da lista de uma vez."
        }
    },
    // ===== IMPORT CONTACTS =====
    {
        id: 'import-contacts',
        phrases: ['import contact', 'import contacts', 'importar contato', 'importar contatos', 'upload csv', 'csv import', 'bulk import', 'subir contactos', 'cargar contactos', 'importar planilha', 'importar excel'],
        keywords: ['import', 'csv', 'upload', 'bulk', 'importar', 'planilha', 'excel'],
        answer: {
            en: "To import contacts from a spreadsheet:<br>Go to <b>Contacts</b> → click <b>Import</b> (top right) → upload your CSV file → match each column to a Bee Pro Hub field (name, phone, email, tags, etc.) → confirm.<br><br>Tips:<br>• File must be CSV (export your Excel as .csv)<br>• Phone numbers should include country code (+1 for US)<br>• You can add a tag to all imported contacts at once",
            es: "Para importar contactos de una hoja de cálculo:<br>Ve a <b>Contacts</b> → clic en <b>Import</b> (arriba a la derecha) → sube el CSV → mapea cada columna a un campo de Bee Pro Hub (nombre, teléfono, email, tags) → confirma.<br><br>Tips:<br>• Debe ser CSV (exporta tu Excel como .csv)<br>• Teléfonos con código de país (+1 EE.UU.)<br>• Puedes agregar un tag a todos los importados a la vez",
            pt: "Pra importar contatos de uma planilha:<br>Vai em <b>Contacts</b> → clica <b>Import</b> (canto superior direito) → sobe o arquivo CSV → mapeia cada coluna pra um campo do Bee Pro Hub (nome, telefone, email, tags) → confirma.<br><br>Dicas:<br>• Tem que ser CSV (exporta seu Excel como .csv)<br>• Telefones com código do país (+1 pros EUA)<br>• Dá pra adicionar uma tag em todos os importados de uma vez"
        }
    },
    // ===== EXPORT DATA =====
    {
        id: 'export-data',
        phrases: ['export contact', 'export contacts', 'exportar contato', 'exportar contatos', 'download contact', 'baixar contato', 'export data', 'exportar dados', 'download csv', 'descargar contactos', 'exportar contactos', 'export opportunity', 'exportar opportunity'],
        keywords: ['export', 'download', 'exportar', 'baixar', 'descargar'],
        answer: {
            en: "To export contacts: Go to <b>Contacts</b>, optionally apply filters, click the <b>3-dot menu</b> at the top, then <b>Export</b>. You'll get a CSV emailed to you with all visible contacts.<br><br>For opportunities, go to <b>Opportunities</b>, pick a pipeline, then use the export option in the same 3-dot menu.",
            es: "Para exportar contactos: Ve a <b>Contacts</b>, aplica filtros si quieres, clic en el <b>menú de 3 puntos</b> arriba, luego <b>Export</b>. Te llega por email un CSV con los contactos visibles.<br><br>Para oportunidades, ve a <b>Opportunities</b>, elige un pipeline, y usa la opción de export en el mismo menú.",
            pt: "Pra exportar contatos: Vai em <b>Contacts</b>, aplica filtros se quiser, clica no <b>menu de 3 pontinhos</b> em cima, depois <b>Export</b>. Chega um CSV no seu email com todos os contatos visíveis.<br><br>Pra oportunidades, vai em <b>Opportunities</b>, escolhe um pipeline, e usa a opção de export no mesmo menu."
        }
    },
    // ===== DOCUMENTS & CONTRACTS =====
    {
        id: 'documents-contracts',
        phrases: ['document', 'documents', 'contract', 'contracts', 'digital signature', 'e-signature', 'esign', 'sign document', 'assinar contrato', 'contrato digital', 'assinatura digital', 'firmar contrato', 'firma digital', 'documento'],
        keywords: ['document', 'contract', 'signature', 'esign', 'assinatura', 'contrato', 'firma'],
        answer: {
            en: "For digital signatures, use <b>Documents & Contracts</b> in the left menu. Create a contract template, drop in fields like signature, date, name, then send to a contact for signing — they get an email/SMS with a link.<br><br>Note: e-signatures only work in Documents & Contracts. <b>Estimates and Invoices don't have signature fields</b> — if a client needs to sign before paying, send them a contract first.",
            es: "Para firmas digitales, usa <b>Documents & Contracts</b> en el menú izquierdo. Crea una plantilla de contrato, agrega campos como firma, fecha, nombre, y envíalo al contacto — recibe email/SMS con el link.<br><br>Nota: las firmas digitales solo funcionan en Documents & Contracts. <b>Estimates e Invoices NO tienen campo de firma</b> — si necesita firmar antes de pagar, mándale primero un contrato.",
            pt: "Pra assinatura digital, usa <b>Documents & Contracts</b> no menu esquerdo. Cria um template de contrato, coloca campos como assinatura, data, nome, e envia pro contato — ele recebe email/SMS com o link pra assinar.<br><br>Importante: assinatura digital só funciona em Documents & Contracts. <b>Estimates e Invoices não têm campo de assinatura</b> — se o cliente precisa assinar antes de pagar, manda um contrato primeiro."
        }
    },
    // ===== SUBSCRIPTIONS / RECURRING PAYMENTS =====
    {
        id: 'subscriptions',
        phrases: ['subscription', 'subscriptions', 'recurring payment', 'recurring', 'monthly billing', 'cobrança recorrente', 'mensalidade', 'assinatura', 'cobrança mensal', 'pago recurrente', 'suscripción', 'mensualidad'],
        keywords: ['subscription', 'recurring', 'recorrente', 'mensalidade', 'assinatura', 'suscripción', 'mensualidad'],
        answer: {
            en: "Recurring billing is set up in <b>Payments</b> → <b>Subscriptions</b>. Create a product with a recurring price (monthly, yearly, etc.), then send the payment link to your client — they enter their card and get charged automatically every cycle.<br><br>Manage active subscriptions, see who paid, pause or cancel from the same Subscriptions screen.",
            es: "La facturación recurrente se configura en <b>Payments</b> → <b>Subscriptions</b>. Crea un producto con precio recurrente (mensual, anual, etc.), envía el link de pago al cliente — ingresa su tarjeta y se cobra solo cada ciclo.<br><br>Gestiona suscripciones activas, ve quién pagó, pausa o cancela desde la misma pantalla.",
            pt: "Cobrança recorrente é configurada em <b>Payments</b> → <b>Subscriptions</b>. Cria um produto com preço recorrente (mensal, anual, etc.), manda o link de pagamento pro cliente — ele coloca o cartão e a cobrança acontece sozinha todo ciclo.<br><br>Gerencia assinaturas ativas, vê quem pagou, pausa ou cancela na mesma tela de Subscriptions."
        }
    },
    // ===== TRIGGER LINKS =====
    {
        id: 'trigger-links',
        phrases: ['trigger link', 'trigger links', 'smart link', 'tracked link', 'rastrear link', 'link rastreável', 'link com rastreamento', 'enlace rastreado', 'link inteligente'],
        keywords: ['trigger link', 'tracked', 'rastreado', 'rastreável', 'inteligente'],
        answer: {
            en: "Trigger Links are short URLs that track who clicked them and can fire automations. Create them in <b>Marketing</b> → <b>Trigger Links</b>. Paste the original URL, get a short tracked version, drop it in your SMS/email/WhatsApp.<br><br>You can build a workflow: when someone clicks a Trigger Link → add a tag, send a follow-up, move them in the pipeline, etc.",
            es: "Los Trigger Links son URLs cortas que rastrean clics y disparan automatizaciones. Créalos en <b>Marketing</b> → <b>Trigger Links</b>. Pega la URL original, obtén la versión corta rastreada, úsala en tu SMS/email/WhatsApp.<br><br>Puedes crear un workflow: cuando alguien hace clic en un Trigger Link → agregar tag, enviar follow-up, mover en el pipeline, etc.",
            pt: "Trigger Links são URLs curtas que rastreiam quem clicou e podem disparar automações. Cria em <b>Marketing</b> → <b>Trigger Links</b>. Cola a URL original, pega a versão curta rastreada, usa no seu SMS/email/WhatsApp.<br><br>Dá pra montar workflow: quando alguém clica num Trigger Link → adiciona tag, manda follow-up, move no pipeline, etc."
        }
    },
    // ===== AUTOMATED REVIEW REQUESTS WORKFLOW =====
    {
        id: 'auto-review-workflow',
        phrases: ['automate review', 'automatic review', 'auto review request', 'send review automatically', 'pedido review automático', 'avaliação automática', 'review automático', 'reseña automática', 'enviar reseña auto'],
        keywords: ['automate review', 'auto review', 'review auto', 'avaliação automática'],
        team: true,
        answer: {
            en: "We can automate review requests so they go out automatically after every appointment or project completion. Our team sets up the workflow once — pick the trigger (appointment status = completed, opportunity moved to \"Won\", or a tag added) and we configure SMS + email sequences with smart follow-up if the client doesn't respond.<br><br>Send a message in the WhatsApp group and we'll set it up for your account.",
            es: "Podemos automatizar las solicitudes de reseña para que se envíen automáticamente después de cada cita o proyecto. Nuestro equipo configura el workflow una vez — eliges el disparador (estado de cita = completada, oportunidad ganada, o tag agregado) y armamos las secuencias SMS + email con follow-up inteligente.<br><br>Mándanos un mensaje en el grupo de WhatsApp y lo configuramos.",
            pt: "A gente automatiza os pedidos de avaliação pra saírem sozinhos depois de cada atendimento ou projeto fechado. Nosso time configura o workflow uma vez — você escolhe o gatilho (status do atendimento = concluído, oportunidade ganha, ou tag adicionada) e a gente monta as sequências de SMS + email com follow-up inteligente se o cliente não responder.<br><br>Manda mensagem no grupo do WhatsApp e a gente configura pra sua conta."
        }
    },
    // ===== A2P / 10DLC SMS COMPLIANCE (US) =====
    {
        id: 'a2p-sms',
        phrases: ['a2p', '10dlc', 'sms compliance', 'sms registration', 'register sms', 'registrar sms', 'cadastro a2p', 'sms cadastro', 'verify sms', 'sms not sending', 'sms nao envia', 'sms no envia'],
        keywords: ['a2p', '10dlc', 'compliance', 'registration', 'cadastro'],
        team: true,
        answer: {
            en: "To send SMS to US numbers, your account needs to be registered with carriers (A2P 10DLC). Without registration, SMS may be blocked or rate-limited. This requires your business EIN, business address, and a sample message. <br><br>Our team handles the A2P registration for you. If your SMS aren't going through or you need to register, send us a message in the WhatsApp group.",
            es: "Para enviar SMS a números de EE.UU., tu cuenta debe estar registrada con los carriers (A2P 10DLC). Sin registro, los SMS pueden ser bloqueados. Necesitas EIN del negocio, dirección y mensaje de ejemplo. <br><br>Nuestro equipo se encarga del registro A2P. Si tus SMS no llegan o necesitas registrarte, mándanos un mensaje en el grupo de WhatsApp.",
            pt: "Pra mandar SMS pra números americanos, sua conta precisa estar registrada com as operadoras (A2P 10DLC). Sem registro, os SMS podem ser bloqueados ou ter limite. Precisa do EIN do negócio, endereço e mensagem de exemplo. <br><br>Nosso time faz o registro A2P pra você. Se seus SMS não estão chegando ou precisa registrar, manda mensagem no grupo do WhatsApp."
        }
    },
    // ===== SAVED REPLIES / CANNED RESPONSES =====
    {
        id: 'saved-replies',
        phrases: ['saved reply', 'saved replies', 'canned response', 'quick reply', 'resposta salva', 'resposta rápida', 'snippet', 'respuesta rápida', 'respuesta guardada'],
        keywords: ['saved reply', 'canned', 'snippet', 'quick reply', 'salva', 'rápida'],
        answer: {
            en: "Quick replies (snippets) save text you send often, so you don't retype. In <b>Conversations</b>, when typing a message, type <b>/</b> and a list of saved replies pops up — click one to insert.<br><br>Manage them in <b>Settings</b> → <b>Snippets</b>: create new ones, edit, organize by category. Great for FAQ answers, scheduling links, pricing info.",
            es: "Las respuestas rápidas (snippets) guardan texto que envías seguido. En <b>Conversations</b>, al escribir, pon <b>/</b> y aparece la lista de respuestas guardadas — clic para insertar.<br><br>Las gestionas en <b>Settings</b> → <b>Snippets</b>: crea nuevas, edita, organiza por categoría. Útiles para FAQs, links de agendamiento, precios.",
            pt: "Respostas rápidas (snippets) salvam textos que você envia com frequência, pra não digitar de novo. Em <b>Conversations</b>, quando estiver digitando, põe <b>/</b> e aparece a lista de respostas salvas — clica pra inserir.<br><br>Gerencia em <b>Settings</b> → <b>Snippets</b>: cria novas, edita, organiza por categoria. Bom pra resposta de FAQ, link de agendamento, preços."
        }
    },
    // ===== TWO-FACTOR AUTH =====
    {
        id: 'two-factor',
        phrases: ['2fa', 'two factor', 'two-factor', 'authentication', 'verificação em duas etapas', 'duas etapas', 'autenticação dupla', 'verificación en dos pasos', 'dos pasos', 'autenticación de dos factores', 'enable 2fa', 'ativar 2fa'],
        keywords: ['2fa', 'mfa', 'two factor', 'autenticação', 'verificación', 'duas etapas'],
        answer: {
            en: "Enable two-factor authentication for extra account security: Click your <b>profile icon</b> (top right) → <b>Profile</b> → scroll to <b>Security</b> → toggle <b>2-Factor Authentication</b> on. Choose SMS or authenticator app (Google Authenticator, Authy, etc.).<br><br>Highly recommended — protects against unauthorized access even if your password leaks.",
            es: "Activa la autenticación de dos factores para más seguridad: Clic en tu <b>ícono de perfil</b> (arriba derecha) → <b>Profile</b> → baja a <b>Security</b> → activa <b>2-Factor Authentication</b>. Elige SMS o app autenticadora (Google Authenticator, Authy, etc.).<br><br>Muy recomendado — protege incluso si tu contraseña se filtra.",
            pt: "Ative a verificação em duas etapas pra mais segurança: Clica no seu <b>ícone de perfil</b> (canto superior direito) → <b>Profile</b> → desce até <b>Security</b> → ativa <b>2-Factor Authentication</b>. Escolhe SMS ou app autenticador (Google Authenticator, Authy, etc.).<br><br>Muito recomendado — protege mesmo se sua senha vazar."
        }
    },
    // ===== APPOINTMENT CANCELLATION / RESCHEDULE =====
    {
        id: 'appointment-manage',
        phrases: ['cancel appointment', 'reschedule appointment', 'cancelar agendamento', 'remarcar agendamento', 'reagendar', 'cancelar cita', 'reagendar cita', 'mover agendamento', 'change appointment time'],
        keywords: ['cancel', 'reschedule', 'reagendar', 'remarcar', 'cancelar agendamento'],
        answer: {
            en: "To cancel or reschedule an appointment: Go to <b>Calendars</b> → <b>Appointments</b>, find the appointment, click it, and choose <b>Cancel</b> or <b>Reschedule</b>. The contact gets an automatic notification.<br><br>The contact can also self-cancel/reschedule using the booking confirmation link sent by email or SMS — saves you time.",
            es: "Para cancelar o reagendar una cita: Ve a <b>Calendars</b> → <b>Appointments</b>, encuentra la cita, clic, elige <b>Cancel</b> o <b>Reschedule</b>. El contacto recibe notificación automática.<br><br>El contacto también puede cancelar/reagendar solo con el link de confirmación que recibió por email o SMS — te ahorra tiempo.",
            pt: "Pra cancelar ou remarcar um agendamento: Vai em <b>Calendars</b> → <b>Appointments</b>, acha o agendamento, clica e escolhe <b>Cancel</b> ou <b>Reschedule</b>. O contato recebe notificação automática.<br><br>O contato também pode cancelar/remarcar sozinho pelo link de confirmação que recebeu por email ou SMS — economiza seu tempo."
        }
    },
    // ===== CONVERSATION AI / CHATBOT =====
    {
        id: 'conversation-ai',
        phrases: ['chatbot', 'chat bot', 'conversation ai', 'ai bot', 'auto reply', 'automatic reply', 'responder automatico', 'resposta automatica', 'bot que responde', 'ia que responde', 'chatbot do site', 'bot conversation', 'asistente automatico'],
        keywords: ['chatbot', 'bot', 'conversation ai', 'ia chat', 'automatic reply', 'auto reply'],
        team: true,
        answer: {
            en: "Bee Pro Hub has a built-in <b>Conversation AI</b> that auto-replies to leads 24/7 — handles common questions, qualifies leads, books appointments. Configured in <b>Settings</b> → <b>Conversation AI</b> with an intent map (what questions trigger which answer) and a persona.<br><br>This is a setup our team handles for you so the bot sounds natural and matches your business. Send a WhatsApp message describing what you want the bot to handle and we'll set it up.",
            es: "Bee Pro Hub tiene una <b>Conversation AI</b> integrada que responde a leads 24/7 — maneja preguntas comunes, califica leads, agenda citas. Se configura en <b>Settings</b> → <b>Conversation AI</b> con mapa de intenciones y persona.<br><br>Nuestro equipo maneja la configuración para que el bot suene natural. Mándanos un WhatsApp diciendo qué quieres que el bot resuelva y lo configuramos.",
            pt: "O Bee Pro Hub tem uma <b>Conversation AI</b> integrada que responde leads 24/7 — atende perguntas comuns, qualifica leads, agenda atendimentos. Configurada em <b>Settings</b> → <b>Conversation AI</b> com mapa de intenções (que pergunta dispara que resposta) e uma persona.<br><br>Esse setup o nosso time faz pra você, pra o bot soar natural e combinar com seu negócio. Manda um WhatsApp dizendo o que você quer que o bot resolva e a gente configura."
        }
    },
    // ===== LEAD SOURCE / WHERE LEAD CAME FROM =====
    {
        id: 'lead-source',
        phrases: ['where lead came from', 'lead source', 'origem do lead', 'origem dos leads', 'de onde veio lead', 'fonte do lead', 'fuente del lead', 'origen del lead', 'de donde vino', 'how lead found me', 'como lead encontrou', 'lead attribution', 'attribution', 'atribuicao'],
        keywords: ['source', 'origem', 'fuente', 'origen', 'attribution', 'atribuicao', 'de onde'],
        answer: {
            en: "To see where a lead came from: open the contact in <b>Contacts</b> and look at the <b>Source</b> field on the right panel. It shows things like \"Website Form\", \"Phone Call\", \"WhatsApp\", \"Facebook Ad\", etc.<br><br>For a full picture across all leads, check <b>Reporting</b> → <b>Attribution Report</b> — shows which channels brought in the most contacts, opportunities, and revenue. The monthly Galaxy report (sent by email) also includes this breakdown.",
            es: "Para ver de dónde vino un lead: abre el contacto en <b>Contacts</b> y mira el campo <b>Source</b> en el panel derecho. Muestra cosas como \"Website Form\", \"Phone Call\", \"WhatsApp\", \"Facebook Ad\", etc.<br><br>Para visión completa, ve a <b>Reporting</b> → <b>Attribution Report</b> — muestra qué canales trajeron más contactos, oportunidades e ingresos. El reporte mensual de Galaxy (que llega por email) también trae este breakdown.",
            pt: "Pra ver de onde veio um lead: abre o contato em <b>Contacts</b> e olha o campo <b>Source</b> no painel direito. Mostra coisas como \"Website Form\", \"Phone Call\", \"WhatsApp\", \"Facebook Ad\", etc.<br><br>Pra visão completa, vai em <b>Reporting</b> → <b>Attribution Report</b> — mostra quais canais trouxeram mais contatos, oportunidades e receita. O relatório mensal da Galaxy (que chega por email) também traz esse breakdown."
        }
    },
    // ===== BULK SMS / BULK EMAIL =====
    {
        id: 'bulk-messaging',
        phrases: ['bulk sms', 'bulk email', 'send mass sms', 'send mass email', 'mass message', 'mensagem em massa', 'sms em massa', 'email em massa', 'enviar para todos', 'send to all', 'mensaje masivo', 'sms masivo', 'email masivo'],
        keywords: ['bulk', 'mass', 'massa', 'masivo', 'todos', 'all contacts'],
        answer: {
            en: "To send a message to many contacts at once: Go to <b>Contacts</b>, filter or use a Smart List to pick the right group, click <b>Bulk Actions</b>, then choose <b>Send SMS</b> or <b>Send Email</b>. Compose your message (use merge fields like {{contact.first_name}} for personalization) and send.<br><br>For US numbers, you need A2P 10DLC registration first (our team sets this up). Email blasts work right away.",
            es: "Para enviar un mensaje a muchos contactos: Ve a <b>Contacts</b>, filtra o usa una Smart List, clic en <b>Bulk Actions</b>, elige <b>Send SMS</b> o <b>Send Email</b>. Escribe el mensaje (usa merge fields como {{contact.first_name}} para personalizar) y envía.<br><br>Para números de EE.UU., necesitas registro A2P 10DLC primero (nuestro equipo lo gestiona). Los emails masivos funcionan al toque.",
            pt: "Pra mandar mensagem pra muitos contatos: Vai em <b>Contacts</b>, filtra ou usa uma Smart List pra pegar o grupo certo, clica em <b>Bulk Actions</b>, escolhe <b>Send SMS</b> ou <b>Send Email</b>. Escreve a mensagem (usa merge fields tipo {{contact.first_name}} pra personalizar) e envia.<br><br>Pra números americanos, precisa do registro A2P 10DLC antes (nosso time configura). Email em massa funciona na hora."
        }
    },
    // ===== EMAIL DELIVERABILITY / SPAM =====
    {
        id: 'email-deliverability',
        phrases: ['email spam', 'email caiu spam', 'email no spam', 'email not delivered', 'email nao chegou', 'email no llega', 'why email spam', 'porque email spam', 'mejorar entrega email', 'melhorar entrega email', 'spf dkim dmarc', 'autenticar email'],
        keywords: ['spam', 'deliverability', 'entrega', 'spf', 'dkim', 'dmarc', 'autenticacao'],
        team: true,
        answer: {
            en: "If emails are landing in spam, the cause is usually missing domain authentication (SPF, DKIM, DMARC) or sending from an unverified domain. Bee Pro Hub needs DNS records added to your domain so email providers trust the messages.<br><br>This is a one-time setup our team handles — send us your domain in the WhatsApp group and we'll add the records and verify everything. After that, deliverability improves dramatically.",
            es: "Si los emails caen en spam, normalmente es por falta de autenticación de dominio (SPF, DKIM, DMARC) o por enviar desde un dominio no verificado. Bee Pro Hub necesita registros DNS en tu dominio para que los proveedores confíen en los mensajes.<br><br>Es un setup único que nuestro equipo hace — mándanos tu dominio en el grupo de WhatsApp y agregamos los registros. Después, la entrega mejora muchísimo.",
            pt: "Se emails estão caindo no spam, geralmente é falta de autenticação de domínio (SPF, DKIM, DMARC) ou envio de domínio não verificado. O Bee Pro Hub precisa de registros DNS no seu domínio pra os provedores confiarem nas mensagens.<br><br>É um setup único que o nosso time faz — manda seu domínio no grupo do WhatsApp e a gente adiciona os registros e verifica tudo. Depois disso, a entrega melhora muito."
        }
    },
    // ===== FORM TROUBLESHOOTING =====
    {
        id: 'form-not-receiving',
        phrases: ['form not working', 'form no funciona', 'formulario nao funciona', 'lead nao chegou', 'lead no llega', 'lead not received', 'form submission', 'envio do formulario nao chega', 'cliente preencheu mas nao chegou', 'form lost', 'leads perdidos'],
        keywords: ['form not', 'no funciona', 'nao funciona', 'lost', 'perdido', 'not received'],
        answer: {
            en: "If a lead filled out the form but didn't show up:<br>• Check <b>Contacts</b> — search by phone or email, the lead may be there with a duplicate handler<br>• Check <b>Conversations</b> — sometimes a notification went to the inbox<br>• Verify the form is connected to the right pipeline/automation in <b>Sites</b> → <b>Forms</b><br><br>If you confirm the lead is missing, send the form name and approximate time to our WhatsApp — we can check the form logs and fix it.",
            es: "Si un lead llenó el formulario pero no apareció:<br>• Revisa <b>Contacts</b> — busca por teléfono o email, puede estar con un handler duplicado<br>• Revisa <b>Conversations</b> — a veces la notificación fue al inbox<br>• Verifica que el formulario esté conectado al pipeline/automatización en <b>Sites</b> → <b>Forms</b><br><br>Si confirmas que falta, mándanos el nombre del formulario y la hora aproximada por WhatsApp — revisamos los logs y arreglamos.",
            pt: "Se um lead preencheu o form mas não apareceu:<br>• Confere <b>Contacts</b> — busca por telefone ou email, pode estar lá com handler duplicado<br>• Confere <b>Conversations</b> — às vezes a notificação foi pro inbox<br>• Verifica se o form está conectado no pipeline/automação certa em <b>Sites</b> → <b>Forms</b><br><br>Se confirmar que está faltando, manda o nome do form e a hora aproximada pro nosso WhatsApp — a gente confere os logs do form e arruma."
        }
    },
    // ===== ROUND ROBIN / AGENT ASSIGNMENT =====
    {
        id: 'agent-assignment',
        phrases: ['round robin', 'assign agent', 'distribute leads', 'distribuir leads', 'atribuir vendedor', 'asignar vendedor', 'turnar leads', 'rodizio leads', 'ronda comerciais', 'auto assign'],
        keywords: ['round robin', 'assign', 'distribute', 'atribuir', 'distribuir', 'asignar'],
        team: true,
        answer: {
            en: "To distribute leads automatically across team members (round robin): set up a <b>Round Robin Calendar</b> for booking distribution, OR use a workflow that assigns contacts to team members in rotation when a new lead comes in.<br><br>Our team can set up a workflow that auto-assigns each new lead to the next available salesperson, with rules like \"skip people who are off today\" or \"only assign to senior reps for high-value leads\". Send your assignment rules via WhatsApp.",
            es: "Para distribuir leads entre el equipo (round robin): configura un <b>Round Robin Calendar</b> para distribuir reservas, O un workflow que asigne contactos por rotación cuando llega un lead nuevo.<br><br>Nuestro equipo configura el workflow que auto-asigna cada lead al siguiente vendedor disponible, con reglas como \"saltar quien está libre hoy\" o \"solo senior para leads grandes\". Mándanos las reglas por WhatsApp.",
            pt: "Pra distribuir leads automaticamente entre o time (round robin): configura um <b>Round Robin Calendar</b> pra distribuir agendamentos, OU um workflow que atribui contatos pra membros do time em rotação quando chega lead novo.<br><br>O nosso time configura um workflow que auto-atribui cada lead novo pro próximo vendedor disponível, com regras tipo \"pula quem está de folga hoje\" ou \"só atribui pra senior se for lead grande\". Manda as regras de atribuição pelo WhatsApp."
        }
    },
    // ===== PIPELINE / OPPORTUNITY STAGES =====
    {
        id: 'pipeline-stages',
        phrases: ['create pipeline', 'add stage', 'edit pipeline', 'criar pipeline', 'adicionar stage', 'editar pipeline', 'mover oportunidade', 'move opportunity', 'kanban', 'pipeline stages', 'estagios pipeline', 'etapas pipeline', 'etapa', 'estagio'],
        keywords: ['pipeline', 'stage', 'estagio', 'etapa', 'kanban'],
        answer: {
            en: "To manage your pipeline: Go to <b>Settings</b> → <b>Pipelines</b>. Create new pipelines (e.g., \"Sales\", \"Projects\") and add stages (e.g., \"New Lead\", \"Estimate Sent\", \"Won\"). Each stage has a status (open, won, lost, abandoned).<br><br>To move opportunities, open <b>Opportunities</b>, drag-and-drop deals between columns in the kanban view. Or open an opportunity and change the stage from the dropdown.",
            es: "Para gestionar tu pipeline: Ve a <b>Settings</b> → <b>Pipelines</b>. Crea nuevos pipelines (ej. \"Ventas\", \"Proyectos\") y agrega etapas (ej. \"Nuevo Lead\", \"Cotización Enviada\", \"Ganado\"). Cada etapa tiene un status (abierto, ganado, perdido, abandonado).<br><br>Para mover oportunidades, abre <b>Opportunities</b>, arrastra entre columnas en la vista kanban. O abre una oportunidad y cambia la etapa desde el dropdown.",
            pt: "Pra gerenciar seu pipeline: Vai em <b>Settings</b> → <b>Pipelines</b>. Cria novos pipelines (ex: \"Vendas\", \"Projetos\") e adiciona estágios (ex: \"Novo Lead\", \"Orçamento Enviado\", \"Ganho\"). Cada estágio tem um status (aberto, ganho, perdido, abandonado).<br><br>Pra mover oportunidades, abre <b>Opportunities</b>, arrasta os cards entre colunas na visão kanban. Ou abre uma oportunidade e muda o estágio pelo dropdown."
        }
    },
    // ===== EMAIL OPEN TRACKING =====
    {
        id: 'email-tracking',
        phrases: ['email opened', 'email open tracking', 'cliente abriu email', 'tracking email', 'rastrear email', 'see email opens', 'who opened email', 'quien abrio email', 'rastreo email'],
        keywords: ['email open', 'tracking', 'rastrear', 'rastreo', 'opened', 'abriu', 'abrio'],
        answer: {
            en: "Bee Pro Hub tracks email opens and clicks automatically. To see if a contact opened your email: Open the contact, go to the <b>Activity</b> tab — you'll see events like \"Email Opened\", \"Link Clicked\", with timestamps.<br><br>For an overview of all email campaigns, go to <b>Marketing</b> → <b>Email Campaigns</b> → click a campaign → see open rate, click rate, who specifically opened.",
            es: "Bee Pro Hub rastrea aperturas y clics automáticamente. Para ver si un contacto abrió tu email: abre el contacto, ve a la pestaña <b>Activity</b> — verás eventos como \"Email Opened\", \"Link Clicked\", con horas.<br><br>Para vista general de campañas, ve a <b>Marketing</b> → <b>Email Campaigns</b> → clic en una campaña → ver tasa de apertura, clic, quién específicamente abrió.",
            pt: "O Bee Pro Hub rastreia aberturas e cliques de email automaticamente. Pra ver se um contato abriu seu email: abre o contato, vai na aba <b>Activity</b> — vai ver eventos tipo \"Email Opened\", \"Link Clicked\", com horários.<br><br>Pra visão geral das campanhas, vai em <b>Marketing</b> → <b>Email Campaigns</b> → clica numa campanha → vê taxa de abertura, taxa de clique, quem especificamente abriu."
        }
    },
    // ===== GBP POSTS =====
    {
        id: 'gbp-posts',
        phrases: ['google post', 'google posts', 'gbp post', 'post on google', 'postar no google', 'publicar en google', 'google business post', 'publicacao google', 'publicacion google'],
        keywords: ['google post', 'gbp post', 'postar google', 'publicar google'],
        team: true,
        answer: {
            en: "Posting to your Google Business Profile (offers, news, events) is part of our service. Just send the photo, text, and any link/CTA to our WhatsApp group and we'll publish it on your GBP — usually goes live within hours.<br><br>If you want a regular schedule (e.g., weekly post about a service), tell us once and we'll keep it consistent.",
            es: "Publicar en tu Google Business Profile (ofertas, novedades, eventos) es parte de nuestro servicio. Mándanos la foto, texto y link/CTA en el grupo de WhatsApp y lo publicamos en tu GBP — normalmente queda live en horas.<br><br>Si quieres un calendario fijo (ej. publicación semanal de un servicio), dinos una vez y lo mantenemos.",
            pt: "Postar no seu Google Business Profile (ofertas, novidades, eventos) faz parte do nosso serviço. Manda a foto, texto e link/CTA pro nosso grupo do WhatsApp que a gente publica no seu GBP — normalmente fica no ar em horas.<br><br>Se quer um cronograma fixo (ex: post semanal de um serviço), avisa uma vez e a gente mantém constante."
        }
    },
    // ===== GBP INSIGHTS =====
    {
        id: 'gbp-insights',
        phrases: ['google insights', 'gbp insights', 'gbp performance', 'google business performance', 'desempenho google business', 'estatisticas google', 'estadisticas google', 'how many calls google', 'ligacoes do google', 'visualizacoes google'],
        keywords: ['insights', 'performance', 'desempenho', 'estatisticas', 'estadisticas', 'gbp views', 'gbp calls'],
        answer: {
            en: "Your Google Business Profile shows performance data (views, searches, calls, direction requests, website clicks) directly inside Google. Open <b>business.google.com</b> → pick your business → <b>Performance</b>.<br><br>Galaxy's monthly report (the one that comes by email) also includes a summary of GBP performance combined with website Search Console data, so you don't have to log in if you don't want.",
            es: "Tu Google Business Profile muestra datos de rendimiento (vistas, búsquedas, llamadas, direcciones, clics al sitio) directamente en Google. Abre <b>business.google.com</b> → elige tu negocio → <b>Performance</b>.<br><br>El reporte mensual de Galaxy (que llega por email) también trae un resumen del desempeño del GBP junto con datos del Search Console, así no tienes que loguearte si no quieres.",
            pt: "Seu Google Business Profile mostra dados de desempenho (visualizações, buscas, ligações, pedidos de rota, cliques no site) direto no Google. Abre <b>business.google.com</b> → escolhe seu negócio → <b>Performance</b>.<br><br>O relatório mensal da Galaxy (que chega por email) também traz um resumo do desempenho do GBP junto com dados do Search Console, então não precisa logar se não quiser."
        }
    },
    // ===== TIMEZONE / WORKING HOURS =====
    {
        id: 'timezone',
        phrases: ['timezone', 'fuso horario', 'horario errado', 'wrong timezone', 'time zone', 'change timezone', 'mudar fuso', 'change time zone', 'huso horario', 'cambiar zona horaria'],
        keywords: ['timezone', 'time zone', 'fuso', 'huso'],
        answer: {
            en: "To set your account timezone: <b>Settings</b> → <b>Business Profile</b> → <b>Timezone</b> dropdown. This affects when reports run, when scheduled SMS go out, and appointment times.<br><br>Each user can also have their own timezone (Profile icon → Profile → Timezone). And each calendar can have its own timezone if you serve clients in different regions.",
            es: "Para configurar zona horaria: <b>Settings</b> → <b>Business Profile</b> → <b>Timezone</b>. Afecta cuándo corren reportes, cuándo salen SMS programados y horas de citas.<br><br>Cada usuario también puede tener su zona (Profile → Profile → Timezone). Y cada calendario puede tener su zona si atiendes clientes en distintas regiones.",
            pt: "Pra configurar o fuso horário: <b>Settings</b> → <b>Business Profile</b> → <b>Timezone</b>. Afeta quando os relatórios rodam, quando saem SMS agendados e horários de agendamentos.<br><br>Cada usuário também pode ter o próprio fuso (Profile icon → Profile → Timezone). E cada calendário pode ter um fuso próprio se você atende clientes em regiões diferentes."
        }
    },
    // ===== CONTACT TEAM / GET HELP =====
    {
        id: 'contact-team',
        phrases: ['contact team', 'speak to human', 'falar com pessoa', 'falar com alguem', 'falar com humano', 'preciso de ajuda', 'ayuda humana', 'hablar con persona', 'help human', 'team contact', 'whatsapp galaxy', 'numero galaxy'],
        keywords: ['team', 'human', 'humano', 'persona', 'speak', 'falar', 'ayuda humana'],
        answer: {
            en: "To talk to the Galaxy team directly:<br>• <b>WhatsApp group</b> — fastest for urgent stuff (everyone on the team is in there)<br>• <b>Email:</b> info@galaxyinfo.us<br>• <b>Schedule a call</b> — if you're on Pro or Complete plan, <a href='#schedule-call'>book a time here</a><br><br>For anything not in this chat (workflow setup, GBP changes, website edits, etc.), the team is the right path — they handle the things that need a human touch.",
            es: "Para hablar con el equipo Galaxy directamente:<br>• <b>Grupo de WhatsApp</b> — lo más rápido para urgencias (todo el equipo está ahí)<br>• <b>Email:</b> info@galaxyinfo.us<br>• <b>Agendar llamada</b> — si tienes plan Pro o Complete, <a href='#schedule-call'>reserva aquí</a><br><br>Para cualquier cosa que no esté en este chat (workflows, cambios GBP, edición de sitio, etc.), el equipo es el camino correcto.",
            pt: "Pra falar direto com o time Galaxy:<br>• <b>Grupo do WhatsApp</b> — mais rápido pra urgência (time inteiro está lá)<br>• <b>Email:</b> info@galaxyinfo.us<br>• <b>Agendar chamada</b> — se está no plano Pro ou Complete, <a href='#schedule-call'>marca aqui</a><br><br>Pra qualquer coisa que não tenha nesse chat (configurar workflow, mudança no GBP, edição de site, etc.), o time é o caminho certo — eles cuidam das coisas que precisam de toque humano."
        }
    },
    // ===== GREETINGS =====
    {
        id: 'greeting',
        phrases: ['oi tudo bem', 'olá tudo bem', 'ola tudo bem', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi there', 'hey', 'good morning', 'good afternoon', 'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hola que tal', 'oi', 'olá'],
        keywords: [],
        answer: {
            en: "Hi there! 👋 I'm Galaxy Assist, your Bee Pro Hub support AI. I can help you with:<br><br>• <b>Contacts, CRM, Tags, Pipeline</b><br>• <b>Conversations</b> (SMS, Email, WhatsApp)<br>• <b>Reports & Dashboards</b><br>• <b>Google Business Profile & Reviews</b><br>• <b>Calendars & Booking</b><br>• <b>Payments & Invoicing</b><br>• <b>Team, Settings, Password</b><br>• <b>Templates, Tasks, Notes</b><br>• <b>Mobile App</b><br>• And more!<br><br>What do you need help with?",
            es: "¡Hola! 👋 Soy Galaxy Assist, tu IA de soporte para Bee Pro Hub. Puedo ayudarte con:<br><br>• <b>Contactos, CRM, Tags, Pipeline</b><br>• <b>Conversaciones</b> (SMS, Email, WhatsApp)<br>• <b>Reportes y Dashboards</b><br>• <b>Google Business Profile y Reseñas</b><br>• <b>Calendarios y Reservas</b><br>• <b>Pagos y Facturación</b><br>• <b>Equipo, Configuraciones, Contraseña</b><br>• <b>Plantillas, Tareas, Notas</b><br>• <b>App Móvil</b><br>• ¡Y más!<br><br>¿En qué puedo ayudarte?",
            pt: "Oi! 👋 Sou o Galaxy Assist, sua IA de suporte do Bee Pro Hub. Posso te ajudar com:<br><br>• <b>Contatos, CRM, Tags, Pipeline</b><br>• <b>Conversas</b> (SMS, Email, WhatsApp)<br>• <b>Relatórios e Dashboards</b><br>• <b>Google Business Profile e Avaliações</b><br>• <b>Calendários e Agendamento</b><br>• <b>Pagamentos e Faturamento</b><br>• <b>Equipe, Configurações, Senha</b><br>• <b>Templates, Tarefas, Notas</b><br>• <b>App no Celular</b><br>• E mais!<br><br>No que precisa de ajuda?"
        }
    }
];

/* ---- Chat Logic ---- */
(function () {
    'use strict';

    var chatMessages = document.getElementById('chatMessages');
    var chatInput = document.getElementById('chatInput');
    var chatSend = document.getElementById('chatSend');
    var heroSearchForm = document.getElementById('heroSearchForm');
    var heroSearchInput = document.getElementById('heroSearchInput');
    var topicCards = document.querySelectorAll('[data-topic-key]');

    var conversationHistory = [];
    var isSending = false;
    var lastMatchedTopic = null; // remembers context for follow-ups

    function getLang() {
        return localStorage.getItem('galaxy-lang') || 'en';
    }

    function getScheduleLink() {
        var lang = getLang();
        var labels = { en: "schedule a call with our team", es: "agenda una llamada con nuestro equipo", pt: "agende uma chamada com nosso time" };
        return "<a href='#schedule-call' class='chat-cta-link'><i class='fas fa-calendar-check'></i> " + (labels[lang] || labels.en) + "</a>";
    }

    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessage(text, sender, isHtml) {
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble-' + sender;
        if (isHtml) { bubble.innerHTML = text; } else { bubble.textContent = text; }
        chatMessages.appendChild(bubble);
        scrollChatToBottom();
        conversationHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });
    }

    function showTyping() {
        var typing = document.createElement('div');
        typing.className = 'chat-bubble chat-bubble-bot chat-typing';
        typing.id = 'chatTyping';
        typing.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typing);
        scrollChatToBottom();
    }

    function hideTyping() {
        var el = document.getElementById('chatTyping');
        if (el) el.remove();
    }

    /* ---- Intelligent KB Search with context memory ---- */
    var lastAnswerText = '';

    function scoreTopic(entry, q) {
        var score = 0;
        for (var p = 0; p < entry.phrases.length; p++) {
            if (q.indexOf(entry.phrases[p].toLowerCase()) !== -1) score += 10;
        }
        for (var k = 0; k < entry.keywords.length; k++) {
            if (q.indexOf(entry.keywords[k].toLowerCase()) !== -1) score += 1;
        }
        return score;
    }

    function findTopicAndAnswer(query) {
        var lang = getLang();
        var q = query.toLowerCase();
        var bestMatch = null;
        var bestScore = 0;

        for (var i = 0; i < KNOWLEDGE_BASE.length; i++) {
            var score = scoreTopic(KNOWLEDGE_BASE[i], q);
            if (score > bestScore) { bestScore = score; bestMatch = KNOWLEDGE_BASE[i]; }
        }

        // Direct match found
        if (bestMatch && bestScore >= 1) {
            var answer = bestMatch.answer[lang] || bestMatch.answer.en;

            // If it's the SAME topic as last time, give followup instead of repeating
            if (lastMatchedTopic && bestMatch.id === lastMatchedTopic.id && answer === lastAnswerText) {
                if (bestMatch.followup) {
                    var fu = bestMatch.followup[lang] || bestMatch.followup.en;
                    lastAnswerText = fu;
                    return fu;
                }
            }

            lastMatchedTopic = bestMatch;
            lastAnswerText = answer;
            return answer;
        }

        // Short/vague follow-up → use context from last topic
        var isFollowUp = q.length < 60 && /^(e |como |mais |mas |explica|tell|how|what|show|me diz|me fala|pode |puedes|dime|y |más|detail|detalh|but |and |sei |sé |know|receb|entrega|deliver|read|lida|leíd)/i.test(q);
        if (lastMatchedTopic && isFollowUp) {
            if (lastMatchedTopic.followup) {
                var fu2 = lastMatchedTopic.followup[lang] || lastMatchedTopic.followup.en;
                lastAnswerText = fu2;
                return fu2;
            }
            // No followup defined — give a contextual nudge
            var nudge = {
                en: "That's a great follow-up question! For more details on this, I'd suggest reaching out to our team on the <b>WhatsApp group</b> — they can walk you through it step by step.",
                es: "¡Buena pregunta de seguimiento! Para más detalles sobre esto, te sugiero contactar a nuestro equipo por el <b>grupo de WhatsApp</b> — ellos te pueden guiar paso a paso.",
                pt: "Boa pergunta! Pra mais detalhes sobre isso, sugiro falar com nosso time no <b>grupo do WhatsApp</b> — eles podem te guiar passo a passo."
            };
            return nudge[lang] || nudge.en;
        }

        return null;
    }

    /* ---- Send Message ---- */
    async function sendMessage(text) {
        if (!text || !text.trim() || isSending) return;
        text = text.trim();

        isSending = true;
        chatSend.disabled = true;
        chatInput.value = '';

        addMessage(text, 'user');
        showTyping();

        // Natural delay — varies slightly so it doesn't feel robotic
        var delay = 400 + Math.floor(Math.random() * 500);
        await new Promise(function (r) { setTimeout(r, delay); });

        // 1) Try webhook (Claude API) first
        var replied = false;
        try {
            var controller = new AbortController();
            var timeoutId = setTimeout(function () { controller.abort(); }, GALAXY_ASSIST_CONFIG.timeoutMs);

            var response = await fetch(GALAXY_ASSIST_CONFIG.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    language: getLang(),
                    systemPrompt: GALAXY_ASSIST_CONFIG.systemPrompt,
                    history: conversationHistory.slice(0, -1)
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                var data = await response.json();
                var reply = '';
                if (data && data.text) reply = data.text;
                else if (data && data.output) reply = data.output;
                else if (data && data.message) reply = data.message;
                else if (typeof data === 'string') reply = data;

                if (reply) {
                    hideTyping();
                    addMessage(reply, 'bot', true);
                    replied = true;
                }
            }
        } catch (err) {
            // Webhook unavailable — use local KB
        }

        // 2) Local knowledge base with context
        if (!replied) {
            var kbAnswer = findTopicAndAnswer(text);
            if (kbAnswer) {
                hideTyping();
                addMessage(kbAnswer, 'bot', true);
                replied = true;
            }
        }

        // 3) Search GHL documentation online
        if (!replied) {
            try {
                var searchResp = await fetch('/api/ghl-search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: text, language: getLang() })
                });

                if (searchResp.ok) {
                    var searchData = await searchResp.json();
                    if (searchData && searchData.text) {
                        hideTyping();
                        addMessage(searchData.text, 'bot', true);
                        replied = true;
                    }
                }
            } catch (e) {
                // Search failed — use fallback
            }
        }

        // 4) Fallback — should be rare now that AI has live web_search
        if (!replied) {
            hideTyping();
            var lang = getLang();
            var noAnswer = {
                en: "Hmm, I'm having trouble pulling that one — possibly a momentary connection issue with the AI. Try rephrasing in a different way, or if it's urgent, our team is super fast on the <b>WhatsApp group</b> (they have full access to your account and can solve anything in minutes). " + getScheduleLink() + " also works if you'd rather chat live.",
                es: "Hmm, tuve problema para responder eso — puede ser un problema momentáneo de conexión con la IA. Intenta reformular o, si es urgente, nuestro equipo es súper rápido en el <b>grupo de WhatsApp</b> (tienen acceso completo a tu cuenta y resuelven en minutos). " + getScheduleLink() + " también funciona si prefieres hablar en vivo.",
                pt: "Hmm, deu uma travada pra responder essa — pode ter sido uma conexão momentânea com a IA. Tenta reformular de outro jeito ou, se for urgente, nosso time é super rápido no <b>grupo do WhatsApp</b> (eles têm acesso completo à sua conta e resolvem em minutos). " + getScheduleLink() + " também funciona se preferir falar ao vivo."
            };
            addMessage(noAnswer[lang] || noAnswer.en, 'bot', true);
        }

        isSending = false;
        setTimeout(function () { chatSend.disabled = false; }, 800);
    }

    function scrollToChat() {
        var el = document.getElementById('galaxy-assist');
        if (el) {
            var top = el.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    }

    // Send button
    chatSend.addEventListener('click', function () {
        sendMessage(chatInput.value);
    });

    // Enter key
    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(chatInput.value);
        }
    });

    // Hero search form
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var query = heroSearchInput.value.trim();
            if (query) {
                scrollToChat();
                setTimeout(function () {
                    chatInput.value = query;
                    sendMessage(query);
                }, 600);
            }
        });
    }

    // Topic cards — get translated question from i18n
    topicCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var key = card.getAttribute('data-topic-key');
            if (key && typeof translations !== 'undefined') {
                var lang = getLang();
                var topic = (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || key;
                scrollToChat();
                setTimeout(function () {
                    sendMessage(topic);
                }, 600);
            }
        });
    });

    // Reset chat when language changes
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setTimeout(function () {
                // Clear messages
                chatMessages.innerHTML = '';
                conversationHistory = [];

                // Re-add welcome message in new language
                var lang = getLang();
                var welcome = (typeof translations !== 'undefined' && translations[lang] && translations[lang].support_chat_welcome)
                    || 'Hi! I\'m Galaxy Assist. Ask me anything about your Google Business Profile, website, reports, or Bee Pro Hub.';
                var bubble = document.createElement('div');
                bubble.className = 'chat-bubble chat-bubble-bot';
                bubble.textContent = welcome;
                chatMessages.appendChild(bubble);
            }, 100);
        });
    });
})();
