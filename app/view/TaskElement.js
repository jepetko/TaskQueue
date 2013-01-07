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
                setHtml: 'desc'
            },
            getDoneCheckbox: {
                setValue: 'done'
            },
            getMainContainer: {
                setTop: 'top',
                setLeft: 'left',
                setWidth: 'width',
                setHeight: 'height'
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
    },
    onUpdateData: function( el, newData, eOpts ) {
        //bug? when doing synchronously it fails: "Cannot read property 'updateRecord' of undefined"
        Ext.defer( Ext.Function.bind( this.applyMainContainer, this ), 200);
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
        this.setWidth( rec['width']);
        this.setHeight( rec['height']);
    }
});