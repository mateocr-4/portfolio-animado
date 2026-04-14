export const data = {
    personal: {
        name: "MATEO CAÑIBANO",
        role: "Data-Driven Web Developer & Growth Analyst",
        tagline: "Building digital futures through code, strategy, and data insights.",
        aboutMe: "Gracias a la planificación y la estrategia he conseguido escalar negocios de diferentes sectores. Identifico oportunidades que potencien los embudos de captación y de desarrollo de negocio. Mi valor reside en unir la tecnología con la analítica para impulsar el crecimiento.",
        softSkills: [
            { name: "Trabajo en equipo", icon: "users" },
            { name: "Comunicación efectiva", icon: "message" },
            { name: "Liderazgo", icon: "crown" },
            { name: "Gestión del tiempo", icon: "clock" },
            { name: "Pensamiento crítico", icon: "brain" },
            { name: "Creatividad", icon: "lightbulb" },
            { name: "Empatía", icon: "heart" },
            { name: "Resolución de problemas", icon: "puzzle" },
        ],
    },

    skills: [
        { name: "Google Analytics 4 (GA4)", category: "Analítica de Datos", icon: "google" },
        { name: "Google Looker Studio", category: "Analítica de Datos", icon: "google" },
        { name: "Python / Pandas", category: "Analítica de Datos", icon: "python" },
        { name: "Google Tag Manager", category: "Medición y Tracking", icon: "google" },
        { name: "Google Ads / Meta Ads", category: "Publicidad Digital", icon: "google" },
        { name: "React / Next.js", category: "Desarrollo Web", icon: "react" },
        { name: "Tailwind CSS", category: "Desarrollo Web", icon: "tailwindcss" },
        { name: "SEO (Search Console, Ahrefs)", category: "Análisis Web", icon: "google" },
    ],

    experience: [
        {
            company: "Red.es",
            role: "CONSULTANT STRATEGIC DIGITALIZATION",
            period: "2024 - Actualidad",
            description: "Planificación y desarrollo de estrategias de digitalización para pymes. Implementación de soluciones tecnológicas que optimizan procesos y mejoran la competitividad en el mercado digital.",
        },
        {
            company: "Liffey Group",
            role: "WEB SPECIALIST",
            period: "2024 - Actualidad",
            description: "Desarrollo web completo (Arquitectura, Estrategia, Tecnología, Diseño). Responsable del Plan de Marketing Digital, optimizando embudos y midiendo rendimiento.",
        },
        {
            company: "Salvia 365",
            role: "DIGITAL MARKETING MANAGER",
            period: "2024 - Actualidad",
            description: "Gestión de campañas de pago y analítica de rendimiento web. Implementación de medición y optimización de posicionamiento orgánico, logrando mejoras consistentes en el embudo de negocio.",
        },
        {
            company: "Freelance",
            role: "DIGITAL MARKETING ANALYST",
            period: "2024 - Actualidad",
            description: "Consultoría y desarrollo de Planes de Marketing Personalizados. Análisis situacional, Auditoría y Organización operativa de web y negocio para diversos clientes.",
        },
        {
            company: "Walk Around",
            role: "MANAGER DE OPERACIONES COMERCIALES",
            period: "2024",
            description: "Gestión del equipo de Marketing, Comercial y Logístico. Planificación operativa empresarial y elaboración de estrategia de negocio, resultando en una mejor eficiencia de procesos.",
        },
    ],

    education: [
        {
            institution: "iLerna",
            degree: "Desarrollo de Aplicaciones Web Full Stack",
            period: "2025 - 2026",
            description: "Proyecto Final (en progreso): Desarrollo de una aplicación web completa con React, Node.js y Vite.",
        },
        {
            institution: "ESIC BUSINESS SCHOOL",
            degree: "Master especializado en Marketing Digital",
            period: "2023 - 2024",
            description: "Trabajo Fin de Máster: Digitalización de negocio (+3M€), Plan de Negocio y Plan de Marketing Digital.",
        },
        {
            institution: "UNIVERSIDAD PONTIFICIA DE SALAMANCA",
            degree: "Grado en Marketing y Comunicación",
            period: "2020 - 2023",
            description: "Trabajo Fin de Grado (TFG): Influencia de la IA y el Bigdata en el Marketing digital en el sector de los eSports.",
        },
        {
            institution: "CENTRO INTEGRADO DE FORMACIÓN PROFESIONAL",
            degree: "Técnico Administrativo y Financiero",
            period: "2019 - 2020",
            description: "Graduación con honores curriculares, promoción de 2020.",
        },
    ],

    projects: [
        // ------------------ DAW (Desarrollo de Aplicaciones Web) ------------------
        {
            id: "liffey-web",
            title: "Liffey Group — Web Completa",
            type: "Desarrollo Frontend & Next.js",
            description: "Arquitectura, diseño y desarrollo full-stack del sitio corporativo de Liffey Group enfocado en máxima conversión y performance. Implementación completa de componentes SSR/SSG.",
            tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
            image: "/projects/liffey.png",
            demoLink: "https://liffeygroup.es",
            githubLink: "https://github.com/mateocanibano/liffey-group",
            language: "TypeScript",
            languageColor: "#3178c6",
            stars: 124,
            lastUpdated: "Hace 2 días",
            repository: "mcd/liffey-group",
            terminalOutput: [
                { cmd: "npx next build", output: "Creating an optimized production build...\n✓ Compiled successfully" },
                { cmd: "npm run analyze", output: "Evaluating Core Web Vitals...\nLCP: 0.8s (Good)\nFID: 12ms (Good)\nCLS: 0.01 (Good)" }
            ],
            deepDive: [
                { title: "El Reto", content: "Liffey Group requería una plataforma web corporativa de gran velocidad que sirviera como ecosistema principal de captación. El mayor reto fue unificar una estética premium con carga instantánea." },
                { title: "Arquitectura & Stack", content: "Implementado usando Next.js 14 (App Router) para renderizado dinámico en servidor y generación de páginas estáticas. Estilos escalables con Tailwind v4 y transiciones avanzadas con Framer Motion." }
            ],
            leadMagnet: {
                title: "Guía de Optimización Next.js",
                ctaText: "Descargar Arquitectura",
                fileName: "Nextjs-Optimization-Guide.pdf"
            }
        },
        {
            id: "api-reservas-medicas",
            title: "Motor de Reservas Médico REST API",
            type: "Fullstack / Backend Developer",
            description: "Desarrollo de una API RESTful robusta y segura para el manejo de citas, disponibilidad de especialistas y gestión de pacientes en clínicas privadas, integrando pasarelas de pago y notificaciones.",
            tags: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs", "AWS"],
            image: null,
            demoLink: null,
            githubLink: "https://github.com/mateocanibano/med-book-api",
            language: "JavaScript",
            languageColor: "#f1e05a",
            stars: 89,
            lastUpdated: "Hace 2 semanas",
            repository: "mcd/med-book-api",
            terminalOutput: [
                { cmd: "npm run test:e2e", output: "Running end-to-end tests...\nAuth flow: PASS\nBooking transaction: PASS\nRate limiting: PASS" },
                { cmd: "docker ps", output: "CONTAINER ID  IMAGE         STATUS\na4z91kw2      mongo:latest  Up 2 days\n91px21la      node:18-alpine Up 2 days" }
            ],
            deepDive: [
                { title: "El Reto", content: "Construir una arquitectura backend capaz de evitar carreras críticas (colisión de citas en la misma franja horaria) con alto nivel de concurrencia y un estricto cumplimiento de privacidad de datos." },
                { title: "Arquitectura & Stack", content: "API construida sobre Node.js y Express conectada a un cluster de MongoDB Atlas. Se aplicó el patrón Repository, autenticación basada en JWT asimétrica y despliegue por contenedores Docker en AWS ECS." }
            ],
            leadMagnet: {
                title: "Boilerplate de API en Node",
                ctaText: "Descargar Código Fuente",
                fileName: "MCD-Node-API-Boilerplate.zip"
            }
        },
        {
            id: "ui-dashboard-system",
            title: "UI Design System para E-commerce",
            type: "UX/UI Designer & Frontend",
            description: "Creación de un sistema de diseño desde cero en Figma y su posterior traducción a un repositorio de componentes React accesible (WAI-ARIA). Enfoque en retención de usuarios y usabilidad.",
            tags: ["Figma", "React", "Accesibilidad Web", "UI Patterns", "Tailwind CSS"],
            image: null,
            demoLink: "https://ui-system.mateocanibano.es",
            githubLink: "https://github.com/mateocanibano/ui-dashboard-system",
            language: "CSS",
            languageColor: "#563d7c",
            stars: 210,
            lastUpdated: "Hace 1 mes",
            repository: "mcd/ui-dashboard",
            terminalOutput: [
                { cmd: "npm run lighthouse", output: "Running Lighthouse CI on port 3000..." },
                { cmd: "cat results.json", output: "{\n  \"Accessibility\": \"100%\",\n  \"Best Practices\": \"100%\",\n  \"Design Tokens\": 152\n}" }
            ],
            deepDive: [
                { title: "El Reto", content: "Las métricas mostraban fricción en la etapa analítica del usuario ('dashboards' internos). El reto era simplificar las vistas de reportes y crear una librería de diseño modular que el equipo pudiera reutilizar." },
                { title: "Metodología", content: "Auditoría heurística y diseño Atomic-Based en Figma. Desarrollado en React apoyado por Headless UI para la accesibilidad 100% garantizada en lectores de pantalla y navegación por teclado." }
            ],
            leadMagnet: {
                title: "Librería UI en Figma",
                ctaText: "Acceder al Archivo Figma",
                fileName: "MCD-UI-System-Figma.fig"
            }
        },

        // ------------------ Marketing Digital ------------------
        {
            id: "digitalizacion-pymes",
            title: "Plan de Digitalización — Red.es",
            type: "Consultoría & Analítica de Datos",
            description: "Análisis masivo de adopción digital para cientos de PYMEs apoyado en scripts de Python. Creación de paneles automatizados para seguimiento en tiempo real y detección de cuellos de botella.",
            tags: ["Python / Pandas", "Google Looker Studio", "GTM", "SQL", "Analítica"],
            image: "/projects/redes.png",
            demoLink: null,
            githubLink: "https://github.com/mateocanibano/digitalizacion-pymes",
            language: "Python",
            languageColor: "#3572A5",
            stars: 87,
            lastUpdated: "Hace 1 semana",
            repository: "mcd/redes-analyzer",
            terminalOutput: [
                { cmd: "python ingest_data.py --source api", output: "Connecting to remote data warehouses...\nFetching 1.2M records..." },
                { cmd: "python clean_models.py", output: "Success: Data models built and exported to BigQuery.\nInsights extracted: 34 KPIs.\nExecution time: 14.2s" }
            ],
            deepDive: [
                { title: "El Reto", content: "Procesar y estructurar datos altamente heterogéneos y dispersos de múltiples empresas para trazar rutas ejecutables y medir el progreso mensual en el marco de Kit Digital." },
                { title: "Metodología Analítica", content: "Se construyeron ETL pipelines en Python usando Pandas para limpieza de datos. La capa semántica y de visualización fue delegada a Google Looker Studio con ingesta vía Google BigQuery, reduciendo el trabajo manual un 90%." }
            ],
            leadMagnet: {
                title: "Dashboard Template Looker Studio",
                ctaText: "Descargar Dashboard",
                fileName: "MCD-Dashboard-Template.json"
            }
        },
        {
            id: "crecimiento-organico",
            title: "Auditoría SEO & Growth — Salvia 365",
            type: "Marketing Digital & Growth Hacker",
            description: "Estrategia integral de Growth Hacking y auditoría técnica SEO. Implementación de medición avanzada con GTM y experimentación A/B logrando un ROI de doble dígito histórico.",
            tags: ["SEO", "A/B Testing", "GA4", "GTM", "Semrush", "Screaming Frog"],
            image: "/projects/salvia.png",
            demoLink: null,
            githubLink: null,
            language: "JavaScript",
            languageColor: "#f1e05a",
            stars: 45,
            lastUpdated: "Hace 3 semanas",
            repository: "mcd/salvia-growth",
            terminalOutput: [
                { cmd: "./run_seo_audit.sh --domain salvia365", output: "Initializing crawler on 5,420 URLs..." },
                { cmd: "cat growth_report.json | jq '.metrics'", output: "{\n  \"Organic Traffic\": \"+340% YoY\",\n  \"CPL Reduction\": \"-25%\",\n  \"CR Lift (A/B Test)\": \"+18%\"\n}" }
            ],
            deepDive: [
                { title: "El Reto", content: "La empresa necesitaba escalar su adquisición de clientes pero arrastraba una arquitectura pesada y una fuerte dependencia al tráfico de pago directo. Se requería mejorar orgánicamente la presencia de marca a medio plazo." },
                { title: "Estrategia Implementada", content: "Auditoría técnica (corrección de WPO e indexabilidad). Refactorización de capa semántica (JSON-LD). Lanzamiento de test A/B midiendo el embudo completo con eventos customizados a nivel servidor en GA4." }
            ],
            leadMagnet: {
                title: "Checklist Avanzado Auditoría SEO",
                ctaText: "Descargar Checklist",
                fileName: "MCD-Auditoria-SEO-Checklist.xlsx"
            }
        },
        {
            id: "estrategia-sem-b2b",
            title: "Escalado SEM y Paid Media B2B",
            type: "SEM Manager & Social Media",
            description: "Diseño y ejecución de estrategia internacional multicanal (SEM). Creación de matrices de conversión e integración de CRM para cierre de clientes B2B de alto ticket.",
            tags: ["Google Ads", "Meta Ads", "HubSpot", "Looker Studio", "Google Analytics 4"],
            image: null,
            demoLink: null,
            githubLink: null,
            language: "JSON",
            languageColor: "#292929",
            stars: 56,
            lastUpdated: "Hace 3 días",
            repository: "mcd/b2b-sem-strategy",
            terminalOutput: [
                { cmd: "cat campaign_metrics.json", output: "Loading SEM performance data..." },
                { cmd: "node calculate_roas.js", output: "Current Quarter Metrics:\n- Budget utilized: 86%\n- CPL: 14.50 EUR (-32% PoP)\n- Global ROAS: 450%\n- Pipeline Value Gen: €2.3M" }
            ],
            deepDive: [
                { title: "El Reto", content: "El lead gen B2B para maquinaria industrial tiene ciclos de venta de hasta 6 meses. Se necesitaba una estrategia de captación de leads ultra cualificados evitando clics basura o irrelevantes en mercados europeos." },
                { title: "La Ejecución", content: "Enfoque híbrido: Campañas de Búsqueda Ultra Exactas (Google Ads) respaldadas por retargeting secuencial (Meta Ads). Integración API de conversiones offline en HubSpot para re-entrenar al algoritmo de Google sobre clientes que realmente compraban." }
            ],
            leadMagnet: {
                title: "Template Calculadora de ROAS",
                ctaText: "Descargar Calculadora",
                fileName: "MCD-Calculadora-ROAS.xlsx"
            }
        },
        
        // ------------------ Más Proyectos: Marketing Digital & Operaciones ------------------
        {
            id: "sistema-automatizaciones-b2b",
            title: "Hub de Automatización B2B Multicanal",
            type: "Marketing Operations & Growth",
            description: "Arquitectura de automatización de ventas que reduce la intervención humana en un 80% desde la captación del lead hasta la firma del contrato. Conecta landings, CRMs y firmas electrónicas.",
            tags: ["Make (Integromat)", "Zapier", "HubSpot", "ActiveCampaign", "Growth Hacker"],
            image: null,
            demoLink: null,
            githubLink: null,
            language: "Make",
            languageColor: "#c247ff",
            stars: 312,
            lastUpdated: "Hace 5 días",
            repository: "mcd/automation-hub-b2b",
            terminalOutput: [
                { cmd: "tail -f webhook_logs.txt", output: "[200 OK] Lead capturado desde Typeform.\n[PROCESS] Enriqueciendo datos vía Apollo API...\n[SUCCESS] Lead volcado a HubSpot y secuencia de nutrición activada." },
                { cmd: "node calculate_efficiency.js", output: "Métricas de Eficiencia:\n- Horas ahorradas al equipo de ventas: 45h/semana\n- Tasa de respuesta (Nutrición auto): 32%\n- Incremento en velocidad de cierre: +60%" }
            ],
            deepDive: [
                { title: "El Reto", content: "Un equipo comercial colapsado por tareas administrativas (data entry, envío de correos recordatorios, persecución de firmas). El reto era escalar las ventas sin contratar más personal." },
                { title: "El Blueprint de Automatización", content: "Mapeo completo de la experiencia del cliente para detectar ineficiencias. Implementamos flujos en Make que conectan Webhooks de captación con bases de datos enriquecidas, activando pipelines en HubSpot de forma totalmente desatendida." }
            ],
            leadMagnet: {
                title: "Guía de Automatizaciones + Blueprint",
                ctaText: "Descargar Guía y Blueprints",
                fileName: "MCD-Guia-Automatizaciones.pdf"
            }
        },
        {
            id: "dashboard-financiero-excel",
            title: "Dashboard Financiero & Marketing Omnicanal",
            type: "Data Analyst & Business Intelligence",
            description: "Desarrollo de un cuadro de mando integral usando Excel Avanzado y Power Query para consolidar datos financieros (ERP) y métricas de marketing (Google Ads, Meta) en una única fuente de verdad.",
            tags: ["Excel Avanzado", "Power Query", "Looker Studio", "Data Analyst", "SQL"],
            image: null,
            demoLink: null,
            githubLink: null,
            language: "Power Query",
            languageColor: "#107c41",
            stars: 184,
            lastUpdated: "Hace 2 meses",
            repository: "mcd/excel-dashboard-omni",
            terminalOutput: [
                { cmd: "powerquery refresh --source all", output: "Conectando a base de datos de SAP y APIs publicitarias...\nConsolidando 850,000 filas de datos brutos..." },
                { cmd: "python generate_insights.py", output: "Actualización Exitosa.\n- CAC Global: €45.20\n- LTV Proyectado: €1,200\n- Ratio LTV/CAC: 26.5" }
            ],
            deepDive: [
                { title: "El Reto", content: "La dirección no podía tomar decisiones ágiles porque su departamento financiero y el de marketing trabajaban en silos. Determinar la rentabilidad real de cada campaña era imposible." },
                { title: "La Solución en Datos", content: "Creación de un modelo de datos relacional híbrido estructurado a través de Power Query para transformar y limpiar la información, derivando en un Dashboard Ejecutivo en Excel 100% dinámico y libre de errores humanos." }
            ],
            leadMagnet: {
                title: "Plantilla Dashboard de Excel (Premium)",
                ctaText: "Descargar Dashboard Dinámico",
                fileName: "MCD-Dashboard-Omnicanal.xlsx"
            }
        },
        {
            id: "content-machine-360",
            title: "Máquina de Content Marketing 360º",
            type: "Content Strategist & SEO",
            description: "Sistema integral de planificación, creación y distribución de contenido B2B. Repositorio en Notion que orquesta copywriters, SEOs y diseñadores para publicar contenido de alto valor de forma consistente.",
            tags: ["Notion", "SEMrush", "Copywriting", "Metricool", "Social Media"],
            image: null,
            demoLink: null,
            githubLink: null,
            language: "Markdown",
            languageColor: "#083ee2",
            stars: 250,
            lastUpdated: "Hace 1 semana",
            repository: "mcd/content-machine-system",
            terminalOutput: [
                { cmd: "notion sync --database 'Content Calendar'", output: "Sincronizando estado de artículos...\nBorradores listos: 15\nPublicados este mes: 12\nPiezas distribuidas en LinkedIn: 30" },
                { cmd: "cat seo_ranking_check.sh", output: "Análisis de visibilidad:\n- Keywords Top 10: +45%\n- Tráfico de Blog: 50K visitas/mes\n- Suscriptores Newsletter: +1,200" }
            ],
            deepDive: [
                { title: "El Reto", content: "La creación de contenido en la empresa era descontrolada, reactiva y no generaba impacto SEO a largo plazo. Había pérdida de recursos al no reciclar bien las piezas de contenido." },
                { title: "Sistema Operativo de Contenido", content: "Se construyó un espacio de trabajo interconectado en Notion donde una pieza \"macro\" (Ej: un Webinar) alimenta un sistema de reciclaje que de forma atomizada genera decenas de posts para LinkedIn, hilos de Twitter y artículos SEO-optimizados." }
            ],
            leadMagnet: {
                title: "Plantilla Editorial de Notion",
                ctaText: "Duplicar Sistema Notion",
                fileName: "MCD-Content-Plan-Notion-Link.pdf"
            }
        }
    ],

    // Webs realizadas — Grid de 12 items
    websRealizadas: [
        { name: "Liffey Group", url: "https://liffeygroup.es", stack: "Next.js · Tailwind" },
        { name: "Salvia 365", url: "#", stack: "WordPress · WooCommerce" },
        { name: "Red.es PYME", url: "#", stack: "React · Vite" },
        { name: "Walk Around", url: "#", stack: "Shopify · Liquid" },
        { name: "Estudio Jurídico MCD", url: "#", stack: "WordPress · Elementor" },
        { name: "Clínica Dental Plus", url: "#", stack: "Next.js · CSS Modules" },
        { name: "Restaurante La Troje", url: "#", stack: "WordPress · SEO" },
        { name: "Fitness Lab", url: "#", stack: "React · Framer Motion" },
        { name: "Consultoría Ágora", url: "#", stack: "Shopify · GA4" },
        { name: "Inmobiliaria Vértice", url: "#", stack: "Next.js · Tailwind" },
        { name: "TechStart Academy", url: "#", stack: "Vite · TypeScript" },
        { name: "Eco Market", url: "#", stack: "PrestaShop · SEO" },
    ],

    // Competencias con iconos SVG (sin emojis)
    competencies: {
        "Marketing Digital": [
            {
                role: "SEO Specialist",
                icon: "search",
                tools: ["Google Analytics 4 (GA4)", "Search Console", "Ahrefs", "Screaming Frog", "Semrush"],
            },
            {
                role: "SEM Manager",
                icon: "trending-up",
                tools: ["Google Ads", "Meta Ads", "Looker Studio", "Google Tag Manager"],
            },
            {
                role: "Data Analyst",
                icon: "bar-chart",
                tools: ["Python / Pandas", "Looker Studio", "GA4", "SQL", "Excel Avanzado"],
            },
            {
                role: "Social Media Strategist",
                icon: "share-2",
                tools: ["Semrush", "Metricool", "Meta Business Suite", "Hootsuite", "Canva"],
            },
            {
                role: "E-commerce Specialist",
                icon: "shopping-cart",
                tools: ["WordPress", "Shopify", "WooCommerce", "PrestaShop", "GA4 Ecommerce"],
            },
            {
                role: "Growth Hacker",
                icon: "zap",
                tools: ["GTM", "CRM (HubSpot)", "Email Marketing", "A/B Testing", "Hotjar"],
            },
        ],
        "DAW": [
            {
                role: "Frontend Developer",
                icon: "code",
                tools: ["React", "Next.js", "Tailwind CSS", "Vite", "Framer Motion"],
            },
            {
                role: "Fullstack Developer",
                icon: "server",
                tools: ["Node.js", "Express", "SQL", "REST APIs", "MongoDB"],
            },
            {
                role: "UX/UI Designer",
                icon: "pen-tool",
                tools: ["Figma", "HTML5", "CSS3", "Responsive Design", "Accesibilidad Web"],
            },
        ],
    },
};