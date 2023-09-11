const restaurant = (db) => {

    async function getTables() {
        // get all the available tables
        let tables = await db.any("SELECT * FROM table_booking");

        return tables;
    }

    async function bookTable({tableName,username,phoneNumber,seats}) {
        let capacity = await db.one("SELECT capacity FROM table_booking WHERE table_name = $1",[tableName]);
        let result;

        if(capacity < seats){
            result = "capacity greater than the table seats";
        }
        else if(!username){
            result = "Please enter a username";
        }
        else{
            // book a table by name
        await db.none("UPDATE table_booking SET booked = true,username = $2,contact_number = $3,number_of_people = $4 WHERE table_name = $1;",[tableName],[username],[phoneNumber],[seats]);
        }        
    }

    async function getBookedTables() {
        // get all the booked tables
        let bookedTables = await db.any("SELECT * FROM table_booking WHERE booked = true");

        return bookedTables;
    }

    async function isTableBooked(tableName) {
        // get booked table by name
        let booked = await db.oneOrNone("SELECT booked FROM table_booking WHERE table_name = $1",[tableName]);
        return booked;
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
    }

    return {
        getTables,
        bookTable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        editTableBooking,
        getBookedTablesForUser
    }
}

export default restaurant;