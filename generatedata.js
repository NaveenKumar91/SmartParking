const fs = require('fs');

// Slot Prefixes
const slotLetters = ['A', 'B', 'C', 'D', 'E'];
const states = ['TN', 'KA', 'MH', 'DL', 'GJ'];

function randomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomVehicleNumber() {
  const state = randomArrayItem(states);
  const digits = Math.floor(10 + Math.random() * 90); // 2 digits
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                  String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 2 letters
  const numbers = Math.floor(1000 + Math.random() * 9000); // 4 digits
  return `${state}${digits}${letters}${numbers}`;
}

function randomPastDate() {
  const daysAgo = Math.floor(Math.random() * 7); // within 7 days
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

const slots = [];
for (let i = 1; i <= 50; i++) {
  const letter = randomArrayItem(slotLetters);
  const isOccupied = Math.random() > 0.5; // 50% of slots will be occupied

  slots.push({
    id: i,
    slotNumber: `${letter}${i}`,                            // A1, B1, C1, D1...
    occupied: isOccupied,
    vehicleNumber: isOccupied ? randomVehicleNumber() : "", // if occupied generate number
    entryTime: isOccupied ? randomPastDate() : ""
  });
}

const db = { slots };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("db.json generated with realistic parking data!");
