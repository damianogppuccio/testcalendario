# 🏖️ Pacchetto di TEST — Modalità Vacanze

Questo pacchetto ha la **finestra vacanze impostata da oggi (31/07) a fine agosto**,
così puoi vedere subito il banner "Buone vacanze" e la sua animazione.

## Come caricare su GitHub

1. Carica tutti i file di questa cartella nel repo (stessa cartella)
2. Apri `diretta.html` o `indiretta.html` dal tuo GitHub Pages

## Cosa vedrai

1. **All'apertura** → banner spiaggia "Buone vacanze" 🌴
2. **Dopo 20 secondi** → scorre e mostra il calendario con gli eventi di SETTEMBRE
3. **Dopo altri 60 secondi** → torna al banner spiaggia
4. **...e così via in loop**

## File del pacchetto

| File | Cosa fa |
|---|---|
| `events.js` | ⚠️ TEST: vacanze da oggi + eventi di settembre |
| `calendario.js` | motore (identico alla produzione) |
| `stile.css` | stile (identico alla produzione) |
| `diretta.html` | iframe diretta (mostra Q&A) |
| `indiretta.html` | iframe indiretta (nasconde Q&A) |

## ⚠️ Per tornare in produzione

In `events.js`, sezione VACANZE, rimetti le date reali:
```javascript
var VACANZE = {
  inizio: "01/08/2026",
  fine:   "31/08/2026",
};
```
E ripristina gli eventi reali di luglio/settembre.

## Verifica differenza diretta / indiretta

- `diretta.html` → nella fase calendario vedi anche le "Sessione di Q&A"
- `indiretta.html` → nella fase calendario le Q&A NON compaiono
