import express from 'express';
import cors from 'cors';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// IMAP connection setup
const createImapConnection = (config) => {
  return new Imap({
    user: config.email,
    password: config.password,
    host: config.imapHost,
    port: parseInt(config.imapPort),
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  });
};

// Test IMAP connection
app.post('/api/test-connection', async (req, res) => {
  const config = req.body;
  const imap = createImapConnection(config);

  try {
    await new Promise((resolve, reject) => {
      imap.once('ready', () => {
        console.log('Connected successfully');
        imap.end();
        resolve();
      });

      imap.once('error', (err) => {
        console.error('Connection error:', err);
        reject(err);
      });

      imap.connect();
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to connect:', error);
    res.status(500).json({ error: 'Failed to connect to IMAP server' });
  }
});

// Fetch emails
app.post('/api/emails', async (req, res) => {
  const config = req.body;
  const imap = createImapConnection(config);

  try {
    const emails = await new Promise((resolve, reject) => {
      const emails = [];

      imap.once('ready', () => {
        imap.openBox('INBOX', false, (err, box) => {
          if (err) return reject(err);

          const fetch = imap.seq.fetch('1:50', {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            struct: true
          });

          fetch.on('message', (msg) => {
            const email = {};

            msg.on('body', (stream, info) => {
              if (info.which === 'TEXT') {
                simpleParser(stream)
                  .then((parsed) => {
                    email.content = parsed.text;
                  })
                  .catch((err) => reject(err));
              } else {
                let headerData = '';
                stream.on('data', (chunk) => {
                  headerData += chunk.toString('utf8');
                });
                stream.on('end', () => {
                  email.headers = Imap.parseHeader(headerData);
                });
              }
            });

            msg.once('attributes', (attrs) => {
              email.uid = attrs.uid;
              email.flags = attrs.flags;
            });

            msg.once('end', () => {
              emails.push(email);
            });
          });

          fetch.once('error', reject);
          fetch.once('end', () => {
            imap.end();
            resolve(emails);
          });
        });
      });

      imap.once('error', reject);
      imap.connect();
    });

    const formattedEmails = emails.map(email => ({
      id: email.uid,
      subject: email.headers.subject?.[0] || 'No Subject',
      sender: email.headers.from?.[0] || 'Unknown Sender',
      preview: email.content?.substring(0, 100) || '',
      time: email.headers.date?.[0],
      read: email.flags?.includes('\\Seen') || false
    }));

    res.json(formattedEmails);
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});