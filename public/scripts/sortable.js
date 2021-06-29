$(document).ready(function() {
Sortable.create(towatch, {
    group: 'shared',
    animation: 150,
    removeOnSpill: true,
    store: {
      /**
       * Get the order of elements. Called once during initialization.
       * @param   {Sortable}  sortable
       * @returns {Array}
       */
      get: function (sortable) {
        var order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split('|') : [];
      },

      /**
       * Save the order of elements. Called onEnd (when the item is dropped).
       * @param {Sortable}  sortable
       */
      set: function (sortable) {
        var order = sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join('|'));
      }
    }
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
