// Supporto Genya clienti non certificati: popup, controlli del modulo, invio a Zoho e conferma.
(function () {
  'use strict';

  var MIN_DESCR = 50;
  var MAX_FILE = 20 * 1024 * 1024;

  var gate = document.getElementById('gate');
  var gateOk = document.getElementById('gate-ok');
  var form = document.getElementById('modulo');
  var box = document.getElementById('errori');
  var descr = document.getElementById('f-descr');
  var cont = document.getElementById('f-descr-cont');
  var file = document.getElementById('f-file');
  var fileNome = document.getElementById('f-file-nome');
  var inviato = document.getElementById('inviato');
  var sink = document.getElementById('zoho-invio');
  var inAttesa = false;

  function chiudiGate() {
    gate.hidden = true;
    document.body.classList.remove('gate-aperto');
  }

  function mostraConferma() {
    chiudiGate();
    form.hidden = true;
    inviato.hidden = false;
    window.scrollTo(0, 0);
    inviato.focus();
  }

  // Popup aperto all'arrivo, tranne se si torna da un invio (?inviato=1).
  if (new URLSearchParams(window.location.search).get('inviato') === '1') {
    mostraConferma();
  } else {
    document.body.classList.add('gate-aperto');
    gateOk.focus();
  }

  gateOk.addEventListener('click', function () {
    chiudiGate();
    document.getElementById('f-nome').focus();
  });

  // Zoho ignora questo campo e usa l'indirizzo configurato nel modulo: resta come riserva.
  document.getElementById('returnURL').value =
    window.location.origin + window.location.pathname + '?inviato=1';

  function aggiornaConta() {
    var n = descr.value.trim().length;
    var ok = n >= MIN_DESCR;
    cont.textContent = ok ? n + ' caratteri' : n + '/' + MIN_DESCR;
    cont.classList.toggle('ok', ok);
  }
  descr.addEventListener('input', aggiornaConta);

  file.addEventListener('change', function () {
    fileNome.textContent = file.files.length ? file.files[0].name : 'Nessun file selezionato';
  });

  var regole = [
    { id: 'f-nome', msg: 'Inserisci il nome.' },
    { id: 'f-cognome', msg: 'Inserisci il cognome.' },
    { id: 'f-email', msg: 'Inserisci un indirizzo e-mail valido, ad esempio nome@studio.it.',
      test: function (el) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()); } },
    { id: 'f-tel', msg: 'Inserisci un numero di telefono valido (almeno 6 cifre).',
      test: function (el) { return (el.value.match(/[0-9]/g) || []).length >= 6 && el.checkValidity(); } },
    { id: 'f-azienda', msg: 'Inserisci il nome dello studio o dell\'azienda.' },
    { id: 'f-codice', msg: 'Inserisci il codice cliente WK: senza non possiamo riconoscerti.' },
    { id: 'f-oggetto', msg: 'Inserisci l\'oggetto della richiesta.' },
    { id: 'f-descr', msg: 'Descrivi il problema in almeno ' + MIN_DESCR + ' caratteri.',
      test: function (el) { return el.value.trim().length >= MIN_DESCR; } },
    { id: 'f-file', msg: 'L\'allegato supera i 20 MB: scegli un file più piccolo.',
      test: function (el) { return !el.files.length || el.files[0].size <= MAX_FILE; } }
  ];

  function controlla(r) {
    var el = document.getElementById(r.id);
    var err = document.getElementById(r.id + '-err');
    var ok = r.test ? r.test(el) : el.value.trim().length > 0;
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (ok) el.removeAttribute('aria-errormessage');
    else el.setAttribute('aria-errormessage', err.id);
    err.textContent = ok ? '' : r.msg;
    return ok;
  }

  regole.forEach(function (r) {
    var el = document.getElementById(r.id);
    var evento = el.type === 'file' ? 'change' : 'blur';
    el.addEventListener(evento, function () {
      if (el.getAttribute('aria-invalid') !== null || el.value) controlla(r);
    });
    // Mentre si corregge un campo segnalato, l'errore sparisce appena il valore va bene.
    el.addEventListener('input', function () {
      if (el.getAttribute('aria-invalid') === 'true') controlla(r);
    });
  });

  form.addEventListener('submit', function (e) {
    var sbagliati = regole.filter(function (r) { return !controlla(r); });
    if (sbagliati.length) {
      e.preventDefault();
      box.hidden = false;
      box.textContent = sbagliati.length === 1
        ? 'C\'è un campo da sistemare prima di inviare.'
        : 'Ci sono ' + sbagliati.length + ' campi da sistemare prima di inviare.';
      document.getElementById(sbagliati[0].id).focus();
      return;
    }
    box.hidden = true;
    var btn = document.getElementById('invia');
    btn.disabled = true;
    btn.textContent = 'Invio in corso…';
    inAttesa = true;
  });

  // La risposta di Zoho arriva nell'iframe nascosto: a quel punto la richiesta è stata ricevuta.
  sink.addEventListener('load', function () {
    if (!inAttesa) return;
    inAttesa = false;
    form.reset();
    aggiornaConta();
    mostraConferma();
  });
})();
