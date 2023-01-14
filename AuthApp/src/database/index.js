import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage : './db.sqlite3'
});

try {
    sequelize.authenticate();
    console.log("database is running")
} catch(error) {
    console.log(`not connect a database : ${error}`);
};

export default sequelize;