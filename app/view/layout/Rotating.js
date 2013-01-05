Ext.define('TaskQueue.view.layout.Rotating', {
    extend: 'Ext.layout.Default',

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
        console.info( "setContainer");
        console.info( container );
        this._container = container;
        container.innerElement.addCls(this.layoutClass);
        var me = this;
        setTimeout( function() { me._applyLayout(); }, 1000);
    },

    _getTotalSize: function() {
        var embeddingContainer = this._container.getDataViewEmbeddingContainer();
        return {
                    width: embeddingContainer.element.getWidth(),
                    height: embeddingContainer.element.getHeight()
                };
    },

    _animate: function(pos) {
        var anim = Ext.create(  'Ext.Anim',
                                {   duration:1500,
                                    autoClear: false,
                                    easing: 'cubic-bezier(0.680,-0.550,0.265,1.550)',
                                    //reverse: true,
                                    from: {
                                        top: 0 + 'px',
                                        left: 0 + 'px'
                                    },
                                    to: {
                                        top: pos.top + 'px',
                                        left: pos.left + 'px'
                                    }
                                }
        );
        console.log(this._container.getInnerItems());
        console.log(this._container.getItems());

        var panel = null;
        var innerItems = this._container.getInnerItems();
        if( innerItems && innerItems.length > 1 )
            panel = innerItems[1].element;
        else
            panel = this._container.element;

        console.log(panel);
        console.log(anim);
        anim.run(panel, {
            after:Ext.Function.bind(this._afterAnimate, this, [this._container.getRecord()])
        })
    },

    _applyLayout: function() {
        console.log('apply layout');

        var record = this._container.getRecord();
        var index = record.getData()["index"];

        var totalSegments = 8;
        var totalSize = this._getTotalSize();
        var totalWidth = totalSize.width;
        var totalHeight= totalSize.height;
        console.info( "totalWidth:" + totalWidth );
        console.info( "totalHeight:" + totalHeight );

        var totalDim = (totalWidth < totalHeight) ? totalWidth : totalHeight;
        var totalRadius = totalDim/2 - 100;
        var degreesPerSegment = 360/totalSegments;
        var degrees = index * degreesPerSegment;

        var xCoord = Math.round(totalRadius * Math.cos( this.degreeToRadian(degrees) ));
        var yCoord = Math.round(totalRadius * Math.sin( this.degreeToRadian(degrees) ));

        xCoord += Math.round(totalWidth/2) - 50;
        yCoord = (-1)*yCoord + Math.round(totalHeight/2) - 50;

        console.log( degrees + "° => " + xCoord + "," + yCoord );
        this._animate( { top: yCoord, left: xCoord} );
        /*record.set('left', xCoord);
        record.set('top', yCoord);
        record.dirty = true;*/

        //<div class="x-container x-unsized x-panel task-element x-floating" id="ext-panel-3" style="left: 601px !important; z-index: 4 !important; top: 50px !important;"><div class="x-inner x-panel-inner" id="ext-element-24"><div class="x-innerhtml " id="ext-element-25">Phasellus eleifend varius nibh, adipiscing porta neque venenatis vitae.</div></div><div class="x-anchor" style="display: none;"></div></div>
        //<div class="x-container x-unsized x-panel task-element" id="ext-panel-1" style="top: 142px; left: 693px;"><div class="x-inner x-panel-inner" id="ext-element-17"><div class="x-innerhtml " id="ext-element-19">Praesent vitae metus in eros accumsan sodales ut et sem.</div></div><div class="x-anchor" style="display: none;" id="ext-element-18"></div></div>
    },

    _afterAnimate: function() {
        console.log('_afterAnimate');
        /*record.set('left', xCoord);
         record.set('top', yCoord);
         record.dirty = true;*/
    },

    degreeToRadian: function(degree) {
        return degree * Math.PI / 180;
    }
});