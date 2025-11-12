export const up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(60)',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    tags: {
      type: 'TEXT[]',
      notNull: true,
    },
    created_at: {
      type: 'VARCHAR(40)',
      notNull: true,
    },
    updated_at: {
      type: 'VARCHAR(40)',
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('notes');
};
