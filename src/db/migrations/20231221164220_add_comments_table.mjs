export const up = async (knex) => {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.text("content").notNullable()
    table.timestamps(true, true)
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("comments")
}
