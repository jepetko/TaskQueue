Ext.define( 'TaskQueue.view.ListedTasks', {
    extend: 'Ext.List',
    requires: [
        'Ext.List'
    ],
    xtype: 'listedtasks',
    config: {
        itemCls: 'check_black2',
        itemTpl: '{desc}'
    },
    initialize: function() {
        this.callParent(arguments);
    }
});