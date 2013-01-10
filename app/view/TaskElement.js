Ext.define('TaskQueue.view.TaskElement', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container', 'Ext.Button'],
    xtype: 'taskelement',

    config: {
        cls: 'task-element',
        mainContainer: {
            //dummy for main container built by framework
        },
        taskDiv: {
            cls: 'task-element-div'
        },
        doneButton: {
            bottom: '0px',
            text: 'Done!'
        },
        dataMap: {
            getTaskDiv: {
                setHtml: 'desc'
            },
            getDoneButton: {
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
        this.addListener('remove', this.onRemoveItem, this);
        this.addListener('add', this.onAddItem, this);
    },
    onInitialize: function() {
    },
    onUpdateData: function( el, newData, eOpts ) {
        //bug? when doing synchronously it fails: "Cannot read property 'updateRecord' of undefined"
        //Ext.defer( Ext.Function.bind( this.applyMainContainer, this ), 200);
        Ext.Function.bind( this.applyMainContainer, this);
    },
    onRemoveItem: function(el, item, index, eOpts) {
        console.log('remove Item');
        console.log(item);
    },
    onAddItem: function(el, item, index, eOpts) {
        console.log('add Item');
        console.log(item);
        console.log( this.getRecord().get("done"));
    },
    applyTaskDiv: function(config) {
        var el = Ext.factory(config, Ext.Panel, this.getTaskDiv());
        return el;
    },
    updateTaskDiv: function(newDescTaskDiv, oldDescTaskDiv) {
        if (oldDescTaskDiv) {
            this.remove(oldDescTaskDiv, true);
        }
        if (newDescTaskDiv) {
            this.add(newDescTaskDiv);
        }
    },
    applyDoneButton: function(config) {
        var el = Ext.factory(config, Ext.Button, this.getDoneButton());
        return el;
    },
    updateDoneButton: function(newButton, oldButton) {
        if (oldButton) {
            this.remove(oldButton, true);
        }
        if (newButton) {
            this.add(newButton);
        }
    },
    applyMainContainer: function(config) {
        var rec = this.getRecord();
        if(!rec) return;
        console.warn('apply main container');
        console.warn( rec );
        this.setLeft( rec['left'] );
        this.setTop( rec['top'] );
        this.setWidth( rec['width']);
        this.setHeight( rec['height']);
    },
    updateMainContainer: function(newContainer, oldContainer) {
        if (oldContainer) {
            this.remove(oldContainer, true);
        }
        if (newContainer) {
            this.add(newContainer);
        }
    }
});