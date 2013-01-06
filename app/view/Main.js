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
            type: 'hbox'
        },
        items: [
            {
                xtype: 'panel',
                flex: 1,
                items: [
                    {
                        xtype: 'label',
                        html: '100'
                    }
                ]
            },
            {
                xtype: 'rotatingtasks',
                flex: 5
            }
        ]
    }
});
