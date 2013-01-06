Ext.define('TaskQueue.view.TaskElement', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container', 'Ext.field.Checkbox'],
    xtype: 'taskelement',

    config: {
        cls: 'task-element',
        mainContainer: {
            //dummy for main container built by framework
        },
        taskDiv: {
            cls: 'task-element-div'
        },
        doneCheckbox: {
            bottom: '0px'
        },
        dataMap: {
            getTaskDiv: {
                setHtml: 'index'
            },
            getDoneCheckbox: {
                setValue: 'done'
            },
            getMainContainer: {
                setTop: 'top',
                setLeft: 'left'
            }
        },
        layout: {
            type: 'rotating'
        }
    },
    initialize: function() {
        this.callParent(arguments);
        this.registerListeners();
    },
    registerListeners: function() {
        this.addListener('initialize', this.onInitialize, this);
        this.addListener('updatedata', this.onUpdateData, this);
    },
    onInitialize: function() {
        var dimensions = this.getEmbeddingContainerDimensions();
        this.setWidth(dimensions.itemsize + 'px');
        this.setHeight(dimensions.itemsize + 'px');
    },
    onUpdateData: function( el, newData, eOpts ) {
        var me = this;
        //bug? when doing synchronously it fails: "Cannot read property 'updateRecord' of undefined"
        Ext.defer(function() {
            var rec = me.getRecord();
            me.setTop(rec['top']);
            me.setLeft(rec['left']);
        }, 200);
    },
    applyTaskDiv: function(config) {
        var el = Ext.factory(config, Ext.Panel, this.getTaskDiv());
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
    applyDoneCheckbox: function(config) {
        var el = Ext.factory(config, Ext.field.Checkbox, this.getDoneCheckbox());
        return el;
    },
    updateDoneCheckbox: function(newCheckbox, oldCheckbox) {
        if (oldCheckbox) {
            this.remove(oldCheckbox);
        }
        if (newCheckbox) {
            this.add(newCheckbox);
        }
    },
    applyMainContainer: function(config) {
        var rec = this.getRecord();
        this.setLeft( rec['left'] );
        this.setTop( rec['top'] );
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