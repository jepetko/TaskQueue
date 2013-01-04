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

    onRecordsAdded: function( store, records, eOpts ) {
        console.log('add');
        var record = records[0];
        var index = record.getData()["index"];

        var rotatingTasks = this.getRotatingTasksView();
        var parent = rotatingTasks.getParent();

        var totalSegments = 8;
        var totalWidth = Math.round(parent.element.getWidth());
        var totalHeight= Math.round(parent.element.getHeight());
        console.info( "totalWidth:" + totalWidth );
        console.info( "totalHeight:" + totalHeight );

        var totalDim = (totalWidth < totalHeight) ? totalWidth : totalHeight;
        var totalRadius = totalDim/2 - 100;
        var degreesPerSegment = 360/totalSegments;
        var degrees = index * degreesPerSegment;

        var xCoord = Math.round(totalRadius * Math.cos( this.degreeToRadian(degrees) ));
        var yCoord = Math.round(totalRadius * Math.sin( this.degreeToRadian(degrees) ));

        xCoord += Math.round(totalWidth/2) - 50;
        yCoord = (-1)*yCoord + Math.round(totalHeight/2) - 50;

        console.log( degrees + "° => " + xCoord + "," + yCoord );

        record.set('left', xCoord);
        record.set('top', yCoord);
        record.dirty = true;
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

    degreeToRadian: function(degree) {
        return degree * Math.PI / 180;
    },

    addStoreListeners: function(store) {
        store.addListener( 'addrecords', this.onRecordsAdded, this );
        store.addListener( 'write', this.onWrite, this );
        store.addListener( 'beforeload', this.onBeforeLoad, this );
    },

    organize: function() {
        var tasks = this.getRotatingTasksView();
    },

    doRender: function() {

    },

    poll: function() {

    }
});
