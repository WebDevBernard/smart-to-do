$(document).ready(function() {
Sortable.create(towatch, {
    group: 'shared',
    animation: 150,
    removeOnSpill: true
  }); new Sortable(toeat, {
    group: 'shared',
    animation: 150,
    removeOnSpill: true
  });
  ; new Sortable(toread, {
    group: 'shared',
    animation: 150,
    removeOnSpill: true
  });
  ; new Sortable(tobuy, {
    group: 'shared',
    animation: 150,
    removeOnSpill : true
  });
});
