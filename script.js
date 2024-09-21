    // Step 1: Create a list of all Bible verse references
        const bibleReferences = [];

        // Adding books of the Bible with their chapters and verses (exact counts)
        const books = {
            'Psalms': [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6],
            'Proverbs': [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31],
            'Matthew': [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20],
            'Mark': [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20],
            'Luke': [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53],
            'John': [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25],
        };

        // Generate references for each verse
        for (const book in books) {
            const chapters = books[book];
            for (let chapter = 1; chapter <= chapters.length; chapter++) {
                const verses = chapters[chapter - 1];
                for (let verse = 1; verse <= verses; verse++) {
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
                document.getElementById('verseDisplay').textContent = `${verse.reference} - "${verse.text}"`;
            } catch (error) {
                console.error('Error fetching verse:', error);
                document.getElementById('verseDisplay').textContent = 'Error fetching verse.';
            }
        }

        // Add event listener to the button
        document.getElementById('getVerseButton').addEventListener('click', printRandomBibleVerse);
