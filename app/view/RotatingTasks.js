Ext.define( 'TaskQueue.view.RotatingTasks', {
    extend: 'Ext.dataview.DataView',
    requires: [
        'TaskQueue.store.FakeTasks'
    ],
    xtype: 'rotatingtasks',
    config: {
        cls: 'taskqueue-rotating',
        store: Ext.create('TaskQueue.store.FakeTasks'),
        itemTpl: '<div class="taskqueue-rotating-element">{desc}</div>'
    },

    initialize: function() {
        this.callParent(arguments);
        this.registerListeners();
        this.getStore().add( { desc : 'Hallo' } );
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