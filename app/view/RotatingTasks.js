Ext.define( 'TaskQueue.view.RotatingTasks', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'TaskQueue.store.FakeTasks',
        'TaskQueue.view.TaskElement',
        'TaskQueue.view.layout.Rotating'
    ],
    xtype: 'rotatingtasks',
    config: {
        store: Ext.create('TaskQueue.store.FakeTasks'),
        useComponents: true,
        defaultType: 'taskelement'
    },

    initialize: function() {
        this.callParent(arguments);
        this.registerListeners();
    },

    registerListeners: function() {
        this.addListener('painted', this.onPainted, this);
        this.addListener('resize', this.onResize, this)
    },
    onPainted: function() {
        console.log('painted');
    },
    onResize: function() {
        console.log('resize');
    }
});