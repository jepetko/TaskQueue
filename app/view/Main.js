/*Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});*/

Ext.define('TaskQueue.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.Panel',
        'TaskQueue.view.RotatingTasks',
        'TaskQueue.view.ListedTasks'
    ],
    config: {
        fullscreen: true,
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'tabpanel',
                layout: {
                    type: 'card',
                    animation: {
                        type: 'fade'
                    }
                },
                tabBarPosition: 'bottom',
                defaults: {
                    styleHtmlContent: true
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox'
                        },
                        title: 'Show',
                        iconCls: 'home',
                        items: [
                            {
                                xtype: 'label',
                                html: '100',
                                flex: 1
                            },
                            {
                                xtype: 'rotatingtasks',
                                flex: 5
                            }
                        ]
                    },
                    {
                        title: 'Edit',
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'listedtasks'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
