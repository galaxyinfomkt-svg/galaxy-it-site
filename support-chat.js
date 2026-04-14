/* ============================================
   GALAXY ASSIST — AI Support Chat
   Specialized in Bee Pro Hub (GoHighLevel)
   Loaded only on /support page
   ============================================ */

const GALAXY_ASSIST_CONFIG = {
    webhookUrl: '/api/galaxy-assist',
    timeoutMs: 15000,
    systemPrompt: `You are Galaxy Assist, the AI support agent for Galaxy IT & Marketing (Worcester, MA). You specialize in helping clients use Bee Pro Hub — our white-labeled GoHighLevel (GHL) platform.

CORE KNOWLEDGE AREAS:
1. Bee Pro Hub CRM — Contacts, Smart Lists, Tags, Custom Fields, Pipelines, Opportunities
2. Conversations — Unified inbox (SMS, Email, WhatsApp, Facebook Messenger, Instagram DM, Google Chat), templates, snippets
3. Calendars & Appointments — Booking calendars, round-robin, service calendars, appointment confirmation/reminders
4. Automations & Workflows — Triggers, actions, if/else branches, wait steps, go-to actions, webhooks
5. Funnels & Websites — Funnel builder, website builder, drag-and-drop editor, custom code, domains
6. Email Marketing — Campaigns, templates, email builder, list segmentation, deliverability
7. SMS & Phone — Two-way SMS, ringless voicemail, call tracking, missed call text-back
8. Social Planner — Scheduling posts, connecting accounts, analytics
9. Reputation Management — Review requests, Google review links, monitoring, auto-responses
10. Reporting & Dashboards — Attribution reporting, call reporting, appointment reporting, Google/Facebook ad reporting
11. Google Business Profile — Posting, reviews, Q&A, photos, business info updates through GHL
12. Payments & Invoicing — Stripe integration, invoices, payment links, subscriptions, products
13. Membership Areas — Courses, communities, offers, drip content
14. Forms & Surveys — Form builder, custom fields, conditional logic, submissions tracking
15. Triggers & Tags — Lead source tracking, tag-based automations, smart lists

SUPPORT FLOW & ESCALATION:
- You are the FIRST LINE of support. Resolve ~80% of questions instantly.
- If you cannot resolve: suggest the client schedule a 1-on-1 call (scroll to schedule section).
- 1-on-1 scheduled calls are available for Pro and Complete plan clients.
- All clients (any plan) have unlimited access to you (Galaxy Assist) 24/7.
- When a client schedules a call, the team receives an automatic notification with a problem summary via n8n automation.
- For urgent issues (site down, payment processing broken), tell the client to email info@galaxyinfo.us with subject "URGENT" for priority handling.
- Never transfer, redirect, or give a phone number for direct calls — everything goes through scheduling.

TICKET CONTEXT (sent by n8n):
- Each conversation may include prior messages in the history field.
- Use conversation history to avoid asking the client to repeat themselves.
- If the client has asked the same question multiple ways, acknowledge the frustration and provide a clear direct answer.

RESPONSE GUIDELINES:
- Answer in the same language the user writes (English, Spanish, or Portuguese)
- Keep responses concise and actionable — max 3-4 sentences per topic
- Use step-by-step format when explaining how to do something: Step 1, Step 2, etc.
- Always reference the Bee Pro Hub menu location: e.g. "Go to Contacts > Smart Lists"
- If the question is outside your knowledge, suggest scheduling a call
- Never make up features that don't exist in GHL
- Be friendly and professional — you represent Galaxy IT & Marketing
- When relevant, mention that the client can schedule a call for hands-on help
- For report/analytics questions: explain WHAT the metric means and WHERE to find it
- For GBP questions: mention both the Bee Pro Hub path AND business.google.com when relevant`
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
            en: "To send review requests:<br><b>Step 1:</b> Go to <b>Reputation</b> in the left menu<br><b>Step 2:</b> Click <b>Requests</b> tab<br><b>Step 3:</b> Click <b>Send Request</b><br><b>Step 4:</b> Select the contacts you want to send to<br><b>Step 5:</b> Customize the SMS or Email message<br><b>Step 6:</b> Click <b>Send</b><br><br>Pro tip: Automate this! Create a workflow with trigger <b>\"Appointment Completed\"</b> → Action: <b>Send Review Request</b>. Reviews come in automatically.",
            es: "Para enviar solicitudes de reseña:<br><b>Paso 1:</b> Ve a <b>Reputation</b> en el menú izquierdo<br><b>Paso 2:</b> Clic en la pestaña <b>Requests</b><br><b>Paso 3:</b> Clic en <b>Send Request</b><br><b>Paso 4:</b> Selecciona los contactos<br><b>Paso 5:</b> Personaliza el mensaje SMS o Email<br><b>Paso 6:</b> Clic en <b>Send</b><br><br>Pro tip: ¡Automatiza esto! Crea un workflow con trigger <b>\"Appointment Completed\"</b> → Acción: <b>Send Review Request</b>.",
            pt: "Pra enviar pedidos de avaliação:<br><b>Passo 1:</b> Vá em <b>Reputation</b> no menu lateral<br><b>Passo 2:</b> Clique na aba <b>Requests</b><br><b>Passo 3:</b> Clique em <b>Send Request</b><br><b>Passo 4:</b> Selecione os contatos<br><b>Passo 5:</b> Personalize a mensagem por SMS ou Email<br><b>Passo 6:</b> Clique em <b>Send</b><br><br>Dica: Automatize isso! Crie um workflow com trigger <b>\"Appointment Completed\"</b> → Ação: <b>Send Review Request</b>. As avaliações chegam automaticamente."
        }
    },
    {
        id: 'respond-review',
        phrases: ['respond review', 'reply review', 'answer review', 'responder avaliação', 'responder reseña', 'responder review', 'como respondo avaliação', 'como respondo review', 'como respondo reseña', 'responder uma avaliação', 'reply to review', 'respond to review', 'respondo uma avaliação', 'respondo avaliação', 'respondo reseña', 'respondo review', 'reply a review'],
        keywords: [],
        answer: {
            en: "To respond to a Google review:<br><b>Step 1:</b> Go to <b>Reputation</b> in the left menu<br><b>Step 2:</b> Find the review in the list<br><b>Step 3:</b> Click on it to expand<br><b>Step 4:</b> Type your response<br><b>Step 5:</b> Click <b>Reply</b><br><br>Tip: Always respond within 24 hours — it improves your local SEO and shows clients you care.",
            es: "Para responder una reseña de Google:<br><b>Paso 1:</b> Ve a <b>Reputation</b> en el menú<br><b>Paso 2:</b> Encuentra la reseña<br><b>Paso 3:</b> Clic para expandir<br><b>Paso 4:</b> Escribe tu respuesta<br><b>Paso 5:</b> Clic en <b>Reply</b><br><br>Tip: Responde dentro de 24 horas — mejora tu SEO local.",
            pt: "Pra responder uma avaliação do Google:<br><b>Passo 1:</b> Vá em <b>Reputation</b> no menu lateral<br><b>Passo 2:</b> Encontre a avaliação na lista<br><b>Passo 3:</b> Clique pra expandir<br><b>Passo 4:</b> Escreva sua resposta<br><b>Passo 5:</b> Clique em <b>Reply</b><br><br>Dica: Responda em até 24 horas — melhora seu SEO local e mostra que você se importa."
        }
    },
    {
        id: 'contacts-crm',
        phrases: ['add contact', 'import contact', 'smart list', 'manage contact', 'manage lead', 'adicionar contato', 'importar contato', 'gerenciar contato', 'agregar contacto', 'importar contacto', 'gestionar contacto', 'como adiciono contato', 'como importo contato', 'como crio smart list', 'como adiciono tag', 'como gerencio lead', 'como agrego contacto', 'como importo contacto', 'create smart list', 'add tag', 'bulk tag', 'criar tag', 'crear tag'],
        keywords: ['contact', 'contato', 'contacto', 'lead', 'crm', 'import', 'importar', 'smart list', 'tag', 'pipeline'],
        answer: {
            en: "Your CRM is in <b>Contacts</b> in the left menu. Here's what you can do:<br>• <b>Add contact:</b> Click <b>+ Add Contact</b> → fill Name, Email, Phone → Save<br>• <b>Import:</b> Click <b>Import</b> → upload CSV → map columns → Import<br>• <b>Smart Lists:</b> Click <b>Smart Lists</b> tab → <b>+ Create</b> → set filters (tags, dates, pipeline stage)<br>• <b>Tags:</b> Open a contact → Tags section → type and add. Bulk: select multiple → Actions → Add Tag<br>• <b>Pipeline:</b> Go to <b>Opportunities</b> → Pipelines → create stages (New, Contacted, Won, Lost)",
            es: "Tu CRM está en <b>Contacts</b> en el menú izquierdo. Lo que puedes hacer:<br>• <b>Agregar contacto:</b> Clic en <b>+ Add Contact</b> → llena Nombre, Email, Teléfono → Save<br>• <b>Importar:</b> Clic en <b>Import</b> → sube CSV → mapea columnas → Import<br>• <b>Smart Lists:</b> Pestaña <b>Smart Lists</b> → <b>+ Create</b> → configura filtros<br>• <b>Tags:</b> Abre un contacto → sección Tags → agrega. En masa: selecciona varios → Actions → Add Tag<br>• <b>Pipeline:</b> Ve a <b>Opportunities</b> → Pipelines → crea etapas",
            pt: "Seu CRM fica em <b>Contacts</b> no menu lateral. O que você pode fazer:<br>• <b>Adicionar contato:</b> Clique em <b>+ Add Contact</b> → preencha Nome, Email, Telefone → Save<br>• <b>Importar:</b> Clique em <b>Import</b> → suba o CSV → mapeie colunas → Import<br>• <b>Smart Lists:</b> Aba <b>Smart Lists</b> → <b>+ Create</b> → configure filtros (tags, datas, etapa do pipeline)<br>• <b>Tags:</b> Abra um contato → seção Tags → digite e adicione. Em massa: selecione vários → Actions → Add Tag<br>• <b>Pipeline:</b> Vá em <b>Opportunities</b> → Pipelines → crie etapas (Novo, Contatado, Ganho, Perdido)"
        }
    },
    {
        id: 'conversations',
        phrases: ['send message', 'send sms', 'send email', 'reply message', 'enviar mensagem', 'enviar sms', 'responder mensagem', 'enviar mensaje', 'responder mensaje', 'unified inbox', 'caixa de entrada', 'como envio mensagem', 'como envio sms', 'como respondo mensagem', 'como mando mensagem', 'como envío mensaje', 'como mando mensaje', 'como respondo um lead', 'como falo com lead', 'message a lead', 'message lead'],
        keywords: ['conversation', 'conversa', 'conversación', 'inbox', 'mensagem', 'mensaje', 'sms', 'whatsapp', 'chat'],
        answer: {
            en: "To send a message to a lead:<br><b>Step 1:</b> Go to <b>Conversations</b> in the left menu<br><b>Step 2:</b> Search for the contact<br><b>Step 3:</b> Select the channel at the bottom: <b>SMS</b>, <b>Email</b>, or <b>WhatsApp</b><br><b>Step 4:</b> Type your message (or use a template)<br><b>Step 5:</b> Hit <b>Send</b><br><br>All channels — SMS, Email, WhatsApp, Facebook, Instagram DM — are unified in one inbox.",
            es: "Para enviar un mensaje a un lead:<br><b>Paso 1:</b> Ve a <b>Conversations</b> en el menú<br><b>Paso 2:</b> Busca el contacto<br><b>Paso 3:</b> Selecciona el canal abajo: <b>SMS</b>, <b>Email</b>, o <b>WhatsApp</b><br><b>Paso 4:</b> Escribe tu mensaje (o usa una plantilla)<br><b>Paso 5:</b> Clic en <b>Send</b><br><br>Todos los canales están unificados en una bandeja.",
            pt: "Pra enviar uma mensagem pra um lead:<br><b>Passo 1:</b> Vá em <b>Conversations</b> no menu lateral<br><b>Passo 2:</b> Procure o contato<br><b>Passo 3:</b> Selecione o canal embaixo: <b>SMS</b>, <b>Email</b>, ou <b>WhatsApp</b><br><b>Passo 4:</b> Escreva sua mensagem (ou use um template)<br><b>Passo 5:</b> Clique em <b>Send</b><br><br>Todos os canais — SMS, Email, WhatsApp, Facebook, Instagram DM — ficam numa caixa de entrada só."
        }
    },
    {
        id: 'automations',
        phrases: ['create automation', 'create workflow', 'follow up', 'follow-up', 'criar automação', 'criar workflow', 'crear automatización', 'crear workflow', 'drip campaign', 'como crio automação', 'como crio workflow', 'como faço follow up', 'como creo automatización', 'como creo workflow', 'build automation', 'set up automation', 'configurar automação'],
        keywords: ['automation', 'automação', 'automatización', 'workflow', 'trigger', 'gatilho', 'sequence', 'sequência'],
        answer: {
            en: "Automations and workflows are set up by our team to make sure everything works correctly.<br><br>To request a new automation or changes to an existing one:<br><b>Send a message to our WhatsApp group</b> explaining:<br>• What you want to automate (e.g., follow-up for new leads, review requests, reminders)<br>• When it should trigger (e.g., after form submission, after appointment)<br>• What actions it should take (e.g., send SMS, send email)<br><br>Our team will build and activate it for you.",
            es: "Las automatizaciones y workflows los configura nuestro equipo para asegurar que todo funcione correctamente.<br><br>Para solicitar una nueva automatización o cambios:<br><b>Envía un mensaje a nuestro grupo de WhatsApp</b> explicando:<br>• Qué quieres automatizar (ej: follow-up de nuevos leads, solicitud de reseñas)<br>• Cuándo debe activarse (ej: después de un formulario, después de una cita)<br>• Qué acciones debe hacer (ej: enviar SMS, enviar email)<br><br>Nuestro equipo lo construye y activa por ti.",
            pt: "As automações e workflows são configurados pelo nosso time pra garantir que tudo funcione certinho.<br><br>Pra solicitar uma automação nova ou alterações:<br><b>Mande uma mensagem no grupo do WhatsApp</b> explicando:<br>• O que quer automatizar (ex: follow-up de novos leads, pedidos de review, lembretes)<br>• Quando deve disparar (ex: depois de formulário, depois de agendamento)<br>• Que ações deve fazer (ex: enviar SMS, enviar email)<br><br>Nosso time cria e ativa pra você."
        }
    },
    {
        id: 'calendars',
        phrases: ['booking calendar', 'set up calendar', 'create calendar', 'appointment reminder', 'configurar calendário', 'criar calendário', 'configurar calendario', 'crear calendario', 'agendar chamada', 'como configuro calendário', 'como crio calendário', 'como configuro agendamento', 'como configuro calendario', 'como creo calendario', 'set up booking', 'create booking page'],
        keywords: ['calendar', 'calendário', 'calendario', 'appointment', 'agendamento', 'booking', 'reminder', 'lembrete', 'disponibilidade', 'availability'],
        answer: {
            en: "To set up a booking calendar:<br><b>Step 1:</b> Go to <b>Calendars</b> in the left menu<br><b>Step 2:</b> Click <b>+ Create Calendar</b><br><b>Step 3:</b> Choose type (Simple, Round Robin, Service, Class)<br><b>Step 4:</b> Set available days, hours, duration, and buffer time<br><b>Step 5:</b> Customize the booking form<br><b>Step 6:</b> Save and share the booking link<br><br>For reminders: Edit calendar → Notifications → enable SMS/Email reminders (e.g., 24h and 1h before).",
            es: "Para configurar un calendario de reservas:<br><b>Paso 1:</b> Ve a <b>Calendars</b> en el menú<br><b>Paso 2:</b> Clic en <b>+ Create Calendar</b><br><b>Paso 3:</b> Elige tipo (Simple, Round Robin, Service)<br><b>Paso 4:</b> Configura días, horas, duración y buffer<br><b>Paso 5:</b> Personaliza el formulario<br><b>Paso 6:</b> Guarda y comparte el link<br><br>Recordatorios: Editar calendario → Notifications → activa SMS/Email.",
            pt: "Pra configurar um calendário de agendamento:<br><b>Passo 1:</b> Vá em <b>Calendars</b> no menu lateral<br><b>Passo 2:</b> Clique em <b>+ Create Calendar</b><br><b>Passo 3:</b> Escolha o tipo (Simple, Round Robin, Service, Class)<br><b>Passo 4:</b> Configure dias, horários, duração e intervalo entre agendamentos<br><b>Passo 5:</b> Personalize o formulário de reserva<br><b>Passo 6:</b> Salve e compartilhe o link<br><br>Pra lembretes: Edite o calendário → Notifications → ative lembretes por SMS/Email (ex: 24h e 1h antes)."
        }
    },
    {
        id: 'website-funnel',
        phrases: ['edit website', 'edit funnel', 'edit page', 'build funnel', 'connect domain', 'editar site', 'editar funil', 'editar página', 'editar sitio', 'editar embudo', 'conectar domínio', 'conectar dominio', 'como edito site', 'como edito meu site', 'como edito funil', 'como edito página', 'como edito sitio', 'como edito embudo', 'como edito mi sitio', 'como edito mi web', 'mi sitio web', 'meu site', 'change website', 'update website', 'alterar site', 'mudar site', 'editar mi sitio', 'editar meu site'],
        keywords: ['website', 'site', 'sitio', 'funnel', 'funil', 'embudo', 'landing page', 'builder', 'domain', 'domínio', 'dns'],
        answer: {
            en: "Website and funnel edits are handled by our team. To request changes:<br><br><b>Send a message to our WhatsApp group</b> with:<br>• What page you want to change<br>• What you want to update (text, images, layout, etc.)<br>• Screenshots if possible<br><br>Our team will make the changes and let you know when it's live. This ensures quality and avoids accidental issues on your site.",
            es: "Las ediciones del sitio web y embudos las maneja nuestro equipo. Para solicitar cambios:<br><br><b>Envía un mensaje a nuestro grupo de WhatsApp</b> con:<br>• Qué página quieres cambiar<br>• Qué quieres actualizar (texto, imágenes, diseño, etc.)<br>• Capturas de pantalla si es posible<br><br>Nuestro equipo hará los cambios y te avisará cuando esté listo.",
            pt: "As edições de site e funil são feitas pelo nosso time. Pra solicitar alterações:<br><br><b>Mande uma mensagem no grupo do WhatsApp</b> com:<br>• Qual página quer mudar<br>• O que quer atualizar (texto, imagens, layout, etc.)<br>• Prints de tela se possível<br><br>Nosso time faz as alterações e avisa quando estiver no ar. Assim garantimos qualidade e evitamos problemas no seu site."
        }
    },
    {
        id: 'reports',
        phrases: ['read report', 'check report', 'view dashboard', 'see report', 'attribution report', 'ver relatório', 'ler relatório', 'checar relatório', 'ver reporte', 'leer reporte', 'check ranking', 'ver ranking', 'como leio relatório', 'como leio meus relatórios', 'como vejo relatório', 'como vejo meus relatórios', 'como vejo meu ranking', 'como vejo meu reporte', 'como leo mis reportes', 'como veo mis reportes', 'como veo mi ranking', 'meus relatórios', 'mis reportes', 'my report', 'my dashboard', 'meu dashboard', 'meu painel'],
        keywords: ['report', 'relatório', 'informe', 'reporte', 'dashboard', 'painel', 'analytics', 'attribution', 'ranking', 'performance', 'desempenho'],
        answer: {
            en: "To read your reports:<br><b>Step 1:</b> Go to <b>Reporting</b> in the left menu<br><b>Step 2:</b> Choose a report type:<br>• <b>Attribution Report</b> — where your leads come from (Google, Facebook, organic, referral)<br>• <b>Google Ads</b> / <b>Facebook Ads</b> — ad performance, spend, conversions<br>• <b>Appointment Report</b> — bookings, no-shows, completed<br>• <b>Call Report</b> — calls received, missed, duration<br><b>Step 3:</b> Filter by date range to see trends<br><br>Start with Attribution to understand which channels bring the most leads.",
            es: "Para leer tus reportes:<br><b>Paso 1:</b> Ve a <b>Reporting</b> en el menú<br><b>Paso 2:</b> Elige un tipo:<br>• <b>Attribution Report</b> — de dónde vienen tus leads<br>• <b>Google Ads / Facebook Ads</b> — rendimiento de anuncios<br>• <b>Appointment Report</b> — reservas, no-shows<br>• <b>Call Report</b> — llamadas recibidas, perdidas<br><b>Paso 3:</b> Filtra por rango de fechas<br><br>Empieza con Attribution para entender qué canales traen más leads.",
            pt: "Pra ler seus relatórios:<br><b>Passo 1:</b> Vá em <b>Reporting</b> no menu lateral<br><b>Passo 2:</b> Escolha o tipo de relatório:<br>• <b>Attribution Report</b> — de onde vêm seus leads (Google, Facebook, orgânico, referência)<br>• <b>Google Ads / Facebook Ads</b> — desempenho dos anúncios, gastos, conversões<br>• <b>Appointment Report</b> — agendamentos, faltas, concluídos<br>• <b>Call Report</b> — chamadas recebidas, perdidas, duração<br><b>Passo 3:</b> Filtre por período pra ver tendências<br><br>Comece pelo Attribution pra entender quais canais trazem mais leads."
        }
    },
    {
        id: 'gbp',
        phrases: ['google business', 'business profile', 'google post', 'google photo', 'add photo gbp', 'foto google', 'post google', 'google meu negócio', 'perfil google', 'perfil de negocio', 'como atualizo google', 'como posto no google', 'como adiciono foto google', 'como actualizo google', 'como publico en google', 'foto no google', 'postar no google', 'meu perfil google', 'mi perfil google', 'update google profile', 'google listing', 'adicionar foto', 'agregar foto', 'add photo'],
        keywords: ['gbp', 'gmb', 'google business', 'business profile', 'foto', 'photo'],
        answer: {
            en: "For your Google Business Profile:<br><br>• <b>Add photos or posts:</b> Send the photos/text to our <b>WhatsApp group</b> and our team will post them for you<br>• <b>Respond to reviews:</b> Go to <b>Reputation</b> in Bee Pro Hub → click a review → type your reply → click <b>Reply</b><br>• <b>Track performance:</b> Go to <b>Reporting</b> to see how your profile is performing<br>• <b>Edit info (hours, address, categories):</b> Contact our team on WhatsApp<br><br>For reviews, we recommend responding within 24 hours — it improves your local SEO!",
            es: "Para tu Google Business Profile:<br><br>• <b>Agregar fotos o publicar:</b> Envía las fotos/texto a nuestro <b>grupo de WhatsApp</b> y nuestro equipo los publica por ti<br>• <b>Responder reseñas:</b> Ve a <b>Reputation</b> en Bee Pro Hub → clic en reseña → escribe → <b>Reply</b><br>• <b>Ver rendimiento:</b> Ve a <b>Reporting</b><br>• <b>Editar info (horarios, dirección):</b> Contacta nuestro equipo por WhatsApp<br><br>Recomendamos responder reseñas dentro de 24 horas — ¡mejora tu SEO local!",
            pt: "Pro seu Google Business Profile:<br><br>• <b>Adicionar fotos ou posts:</b> Mande as fotos/texto no <b>grupo do WhatsApp</b> que nosso time publica pra você<br>• <b>Responder avaliações:</b> Vá em <b>Reputation</b> no Bee Pro Hub → clique na avaliação → escreva sua resposta → clique em <b>Reply</b><br>• <b>Ver desempenho:</b> Vá em <b>Reporting</b><br>• <b>Editar info (horário, endereço, categorias):</b> Fale com nosso time no WhatsApp<br><br>Recomendamos responder avaliações em até 24 horas — melhora seu SEO local!"
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
            en: "To add a team member:<br><b>Step 1:</b> Go to <b>Settings</b> (gear icon, bottom left)<br><b>Step 2:</b> Click <b>My Staff</b> (or <b>Team</b>)<br><b>Step 3:</b> Click <b>+ Add Employee</b><br><b>Step 4:</b> Enter their name, email, and phone<br><b>Step 5:</b> Set their <b>Role</b> (Admin or User) and permissions<br><b>Step 6:</b> Click <b>Save</b> — they'll receive an invite email<br><br>To manage permissions: Edit the user → toggle which sections they can access (Contacts, Conversations, Calendars, etc.).",
            es: "Para agregar un miembro al equipo:<br><b>Paso 1:</b> Ve a <b>Settings</b> (ícono de engranaje, abajo a la izquierda)<br><b>Paso 2:</b> Clic en <b>My Staff</b> (o <b>Team</b>)<br><b>Paso 3:</b> Clic en <b>+ Add Employee</b><br><b>Paso 4:</b> Ingresa nombre, email y teléfono<br><b>Paso 5:</b> Define el <b>Rol</b> (Admin o User) y permisos<br><b>Paso 6:</b> Clic en <b>Save</b> — recibirán un email de invitación<br><br>Para gestionar permisos: Edita el usuario → activa/desactiva secciones.",
            pt: "Pra adicionar alguém na equipe:<br><b>Passo 1:</b> Vá em <b>Settings</b> (ícone de engrenagem, canto inferior esquerdo)<br><b>Passo 2:</b> Clique em <b>My Staff</b> (ou <b>Team</b>)<br><b>Passo 3:</b> Clique em <b>+ Add Employee</b><br><b>Passo 4:</b> Preencha nome, email e telefone da pessoa<br><b>Passo 5:</b> Defina o <b>Role</b> (Admin ou User) e as permissões<br><b>Passo 6:</b> Clique em <b>Save</b> — a pessoa recebe um email de convite<br><br>Pra gerenciar permissões: Edite o usuário → ative/desative quais seções ele pode acessar (Contacts, Conversations, Calendars, etc.)."
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
    var topicCards = document.querySelectorAll('.topic-card[data-topic-key]');

    var conversationHistory = [];
    var isSending = false;

    function getLang() {
        return localStorage.getItem('galaxy-lang') || 'en';
    }

    function getScheduleLink() {
        var lang = getLang();
        var labels = {
            en: "Schedule a call with our team",
            es: "Agenda una llamada con nuestro equipo",
            pt: "Agende uma chamada com nosso time"
        };
        return "<a href='#schedule-call' class='chat-cta-link'><i class='fas fa-calendar-check'></i> " + (labels[lang] || labels.en) + "</a>";
    }

    function getFallbackMessage() {
        var lang = getLang();
        var topicNames = {
            en: ['Contacts & CRM', 'Conversations (SMS/Email/WhatsApp)', 'Calendars & Booking', 'Reports & Dashboards', 'Google Business Profile', 'Reputation & Reviews', 'Payments & Invoicing', 'Templates', 'Team & Users', 'Settings', 'Tags', 'Pipeline', 'Password & Login', 'Plan & Billing', 'Website edits (via WhatsApp)', 'Automations (via WhatsApp)'],
            es: ['Contactos y CRM', 'Conversaciones (SMS/Email/WhatsApp)', 'Calendarios y Reservas', 'Reportes y Dashboards', 'Google Business Profile', 'Reputación y Reseñas', 'Pagos y Facturación', 'Plantillas', 'Equipo y Usuarios', 'Configuraciones', 'Tags', 'Pipeline', 'Contraseña y Acceso', 'Plan y Facturación', 'Ediciones web (vía WhatsApp)', 'Automatizaciones (vía WhatsApp)'],
            pt: ['Contatos e CRM', 'Conversas (SMS/Email/WhatsApp)', 'Calendários e Agendamento', 'Relatórios e Dashboards', 'Google Business Profile', 'Reputação e Avaliações', 'Pagamentos e Faturamento', 'Templates', 'Equipe e Usuários', 'Configurações', 'Tags', 'Pipeline', 'Senha e Acesso', 'Plano e Cobrança', 'Edições de site (via WhatsApp)', 'Automações (via WhatsApp)']
        };
        var topics = topicNames[lang] || topicNames.en;
        var topicList = topics.map(function(t) { return '• ' + t; }).join('<br>');
        var msgs = {
            en: "I didn't find an exact match, but I can help with these topics:<br><br>" + topicList + "<br><br>Try asking about one of these, or " + getScheduleLink() + " for personalized help.",
            es: "No encontré una respuesta exacta, pero puedo ayudarte con estos temas:<br><br>" + topicList + "<br><br>Intenta preguntar sobre uno de estos, o " + getScheduleLink() + " para ayuda personalizada.",
            pt: "Não encontrei uma resposta exata, mas posso ajudar com esses temas:<br><br>" + topicList + "<br><br>Tente perguntar sobre um desses, ou " + getScheduleLink() + " pra ajuda personalizada."
        };
        return msgs[lang] || msgs.en;
    }

    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessage(text, sender, isHtml) {
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble-' + sender;

        if (isHtml) {
            bubble.innerHTML = text;
        } else {
            bubble.textContent = text;
        }

        chatMessages.appendChild(bubble);
        scrollChatToBottom();

        conversationHistory.push({
            role: sender === 'user' ? 'user' : 'assistant',
            content: text
        });
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
        var typing = document.getElementById('chatTyping');
        if (typing) typing.remove();
    }

    /* ---- Local Knowledge Base Matching ---- */
    function searchKnowledgeBase(query) {
        var lang = getLang();
        var q = query.toLowerCase();
        var bestMatch = null;
        var bestScore = 0;

        for (var i = 0; i < KNOWLEDGE_BASE.length; i++) {
            var entry = KNOWLEDGE_BASE[i];
            var score = 0;

            // Phrases get high score (10 points each) — they're specific
            for (var p = 0; p < entry.phrases.length; p++) {
                if (q.indexOf(entry.phrases[p].toLowerCase()) !== -1) {
                    score += 10;
                }
            }

            // Single keywords get low score (1 point each) — only used as tiebreaker
            for (var k = 0; k < entry.keywords.length; k++) {
                if (q.indexOf(entry.keywords[k].toLowerCase()) !== -1) {
                    score += 1;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        // Any match counts — phrases (10pts) win over keywords (1pt)
        if (bestMatch && bestScore >= 1) {
            return bestMatch.answer[lang] || bestMatch.answer.en;
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

        // Small delay for natural feel
        await new Promise(function (r) { setTimeout(r, 600); });

        // 1) Try webhook first
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
            // Webhook failed — fall through to local KB
        }

        // 2) Fall back to local knowledge base
        if (!replied) {
            hideTyping();
            var localAnswer = searchKnowledgeBase(text);
            if (localAnswer) {
                addMessage(localAnswer, 'bot', true);
            } else {
                addMessage(getFallbackMessage(), 'bot', true);
            }
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
