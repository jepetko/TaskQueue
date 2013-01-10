Ext.define( 'TaskQueue.view.ListedTasks', {
    extend: 'Ext.List',
    requires: [
        'Ext.List'
    ],
    xtype: 'listedtasks',
    config: {
        //store: Ext.create('TaskQueue.store.FakeTasks'),
        itemTpl: '{desc}'
    },
    initialize: function() {
        this.callParent(arguments);
    }
});