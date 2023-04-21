const db = require('../../pool-connection')
var util = require('util')

const get_ledgre = async(res) =>{
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err);
            const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let searchresult = await execquery('SELECT * FROM ledgre_entity ORDER BY date DESC');
                    console.log(searchresult);
                    res.send(searchresult);
                } catch (error) {
                    console.log(error);
                    res.send(error);
                }
                connection.release();
        });                       
    }catch(error){
        console.log(error);
        res.send(error)
    }
}

module.exports = get_ledgre;