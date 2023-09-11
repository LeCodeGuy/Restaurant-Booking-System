export default function bookingRoutes (query) {
    let tables=[];
    
    async function loadTables(){
        tables = await query.getTables();
        return tables;
    }

    return{
        loadTables,
    };
}