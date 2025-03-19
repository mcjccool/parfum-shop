// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Automatische Port-Erkennung für Render

// ✅ Erlaubt externe Zugriffe (CORS)
const corsOptions = {
  origin: "*", // Erlaubt alle Domains
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const orders = [];
let orderId = 1;

const users = [
  { id: 1718372193908, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 1718372193909, name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
];

const products = [
  {
    id: 1,
    name: "Accento",
    brand: "Xerjoff",
    sizes: [
      { size: "2ml", price: 7.95 },
      { size: "5ml", price: 14.95 },
      { size: "10ml", price: 24.95 },
    ],
    description: "Xerjoff Accento ist ein luxuriöser Duft, der frische und würzige Noten kombiniert. Die Kopfnote besteht aus Ananas und Hyazinthe, die Herznote aus Jasmin und Iris, und die Basisnote enthält Vanille, Moschus und Amber. Der Duft ist sowohl elegant als auch exotisch, ideal für besondere Anlässe.",
    suitableSeasons: ["Frühling", "Sommer", "Herbst"],
    notes: {
      top: "Ananas, Hyazinthe",
      heart: "Iris, Jasmin, rosa Pfeffer",
      base: "Moschus, Vetiver, Amber, Vanille, Patschuli"
    },
    longevity: 4,
    sillage: 3.5,
    gender: "Unisex",
    imageUrl: "/images/imageA.jpg"
  },
  {
    id: 2,
    name: "Erba Pura",
    brand: "Xerjoff",
    sizes: [
      { size: "2ml", price: 7.95 },
      { size: "5ml", price: 14.95 },
      { size: "10ml", price: 24.95 },
    ],
    description: "Xerjoff Erba Pura ist ein lebhafter und fruchtiger Duft. Die Kopfnote enthält sizilianische Orange, kalabrische Bergamotte und sizilianische Zitrone, die Herznote ist ein fruchtiges Bouquet, und die Basisnote umfasst weiße Moschus, Madagaskar-Vanille und Amber. Dieser Duft besticht durch seine spritzige Frische und süße Eleganz, ideal für dynamische und stilbewusste Menschen.",
    suitableSeasons: ["Frühling", "Sommer"],
    notes: {
      top: "sizilianische Orange, kalabrische Bergamotte, sizilianische Zitrone",
      heart: "Früchte",
      base: "Weisser Moschus, Madagaskar-Vanille, Amber"
    },
    longevity: 5,
    sillage: 4,
    gender: "Unisex, eher weiblich",
    imageUrl: "/images/imageB.jpg"
  },
  {
    id: 3,
    name: "Naxos",
    brand: "Xerjoff",
    sizes: [
      { size: "2ml", price: 7.95 },
      { size: "5ml", price: 14.95 },
      { size: "10ml", price: 24.95 },
    ],
    description: "Xerjoff Naxos ist ein intensiver und verführerischer Duft. Die Kopfnote besteht aus Bergamotte, Zitrone und Lavendel, die Herznote aus Zimt, Honig und Jasmin, und die Basisnote enthält Tabak, Tonkabohne und Vanille. Dieser Duft vereint Wärme und Raffinesse, ideal für einen unvergesslichen Auftritt.",
    suitableSeasons: ["Winter", "Herbst"],
    notes: {
      top: "Lavendel, Bergamotte, Zitrone",
      heart: "Zimt, Honig, Cashmeran, arabischer Jasmin",
      base: "Tabakblatt, Vanille, Tonkabohne"
    },
    longevity: 4,
    sillage: 4,
    gender: "Unisex, eher männlich",
    imageUrl: "/images/imageC.jpg"
  },
  {
    id: 4,
    name: "More than Words",
    brand: "Xerjoff",
    sizes: [
      { size: "2ml", price: 9.45 },
      { size: "5ml", price: 17.95 },
      { size: "10ml", price: 29.95 },
    ],
    description: "Xerjoff More Than Words ist ein opulenter und faszinierender Duft. Die Kopfnote vereint fruchtige und florale Noten, während die Herznote aus edlen Harzen und Gewürzen besteht. Die Basisnote rundet den Duft mit warmem Oud und Amber ab. Dieser Duft verkörpert Luxus und Tiefe, ideal für besondere Momente und anspruchsvolle Duftliebhaber.",
    suitableSeasons: ["Winter", "Herbst"],
    notes: {
      top: "fruchtige Noten, florale Noten",
      heart: "edles Harz, Gewürzen",
      base: "Amber, Oud"
    },
    longevity: 5,
    sillage: 4.5,
    gender: "Unisex",
    imageUrl: "/images/imageD.jpg"
  },
  {
    id: 5,
    name: "Renaissance",
    brand: "Xerjoff",
    sizes: [
      { size: "2ml", price: 7.95 },
      { size: "5ml", price: 14.95 },
      { size: "10ml", price: 24.95 },
    ],
    description: "Xerjoff Renaissance ist ein frischer und lebhafter Duft. Die Kopfnote besteht aus Bergamotte, Mandarine und Zitrone. Die Herznote enthält Maiglöckchen, Pfefferminze und Rose, während die Basisnote Amber, Moschus und Zedernholz vereint. Dieser Duft ist belebend und elegant, ideal für einen erfrischenden Start in den Tag.",
    suitableSeasons: ["Frühling", "Sommer"],
    notes: {
      top: "Bergamotte, Zitrone, Mandarine",
      heart: "Minze, Maiglöckchen, Rose",
      base: "Moschus, Amber, Zederholz"
    },
    longevity: 4,
    sillage: 3.5,
    gender: "Unisex, eher männlich",
    imageUrl: "/images/imageE.jpg"
  },
  {
    id: 6,
    name: "Noir Extreme",
    brand: "Tom Ford",
    sizes: [
      { size: "2ml", price: 4.95 },
      { size: "5ml", price: 9.45 },
      { size: "10ml", price: 15.95 },
    ],
    description: "Tom Ford Noir Extreme ist ein orientalisch-würziger Duft. Die Kopfnote besteht aus Mandarine, Neroli, Safran, Muskat und Kardamom. Die Herznote enthält Mastix, Rose, Jasmin und Orangenblüte, und die Basisnote vereint Vanille, Amber, Holz und Sandelholz. Dieser Duft ist sinnlich und luxuriös, perfekt für Abendveranstaltungen und besondere Anlässe.",
    suitableSeasons: ["Winter", "Herbst"],
    notes: {
      top: "Mandarine, Safran, Neroli, Muskat, Kardamom",
      heart: "Mastix, Rose, Jasmin, Orangenblüte",
      base: "Holz, Vanille, Amber, Sandelholz"
    },
    longevity: 4,
    sillage: 3.5,
    gender: "Unisex, eher männlich",
    imageUrl: "/images/imageF.jpg"
  },
  {
    id: 7,
    name: "Fico di Amalfi",
    brand: "Acqua di Parma",
    sizes: [
      { size: "2ml", price: 4.45 },
      { size: "5ml", price: 8.95 },
      { size: "10ml", price: 14.95 },
    ],
    description: "Acqua di Parma Fico di Amalfi ist ein fruchtiger und frischer Duft. Die Kopfnote besteht aus Bergamotte, Zitrone und Grapefruit. Die Herznote enthält Feigennektar, rosa Pfeffer und Jasmin, und die Basisnote vereint Feigenholz, Zedernholz und Benzoe. Dieser Duft erinnert an mediterrane Sommer und ist ideal für den Alltag.",
    suitableSeasons: ["Sommer"],
    notes: {
      top: "Bergamotte, Zitrone, Grapefruit",
      heart: "Feigennektar, rosa Pfeffer, Jasmin",
      base: "Feigenholz, Zederholz, Benzoe"
    },
    longevity: 3,
    sillage: 2.5,
    gender: "Unisex",
    imageUrl: "/images/imageG.jpg"
  },
  {
    id: 8,
    name: "Intense Cedrat Boise",
    brand: "Mancera",
    sizes: [
      { size: "2ml", price: 4.45 },
      { size: "5ml", price: 8.45 },
      { size: "10ml", price: 13.95 },
    ],
    description: "Mancera Intense Cedrat Boise ist ein intensiver und holziger Duft. Die Kopfnote besteht aus Zitrone, schwarzer Johannisbeere und Gewürzen. Die Herznote enthält Jasmin und Patschuli, und die Basisnote vereint Zedernholz, Leder, Vanille und Moos. Dieser Duft ist kraftvoll und charismatisch, ideal für selbstbewusste Persönlichkeiten.",
    suitableSeasons: ["Frühling", "Sommer", "Herbst"],
    notes: {
      top: "Zitrusfrucht, schwarze Johannisbeere, Gewürzen",
      heart: "Jasmin, Patschuli",
      base: "Zederholz, Leder, Vanille, Moos"
    },
    longevity: 4,
    sillage: 3.5,
    gender: "Männlich",
    imageUrl: "/images/imageH.jpg"
  },
  {
    id: 9,
    name: "Sicily",
    brand: "Mancera",
    sizes: [
      { size: "2ml", price: 6.45 },
      { size: "5ml", price: 11.95 },
      { size: "10ml", price: 19.95 },
    ],
    description: "Mancera Sicily ist ein lebendiger und zitrusartiger Duft. Die Kopfnote besteht aus Mandarine, Grapefruit, Pfirsich, Ananas und Apfel. Die Herznote enthält Jasmin, Rose und Veilchen, und die Basisnote vereint Weißer Moschus und holzige Noten. Dieser Duft ist spritzig und fruchtig, perfekt für warme Sommertage.",
    suitableSeasons: ["Frühling", "Sommer"],
    notes: {
      top: "Manderine, Grapefruit, Pfirsich, Ananas, Apfel",
      heart: "Jasim, Rose",
      base: "Weisser Moschus, Holz"
    },
    longevity: 3.5,
    sillage: 3.5,
    gender: "Unisex, eher weiblich",
    imageUrl: "/images/imageI.jpg"
  },
  {
    id: 10,
    name: "Aoud Exclusif",
    brand: "Mancera",
    sizes: [
      { size: "2ml", price: 3.45 },
      { size: "5ml", price: 6.95 },
      { size: "10ml", price: 11.45 }
    ],
    description: "Mancera Aoud Exclusif ist ein intensiver und orientalischer Duft. Die Kopfnote besteht aus Labdanum, schwarzem Pfeffer, Safran und Kreuzkümmel. Die Herznote enthält Rose und Veilchen, und die Basisnote vereint Oud, Patschuli und orientalische Noten. Dieser Duft ist reichhaltig und exotisch, ideal für besondere Anlässe und kühle Abende.",
    suitableSeasons: ["Winter", "Herbst"],
    notes: {
      top: "Labdanum, schwarzer Pfeffer, Safran, Kreuzkümmel",
      heart: "Rose, Veilchen",
      base: "Patschuli, Oud, orientalische Noten"
    },
    longevity: 5,
    sillage: 4,
    gender: "Unisex, eher männlich",
    imageUrl: "/images/imageJ.jpg"
  },
  {
    id: 11,
    name: "Aoud Vanille",
    brand: "Mancera",
    sizes: [
      { size: "2ml", price: 3.45 },
      { size: "5ml", price: 6.95 },
      { size: "10ml", price: 11.45 }
    ],
    description: "Mancera Aoud Vanille ist ein warmer und verführerischer Duft. Die Kopfnote besteht aus Gewürzen. Die Herznote enthält Oud, Rose und Safran, und die Basisnote vereint Vanille, Guajakholz und Sandelholz. Dieser Duft ist opulent und sinnlich, perfekt für romantische Abende und besondere Momente.",
    suitableSeasons: ["Winter", "Herbst"],
    notes: {
      top: "Gewürze",
      heart: "Oud, Safan, Rose",
      base: "Vanille, Guajakholz, Sandelholz"
    },
    longevity: 4.5,
    sillage: 4,
    gender: "Unisex, eher weiblich",
    imageUrl: "/images/imageK.jpg"
  },
  {
    id: 12,
    name: "Ambassador",
    brand: "Gisada",
    sizes: [
      { size: "2ml", price: 4.45 },
      { size: "5ml", price: 8.95 },
      { size: "10ml", price: 14.95 },
    ],
    description: "Gisada Ambassador ist ein moderner und eleganter Duft. Die Kopfnote besteht aus Apfel, Mandarine und Kardamom. Die Herznote enthält Lavendel, Veilchen, Patschuli und Mango und die Basisnote vereint Amber, Teakholz und Vanille. Dieser Duft ist vielseitig und raffiniert, ideal für den täglichen Gebrauch und besondere Anlässe.",
    suitableSeasons: ["Winter", "Frühling", "Herbst"],
    notes: {
      top: "Apfel, Mandarine, Kardamom",
      heart: "Lavendel, Veilchen, Patschuli, Mango",
      base: "Teakholz, Vanille, Amber"
    },
    longevity: 4,
    sillage: 4,
    gender: "Männlich",
    imageUrl: "/images/imageL.jpg"
  },
  {
    id: 13,
    name: "Legend Spirit",
    brand: "Montblanc",
    sizes: [
      { size: "2ml", price: 1.95 },
      { size: "5ml", price: 3.45 },
      { size: "10ml", price: 5.95 },
    ],
    description: "Montblanc Legend Spirit ist ein frischer und aromatischer Duft. Die Kopfnote besteht aus Bergamotte, rosa Pfeffer und Grapefruit. Die Herznote enthält Lavendel, Kardamom und aquatische Noten, und die Basisnote vereint Weißer Moschus, Kaschmirholz und Eichenmoos. Dieser Duft ist dynamisch und modern, perfekt für den aktiven Mann.",
    suitableSeasons: ["Frühling", "Sommer"],
    notes: {
      top: "Bergamotte, Grapefruit, rosa Pfeffer",
      heart: "Lavendel, aquatische Noten, Kardamom",
      base: "Weisser Moschus, Kaschmirholz, Eichenmoos"
    },
    longevity: 3,
    sillage: 2.5,
    gender: "Männlich",
    imageUrl: "/images/imageM.jpg"
  }
];

// 🔍 Hilfsfunktionen für Benutzerverwaltung
const findUserById = (id) => users.find(user => user.id === parseInt(id));
const findUserByEmail = (email) => users.find(user => user.email === email);

// 🧑‍💻 API-Endpunkte
app.get('/api/users', (req, res) => {
  const { email } = req.query;
  const user = findUserByEmail(email);
  if (user) {
    res.json([user]);
  } else {
    res.status(404).json([]);
  }
});

app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (password.length < 6 || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.,<>'^`]{6,}$/.test(password)) {
    return res.status(400).json({ message: 'Das Passwort muss mindestens 6 Zeichen lang sein, mindestens 1 Buchstabe und 1 Ziffer beinhalten.' });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: 'Die E-Mail wird bereits verwendet.' });
  }

  const newUser = { id: Date.now(), firstName, lastName, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Ungültiges E-Mail oder Passwort.' });
  }

  res.json(user);
});

app.post('/api/orders', (req, res) => {
  const { userId, cart } = req.body;
  const user = findUserById(userId);

  if (!user) {
    console.error(`Unauthorized attempt with userId: ${userId}`);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newOrder = {
    id: orderId++,
    userId,
    cart,
    date: new Date().toLocaleString(),
  };

  orders.push(newOrder);
  console.log('Order placed:', newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 🚀 Starte den Server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});