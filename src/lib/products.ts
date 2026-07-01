/**
 * De productladder — definitieve catalogus (2026-07-01).
 * Eén bron van waarheid voor site, prijzen en checkout.
 *
 * fulfillment:
 *  - "scan"         → koppelt live aan de vivynq-app: maakt scan + invite aan.
 *  - "order"        → product op aanvraag; order wordt vastgelegd + handmatig geleverd.
 *  - "program"      → online cursusmodule met directe app-toegang.
 *  - "lead"         → geen directe aankoop; lead-capture voor kennismakingsgesprek.
 *  - "subscription" → maandelijks abonnement.
 */

export type Fulfillment = "scan" | "order" | "subscription" | "program" | "lead";
export type Audience = "particulier" | "zakelijk";

export interface ProgrammaStap {
  nummer: string;
  titel: string;
  omschrijving: string;
}

export interface Transformatie {
  voor: string;
  na: string;
}

export interface ReflectieVraag {
  id: string;
  vraag: string;
  type: "open" | "schaal";
  toelichting?: string;
  schaallabels?: { min: string; max: string };
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  audience: Audience;
  priceCents: number;
  priceLabel: string;
  recurringLabel?: string;
  fulfillment: Fulfillment;
  scanType?: "persoonlijk" | "team";
  marktgat: string;
  inhoud: string[];
  belofte: string;
  cta: string;
  featured?: boolean;
  beschrijving?: string;
  duur?: string;
  voorWie?: string[];
  programmaStappen?: ProgrammaStap[];
  // Verdiepende commerciële velden
  openingsstelling?: string;
  transformatie?: Transformatie;
  quote?: string;
  urgentie?: string;
  garantie?: string;
  isNuBeschikbaar?: boolean;
  resultaatprofiel?: string[];
  // Interactieve reflectie (genereert persoonlijk rapport)
  reflectieVragen?: ReflectieVraag[];
  // Systemisch inzicht dat bij het rapport hoort (per programma)
  systemischInzicht?: string;
}

