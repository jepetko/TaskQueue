Ext.define( 'TaskQueue.view.RotatingTasks', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'TaskQueue.store.FakeTasks',
        'TaskQueue.view.TaskElement',
        'TaskQueue.view.layout.Rotating'
    ],
    xtype: 'rotatingtasks',
    config: {
        //cls: 'taskqueue-rotating',
        store: Ext.create('TaskQueue.store.FakeTasks'),
        //itemTpl: '<div class="taskqueue-rotating-element">{desc}</div>',
        useComponents: true,
        defaultType: 'taskelement',
        layout: {
            type: 'rotating'
        }
    },

    initialize: function() {
        this.callParent(arguments);
        //this.registerListeners();
    },

    registerListeners: function() {
        var me = this;
        this.addListener('painted', this.onPainted, this);
        this.addListener('updatedata', this.onUpdateData, this);
    },

    onPainted: function() {
        console.log(this);
    },
    onUpdateData: function() {
        console.log(this);
    }
});