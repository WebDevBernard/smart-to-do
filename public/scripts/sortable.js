$(document).ready(function() {
Sortable.create("#to-watch", {
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
  }); new Sortable("#to-eat", {
    group: 'shared',
    animation: 150,
    removeOnSpill: true
  });
  ; new Sortable("#to-read", {
    group: 'shared',
    animation: 150,
    removeOnSpill: true
  });
  ; new Sortable("#to-buy", {
    group: 'shared',
    animation: 150,
    removeOnSpill : true
  });

});
