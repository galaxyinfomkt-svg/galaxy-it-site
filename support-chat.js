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

/* ---- Built-in Knowledge Base (works without webhook) ---- */
/* Each entry has phrases (multi-word, scored higher) and single keywords (scored lower) */
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
            en: "To create an automation:<br><b>Step 1:</b> Go to <b>Automation</b> → <b>Workflows</b><br><b>Step 2:</b> Click <b>+ Create Workflow</b><br><b>Step 3:</b> Add a <b>Trigger</b> (e.g., Form Submitted, Tag Added, Contact Created)<br><b>Step 4:</b> Add <b>Actions</b> (Send Email, Send SMS, Add Tag, Wait, If/Else)<br><b>Step 5:</b> Toggle to <b>Publish</b> when ready<br><br>Example follow-up: Trigger \"Tag Added\" → Send Email → Wait 2 days → Send SMS → Wait 1 day → Send Email.",
            es: "Para crear una automatización:<br><b>Paso 1:</b> Ve a <b>Automation</b> → <b>Workflows</b><br><b>Paso 2:</b> Clic en <b>+ Create Workflow</b><br><b>Paso 3:</b> Agrega un <b>Trigger</b> (ej: Form Submitted, Tag Added)<br><b>Paso 4:</b> Agrega <b>Actions</b> (Send Email, Send SMS, Add Tag, Wait, If/Else)<br><b>Paso 5:</b> Actívalo con <b>Publish</b><br><br>Ejemplo: Trigger \"Tag Added\" → Send Email → Wait 2 días → Send SMS.",
            pt: "Pra criar uma automação:<br><b>Passo 1:</b> Vá em <b>Automation</b> → <b>Workflows</b><br><b>Passo 2:</b> Clique em <b>+ Create Workflow</b><br><b>Passo 3:</b> Adicione um <b>Trigger</b> (ex: Form Submitted, Tag Added, Contact Created)<br><b>Passo 4:</b> Adicione <b>Actions</b> (Send Email, Send SMS, Add Tag, Wait, If/Else)<br><b>Passo 5:</b> Ative com <b>Publish</b><br><br>Exemplo de follow-up: Trigger \"Tag Added\" → Send Email → Wait 2 dias → Send SMS → Wait 1 dia → Send Email."
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
        var messages = {
            en: "I couldn't find a specific answer for that. Try rephrasing, or " + getScheduleLink() + " for personalized help.",
            es: "No encontré una respuesta específica. Intenta reformular, o " + getScheduleLink() + " para ayuda personalizada.",
            pt: "Não encontrei uma resposta específica pra isso. Tente reformular, ou " + getScheduleLink() + " pra ajuda personalizada."
        };
        return messages[lang] || messages.en;
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
