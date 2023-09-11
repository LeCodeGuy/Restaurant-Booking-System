const bookings = (db) => {

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
            return result = "Invalid table name provided";
        }
        else if(username === undefined){
            return result = "Please enter a username";
        }
        else if(phoneNumber === undefined){
            return result = "Please enter a contact number";
        }
        else if(seats === undefined){
            return result= "Please enter number of guests"
        }
        else if(seats > table[0].capacity){            
            return result = "capacity greater than the table seats";
        }
        else{
            // book a table by name
            await db.any("UPDATE table_booking SET booked = true,username = $2,contact_number = $3,number_of_people = $4 WHERE table_name = $1;",[tableName,username,phoneNumber,seats]);
        }
        
    }

    async function getBookedTables() {
        // get all the booked tables
        let bookedTables = await db.any("SELECT * FROM table_booking WHERE booked = true");

        return bookedTables;
    }

    async function isTableBooked(tableName) {
        // get booked table by name
        let result = await db.oneOrNone("SELECT booked FROM table_booking WHERE table_name = $1",[tableName]);
        
        return result.booked;
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
        await db.none("UPDATE table_booking SET booked = false,username = null,contact_number = null,number_of_people = null WHERE table_name = $1",[tableName])
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
        return await db.any("SELECT * FROM table_booking WHERE username = $1",[username]);
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

export default bookings;