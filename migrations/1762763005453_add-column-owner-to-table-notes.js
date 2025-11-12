export const up = (pgm) => {
  pgm.addColumn('notes', {
    owner: {
      type: 'VARCHAR(30)',
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('notes', 'owner');
};
