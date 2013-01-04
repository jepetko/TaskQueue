Ext.define('TaskQueue.view.TaskElement', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container'],
    xtype: 'taskelement',

    config: {
        taskDiv: {
            /*layout: {
                type: 'hbox',
                align: 'stretch'
            }*/
            //force the element to be floating
        },
        //cls: 'task-element',
        dataMap: {
            getTaskDiv: {
                setHtml: 'desc',
                setLeft: 'left',
                setTop: 'top'
            }
        }/*,
        layout: {
            type: 'fit'
        }*/
    },
    applyTaskDiv: function(config) {
        var parent = this.getDataview();
        var totalCount = this.getItems().length;
        var el = Ext.factory(config, Ext.Panel, this.getTaskDiv());
        el.setCls('task-element');
        return el;
    },
    updateTaskDiv: function(newDescTaskDiv, oldDescTaskDiv) {
        if (oldDescTaskDiv) {
            this.remove(oldDescTaskDiv);
        }
        if (newDescTaskDiv) {
            this.add(newDescTaskDiv);
        }
    }
});