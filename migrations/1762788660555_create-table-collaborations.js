export const up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations_note_id',
    'FOREIGN KEY(note_id) REFERENCES notes(id) ON UPDATE CASCADE ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations_user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE'
  );

  pgm.createIndex('collaborations', 'note_id');
  pgm.createIndex('collaborations', 'user_id');
};

export const down = (pgm) => {
  pgm.dropTable('collaborations');
};
