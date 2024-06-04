const fetch = require('node-fetch');

// Step 1: Create a list of all Bible verse references
const bibleReferences = [];

// Adding books of the Bible with their chapters and verses (simplified for this example)
const books = {
    'Genesis': 50,
    'Exodus': 40,
    'Leviticus': 27,
    'Numbers': 36,
    'Deuteronomy': 34,
    'Joshua': 24,
    'Judges': 21,
    'Ruth': 4,
    '1 Samuel': 31,
    '2 Samuel': 24,
    '1 Kings': 22,
    '2 Kings': 25,
    '1 Chronicles': 29,
    '2 Chronicles': 36,
    'Ezra': 10,
    'Nehemiah': 13,
    'Esther': 10,
    'Job': 42,
    'Psalms': 150,
    'Proverbs': 31,
    'Ecclesiastes': 12,
    'Song of Solomon': 8,
    'Isaiah': 66,
    'Jeremiah': 52,
    'Lamentations': 5,
    'Ezekiel': 48,
    'Daniel': 12,
    'Hosea': 14,
    'Joel': 3,
    'Amos': 9,
    'Obadiah': 1,
    'Jonah': 4,
    'Micah': 7,
    'Nahum': 3,
    'Habakkuk': 3,
    'Zephaniah': 3,
    'Haggai': 2,
    'Zechariah': 14,
    'Malachi': 4,
    'Matthew': 28,
    'Mark': 16,
    'Luke': 24,
    'John': 21,
    'Acts': 28,
    'Romans': 16,
    '1 Corinthians': 16,
    '2 Corinthians': 13,
    'Galatians': 6,
    'Ephesians': 6,
    'Philippians': 4,
    'Colossians': 4,
    '1 Thessalonians': 5,
    '2 Thessalonians': 3,
    '1 Timothy': 6,
    '2 Timothy': 4,
    'Titus': 3,
    'Philemon': 1,
    'Hebrews': 13,
    'James': 5,
    '1 Peter': 5,
    '2 Peter': 3,
    '1 John': 5,
    '2 John': 1,
    '3 John': 1,
    'Jude': 1,
    'Revelation': 22
};

// Generate references for each verse
for (const book in books) {
    const chapters = books[book];
    for (let chapter = 1; chapter <= chapters; chapter++) {
        // Assuming an average of 30 verses per chapter for simplicity
        for (let verse = 1; verse <= 30; verse++) {
            bibleReferences.push(`${book} ${chapter}:${verse}`);
        }
    }
}

// Step 2: Function to generate a random index and return a reference
function getRandomBibleReference() {
    const randomIndex = Math.floor(Math.random() * bibleReferences.length);
    return bibleReferences[randomIndex];
}

// Step 3: Function to fetch a verse from the Bible API
async function fetchBibleVerse(reference) {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Step 4: Randomly select a verse and print it
async function printRandomBibleVerse() {
    const reference = getRandomBibleReference();
    try {
        const verse = await fetchBibleVerse(reference);
        console.log(`${verse.reference} - "${verse.text}"`);
    } catch (error) {
        console.error('Error fetching verse:', error);
    }
}

// Example usage
printRandomBibleVerse();
