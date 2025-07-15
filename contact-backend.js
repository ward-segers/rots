require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, _replyto, message } = req.body;
  if (!name || !_replyto || !message) {
    return res.status(400).json({ error: 'Vul alle velden in.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `info@jehuisopderotsbouwen.be <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: 'Nieuw bericht via contactformulier',
      replyTo: _replyto,
      text: `Naam: ${name}\nE-mail: ${_replyto}\nBericht: ${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Er ging iets mis bij het verzenden.' });
  }
});

app.post('/api/inschrijven', async (req, res) => {
  const {
    'name-her': nameHer,
    'email-her': emailHer,
    'straat-her': straatHer,
    'huisnummer-her': huisnummerHer,
    'bus-her': busHer,
    'postcode-her': postcodeHer,
    'gemeente-her': gemeenteHer,
    'phone-her': phoneHer,
    'name-him': nameHim,
    'email-him': emailHim,
    'straat-him': straatHim,
    'huisnummer-him': huisnummerHim,
    'bus-him': busHim,
    'postcode-him': postcodeHim,
    'gemeente-him': gemeenteHim,
    'phone-him': phoneHim,
    relatiestatus,
    message
  } = req.body;

  if (!nameHer || !emailHer || !straatHer || !huisnummerHer || !postcodeHer || !gemeenteHer || !phoneHer || !nameHim || !emailHim || !straatHim || !huisnummerHim || !postcodeHim || !gemeenteHim || !phoneHim || !relatiestatus || !message) {
    return res.status(400).json({ error: 'Vul alle velden in.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>Nieuwe inschrijving via het formulier</h2>
      <h3>Haar gegevens</h3>
      <ul>
        <li><b>Naam:</b> ${nameHer}</li>
        <li><b>E-mail:</b> ${emailHer}</li>
        <li><b>Adres:</b> ${straatHer} ${huisnummerHer}${busHer ? ' bus ' + busHer : ''}, ${postcodeHer} ${gemeenteHer}</li>
        <li><b>Telefoon:</b> ${phoneHer}</li>
      </ul>
      <h3>Zijn gegevens</h3>
      <ul>
        <li><b>Naam:</b> ${nameHim}</li>
        <li><b>E-mail:</b> ${emailHim}</li>
        <li><b>Adres:</b> ${straatHim} ${huisnummerHim}${busHim ? ' bus ' + busHim : ''}, ${postcodeHim} ${gemeenteHim}</li>
        <li><b>Telefoon:</b> ${phoneHim}</li>
      </ul>
      <p><b>Relatie-situatie:</b> ${relatiestatus}</p>
      <p><b>Bericht:</b><br>${message.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: `info@jehuisopderotsbouwen.be <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: 'Nieuwe inschrijving via inschrijf-formulier',
      replyTo: emailHer,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Er ging iets mis bij het verzenden.' });
  }
});

// Only serve index.html for non-API, non-static GET requests
app.get(/^\/(?!api\/|css\/|src\/|styles\/|archive\/|favicon\.ico).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Contact backend running on port ${PORT}`);
});
