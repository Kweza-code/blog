export const up = async (knex) => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.string("title", 255).notNullable()
    table.text("content").notNullable()
    table.timestamp("published_at").nullable()
    table.boolean("is_published").defaultTo(false)
    table.timestamps(true, true)
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("posts")
}
