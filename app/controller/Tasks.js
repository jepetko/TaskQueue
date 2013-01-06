Ext.define('TaskQueue.controller.Tasks', {
    extend: 'Ext.app.Controller',
    config: {
        models: ["TaskQueue.model.Task"],
        stores: ["TaskQueue.store.FakeTasks"],
        views:  ["TaskQueue.view.RotatingTasks", "TaskQueue.view.TaskElement"]
    },

    //////////////// Event Handlers

    onPainted: function() {
    },

    onBeforeLoad: function(store, operation, eOpts ) {
        console.log('before load');
    },

    //////////////// Methods

    launch: function() {
        console.info('launch');

        var rotatingTasks = this.getRotatingTasksView();
        rotatingTasks.on( { 'painted' : this.onPainted } );

        var store = rotatingTasks.getStore();
        this.addStoreListeners(store);

        store.generate(50);
        this.addRotatingTasksViewSpecFilters();
        store.sync();
    },

    init: function() {
        console.info('init');
    },

    getRotatingTasksView: function() {
        var tasks = Ext.ComponentQuery.query('rotatingtasks');
        if( tasks && tasks.length > 0 )
            return tasks[0];
        return null;
    },

    addStoreListeners: function(store) {
        store.addListener( 'beforeload', this.onBeforeLoad, this );
    },

    addRotatingTasksViewSpecFilters: function() {

        var view = this.getRotatingTasksView();
        var store = view.getStore();
        var ids = [];
        store.each(function (item, index, length) {
            if( ids.length < 8)
                ids.push(item.get('id'));
        });

        var topNItems = new Ext.util.Filter({
            filterFn: function(item) {
                return Ext.Array.contains( ids, item.get('id'));
            }
        });

        store.filter(topNItems);
    },

    poll: function() {

    }
});
