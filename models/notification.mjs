import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ".data/db.sqlite3",
  logging: false, // ログを出したい時は trueにする
});

const Notification = sequelize.define("Notification", {
  guildId: {
    type: DataTypes.STRING,
  },
  voiceChannelId: {
    type: DataTypes.STRING,
  },
  textChannelId: {
    type: DataTypes.STRING,
  },
});

export default Notification;