export const PRODUCTS: Product[] = [

  /* ────────────────────────────────────────────
     B2C — INSTAP
  ──────────────────────────────────────────── */
  {
    slug: "zelfscan-qcode",
    name: "Zelfscan Q.Code",
    tagline: "In 15 minuten weet jij wat anderen pas na jaren doorhebben.",
    audience: "particulier",
    priceCents: 12700,
    priceLabel: "€127",
    fulfillment: "scan",
    scanType: "persoonlijk",
    isNuBeschikbaar: true,
    openingsstelling:
      "Anderen zien iets in jou dat jij zelf nog niet kunt benoemen. Jij voelt het — maar je hebt er geen taal voor. De Zelfscan Q.Code geeft je die taal. In 15 minuten.",
    beschrijving:
      "Jouw Q.Code rapport: 12 pagina's over wie jij écht bent. DISC-profiel gecombineerd met een eerste systemische AI-analyse. Binnen 48 uur in jouw inbox — het meest concrete zelfinzicht dat je ergens kunt vinden.",
    marktgat:
      "Je doet alles goed — en toch klopt er iets niet. Anderen herkennen een patroon in jou dat jij zelf niet kunt benoemen. Niet omdat je het niet ziet, maar omdat je er te dicht op staat. De Zelfscan Q.Code maakt het zichtbaar: jouw gedrag, jouw stijl, jouw automatische patronen — in taal die je direct kunt gebruiken.",
    transformatie: {
      voor:
        "Je handelt op de automatische piloot. Je weet niet precies waarom je reageert zoals je reageert — of waarom het steeds hetzelfde gaat.",
      na:
        "Je hebt een rapport van 12 pagina's dat precies benoemt hoe jij in elkaar zit: jouw profiel, jouw valkuilen, jouw krachten. Taal die werkt.",
    },
    quote:
      "In 15 minuten weet je wat anderen pas na jaren doorhebben.",
    inhoud: [
      "Jouw persoonlijk DISC-profiel (D, I, S of C) — gedrag en communicatiestijl in kaart",
      "AI-gegenereerde eerste systemische analyse op basis van jouw antwoorden",
      "12-pagina persoonlijk rapport binnen 48 uur in je inbox",
      "Inzicht in jouw automatische gedragspatronen en wat ze aansturen",
      "Basis voor elk vervolggesprek, programma of coachtraject",
    ],
    resultaatprofiel: [
      "Je hebt concrete taal voor wat je altijd al voelde maar niet kon benoemen",
      "Je weet in welke situaties jouw profiel jou helpt — en wanneer het je beperkt",
      "Je hebt een gefundeerde basis voor elk vervolgtraject",
    ],
    belofte: "Rapport binnen 48 uur · eenmalige investering",
    cta: "Ontvang jouw Q.Code rapport",
    duur: "15 minuten invullen",
    garantie: "Rapport binnen 48 uur gegarandeerd — of volledig terugbetaald",
  },

  {
    slug: "qcode-compleet",
    name: "Q.Code Compleet",
    tagline: "Twee lagen. Één rapport. Het meest complete zelfinzicht dat je ergens vindt.",
    audience: "particulier",
    priceCents: 19700,
    priceLabel: "€197",
    fulfillment: "order",
    isNuBeschikbaar: true,
    openingsstelling:
      "Een DISC-profiel laat zien wat je doet. Een systemische analyse laat zien waarom. Samen vormen ze het meest eerlijke, complete zelfinzicht dat je ergens kunt vinden.",
    beschrijving:
      "DISC-profiel én een uitgebreide AI-gegenereerde systemische analyse van de patronen die jouw gedrag aansturen. Meer dan 20 pagina's inzicht — in één rapport. Het startpunt van elk serieus traject.",
    marktgat:
      "Jouw profiel laat zien wat je doet in contact met anderen. De systemische analyse laat zien waarom — waar die patronen vandaan komen, wat ze in stand houdt en wat er mogelijk anders kan. Twee lagen. Één rapport. Één helder startpunt voor alles wat daarna komt.",
    transformatie: {
      voor:
        "Je weet dat je patronen hebt. Je herkent ze zelfs. Maar je begrijpt hun oorsprong niet — en daardoor veranderen ze ook niet.",
      na:
        "Meer dan 20 pagina's analyse die jou en elke coach direct op dezelfde pagina brengen. Je kunt eindelijk woorden geven aan wat je al tijden voelt.",
    },
    quote:
      "Niet wat je doet. Maar waarom. Dat is het verschil tussen profiel en inzicht.",
    inhoud: [
      "Zelfscan Q.Code compleet rapport (DISC-profiel + eerste systemische analyse)",
      "Uitgebreide AI-gegenereerde systeemanalyse: patronen, loyaliteiten, dynamieken",
      "Meer dan 20 pagina's persoonlijk inzicht — het meeste wat je ergens vindt",
      "Concrete aanbevelingen voor jouw vervolgstap",
      "Direct bruikbaar als basis voor elk programma of 1:1 coachtraject",
    ],
    resultaatprofiel: [
      "Je begrijpt waarom je doet wat je doet — niet alleen wat",
      "Je hebt een professionele basis voor elk vervolggesprek",
      "Je hebt concrete aanknopingspunten voor persoonlijke groei",
    ],
    belofte: "Rapport binnen 48 uur · eenmalige investering",
    cta: "Start jouw Q.Code Compleet",
    duur: "15 minuten invullen",
    garantie: "Meer dan 20 pagina's inzicht — of volledig terugbetaald",
  },

  /* ────────────────────────────────────────────
     B2C — ONLINE PROGRAMMA'S
  ──────────────────────────────────────────── */
  {
    slug: "van-dragen-naar-kiezen",
    name: "Van dragen naar kiezen",
    tagline: "Je weet allang dat je teveel draagt. Dit programma helpt je stoppen zonder alles te laten vallen.",
    audience: "particulier",
    priceCents: 49700,
    priceLabel: "€497",
    fulfillment: "program",
    isNuBeschikbaar: true,
    featured: true,
    openingsstelling:
      "Je zegt ja. Terwijl je eigenlijk al vol zit. Niet omdat je het wilt — maar omdat je niet weet hoe het anders kan. Dit programma helpt je stoppen met dragen zonder alles te laten vallen.",
    beschrijving:
      "Acht weken systemisch coachingsprogramma voor professionals die klaar zijn om van automatische hulpverlener naar bewuste kiezer te gaan. Coaching gericht op inzicht en gedragsverandering. Systemisch werk op het patroon zelf — module voor module.",
    marktgat:
      "Je zegt ja terwijl je al vol zit. Als jij stopt, valt alles om — tenminste, dat geloof je. Je helpt niet meer omdat je wilt. Je helpt omdat je bang bent voor wat er gebeurt als je stopt. Dit programma doorbreekt dat automatisme. Niet met wilskracht. Maar door te begrijpen waar het vandaan komt.",
    transformatie: {
      voor:
        "Jij draagt wat anderen neerleggen. Je voelt je verantwoordelijk voor dingen die niet van jou zijn — en je kunt er niet mee stoppen.",
      na:
        "Je maakt een keuze in plaats van een reflex. Je helpt wanneer jij het wilt — niet wanneer je bang bent voor de gevolgen als je het niet doet.",
    },
    quote:
      "Stoppen met dragen voelt als loslaten. Maar het is het eerste dat je kiest.",
    inhoud: [
      "8 modules met lichaamsgerichte micro-oefeningen (max. 3 minuten per module)",
      "Jouw eigen systeemkaart die je opbouwt over de hele looptijd",
      "DISC-gesplitste reflectievragen afgestemd op jouw Q.Code profiel",
      "Wekelijks systeemlogboek met ankerpraktijk",
      "Directe toegang tot Wouter voor vragen tussentijds",
      "Weekopdrachten die buiten het scherm plaatsvinden — het echte werk",
    ],
    resultaatprofiel: [
      "Je herkent jouw draagpatroon op het moment dat het ontstaat — niet pas daarna",
      "Je kunt nee zeggen zonder schuldgevoel — en ja zeggen vanuit echte keuze",
      "Je weet waar jouw verantwoordelijkheid eindigt en die van een ander begint",
    ],
    belofte: "2 uur per week · 8 weken · op jouw eigen tempo",
    cta: "Ik start met dit programma",
    duur: "8 weken",
    urgentie: "Directe toegang na aankoop · Volg op jouw eigen tempo",
    voorWie: [
      "Professionals die merken dat ze meer dragen dan van hen gevraagd wordt",
      "Mensen die moeite hebben 'nee' te zeggen zonder schuldgevoel",
      "Wie wil stoppen met helpen vanuit angst en beginnen vanuit keuze",
      "Iedereen die merkt dat het systeem verwacht dat jij draagt — en daarnaar handelt",
    ],
    programmaStappen: [
      { nummer: "01", titel: "Wat draag jij eigenlijk?", omschrijving: "Inventarisatie van alles wat jij draagt zonder het bewust te kiezen — zichtbaar en onzichtbaar." },
      { nummer: "02", titel: "Jouw automatische ja", omschrijving: "Wanneer ben jij begonnen ja te zeggen zonder na te denken — en voor wie?" },
      { nummer: "03", titel: "Waar begon dit?", omschrijving: "De systemische oorsprong van jouw draagpatroon. Niet als verklaring — als bevrijding." },
      { nummer: "04", titel: "Wie horen er bij jouw last?", omschrijving: "Welke mensen zitten er in jouw systemische last — en wat is hun rol?" },
      { nummer: "05", titel: "De rollen die jij speelt", omschrijving: "Welke rollen vervul jij in jouw systeem die eigenlijk niet van jou zijn?" },
      { nummer: "06", titel: "Geven en nemen in balans", omschrijving: "Wat geef jij te veel, wat ontvang jij te weinig — en wat houdt die disbalans in stand?" },
      { nummer: "07", titel: "Grenzen als eerlijkheid", omschrijving: "Grenzen zijn geen bescherming. Ze zijn de meest eerlijke daad naar een ander." },
      { nummer: "08", titel: "Kiezen met open ogen", omschrijving: "Van automatisch dragen naar bewust kiezen. De definitieve stap — en het begin van iets nieuws." },
    ],
    reflectieVragen: [
      { id: "dragen-1", type: "open", vraag: "Beschrijf een situatie van de afgelopen week waarbij jij ja zei, terwijl je eigenlijk nee bedoelde.", toelichting: "Wees eerlijk — ook als het ongemakkelijk is." },
      { id: "dragen-2", type: "schaal", vraag: "Hoe zwaar voelt jouw last op dit moment?", schaallabels: { min: "Behapbaar", max: "Ondraaglijk" } },
      { id: "dragen-3", type: "open", vraag: "Voor wie draag jij het meest? Schrijf de eerste naam die opkomt — en wat je denkt dat er zou gebeuren als jij stopt." },
      { id: "dragen-4", type: "open", vraag: "Wat is de eerste gedachte die opkomt als je denkt aan nee zeggen?", toelichting: "Schrijf de ongefilterste versie." },
      { id: "dragen-5", type: "open", vraag: "In één zin: hoe wil jij je leven over zes maanden voelen? Niet wat je wilt bereiken — maar hoe je wilt voelen." },
    ],
    systemischInzicht: "Jij draagt meer dan gemiddeld. Dat is niet zwak — het is systemisch logisch. In jouw systeem werd jou vroeg geleerd dat dragen gelijkstaat aan liefde, loyaliteit of veiligheid. Het automatische ja is een beschermingsmechanisme dat ooit werkte. De vraag is nu: werkt het nog voor de versie van jou die jij nu bent?",
  },

  {
    slug: "wortels",
    name: "Wortels",
    tagline: "Jouw familiepatroon werkt door. Dit programma maakt zichtbaar hoe — en geeft je de keuze.",
    audience: "particulier",
    priceCents: 49700,
    priceLabel: "€497",
    fulfillment: "program",
    isNuBeschikbaar: true,
    openingsstelling:
      "Je hebt gezworen het anders te doen dan thuis. En toch zie je jezelf terugkeren in dezelfde patronen. Wortels maakt zichtbaar wat je meedraagt — en geeft je voor het eerst de echte keuze om het neer te leggen.",
    beschrijving:
      "Acht weken systemisch programma voor wie de patronen uit het verleden wil begrijpen om in het heden anders te kunnen kiezen. Geen schuld, geen oordeel — alleen zien wat er is.",
    marktgat:
      "Je doet het anders dan thuis — en toch zie je jezelf terugkeren. Sommige patronen voel je al jaren, maar je weet niet waar ze vandaan komen. Dat maakt ze ook onmogelijk om te doorbreken. Wortels gaat terug naar de bron. Niet om te blijven hangen, maar om eindelijk te kunnen loskomen.",
    transformatie: {
      voor:
        "Je herhaalt patronen die je niet koos. Je weet dat ze er zijn — maar je weet niet waar ze vandaan komen, en daardoor veranderen ze ook niet.",
      na:
        "Je begrijpt jouw familiesysteem. Je ziet de loyaliteiten die jou sturen. En je hebt voor het eerst de echte keuze: anders zijn.",
    },
    quote:
      "Begrijpen is niet hetzelfde als goedkeuren. Maar het is wel de eerste stap naar vrij zijn.",
    inhoud: [
      "8 modules gericht op de eerste systemische basisvraag: Waar komt het vandaan?",
      "Systeemkaart van jouw familiesysteem — opgebouwd over de looptijd",
      "DISC-gesplitste reflectievragen afgestemd op jouw Q.Code profiel",
      "Lichaamsgerichte micro-oefeningen per module (max. 3 minuten)",
      "Wekelijks systeemlogboek als continuïteitsanker",
      "Directe toegang tot Wouter voor vragen tussentijds",
    ],
    resultaatprofiel: [
      "Je begrijpt de patronen die je meebracht vanuit je familie — bewust én onbewust",
      "Je herkent onzichtbare loyaliteiten die jouw gedrag vandaag nog sturen",
      "Je hebt de keuze om anders te zijn — vanuit begrip, niet vanuit verzet",
    ],
    belofte: "2 uur per week · 8 weken · op jouw eigen tempo",
    cta: "Ja, ik ga dit doen",
    duur: "8 weken",
    urgentie: "Directe toegang na aankoop · Volg op jouw eigen tempo",
    voorWie: [
      "Wie merkt dat het verleden zich herhaalt in het heden — in relaties, werk of gezondheid",
      "Mensen die weten dat hun patronen er al lang zijn maar niet weten waar ze vandaan komen",
      "Wie klaar is om te begrijpen — niet om te oordelen maar om te zien",
      "Iedereen die systemisch werk wil doen zonder een coach tegenover zich",
    ],
    programmaStappen: [
      { nummer: "01", titel: "Jouw eerste systeem", omschrijving: "Jouw familie als eerste omgeving. Wat leerde jij daar over wie je hoort te zijn?" },
      { nummer: "02", titel: "Wat nam jij mee?", omschrijving: "De erfenis van jouw familiesysteem: bewust en onbewust meegenomen." },
      { nummer: "03", titel: "Loyaliteiten die je vasthouden", omschrijving: "Onzichtbare trouw aan jouw systeem die jou vandaag nog stuurt." },
      { nummer: "04", titel: "Wie werd vergeten?", omschrijving: "Uitgeslotenen die hun plek opeisen via jou — zonder dat jij het weet." },
      { nummer: "05", titel: "Rollen die doorgaan", omschrijving: "Familierollen van generatie op generatie — ook als jij ze bewust niet koos." },
      { nummer: "06", titel: "Wat niet werd gezegd", omschrijving: "Stiltes in jouw familiesysteem en hoe die jouw stem beïnvloeden." },
      { nummer: "07", titel: "Jouw eigen leven beginnen", omschrijving: "Los van de last van het systeem — eigenaarschap activeren vanuit de kern." },
      { nummer: "08", titel: "Jouw plek — bewust kiezen", omschrijving: "Bewust de plek innemen die van jou is. Niet de plek die het systeem voor jou koos." },
    ],
    reflectieVragen: [
      { id: "wortels-1", type: "open", vraag: "Welk patroon herken jij bij jezelf dat jij ook bij jouw ouder(s) herkent?", toelichting: "Schrijf het eerste dat opkomt — niet wat je zou willen herkennen." },
      { id: "wortels-2", type: "open", vraag: "Welke ongeschreven regel leefde er thuis? Iets wat iedereen wist, maar niemand uitsprak." },
      { id: "wortels-3", type: "schaal", vraag: "Hoe vrij voel jij je van de patronen die jij meebracht vanuit jouw familie?", schaallabels: { min: "Totaal niet vrij", max: "Volledig vrij" } },
      { id: "wortels-4", type: "open", vraag: "Wie in jouw familie werd het minst gezien of het meest vergeten? Schrijf de eerste naam die opkomt.", toelichting: "Ook als je het antwoord spannend vindt." },
      { id: "wortels-5", type: "open", vraag: "Wat wil jij anders doen dan thuis — en doe je dat al? Schrijf eerlijk." },
    ],
    systemischInzicht: "Jouw familiepatronen zijn niet jouw schuld — ze zijn jouw erfenis. Elk systeem heeft zijn eigen logica: wie er mocht zijn, wie er niet was, wat er gezegd mocht worden en wat niet. Jij bent opgegroeid in die logica. En die logica werkt door — in hoe jij reageert, hoe jij kiest, wie jij in contact laat. Begrijpen is het begin van het kunnen loslaten.",
  },

  {
    slug: "raak",
    name: "Raak",
    tagline: "Alles gaat goed — en toch klopt er iets niet. Raak helpt je vinden wat je al weet maar niet zegt.",
    audience: "particulier",
    priceCents: 59700,
    priceLabel: "€597",
    fulfillment: "program",
    isNuBeschikbaar: true,
    openingsstelling:
      "Succesvol op papier. Zoekend van binnen. Niemand die het ziet — jij wel. Dit programma is voor wie weet dat er meer is, maar nog niet weet hoe dat eruitziet.",
    beschrijving:
      "Zes modules systemische verdieping voor wie succesvol is van buiten en zoekend van binnen. Geen analyse van wat er mis is — een weg terug naar wat er altijd al was.",
    marktgat:
      "Succesvol van buiten, zoekend van binnen. Niemand ziet het, jij wel. Je bent goed in je werk en tegelijk steeds verder van jezelf. Je staat op veilige afstand van het echte leven — aanwezig maar niet echt. Raak gaat over contactvermogen. Met werk, met mensen, met jezelf.",
    transformatie: {
      voor:
        "Je staat op veilige afstand van het echte leven. Je bent aanwezig — maar niet werkelijk. In gesprekken, in relaties, in jezelf.",
      na:
        "Je bent er echt. Je laat je raken door wat er is. Niet als kwetsbaarheid — maar als kracht.",
    },
    quote:
      "Aanwezig zijn is geen kwestie van tijd. Het is een keuze die je steeds opnieuw maakt.",
    inhoud: [
      "6 verdiepende modules gericht op de vraag: Wie horen er écht bij mij?",
      "Systemische analyse van jouw relatie- en loyaliteitspatronen",
      "DISC-gesplitste reflectievragen op basis van jouw Q.Code",
      "Lichaamsgerichte micro-oefeningen en stiltevragen met integratietijd",
      "Wekelijks systeemlogboek",
      "Directe toegang tot Wouter voor vragen",
    ],
    resultaatprofiel: [
      "Je weet wat je vermijdt — en waarom je het al zo lang vermijdt",
      "Je kunt aanwezig zijn in contact zonder te verdwijnen",
      "Je voelt het verschil tussen echt contact en gemanaged contact",
    ],
    belofte: "2 uur per week · 6 weken · op jouw eigen tempo",
    cta: "Reserveer jouw plek in Raak",
    duur: "6 weken",
    urgentie: "Directe toegang na aankoop · Volg op jouw eigen tempo",
    voorWie: [
      "Mensen die succesvol zijn van buiten en zoekend van binnen",
      "Wie merkt dat er iets mist maar het niet kan benoemen",
      "Iedereen die op veilige afstand van het echte leven staat",
      "Wie klaar is om aanwezig te zijn — in relaties, in werk, in zichzelf",
    ],
    programmaStappen: [
      { nummer: "01", titel: "Succesvol en toch zoekend", omschrijving: "Alles klopt op papier. Maar er mist iets. Wat zoek jij eigenlijk — en hoe lang al?" },
      { nummer: "02", titel: "Wat jij vermijdt", omschrijving: "Naar het ongemak toebewegen dat jou op afstand houdt van het echte leven." },
      { nummer: "03", titel: "Relaties die jou vormen", omschrijving: "Hoe jouw belangrijkste relaties bepalen wie jij (niet) mag zijn." },
      { nummer: "04", titel: "Loyaliteiten die je niet zag", omschrijving: "Onzichtbare trouwen die jouw contactvermogen begrenzen zonder dat je het doorhebt." },
      { nummer: "05", titel: "Wat vraagt om jouw aandacht", omschrijving: "Het stille signaal dat al tijdens wacht op erkenning — eindelijk horen." },
      { nummer: "06", titel: "Raak leven", omschrijving: "Aanwezig zijn in het echte — in werk, in relaties, in jezelf. Niet meer op afstand." },
    ],
    reflectieVragen: [
      { id: "raak-1", type: "open", vraag: "In welke situaties sta jij het meest op afstand? (In werk, relaties, bij jezelf?) Beschrijf zo concreet mogelijk." },
      { id: "raak-2", type: "schaal", vraag: "Hoe aanwezig ben jij in contact met anderen — in het echt, niet op papier?", schaallabels: { min: "Op grote afstand", max: "Volledig aanwezig" } },
      { id: "raak-3", type: "open", vraag: "Wat vermijd jij al het langst — en waarvan weet je diep van binnen dat het er is?" },
      { id: "raak-4", type: "open", vraag: "Beschrijf een moment waarop jij je echt geraakt voelde. Hoe lang geleden was dat?" },
      { id: "raak-5", type: "open", vraag: "Wat zou er anders zijn in jouw leven als je je vaker werkelijk liet raken?" },
    ],
    systemischInzicht: "Op afstand staan is ooit een slimme oplossing geweest. Aanwezig zijn betekende kwetsbaar zijn — en kwetsbaar zijn was gevaarlijk. Dat mechanisme werkte. Maar een beschermingsstrategie die je als kind leerde, past niet meer op het leven van nu. Raak gaan vereist niet dat je minder wordt — het vraagt dat je meer van jezelf toelaat.",
  },

  {
    slug: "adem",
    name: "Adem",
    tagline: "Uitgeput maar niet leeg. Adem helpt je het onderscheid zien.",
    audience: "particulier",
    priceCents: 59700,
    priceLabel: "€597",
    fulfillment: "program",
    isNuBeschikbaar: true,
    openingsstelling:
      "Je hebt alles gegeven. Nu weet je even niet meer wat je over hebt. Moe op een manier die slapen niet oplost. Adem gaat over wat herladen werkelijk betekent — en waarom jij het steeds maar uitstelt.",
    beschrijving:
      "Zes modules voor professionals die alles hebben gegeven en nu moeten leren wat opnieuw kiezen betekent — zonder zichzelf te verliezen. Systemisch werk op de balans tussen geven en nemen.",
    marktgat:
      "Je hebt alles gegeven. Nu weet je even niet meer wat je over hebt. Moe op een manier die slapen niet oplost. Maar stoppen voelt als falen. Herlaad doen voelt als onverdiend. Adem gaat precies hierover: de systemische patronen die jou gevangen houden in die cirkel.",
    transformatie: {
      voor:
        "Je weet dat je moe bent. Maar stoppen voelt als falen. Herladen voelt als iets wat jij pas mag doen als alles klaar is — en dat is het nooit.",
      na:
        "Je weet wat je nodig hebt. Je durft erom te vragen. En je begrijpt waarom herladen geen zwakte is — maar de meest bewuste keuze die je kunt maken.",
    },
    quote:
      "Uitgeput zijn is geen karaktergebrek. Het is een signaal dat je al te lang negeert.",
    inhoud: [
      "6 modules gericht op de balans tussen geven en nemen — systemische basisvraag 4",
      "Systemische analyse van wat jou energie kost versus wat het oplevert",
      "DISC-gesplitste reflectievragen op basis van jouw Q.Code",
      "Lichaamsgerichte micro-oefeningen gericht op herladen, aarding en integratie",
      "Wekelijks systeemlogboek",
      "Directe toegang tot Wouter voor vragen",
    ],
    resultaatprofiel: [
      "Je begrijpt waarom jij het stoppen steeds maar uitstelt — en waar dat patroon vandaan komt",
      "Je weet wat jij nodig hebt — en je durft erom te vragen",
      "Je kiest herladen als actieve, bewuste daad — niet als iets wat je 'overhoudt'",
    ],
    belofte: "2 uur per week · 6 weken · op jouw eigen tempo",
    cta: "Ja, ik kies voor mezelf",
    duur: "6 weken",
    urgentie: "Directe toegang na aankoop · Volg op jouw eigen tempo",
    voorWie: [
      "Professionals die merken dat moe zijn dieper gaat dan vermoeidheid",
      "Mensen die alles hebben gegeven en niet meer weten wat ze over hebben",
      "Wie merkt dat slapen het niet oplost maar toch geen andere optie ziet",
      "Iedereen die wil leren wat opnieuw kiezen betekent — zonder zichzelf te verliezen",
    ],
    programmaStappen: [
      { nummer: "01", titel: "Erkennen wat je hebt gegeven", omschrijving: "Een uitputting die dieper gaat dan vermoeide spieren. Wat heb jij eigenlijk gegeven?" },
      { nummer: "02", titel: "De kosten van altijd sterk zijn", omschrijving: "Hoe jouw profiel bepaalt wat je niet kunt loslaten — en wat dat over de jaren kost." },
      { nummer: "03", titel: "Wat ik nodig heb — maar niet vraag", omschrijving: "Het verschil tussen niet weten wat je nodig hebt en niet durven vragen." },
      { nummer: "04", titel: "Ruimte maken", omschrijving: "Herladen vraagt ruimte — niet alleen tijd, maar vrijheid om er bewust voor te kiezen." },
      { nummer: "05", titel: "Herladen als keuze", omschrijving: "Herladen is een actieve, herhaalde keuze. Niet iets wat je overhoudt na al het andere." },
      { nummer: "06", titel: "Opnieuw beginnen — vanuit jijzelf", omschrijving: "Terugkeren naar werk en leven vanuit eigenaarschap. Niet omdat het moet. Omdat je het wilt." },
    ],
    reflectieVragen: [
      { id: "adem-1", type: "open", vraag: "Hoe lang ben jij al moe op de manier die slapen niet oplost? Beschrijf wat dat gevoel is.", toelichting: "Niet de oorzaak — het gevoel." },
      { id: "adem-2", type: "schaal", vraag: "Hoe leeg voel jij je op dit moment?", schaallabels: { min: "Ik heb genoeg", max: "Helemaal op" } },
      { id: "adem-3", type: "open", vraag: "Wat heb jij nodig maar durf jij niet te vragen? Schrijf de eerste eerlijke gedachte." },
      { id: "adem-4", type: "open", vraag: "Wanneer heb jij voor het laatste echt gestopt — niet geslapen, maar echt gestopt met alles?" },
      { id: "adem-5", type: "open", vraag: "Wat maakt dat stoppen voor jou aanvoelt als falen? Waar komt die overtuiging vandaan?" },
    ],
    systemischInzicht: "Uitputting is geen zwakte — het is een signaal van een systeem dat uit balans is. Jij hebt waarschijnlijk geleerd dat jouw waarde zit in wat jij geeft. Dat herladen iets is wat je pas verdient als alles af is. Die overtuiging is niet van jou — ze komt ergens vandaan. Adem helpt je zien waar, en wat het kost om er mee te blijven leven.",
  },

  {
    slug: "wending",
    name: "Wending",
    tagline: "Er is een punt waarop doorgaan en veranderen niet langer hetzelfde zijn. Jij staat daar nu.",
    audience: "particulier",
    priceCents: 59700,
    priceLabel: "€597",
    fulfillment: "program",
    isNuBeschikbaar: true,
    openingsstelling:
      "Er is een punt waarop doorgaan en veranderen niet langer hetzelfde zijn. Jij weet dat je daar staat. De richting is er al — je durft hem alleen nog niet te nemen.",
    beschrijving:
      "Zes modules voor wie op een keerpunt staat en de volgende richting wil kiezen vanuit inzicht, niet vanuit angst. Systemisch werk op bewegingsrichting en wat je weerhoudt.",
    marktgat:
      "Je weet dat je niet kunt doorgaan zoals nu. Maar wat dan? Elke richting voelt risicovol. Elke keuze voelt als verlies. De keuze is er al — jij durft hem alleen nog niet te nemen. Wending helpt je zien wat je weerhoudt. Niet vanuit analyse, maar vanuit systemisch inzicht.",
    transformatie: {
      voor:
        "Je weet dat doorgaan geen optie is. Maar wat 'anders' eruitziet — dat weet je niet. En dat maakt de stap onmogelijk.",
      na:
        "Je zet de eerste concrete stap. Niet naar de eindbestemming — maar in de richting die je al tijden weet maar nog niet durfde te kiezen.",
    },
    quote:
      "De richting weet je al. Wat jou weerhoudt is niet onzekerheid — het is systemische binding.",
    inhoud: [
      "6 modules gericht op de vijfde systemische basisvraag: Waar neigt het naartoe?",
      "Systemische analyse van jouw bewegingsrichting en wat je weerhoudt",
      "DISC-gesplitste reflectievragen op basis van jouw Q.Code",
      "Lichaamsgerichte micro-oefeningen gericht op verankering van nieuwe richting",
      "Wekelijks systeemlogboek",
      "Directe toegang tot Wouter voor vragen",
    ],
    resultaatprofiel: [
      "Je begrijpt welke systemische krachten jou vasthouden op dit keerpunt",
      "Je hebt de eerste concrete stap helder — niet het eindpunt, maar de richting",
      "Je beweegt vanuit inzicht in plaats van vanuit angst",
    ],
    belofte: "2 uur per week · 6 weken · op jouw eigen tempo",
    cta: "Ik wil deze wending maken",
    duur: "6 weken",
    urgentie: "Directe toegang na aankoop · Volg op jouw eigen tempo",
    voorWie: [
      "Wie op een keerpunt staat en niet weet hoe de volgende stap eruitziet",
      "Mensen die weten dat doorgaan zoals nu geen optie is — maar wat dan?",
      "Wie de keuze al heeft maar hem nog niet durft te nemen",
      "Iedereen die richting wil kiezen vanuit inzicht, niet vanuit angst",
    ],
    programmaStappen: [
      { nummer: "01", titel: "Hier sta ik", omschrijving: "Eerlijk en zonder oordeel in kaart brengen waar je nu werkelijk staat." },
      { nummer: "02", titel: "Wat houdt jou hier?", omschrijving: "Systemische krachten: loyaliteiten, verwachtingen, rollen die je op de plek houden." },
      { nummer: "03", titel: "Wat trekt jou vooruit", omschrijving: "Niet het eindpunt — maar het signaal dat al tijden roept en dat je steeds negeert." },
      { nummer: "04", titel: "Het systeem en jouw wending", omschrijving: "Welke systemische bindingen houden jouw wending tegen — en wat kun je ermee?" },
      { nummer: "05", titel: "De stap die jij wilt zetten", omschrijving: "Niet de eindbestemming. De eerste concrete stap — van jou, op jouw moment." },
      { nummer: "06", titel: "Richting houden", omschrijving: "Bewegen in de richting die je koos, ook als onzekerheid terugkomt. Dat is de echte wending." },
    ],
    reflectieVragen: [
      { id: "wending-1", type: "open", vraag: "Je staat op een keerpunt. Beschrijf in één zin wat de twee kanten van dat keerpunt zijn.", toelichting: "Niet wat je moet kiezen — maar wat de twee kanten zijn die je ervaart." },
      { id: "wending-2", type: "open", vraag: "Wat weerhoudt jou er op dit moment van om de richting te kiezen die je diep van binnen al weet?" },
      { id: "wending-3", type: "schaal", vraag: "Hoe helder is de richting die trekt — ook al ga je er nog niet naartoe?", schaallabels: { min: "Totaal onduidelijk", max: "Kristalhelder" } },
      { id: "wending-4", type: "open", vraag: "Wie in jouw systeem zou jouw keuze het meest raken? Wat doet dat met jou als je er aan denkt?" },
      { id: "wending-5", type: "open", vraag: "Als angst geen rol meer speelde: welke stap zou jij morgen zetten?" },
    ],
    systemischInzicht: "Een wending is geen plotselinge keuze — het is een erkenning van iets wat je al lang wist. Systemisch gezien zit de blokkade zelden in onduidelijkheid over de richting. Ze zit in loyaliteit: aan het systeem, aan mensen die je niet wilt kwetsen, aan een rol die jou beschermt maar ook vasthoudt. Wending helpt je niet beslissen — het helpt je zien wat jou weerhoudt te doen wat je al weet.",
  },

  /* ────────────────────────────────────────────
     B2C — 1:1 COACHING
  ──────────────────────────────────────────── */
  {
    slug: "coachtraject-6-sessies",
    name: "1:1 Coachtraject",
    tagline: "Zes sessies. Jouw Q.Code. Jouw systeem. Een coach die niet invult maar ziet.",
    audience: "particulier",
    priceCents: 249700,
    priceLabel: "€2.497",
    fulfillment: "lead",
    openingsstelling:
      "Jij wil geen coach die zegt wat je moet doen. Jij wil iemand die ziet wat jij nog niet ziet. Zes sessies. Jouw tempo. Jouw patroon centraal.",
    beschrijving:
      "Een volledig persoonlijk traject van zes sessies waarin DISC-analyse en systemisch werk samenkomen. Geen advies, geen format — coaching die tot de kern gaat van wie jij bent en wat jou beweegt.",
    marktgat:
      "Jij wil geen coach die zegt wat je moet doen. Jij wil iemand die ziet wat jij nog niet ziet. Iemand die niet invult maar vraagt. Die niet analyseert maar raak is. Zes sessies. Jouw Q.Code. Jouw systeem. Dat is het 1:1 coachtraject.",
    transformatie: {
      voor:
        "Je weet dat er iets moet veranderen. Maar je hebt geen idee waar te beginnen — of wie je echt kunt vertrouwen met het echte verhaal.",
      na:
        "Je hebt zes sessies met iemand die jou echt heeft gezien. Je weet wat je draagt, wat van jou is en welke stap jij daadwerkelijk wilt zetten.",
    },
    quote:
      "Coaching is geen advies. Het is het moment waarop jij jezelf eindelijk hoort.",
    inhoud: [
      "Intake met Q.Code Compleet (DISC + uitgebreide systemische analyse)",
      "Zes begeleide sessies van 90 minuten — online of op locatie",
      "Persoonlijk begeleidingsplan op basis van jouw Q.Code profiel",
      "Toegang tot het Vivynq-portaal met jouw voortgang en notities",
      "Nazorg na afronding van het traject",
    ],
    belofte: "3–4 maanden · maximaal 4 coachees tegelijk",
    cta: "Plan een gratis kennismakingsgesprek",
    duur: "6 sessies · 90 minuten per sessie",
    urgentie: "Maximaal 4 trajecten tegelijk · Wachtlijst van toepassing",
  },

  /* ────────────────────────────────────────────
     B2C — SYSTEMISCH PORTRET (upsell na reflectie)
  ──────────────────────────────────────────── */
  {
    slug: "systemisch-portret",
    name: "Systemisch Portret",
    tagline: "Jouw reflecties vertaald naar een persoonlijk 12-pagina's systemisch inzichtrapport.",
    audience: "particulier",
    priceCents: 9700,
    priceLabel: "€97",
    fulfillment: "lead",
    featured: false,
    openingsstelling:
      "Je hebt de vragen beantwoord. Nu wil je weten wat er werkelijk speelt — dieper dan jij zelf kunt zien.",
    beschrijving:
      "Op basis van jouw reflecties en DISC-profiel schrijft Wouter een persoonlijk systemisch inzichtrapport van 12 pagina's. Geen template — een analyse van jouw specifieke patroon, jouw systemische bindingen en de bewegingsrichting die past bij wie jij bent.",
    marktgat:
      "Reflecties geven richting. Maar systemische inzichten vragen iemand die ze kan lezen. Iemand die de verbanden ziet die jij niet ziet. Het Systemisch Portret is precies dat: jouw eigen verhaal, gelezen door iemand die systemisch werk begrijpt.",
    transformatie: {
      voor:
        "Je hebt de vragen beantwoord en voelt dat er meer in zit — maar wat precies, dat kun je zelf niet helemaal duiden.",
      na:
        "Je hebt een persoonlijk rapport van 12 pagina's dat benoemt wat er speelt. Concreet, systemisch, van toepassing op jouw situatie.",
    },
    quote:
      "Systemisch inzicht is geen analyse van het verleden. Het is een kaart voor de beweging die je al wilt maken.",
    inhoud: [
      "Persoonlijke lezing van jouw reflectieantwoorden door Wouter",
      "Systemische duiding van jouw patronen en bindingen",
      "Verbinding met jouw DISC-profiel — als jij dat hebt",
      "Concrete bewegingsrichting op basis van jouw situatie",
      "12 pagina's · persoonlijk geschreven · binnen 5 werkdagen",
    ],
    resultaatprofiel: [
      "Je begrijpt welke systemische patronen jou beïnvloeden",
      "Je weet welke richting past bij wie jij werkelijk bent",
      "Je hebt een concreet document dat je kunt raadplegen wanneer je het nodig hebt",
    ],
    belofte: "Rapport binnen 5 werkdagen per e-mail",
    cta: "Ja, ik wil mijn Systemisch Portret",
    duur: "Eenmalig · persoonlijk rapport",
    urgentie: "Maximaal 8 rapporten per maand · Volgorde van aanvraag",
  },

  /* ────────────────────────────────────────────
     B2B — OP AANVRAAG
  ──────────────────────────────────────────── */
  {
    slug: "teamscan-rapport",
    name: "TeamScan + Rapport",
    tagline: "Jullie team functioneert. Maar iedereen voelt dat het beter kan. Dit rapport laat zien waarom.",
    audience: "zakelijk",
    priceCents: 0,
    priceLabel: "Op aanvraag",
    fulfillment: "lead",
    scanType: "team",
    openingsstelling:
      "Iedereen werkt hard. Maar het trekt toch steeds een andere kant op. Jullie kennen elkaar — en toch ontstaan dezelfde wrijvingen steeds opnieuw. Dit rapport laat zien waarom.",
    beschrijving:
      "DISC-analyse van het volledige team plus een systemische rapportage over wat er tussen jullie speelt. Inclusief één uur digitale debrief met Wouter. Concrete data — geen vaag advies.",
    marktgat:
      "Jullie team functioneert. Maar iedereen voelt dat het beter kan. Jullie weten het — maar je kunt het niet goed benoemen. De TeamScan + Rapport geeft jullie de taal. En de data om verder te gaan.",
    transformatie: {
      voor:
        "Jullie voelen dat het beter kan, maar kunnen niet benoemen wat er precies speelt. Hetzelfde gesprek, steeds andere uitkomst.",
      na:
        "Jullie hebben een gefundeerd rapport van de teamdynamiek. Geen vermoeden — maar analyse. Een gedeeld vertrekpunt.",
    },
    inhoud: [
      "DISC-profiel van elk teamlid via Vivynq Q.Code scan",
      "Systemische teamrapportage over patronen, rollen en dynamieken",
      "Één uur digitale debrief met Wouter — bevindingen en volgende stap",
      "Concrete aanbevelingen voor teamdynamiek en samenwerking",
    ],
    belofte: "Gesprek binnen 2 werkdagen",
    cta: "Plan een kennismakingsgesprek voor jouw team",
  },

  {
    slug: "teamscan-interventiedag",
    name: "TeamScan + Interventiedag",
    tagline: "Eén dag. Jullie systeem op tafel. Nieuwe afspraken die stand houden.",
    audience: "zakelijk",
    priceCents: 0,
    priceLabel: "Op aanvraag",
    fulfillment: "lead",
    featured: true,
    openingsstelling:
      "Jullie weten wat er speelt. Maar het uitspreken lukt niet zonder hulp. Iedere vergadering hetzelfde gesprek, nooit dezelfde uitkomst. Eén dag verandert dat.",
    beschrijving:
      "De TeamScan-data wordt 1-2 weken vooraf verzameld — de interventiedag zelf is volledig gewijd aan herkenning, dialoog en beweging. Zes uur die meer opleveren dan zes maanden vergaderen.",
    marktgat:
      "Jullie weten wat er speelt. Maar het uitspreken lukt niet zonder hulp. Iedere vergadering hetzelfde gesprek, nooit dezelfde uitkomst. De interventiedag brengt het op tafel — veilig, gefundeerd, concreet.",
    transformatie: {
      voor:
        "Hetzelfde gesprek, steeds opnieuw. Het wordt besproken maar niet opgelost — en iedereen weet het.",
      na:
        "Na één dag hebben jullie het uitgesproken wat jaren onbenoemd bleef. Met concrete afspraken die stand houden.",
    },
    inhoud: [
      "Voorbereiding: TeamScan + rapport voor alle deelnemers (1-2 weken vooraf)",
      "Interventiedag van 6 uur: herkenning, dialoog en concrete afspraken",
      "Narapportage met bevindingen en aanbevelingen voor borging",
      "Optioneel: vervolgafspraak na 6 weken om resultaat te toetsen",
    ],
    belofte: "Gesprek binnen 2 werkdagen",
    cta: "Plan een vrijblijvend gesprek over de Interventiedag",
  },

  {
    slug: "eigenaarschapstraject",
    name: "Eigenaarschapstraject",
    tagline: "Drie maanden. Een team dat ophoudt wachten en begint leiden.",
    audience: "zakelijk",
    priceCents: 0,
    priceLabel: "Op aanvraag",
    fulfillment: "lead",
    openingsstelling:
      "Eigenaarschap staat op de agenda al twee jaar. Het gedrag is nog niet veranderd. Jullie team is vakbekwaam — het onderlinge systeem staat groei in de weg.",
    beschrijving:
      "Het diepste B2B-traject van Vivynq: zes begeleide sessies over drie maanden, gebouwd op DISC-inzicht en systemisch teamwerk. Voor teams in zorg, onderwijs en gemeente die eigenaarschap structureel willen verankeren.",
    marktgat:
      "Eigenaarschap staat op de agenda al twee jaar. Het gedrag is nog niet veranderd. Jullie team is vakbekwaam — het systeem staat groei in de weg. Dit traject doorbreekt dat op de plek waar het begint: het onderlinge systemische veld.",
    transformatie: {
      voor:
        "Eigenaarschap wordt besproken maar niet geleefd. Het is een woord op de agenda — geen gedrag in de kamer.",
      na:
        "Drie maanden later is eigenaarschap geen thema meer. Het is gewoon hoe jullie werken.",
    },
    inhoud: [
      "TeamScan + Rapport als nulmeting (inclusief debrief)",
      "Zes begeleide sessies over drie maanden — team én individu",
      "Systemisch teamwerk op patronen, rollen en eigenaarschap",
      "Tussenmeting na zes weken — voortgang in kaart",
      "Eindrapportage met aanbevelingen voor structurele borging",
      "Optioneel: individuele 1:1 sessies voor teamleden",
    ],
    belofte: "Gesprek binnen 2 werkdagen",
    cta: "Vertel ons over jouw team — we denken mee",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const PARTICULIER = PRODUCTS.filter(
  (p) => p.audience === "particulier" && p.fulfillment !== "lead",
);

export const PARTICULIER_MET_COACHTRAJECT = PRODUCTS.filter(
  (p) => p.audience === "particulier",
);

export const ZAKELIJK = PRODUCTS.filter((p) => p.audience === "zakelijk");

export const ONLINE_PROGRAMMAS = PRODUCTS.filter(
  (p) => p.fulfillment === "program",
);

export const B2C_INSTAP = PRODUCTS.filter(
  (p) => p.audience === "particulier" && (p.fulfillment === "scan" || p.fulfillment === "order"),
);

export const NU_BESCHIKBAAR = PRODUCTS.filter(
  (p) => p.isNuBeschikbaar === true,
);
