// Supporto Genya clienti non certificati: popup, controlli del modulo e conferma di invio.
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
  var inviato = document.getElementById('inviato');

  // Dopo l'invio Zoho riporta qui con ?inviato=1: niente popup, solo la conferma.
  var params = new URLSearchParams(window.location.search);
  if (params.get('inviato') === '1') {
    gate.hidden = true;
    inviato.hidden = false;
    inviato.focus();
  } else {
    gateOk.focus();
  }

  gateOk.addEventListener('click', function () {
    gate.hidden = true;
    document.getElementById('f-nome').focus();
  });

  // Indirizzo di ritorno: questa stessa pagina, con il segnale di invio avvenuto.
  document.getElementById('returnURL').value =
    window.location.origin + window.location.pathname + '?inviato=1';

  descr.addEventListener('input', function () {
    var n = descr.value.trim().length;
    cont.textContent = n >= MIN_DESCR ? n + ' caratteri' : n + '/' + MIN_DESCR;
  });

  var regole = [
    { id: 'f-nome', msg: 'Inserisci il nome.' },
    { id: 'f-cognome', msg: 'Inserisci il cognome.' },
    { id: 'f-email', msg: 'Inserisci un indirizzo e-mail valido, ad esempio nome@studio.it.',
      test: function (el) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()); } },
    { id: 'f-tel', msg: 'Inserisci un numero di telefono valido (almeno 6 cifre).',
      test: function (el) { return (el.value.match(/[0-9]/g) || []).length >= 6 && el.checkValidity(); } },
    { id: 'f-azienda', msg: 'Inserisci il nome dello studio o dell\'azienda.' },
    { id: 'f-codice', msg: 'Inserisci il codice cliente WK.' },
    { id: 'f-oggetto', msg: 'Inserisci l\'oggetto della richiesta.' },
    { id: 'f-descr', msg: 'Descrivi il problema in almeno ' + MIN_DESCR + ' caratteri.',
      test: function (el) { return el.value.trim().length >= MIN_DESCR; } },
    { id: 'f-file', msg: 'L\'allegato supera i 20 MB: scegli un file più piccolo.',
      test: function (el) { return !el.files.length || el.files[0].size <= MAX_FILE; } }
  ];

  function valido(r, el) {
    if (r.test) return r.test(el);
    return el.value.trim().length > 0;
  }

  function controlla(r) {
    var el = document.getElementById(r.id);
    var err = document.getElementById(r.id + '-err');
    var ok = valido(r, el);
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (err) {
      err.textContent = ok ? '' : r.msg;
      if (ok) el.removeAttribute('aria-errormessage');
      else { err.id = r.id + '-err'; el.setAttribute('aria-errormessage', err.id); }
    }
    return ok;
  }

  regole.forEach(function (r) {
    var el = document.getElementById(r.id);
    var evento = (el.type === 'checkbox' || el.type === 'file') ? 'change' : 'blur';
    el.addEventListener(evento, function () {
      if (el.getAttribute('aria-invalid') !== null || el.value) controlla(r);
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
  });
})();
