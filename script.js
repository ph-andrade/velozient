const sqlite3 = require('sqlite3').verbose();
const { faker } = require('@faker-js/faker'); // Atualizado para o novo pacote

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./backend/prisma/dev.db');

// Funções para gerar dados aleatórios
const manufacturers = ['Apple', 'Dell', 'HP', 'Lenovo'];
const imageUrls = [
  'https://guide-images.cdn.ifixit.com/igi/BCU4AgbFicGvFcZA.large',
  'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-computador-desktop_114360-16232.jpg',
  'https://static.vecteezy.com/ti/vetor-gratis/p1/1983732-isometrico-computador-ilustrado-em-fundo-branco-gratis-vetor.jpg',
  'https://png.pngtree.com/png-clipart/20220228/original/pngtree-mini-destop-pc-isometric-set-of-personal-computer-corporate-office-concept-png-image_7323234.png',
  ''
];

const specificationsOptions = [
  'i9 16GB 1TB SSD',
  'i7 16GB 512GB SSD',
  'i5 8GB 1TB HDD',
  'Ryzen 7 16GB 1TB SSD',
  'Ryzen 5 8GB 512GB SSD',
  'i9 32GB 2TB SSD',
  'i7 32GB 1TB SSD',
  'i5 8GB 256GB SSD',
  'Ryzen 7 32GB 1TB SSD',
  'Ryzen 5 16GB 512GB SSD'
];

function getRandomManufacturer() {
  return manufacturers[Math.floor(Math.random() * manufacturers.length)];
}

function getRandomSerialNumber(manufacturer) {
  let serialNumber;
  switch (manufacturer) {
    case 'Apple':
      // Apple serial number format: 3 letras, 1 alfanumérico (C-Z ou 0-9), 1 dígito (1-9 ou C-NP-RTY), 3 alfanuméricos, 4 alfanuméricos
      serialNumber = faker.string.alpha({ length: 3, casing: 'upper' }) + // 3 letras
        faker.helpers.arrayElement(['C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + // Letra C-Z ou número
        faker.helpers.arrayElement(['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'T', 'Y']) + // Número 1-9 ou letras C-NP-RTY
        faker.string.alphanumeric({ length: 3, casing: 'upper' }) + // 3 letras ou números
        faker.string.alphanumeric({ length: 4, casing: 'upper' }); // 4 letras ou números
      break;
    case 'Dell':
      // Dell serial number example: A1B2C3D
      serialNumber = faker.string.alphanumeric({ length: 7, casing: 'upper' });
      break;
    case 'HP':
      // HP serial number example: ABC123DEF4
      serialNumber = faker.string.alphanumeric({ length: 3, casing: 'upper' }) +
        faker.number.int({ min: 100, max: 999 }) +
        faker.string.alphanumeric({ length: 4, casing: 'upper' });
      break;
    case 'Lenovo':
      // Lenovo serial number example: 12-AB123
      serialNumber = faker.number.int({ min: 10, max: 99 }) + '-' +
        faker.string.alphanumeric({ length: 5, casing: 'upper' });
      break;
  }
  return serialNumber;
}


function getRandomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString(); // Data completa no formato Date
}

function getRandomSpecifications() {
  return specificationsOptions[Math.floor(Math.random() * specificationsOptions.length)];
}

// Criação de 1000 registros
const insertData = () => {
  const insertPromises = [];
  for (let i = 0; i < 1000; i++) {
    const manufacturer = getRandomManufacturer();
    const serialNumber = getRandomSerialNumber(manufacturer);
    const status = ['In Use', 'In Maintenance', 'Available'][Math.floor(Math.random() * 3)];
    const purchaseDate = getRandomDate(2023, 2023); // Data de compra aleatória em 2023
    const warrantyExpiryDate = getRandomDate(2024, 2024); // Data de expiração da garantia aleatória em 2024
    const specifications = getRandomSpecifications(); // Texto aleatório em inglês
    const imageURL = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    const query = `INSERT INTO computers (manufacturer, serial_number, status, purchase_date, warranty_expiry_date, specifications, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [manufacturer, serialNumber, status, formatDate(purchaseDate), formatDate(warrantyExpiryDate), specifications, imageURL];

    insertPromises.push(new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          console.error('Error inserting data:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    }));
  }

  // Executar todas as promessas de inserção
  Promise.all(insertPromises)
    .then(() => {
      console.log('Inserted 1000 records successfully.');
      db.close();
    })
    .catch((err) => {
      console.error('Error inserting records:', err);
      db.close();
    });
};

// Executar a função de inserção
insertData();
