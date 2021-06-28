$().ready(() => {
  Sortable.create(towatch, {
    group: 'shared',
    animation: 150
  }); new Sortable(toeat, {
    group: 'shared',
    animation: 150
  });
  ; new Sortable(toread, {
    group: 'shared',
    animation: 150
  });
  ; new Sortable(tobuy, {
    group: 'shared',
    animation: 150
  });
});
