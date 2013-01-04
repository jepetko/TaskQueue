Ext.define('TaskQueue.view.layout.Rotating', {
    extend: 'Ext.layout.Default',

    alias: 'layout.rotating',

    layoutClass: 'x-layout-rotating',

    itemClass: 'x-layout-rotating-item',

    setContainer: function(container) {
        this.callSuper(arguments);

        container.innerElement.addCls(this.layoutClass);
        this.onContainerSizeFlagsChange();
        this.monitorSizeFlagsChange();
    },

    onContainerSizeFlagsChange: function() {

        /*
        var container = this.container,
            sizeFlags = container.getSizeFlags(),
            stretched = Boolean(sizeFlags & container.LAYOUT_STRETCHED),
            innerItems = container.innerItems,
            i, ln, item;

        this.callSuper();

        for (i = 0,ln = innerItems.length; i < ln; i++) {
            item = innerItems[i];
            item.setLayoutSizeFlags(sizeFlags);
        }

        container.innerElement.toggleCls('x-stretched', stretched);
        */
        this.callSuper();
        console.log("container size change");
    },

    onItemInnerStateChange: function(item, isInner) {
        /*
        this.callSuper(arguments);
        item.toggleCls(this.itemClass, isInner);
        item.setLayoutSizeFlags(isInner ? this.container.getSizeFlags() : 0);
        */
        this.callSuper(arguments);
        console.log("inner state change");
    }
});