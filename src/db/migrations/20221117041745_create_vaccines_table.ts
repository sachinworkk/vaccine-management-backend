import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("vaccines", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.integer("number_of_doses").notNullable();
    table.boolean("is_mandatory").defaultTo(false);
    table.string("vaccine_image_url");
    table.enum("stage", [
      "Exploratory",
      "Preclinical",
      "Clinical development",
      "Approval",
      "Pharmacovigilance",
    ]);
    table.integer("created_by").unsigned().notNullable();
    table.foreign("created_by").references("users.id").onDelete("CASCADE");
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.integer("updated_by").unsigned().nullable();
    table.foreign("updated_by").references("users.id").onDelete("CASCADE");
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("vaccines");
}
