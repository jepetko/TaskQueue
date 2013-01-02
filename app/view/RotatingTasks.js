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
        this.getStore().add( { desc : 'Hallo' } );

        this.registerListeners();
    },

    registerListeners: function() {
        var me = this;
        this.addListener('painted', this.onPainted, this);
    },

    onPainted: function() {
        console.log(this);
    }
});