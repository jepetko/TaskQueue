Ext.define('TaskQueue.view.TaskElement', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container'],
    xtype: 'taskelement',

    config: {
        taskDiv: true,
        cls: 'task-element',
        dataMap: {
            getTaskDiv: {
                setHtml: 'name'
            }
        }
    },
    applyTaskDiv: function(config) {
        return Ext.factory(config, Ext.Container, this.getTaskDiv());
    }
});