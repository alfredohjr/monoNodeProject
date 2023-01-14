import { DataTypes, Model, UUIDV4, UUID, STRING, BOOLEAN } from "sequelize";

import sequelize from "../database/index.js";

class User extends Model {};

User.init({
    id : {
        type : UUID,
        allowNull : false,
        defaultValue : UUIDV4,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    email : {
        type : STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : STRING,
        allowNull : false
    },
    active : {
        type : BOOLEAN,
        defaultValue : 1
    },
    administrator : {
        type : BOOLEAN,
        defaultValue : 0
    }
},{
    sequelize,
    modelName : 'user'
});

User.sync();

export default User;