Ext.define( 'TaskQueue.view.RotatingTasks', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'TaskQueue.store.FakeTasks',
        'TaskQueue.view.TaskElement',
        'TaskQueue.view.layout.Rotating'
    ],
    xtype: 'rotatingtasks',
    config: {
        //store: Ext.create('TaskQueue.store.FakeTasks'),
        useComponents: true,
        maxItemCache: 0,
        defaultType: 'taskelement'
    },

    initialize: function() {
        this.callParent(arguments);
    }
});