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
                setHtml: 'index',
                setLeft: 'left',
                setTop: 'top'
            }
        },
        layout: {
            type: 'rotating'
        }
    },
    applyTaskDiv: function(config) {
        var parent = this.getDataview();
        var totalCount = this.getItems().length;
        var el = Ext.factory(config, Ext.Panel, this.getTaskDiv());
        el.setCls('task-element');
        var dimensions = this.getEmbeddingContainerDimensions();
        el.setWidth(dimensions.itemsize + 'px');
        el.setHeight(dimensions.itemsize + 'px');
        return el;
    },
    updateTaskDiv: function(newDescTaskDiv, oldDescTaskDiv) {
        if (oldDescTaskDiv) {
            this.remove(oldDescTaskDiv);
        }
        if (newDescTaskDiv) {
            this.add(newDescTaskDiv);
        }
    },
    getEmbeddingContainerDimensions: function() {
        var dataView = this.getDataview();
        var parent = dataView.getParent();
        var w = parent.element.getWidth();
        var h = parent.element.getHeight();
        var dim = (w < h) ? w : h;
        var isize = Math.round(dim/5);
        return {
            width: w, height: h, preferred : dim, itemsize : isize
        }
    }
});