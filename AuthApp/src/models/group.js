import { BOOLEAN, Model, STRING } from "sequelize";

import sequelize from "../database/index.js";

class Group extends Model {};

Group.init({
    name : {
        type : STRING,
        allowNull : false,
        unique : true
    },
    read : {
        type : BOOLEAN,
        allowNull : false,
        defaultValue : 0
    },
    write : {
        type : BOOLEAN,
        allowNull : false,
        defaultValue : 0
    },
    update : {
        type : BOOLEAN,
        allowNull : false,
        defaultValue : 0
    },
    delete : {
        type : BOOLEAN,
        allowNull : false,
        defaultValue : 0
    }
},{
    sequelize,
    modelName : 'group'
});

Group.sync();

export default Group;