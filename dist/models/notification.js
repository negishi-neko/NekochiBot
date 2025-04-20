"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: ".data/db.sqlite3",
    logging: false, // ログを出したい時は trueにする
});
const Notification = sequelize.define("Notification", {
    guildId: {
        type: sequelize_1.DataTypes.STRING,
    },
    voiceChannelId: {
        type: sequelize_1.DataTypes.STRING,
    },
    textChannelId: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Notification;
