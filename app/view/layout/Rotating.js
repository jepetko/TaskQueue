Ext.define('TaskQueue.view.layout.Rotating', {
    extend: 'Ext.layout.Default',
    requires: [
        'Ext.Anim'
    ],

    alias: 'layout.rotating',

    layoutClass: 'x-layout-rotating',

    itemClass: 'x-layout-rotating-item',

    _container: null,

    ////////////////////////////// Event handlers

    onItemInnerStateChange: function() {
        this.callSuper(arguments);
    },

    onContainerResize: function(container, eOpts) {

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
        //console.log(this._container);
        //console.log("container width change");
    },

    ////////////////////////////// Methods

    setContainer: function(container) {
        this.callSuper(arguments);
        this._container = container;
        container.innerElement.addCls(this.layoutClass);
        Ext.defer( this._applyLayout, 1000, this);
    },

    _animate: function(pos) {
        var anim = Ext.create(  'Ext.Anim',
                                {   duration:1000,
                                    autoClear: false,
                                    easing: 'cubic-bezier(0.680,-0.550,0.265,1.550)',
                                    from: {
                                        top: '0px',
                                        left: '0px'
                                    },
                                    to: {
                                        top: pos.top + 'px',
                                        left: pos.left + 'px'
                                    }
                                }
        );

        var panel = this._container.element;
        anim.run(panel, {
            after:Ext.Function.bind(this._afterAnimate, this, [this._container.getRecord(),pos])
        })
    },

    _applyLayout: function() {
        var record = this._container.getRecord();
        if(!record) return;
        
        var data = record.getData();
        if(!data) return;
        var index = data["index"];

        var totalSegments = 8;
        var dimensions = this._container.getEmbeddingContainerDimensions();
        var totalWidth = dimensions.width;
        var totalHeight= dimensions.height;

        var totalDim = dimensions.preferred;
        var totalRadius = totalDim/2 - dimensions.itemsize;
        var degreesPerSegment = 360/totalSegments;
        var degrees = index * degreesPerSegment;

        var xCoord = Math.round(totalRadius * Math.cos( this.degreeToRadian(degrees) ));
        var yCoord = Math.round(totalRadius * Math.sin( this.degreeToRadian(degrees) ));

        xCoord += Math.round(totalWidth/2) - 50;
        yCoord = (-1)*yCoord + Math.round(totalHeight/2) - 50;

        this._animate( { top: yCoord, left: xCoord} );
     },

    _afterAnimate: function(record, pos) {
        record.set('left', pos.left);
        record.set('top', pos.top);
        record.dirty = true;
    },

    degreeToRadian: function(degree) {
        return degree * Math.PI / 180;
    }
});