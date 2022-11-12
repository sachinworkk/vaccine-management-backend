import Knex from "knex";
import config from "db/knexfile";

const knex = Knex(config[process.env.NODE_ENV || "development"]);

export default knex;
