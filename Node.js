console.log("My name is Qian Jialiang English name is Hunter my Student ID is 714");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});


// user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// create the table if not exists
db.run('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title714 TEXT, author714 TEXT, ISBN714 TEXT, description714 TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Books Table created successfully');

    commandInterface();
});

function listBooks() {
    // list all books
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.ID}, Title714: ${row.title714}, Author714: ${row.author714}, ISBN714: ${row.ISBN714}, Description714: ${row.description714}`);
        });
    });
}
// queue -> task 1(callback)
function commandInterface() {
    readline.question('Enter book title714: ', (title714) => {
        readline.question('Enter book author714: ', (author714) => {
            readline.question('Enter book ISBN714: ', (ISBN714) => {
                readline.question('Enter book description714: ', (description714) => {
                    // insert the book into the database
                    db.run('INSERT INTO books (title714, author714, ISBN714, description714) VALUES (?, ?, ?, ?)', [title714, author714, ISBN714, description714], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        readline.question('Do you want to add another book? (yes/no): ', (answer) => {
                            if (answer === 'yes') {
                                commandInterface();
                            } else {
                                listBooks();
                                
                                readline.close();
                            }
                        });
                    });
                });
            });
        });
    });
    // callback hell
}