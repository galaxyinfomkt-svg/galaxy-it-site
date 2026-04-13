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
const KNOWLEDGE_BASE = {

    // ===== CONTACTS & CRM =====
    contacts: {
        keywords: ['contact', 'contato', 'contacto', 'lead', 'crm', 'add contact', 'import', 'importar', 'smart list', 'lista', 'tag', 'custom field', 'campo', 'pipeline', 'opportunity', 'oportunidade', 'oportunidad'],
        answers: {
            en: {
                'add contact': "To add a new contact: Go to <b>Contacts</b> in the left menu → click <b>+ Add Contact</b> (top right) → fill in Name, Email, Phone → click <b>Save</b>. You can also add tags and assign to a pipeline right away.",
                'import': "To import contacts: Go to <b>Contacts</b> → click <b>Import</b> (top right) → upload your CSV file → map the columns to the correct fields → click <b>Import</b>. Make sure your CSV has headers like Name, Email, Phone.",
                'smart list': "Smart Lists filter your contacts automatically. Go to <b>Contacts</b> → <b>Smart Lists</b> tab → click <b>+ Create Smart List</b> → set your filter conditions (tags, dates, pipeline stage, etc.) → Save. The list updates automatically as contacts match your criteria.",
                'tag': "To add tags: Open a contact → click <b>Tags</b> section → type and add your tag. To bulk-tag: select multiple contacts from the list → click <b>Actions</b> → <b>Add Tag</b>. Tags are essential for automations and segmentation.",
                'custom field': "To create custom fields: Go to <b>Settings</b> → <b>Custom Fields</b> → click <b>+ Add Field</b> → choose the type (text, dropdown, date, etc.) → name it → Save. Custom fields appear in contact profiles and can be used in automations.",
                'pipeline': "To set up a pipeline: Go to <b>Opportunities</b> → <b>Pipelines</b> → click <b>+ Create Pipeline</b> → add your stages (e.g., New Lead, Contacted, Proposal, Won, Lost) → Save. Drag contacts between stages to track progress.",
                'default': "Your Bee Pro Hub CRM is your command center. Go to <b>Contacts</b> to see all your leads. You can filter by tags, create Smart Lists, manage pipelines, and track every interaction. Need help with something specific?"
            },
            es: {
                'default': "Tu CRM Bee Pro Hub es tu centro de comando. Ve a <b>Contacts</b> para ver todos tus leads. Puedes filtrar por tags, crear Smart Lists, gestionar pipelines y rastrear cada interacción. ¿Necesitas ayuda con algo específico?"
            },
            pt: {
                'default': "Seu CRM Bee Pro Hub é seu centro de comando. Vá em <b>Contacts</b> pra ver todos os seus leads. Você pode filtrar por tags, criar Smart Lists, gerenciar pipelines e rastrear cada interação. Precisa de ajuda com algo específico?"
            }
        }
    },

    // ===== CONVERSATIONS / INBOX =====
    conversations: {
        keywords: ['conversation', 'conversa', 'conversación', 'inbox', 'message', 'mensagem', 'mensaje', 'sms', 'email', 'whatsapp', 'facebook', 'instagram', 'dm', 'chat', 'template', 'snippet', 'respond', 'responder', 'reply'],
        answers: {
            en: {
                'sms': "To send an SMS: Go to <b>Conversations</b> → select or search for a contact → choose the <b>SMS</b> channel at the bottom → type your message → hit Send. Make sure the contact has a valid phone number.",
                'email': "To send an email from conversations: Go to <b>Conversations</b> → select a contact → switch to <b>Email</b> channel → compose your message (you can use templates) → Send. For bulk emails, use the <b>Email Marketing</b> section instead.",
                'whatsapp': "WhatsApp messages appear in your <b>Conversations</b> inbox automatically. To reply, select the conversation → make sure <b>WhatsApp</b> is selected as the channel → type and send. Note: WhatsApp has a 24-hour reply window for non-template messages.",
                'template': "To create message templates: Go to <b>Marketing</b> → <b>Templates</b> → click <b>+ New Template</b> → choose SMS or Email → write your template with merge fields like {{contact.first_name}} → Save. Templates save time on repetitive messages.",
                'default': "Your <b>Conversations</b> inbox unifies all channels — SMS, Email, WhatsApp, Facebook, Instagram DM, and Google Chat — in one place. Click any conversation to see the full history and reply from any channel."
            },
            es: {
                'default': "Tu bandeja de <b>Conversations</b> unifica todos los canales — SMS, Email, WhatsApp, Facebook, Instagram DM y Google Chat — en un solo lugar. Haz clic en cualquier conversación para ver el historial completo y responder desde cualquier canal."
            },
            pt: {
                'default': "Sua caixa de <b>Conversations</b> unifica todos os canais — SMS, Email, WhatsApp, Facebook, Instagram DM e Google Chat — em um só lugar. Clique em qualquer conversa pra ver o histórico completo e responder de qualquer canal."
            }
        }
    },

    // ===== CALENDARS & APPOINTMENTS =====
    calendars: {
        keywords: ['calendar', 'calendário', 'calendario', 'appointment', 'agendamento', 'cita', 'booking', 'agendar', 'schedule', 'reminder', 'lembrete', 'recordatorio', 'availability', 'disponibilidade'],
        answers: {
            en: {
                'create': "To create a booking calendar: Go to <b>Calendars</b> → click <b>+ Create Calendar</b> → choose type (Round Robin, Collective, Service, etc.) → set your availability, duration, and buffer time → customize the booking form → Save and share the link.",
                'reminder': "To set up appointment reminders: Go to <b>Calendars</b> → edit your calendar → scroll to <b>Notifications</b> → enable reminders → set timing (e.g., 24h before, 1h before) → choose SMS, Email, or both. This reduces no-shows significantly.",
                'default': "Your <b>Calendars</b> section lets you create booking pages for clients. Go to <b>Calendars</b> in the left menu to see all your calendars, upcoming appointments, and manage availability. You can share booking links directly with clients."
            },
            es: {
                'default': "Tu sección de <b>Calendars</b> te permite crear páginas de reserva para clientes. Ve a <b>Calendars</b> en el menú izquierdo para ver todos tus calendarios, citas próximas y gestionar disponibilidad."
            },
            pt: {
                'default': "Sua seção de <b>Calendars</b> permite criar páginas de agendamento para clientes. Vá em <b>Calendars</b> no menu lateral pra ver todos os seus calendários, compromissos futuros e gerenciar disponibilidade."
            }
        }
    },

    // ===== AUTOMATIONS & WORKFLOWS =====
    automations: {
        keywords: ['automation', 'automação', 'automatización', 'workflow', 'fluxo', 'flujo', 'trigger', 'gatilho', 'disparador', 'action', 'ação', 'acción', 'follow-up', 'followup', 'sequence', 'sequência', 'secuencia', 'if else', 'wait', 'esperar'],
        answers: {
            en: {
                'create': "To create a workflow: Go to <b>Automation</b> → <b>Workflows</b> → click <b>+ Create Workflow</b> → start from scratch or use a recipe → add a <b>Trigger</b> (e.g., Form Submitted, Tag Added) → add <b>Actions</b> (Send SMS, Send Email, Add Tag, etc.) → toggle to <b>Publish</b> when ready.",
                'trigger': "Available triggers include: Form Submitted, Pipeline Stage Changed, Tag Added/Removed, Appointment Booked, Contact Created, Birthday, Custom Date, Invoice Paid, and more. Pick the trigger that matches when you want the automation to start.",
                'follow-up': "To create a follow-up sequence: Create a workflow → Trigger: <b>Tag Added</b> (e.g., 'new-lead') → Action 1: Send Email → Add <b>Wait</b> (e.g., 2 days) → Action 2: Send SMS → Add <b>Wait</b> (1 day) → Action 3: Send Email. This drips messages over time automatically.",
                'default': "Automations run your business on autopilot. Go to <b>Automation</b> → <b>Workflows</b> to see all your active workflows. Each workflow has a trigger (what starts it) and actions (what happens). You can add conditions (if/else) to create smart branching logic."
            },
            es: {
                'default': "Las automatizaciones operan tu negocio en piloto automático. Ve a <b>Automation</b> → <b>Workflows</b> para ver todos tus flujos activos. Cada workflow tiene un trigger (qué lo inicia) y acciones (qué pasa). Puedes agregar condiciones (if/else) para crear lógica inteligente."
            },
            pt: {
                'default': "As automações rodam seu negócio no automático. Vá em <b>Automation</b> → <b>Workflows</b> pra ver todos os seus fluxos ativos. Cada workflow tem um trigger (o que inicia) e ações (o que acontece). Você pode adicionar condições (if/else) pra criar lógica inteligente."
            }
        }
    },

    // ===== FUNNELS & WEBSITES =====
    funnels: {
        keywords: ['funnel', 'funil', 'embudo', 'website', 'site', 'sitio', 'landing page', 'página', 'pagina', 'page', 'builder', 'construtor', 'editor', 'domain', 'domínio', 'dominio', 'dns'],
        answers: {
            en: {
                'edit': "To edit your website/funnel: Go to <b>Sites</b> → <b>Funnels</b> or <b>Websites</b> → click on your project → click a page to open the builder → drag and drop elements, edit text, change images → click <b>Save</b> (top right). Always preview before publishing.",
                'domain': "To connect a custom domain: Go to <b>Settings</b> → <b>Domains</b> → click <b>+ Add Domain</b> → enter your domain → follow the DNS instructions (add the CNAME record to your domain provider) → wait for verification (can take up to 48h).",
                'default': "Your website and funnels live in <b>Sites</b> in the left menu. The drag-and-drop builder lets you edit pages visually — no coding needed. You can create landing pages, multi-step funnels, full websites, and blog posts."
            },
            es: {
                'default': "Tu sitio web y embudos están en <b>Sites</b> en el menú izquierdo. El constructor drag-and-drop te permite editar páginas visualmente — sin código. Puedes crear landing pages, embudos multi-paso, sitios web completos y posts de blog."
            },
            pt: {
                'default': "Seu site e funis ficam em <b>Sites</b> no menu lateral. O construtor drag-and-drop permite editar páginas visualmente — sem código. Você pode criar landing pages, funis multi-etapas, sites completos e posts de blog."
            }
        }
    },

    // ===== REPUTATION & REVIEWS =====
    reputation: {
        keywords: ['review', 'avaliação', 'reseña', 'reputation', 'reputação', 'reputación', 'google review', 'star', 'estrela', 'estrella', 'rating', 'request review', 'solicitar', 'feedback'],
        answers: {
            en: {
                'request': "To send review requests: Go to <b>Reputation</b> → <b>Requests</b> → click <b>Send Request</b> → select contacts → customize the message → Send. You can also automate this: create a workflow triggered by \"Invoice Paid\" or \"Appointment Completed\" → Action: Send Review Request.",
                'default': "Manage your online reputation in <b>Reputation</b> section. You can monitor Google reviews, send review requests via SMS/Email, and set up auto-responses. Tip: automate review requests after completed appointments for consistent 5-star ratings."
            },
            es: {
                'default': "Gestiona tu reputación online en la sección <b>Reputation</b>. Puedes monitorear reseñas de Google, enviar solicitudes de reseña por SMS/Email y configurar respuestas automáticas."
            },
            pt: {
                'default': "Gerencie sua reputação online na seção <b>Reputation</b>. Você pode monitorar avaliações do Google, enviar pedidos de avaliação por SMS/Email e configurar respostas automáticas."
            }
        }
    },

    // ===== REPORTING & DASHBOARDS =====
    reporting: {
        keywords: ['report', 'relatório', 'informe', 'dashboard', 'painel', 'panel', 'analytics', 'analítica', 'metric', 'métrica', 'performance', 'desempenho', 'rendimiento', 'roi', 'attribution', 'atribuição', 'atribución'],
        answers: {
            en: {
                'default': "Your dashboards are in <b>Reporting</b> in the left menu. You'll find: <b>Attribution Report</b> (where your leads come from), <b>Google & Facebook Ads</b> performance, <b>Appointment Report</b>, and <b>Call Report</b>. Each report can be filtered by date range. Look at Attribution to understand which channels bring the most leads."
            },
            es: {
                'default': "Tus dashboards están en <b>Reporting</b> en el menú izquierdo. Encontrarás: <b>Attribution Report</b> (de dónde vienen tus leads), rendimiento de <b>Google & Facebook Ads</b>, <b>Appointment Report</b> y <b>Call Report</b>."
            },
            pt: {
                'default': "Seus dashboards ficam em <b>Reporting</b> no menu lateral. Você vai encontrar: <b>Attribution Report</b> (de onde vêm seus leads), desempenho de <b>Google & Facebook Ads</b>, <b>Appointment Report</b> e <b>Call Report</b>."
            }
        }
    },

    // ===== GOOGLE BUSINESS PROFILE =====
    gbp: {
        keywords: ['google business', 'gbp', 'google meu negócio', 'google my business', 'gmb', 'perfil google', 'perfil de negocio', 'google post', 'google photo', 'business profile'],
        answers: {
            en: {
                'post': "To create a Google Business post: You can do this directly from Bee Pro Hub. Go to <b>Marketing</b> → <b>Social Planner</b> → click <b>+ New Post</b> → select your GBP account → write your post with image → Schedule or Post Now.",
                'default': "You can manage your Google Business Profile from Bee Pro Hub. Use <b>Social Planner</b> to schedule GBP posts, <b>Reputation</b> to monitor and respond to reviews, and <b>Reporting</b> to track performance. For profile edits (address, hours, categories), go directly to business.google.com."
            },
            es: {
                'default': "Puedes gestionar tu Google Business Profile desde Bee Pro Hub. Usa <b>Social Planner</b> para programar posts, <b>Reputation</b> para monitorear y responder reseñas, y <b>Reporting</b> para rastrear rendimiento."
            },
            pt: {
                'default': "Você pode gerenciar seu Google Business Profile pelo Bee Pro Hub. Use o <b>Social Planner</b> pra agendar posts, <b>Reputation</b> pra monitorar e responder avaliações, e <b>Reporting</b> pra acompanhar desempenho."
            }
        }
    },

    // ===== PAYMENTS & INVOICING =====
    payments: {
        keywords: ['payment', 'pagamento', 'pago', 'invoice', 'fatura', 'factura', 'stripe', 'subscription', 'assinatura', 'suscripción', 'product', 'produto', 'producto', 'price', 'preço', 'precio'],
        answers: {
            en: {
                'default': "Payments are managed in <b>Payments</b> section. You can: create <b>Products</b> and price lists, send <b>Invoices</b> to clients, generate <b>Payment Links</b>, and set up <b>Subscriptions</b> for recurring billing. Everything connects to your Stripe account under <b>Settings</b> → <b>Payments</b> → <b>Stripe</b>."
            },
            es: {
                'default': "Los pagos se gestionan en la sección <b>Payments</b>. Puedes: crear <b>Products</b> y listas de precios, enviar <b>Invoices</b>, generar <b>Payment Links</b> y configurar <b>Subscriptions</b> para cobros recurrentes."
            },
            pt: {
                'default': "Pagamentos são gerenciados na seção <b>Payments</b>. Você pode: criar <b>Products</b> e listas de preço, enviar <b>Invoices</b>, gerar <b>Payment Links</b> e configurar <b>Subscriptions</b> pra cobranças recorrentes."
            }
        }
    },

    // ===== SOCIAL PLANNER =====
    social: {
        keywords: ['social', 'post', 'publicação', 'publicación', 'schedule post', 'agendar post', 'programar', 'facebook post', 'instagram post', 'social planner'],
        answers: {
            en: {
                'default': "Schedule and manage social posts in <b>Marketing</b> → <b>Social Planner</b>. Connect your accounts (Facebook, Instagram, Google Business, LinkedIn, TikTok) → click <b>+ New Post</b> → write your caption, add media → select accounts → choose date/time or post now. The calendar view shows all scheduled posts."
            },
            es: {
                'default': "Programa y gestiona posts sociales en <b>Marketing</b> → <b>Social Planner</b>. Conecta tus cuentas → clic en <b>+ New Post</b> → escribe tu caption, agrega media → selecciona cuentas → elige fecha/hora o publica ahora."
            },
            pt: {
                'default': "Agende e gerencie posts sociais em <b>Marketing</b> → <b>Social Planner</b>. Conecte suas contas → clique em <b>+ New Post</b> → escreva sua legenda, adicione mídia → selecione contas → escolha data/hora ou poste agora."
            }
        }
    },

    // ===== FORMS & SURVEYS =====
    forms: {
        keywords: ['form', 'formulário', 'formulario', 'survey', 'pesquisa', 'encuesta', 'submission', 'envio', 'envío', 'field', 'campo'],
        answers: {
            en: {
                'default': "Create and manage forms in <b>Sites</b> → <b>Forms</b>. Click <b>+ New Form</b> → drag and drop fields (name, email, phone, custom fields) → set up notifications → grab the embed code or share the link. All submissions go to <b>Contacts</b> automatically and can trigger workflows."
            },
            es: {
                'default': "Crea y gestiona formularios en <b>Sites</b> → <b>Forms</b>. Clic en <b>+ New Form</b> → arrastra y suelta campos → configura notificaciones → copia el código embed o comparte el link. Todos los envíos van a <b>Contacts</b> automáticamente."
            },
            pt: {
                'default': "Crie e gerencie formulários em <b>Sites</b> → <b>Forms</b>. Clique em <b>+ New Form</b> → arraste e solte campos → configure notificações → copie o código embed ou compartilhe o link. Todos os envios vão pra <b>Contacts</b> automaticamente."
            }
        }
    },

    // ===== MEMBERSHIP / COURSES =====
    membership: {
        keywords: ['membership', 'course', 'curso', 'community', 'comunidade', 'comunidad', 'offer', 'oferta', 'drip', 'content', 'conteúdo', 'contenido', 'lesson', 'aula', 'lección'],
        answers: {
            en: {
                'default': "Create courses and memberships in <b>Memberships</b>. Click <b>+ New Product</b> → add categories and lessons → upload videos, text, or files → set up offers (free, one-time payment, or subscription) → share with your audience. You can drip content over time and track student progress."
            },
            es: {
                'default': "Crea cursos y membresías en <b>Memberships</b>. Clic en <b>+ New Product</b> → agrega categorías y lecciones → sube videos, texto o archivos → configura ofertas (gratis, pago único o suscripción) → comparte con tu audiencia."
            },
            pt: {
                'default': "Crie cursos e memberships em <b>Memberships</b>. Clique em <b>+ New Product</b> → adicione categorias e aulas → faça upload de vídeos, texto ou arquivos → configure ofertas (grátis, pagamento único ou assinatura) → compartilhe com seu público."
            }
        }
    }
};

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

    function getUiLang() {
        return localStorage.getItem('galaxy-lang') || 'en';
    }

    // Detect language of the user's message
    var _lastDetectedLang = null;
    function detectLang(text) {
        var t = (text || '').toLowerCase();
        // Portuguese indicators
        var pt = /\b(como|meu|minha|onde|qual|quero|preciso|posso|está|estou|fazer|ajuda|por que|porque|não|sim|obrigad|relatório|contato|avaliação|página|configurar|enviar|agendar|cadastr|adicionar)\b/;
        // Spanish indicators
        var es = /\b(cómo|dónde|cuál|quiero|necesito|puedo|estoy|hacer|ayuda|por qué|porque|informe|contacto|evaluación|página|configurar|enviar|agendar|agregar|reseña)\b/;
        // English indicators
        var en = /\b(how|what|where|which|want|need|can|do|does|help|why|report|contact|review|page|set up|send|schedule|add|create|my|the|is|are)\b/;

        var ptScore = (t.match(pt) || []).length;
        var esScore = (t.match(es) || []).length;
        var enScore = (t.match(en) || []).length;

        if (ptScore > esScore && ptScore > enScore) return 'pt';
        if (esScore > ptScore && esScore > enScore) return 'es';
        if (enScore > 0) return 'en';
        return getUiLang(); // fallback to UI language
    }

    function getLang(text) {
        if (text) {
            _lastDetectedLang = detectLang(text);
        }
        return _lastDetectedLang || getUiLang();
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

        for (var category in KNOWLEDGE_BASE) {
            var kb = KNOWLEDGE_BASE[category];
            var score = 0;

            // Check keyword matches
            for (var i = 0; i < kb.keywords.length; i++) {
                if (q.indexOf(kb.keywords[i].toLowerCase()) !== -1) {
                    score += kb.keywords[i].length; // longer keyword = better match
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = kb;
            }
        }

        if (bestMatch && bestScore >= 3) {
            var langAnswers = bestMatch.answers[lang] || bestMatch.answers.en;

            // Try to find a specific sub-answer
            for (var key in langAnswers) {
                if (key !== 'default' && q.indexOf(key) !== -1) {
                    return langAnswers[key];
                }
            }

            return langAnswers['default'] || bestMatch.answers.en['default'];
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

        // Detect language from user's message
        getLang(text);

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
                var lang = getUiLang();
                var topic = (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || key;
                scrollToChat();
                setTimeout(function () {
                    sendMessage(topic);
                }, 600);
            }
        });
    });
})();
