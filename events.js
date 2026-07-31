/*  ╔══════════════════════════════════════════════════════════════════════╗
    ║                                                                      ║
    ║   📅  EVENTI ACADEMY — FILE DI TEST  📅                            ║
    ║                                                                      ║
    ║   ⚠️  QUESTO È UN FILE DI TEST                                     ║
    ║       Finestra vacanze impostata da OGGI (31/07) a fine agosto     ║
    ║       per verificare il banner e l'animazione.                     ║
    ║       Include eventi di settembre per la fase "calendario"          ║
    ║       dell'animazione.                                              ║
    ║                                                                      ║
    ║   Per tornare in produzione: rimettere la finestra vacanze          ║
    ║   reale (01/08 - 31/08) o svuotarla (inizio:"", fine:"").          ║
    ║                                                                      ║
    ╚══════════════════════════════════════════════════════════════════════╝ */


/* ═══════════════════════════════════════
   SEZIONE 0 — PAUSA ESTIVA (VACANZE)
   ⚠️ TEST: parte da OGGI 31/07/2026
   ═══════════════════════════════════════ */

var VACANZE = {
  inizio: "31/07/2026",     /* TEST: da oggi */
  fine:   "31/08/2026",     /* fino a fine agosto */
};


/* ═══════════════════════════════════════
   SEZIONE 1 — WEBINAR
   Visibili su ENTRAMBI gli iframe
   (diretta e indiretta)

   Nota test: gli eventi di luglio sono nel
   passato. Quelli di SETTEMBRE servono per
   la fase "calendario" dell'animazione
   (cosa vede il cliente dopo i 20s di banner).
   ═══════════════════════════════════════ */

var WEBINAR = [
  { data:"01/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Overview",                                       link:"https://academy.wolterskluwer.it/learn/learning-plans/55/overview?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"01/09/2026", ora_inizio:"11:15", ora_fine:"12:15", titolo:"Contabilità Generale Base ed Estratto Conto",    link:"https://academy.wolterskluwer.it/learn/learning-plans/79/contabilita-generale-base-ed-estratto-conto?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"03/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Contabilità IVA base",                           link:"https://academy.wolterskluwer.it/learn/learning-plans/46/contabilita-iva-base?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"08/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Cespiti e leasing",                              link:"https://academy.wolterskluwer.it/learn/learning-plans/41/cespiti-e-leasing?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"10/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Bilancio Base e Avanzato",                       link:"https://academy.wolterskluwer.it/learn/learning-plans/39/bilancio-base?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"15/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Modello Redditi Società",                        link:"https://academy.wolterskluwer.it/learn/learning-plans/54/modello-redditi-societa?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
];


/* ═══════════════════════════════════════
   SEZIONE 2 — Q&A
   Visibili SOLO su iframe DIRETTA
   ═══════════════════════════════════════ */

var QA = [
  { data:"04/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Sessione di Q&A",      link:"https://academy.wolterskluwer.it/learn/learning-plans/76/sessione-di-qa?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
  { data:"11/09/2026", ora_inizio:"10:00", ora_fine:"11:00", titolo:"Sessione di Q&A",      link:"https://academy.wolterskluwer.it/learn/learning-plans/76/sessione-di-qa?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
];


/* ═══════════════════════════════════════
   SEZIONE 3 — ACADEMY TALKS
   Visibili su ENTRAMBI gli iframe
   ═══════════════════════════════════════ */

var TALKS = [
  { data:"17/09/2026", ora_inizio:"11:00", ora_fine:"12:00", titolo:"Costruire una strategia AI in studio", link:"https://academy.wolterskluwer.it/learn/courses/706/luglio-2026-costruire-una-strategia-ai-in-studio?utm_source=calendario_eventi&utm_medium=link&utm_campaign=test" },
];
