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
    },

    onUpdateRecord: function(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
        console.log( 'onUpdateRecord!');
        if( Ext.Array.contains( modifiedFieldNames, 'done' ) ) {
            this.reloadFilters(store);
        }
    },
    onRemoveRecords: function(store, records, indices, eOpts) {
        console.log( 'onRemoveRecords');
        this.reloadFilters(store);
    },
    onButtonRelease: function(el, e, eOpts) {
        console.log('onButtonRelease set done=true (START)');
        var rec = el.getParent().getRecord();
        rec.set('done', true);
        rec.setDirty();
        rec.save();
        console.log('onButtonRelease set done=true (END)');
    },

    //////////////// Methods

    launch: function() {
        console.info('launch');

        var fakeTasks1 = Ext.create('TaskQueue.store.FakeTasks');
        fakeTasks1.removeAll();
        this.addStoreListeners(fakeTasks1);

        fakeTasks1.generate(10);
        this.setRotatingTasksViewSpecFilters(fakeTasks1);
        fakeTasks1.sync();
        fakeTasks1.load();

        console.warn( "total count: " + fakeTasks1.getCount() );
        console.warn( fakeTasks1.getTotalCount() );

        var viewRotatingTasks = this.getRotatingTasksView();
        viewRotatingTasks.setStore(fakeTasks1);

        this.addButtonListeners( this.getDoneButtons() );

        var viewListedTasks = this.getListedTasksView();
        viewListedTasks.setStore(fakeTasks1);

        /*
        var store = this.getTasksViewStore();
        this.addStoreListeners(store);

        store.generate(10);
        this.setRotatingTasksViewSpecFilters();
        store.sync();
        */
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
    getTasksViewStore: function() {
        var rotatingTasks = this.getRotatingTasksView();
        return rotatingTasks.getStore();
    },
    getListedTasksView: function() {
        var tasks = Ext.ComponentQuery.query('listedtasks');
        if( tasks && tasks.length > 0 )
            return tasks[0];
        return null;
    },

    getDoneButtons: function() {
        return Ext.ComponentQuery.query('rotatingtasks button');
    },

    reloadFilters: function(store) {
        console.log('reload filters');
        store.clearFilter(true); //suppress event
        this.setRotatingTasksViewSpecFilters(store);
    },

    addStoreListeners: function(store) {
        store.on( 'beforeload', this.onBeforeLoad, this );
        store.on( 'addrecords', this.onAddRecords, this );
        store.addAfterListener( 'updaterecord', this.onUpdateRecord, this );
        store.addAfterListener( 'removerecords', this.onRemoveRecords, this );
    },

    setRotatingTasksViewSpecFilters: function(store) {

        var ids = [];
        store.each(function (item, index, length) {
            console.log( 'each is called for index: ' + index + " (total length:" + length + ")")
            if( ids.length < 8 && item.get('done') === false) {
                ids.push(item.get('id'));
            }
        });

        var topNItems = new Ext.util.Filter({
            filterFn: function(item) {
                return Ext.Array.contains( ids, item.get('id'));
            }
        });

        store.filter(topNItems);

        /*
        var topNItems = new Ext.util.Filter({
            filterFn: function(item) {
                return item.get('done') === false;
            }
        });
        store.filter(topNItems);
        */
    },

    addButtonListeners: function(buttons) {
        for(var i=0; i<buttons.length; i++) {
            if( buttons[i].hasListener('release'))
                continue;
            buttons[i].addAfterListener( 'release', this.onButtonRelease, this);
        }
    }
});