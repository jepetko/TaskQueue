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

    onWrite: function(store, operation, eOpts) {
        console.log('write');
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

        store.generate(8);
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
        //store.addListener( 'addrecords', this.onRecordsAdded, this );
        store.addListener( 'write', this.onWrite, this );
        store.addListener( 'beforeload', this.onBeforeLoad, this );
    },

    poll: function() {

    }
});
