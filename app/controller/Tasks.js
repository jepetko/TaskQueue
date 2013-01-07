Ext.define('TaskQueue.controller.Tasks', {
    extend: 'Ext.app.Controller',
    config: {
        models: ["TaskQueue.model.Task"],
        stores: ["TaskQueue.store.FakeTasks"],
        views:  ["TaskQueue.view.RotatingTasks", "TaskQueue.view.TaskElement"]
    },

    //////////////// Event Handlers

    onBeforeLoad: function(store, operation, eOpts ) {
        console.log('before load');
    },

    onAddRecords: function() {
        this.addCheckboxListeners( this.getCheckboxes() );
    },

    onUpdateRecord: function(el, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
        var rotatingTasks = this.getRotatingTasksView();
        var store = rotatingTasks.getStore();
        console.log(modifiedFieldNames);
        if( Ext.Array.contains( modifiedFieldNames, 'done' ) ) {
            this.setRotatingTasksViewSpecFilters();
        }
        store.sync();
    },

    onCheckboxChanged: function(el, newValue, oldValue, eOpts) {
    },

    //////////////// Methods

    launch: function() {
        console.info('launch');

        var rotatingTasks = this.getRotatingTasksView();

        var store = rotatingTasks.getStore();
        this.addStoreListeners(store);

        store.generate(50);
        this.setRotatingTasksViewSpecFilters();
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

    getCheckboxes: function() {
        return Ext.ComponentQuery.query('rotatingtasks checkboxfield');
    },

    addStoreListeners: function(store) {
        store.on( 'beforeload', this.onBeforeLoad, this );
        store.on( 'addrecords', this.onAddRecords, this );
        store.on( 'updaterecord', this.onUpdateRecord, this );
    },

    setRotatingTasksViewSpecFilters: function() {

        var view = this.getRotatingTasksView();
        var store = view.getStore();
        var ids = [];
        store.each(function (item, index, length) {
            if( ids.length < 8 && item.get('done') === false)
                ids.push(item.get('id'));
        });

        var topNItems = new Ext.util.Filter({
            filterFn: function(item) {
                return Ext.Array.contains( ids, item.get('id'));
            }
        });

        store.filter(topNItems);
    },

    addCheckboxListeners: function(checkboxes) {
        for(var i=0; i<checkboxes.length; i++) {
            if( checkboxes[i].hasListener('change'))
                continue;
            checkboxes[i].on( 'change', this.onCheckboxChanged, this);
        }
    },

    poll: function() {

    }
});
