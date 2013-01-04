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
        /*floating: true,
        centered: true,
        width: '100%',
        height: '100%',*/
        items: [
            {
                xtype: 'rotatingtasks',
                flex: 1
            }
        ]
    }
});
