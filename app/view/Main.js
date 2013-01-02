Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.define('TaskQueue.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.Panel',
        'TaskQueue.view.RotatingTasks'
    ],
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'rotatingtasks',
                flex: 1
            }
        ]
    }
});
