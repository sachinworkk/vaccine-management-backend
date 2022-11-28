import Knex from "knex";
import config from "./knexfile";

//@ts-ignore
import knexStringCase from "knex-stringcase";

const knex = Knex(
  knexStringCase(config[process.env.NODE_ENV || "development"])
);

export default knex;
