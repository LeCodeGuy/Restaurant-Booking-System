const restaurant = (db) => {

    async function getTables() {
        // get all the available tables
        let availableTables = await db.any("SELECT * FROM table_booking WHERE booked = false");
        
        return availableTables;
    }

    async function bookTable({tableName,username,phoneNumber,seats}) {
        let table = await db.any("SELECT * FROM table_booking WHERE table_name = $1",[tableName]);;
        let result = "";
        
        // check parameters passed
        if(table[0] === undefined){
            console.log("No Name");
            result = "Invalid table name provided";
        }
        else if(username === undefined){
            console.log("No userName");
            result = "Please enter a username";
        }
        else if(phoneNumber === undefined){
            console.log("No number");
            result = "Please enter a contact number";
        }
        else if(seats === undefined){
            console.log("No number guests");
            result= "Please enter number of guests"
        }
        else if(seats > table[0].capacity){
            console.log("capacity issues");
            result = "capacity greater than the table seats";
        }
        else{
            console.log("book table");
            // book a table by name
            return await db.any("UPDATE table_booking SET booked = true,username = $2,contact_number = $3,number_of_people = $4 WHERE table_name = $1;",[tableName,username,phoneNumber,seats]);
        }
        return result;
    }

    async function getBookedTables() {
        // get all the booked tables
        let bookedTables = await db.any("SELECT * FROM table_booking WHERE booked = true");

        return bookedTables;
    }

    async function isTableBooked(tableName) {
        // get booked table by name
        let result = await db.oneOrNone("SELECT booked FROM table_booking WHERE table_name = $1",[tableName]);
        //console.log(result.booked);
        return result.booked;
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
        await db.none("UPDATE table_booking SET booked = false,username = null,contact_number = null,number_of_people = null WHERE table_name = $1",[tableName])
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
        await db.none("SELECT * FROM table_booking WHERE username = $1",[username]);
    }

    return {
        getTables,
        bookTable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        //editTableBooking,
        getBookedTablesForUser
    }
}

export default restaurant;