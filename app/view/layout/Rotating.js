Ext.define('TaskQueue.view.layout.Rotating', {
    extend: 'Ext.layout.Default',
    requires: [
        'Ext.Anim'
    ],

    alias: 'layout.rotating',

    layoutClass: 'x-layout-rotating',

    itemClass: 'x-layout-rotating-item',

    totalSegments: 8,

    _container: null,

    ////////////////////////////// Event handlers

    onContainerResize: function(container, eOpts) {
        //TODO: take care to refresh the gui properly
    },

    ////////////////////////////// Methods

    setContainer: function(container) {
        this.callSuper(arguments);
        this._container = container;
        container.innerElement.addCls(this.layoutClass);
        Ext.defer( this._applyLayout, 1000, this);
    },

    _animate: function(dim) {
        var anim = Ext.create(  'Ext.Anim',
                                {   duration:1000,
                                    autoClear: false,
                                    easing: 'cubic-bezier(0.680,-0.550,0.265,1.550)',
                                    from: {
                                        top: '0px',
                                        left: '0px',
                                        width: dim.width + 'px',
                                        height: dim.height + 'px'
                                    },
                                    to: {
                                        top: dim.top + 'px',
                                        left: dim.left + 'px',
                                        width: dim.width + 'px',
                                        height: dim.height + 'px'
                                    }
                                }
        );

        var panel = this._container.element;
        anim.run(panel, {
            after:Ext.Function.bind(this._afterAnimate, this, [this._container.getRecord(),dim])
        })
    },

    _applyLayout: function() {
        var record = this._container.getRecord();
        if(!record) return;

        var data = record.getData();
        if(!data) return;
        var index = data["index"];

        var dimensions = this.getEmbeddingContainerDimensions();
        console.log(dimensions);
        var totalWidth = dimensions.width;
        var totalHeight= dimensions.height;

        var totalDim = dimensions.preferred;
        var totalRadius = totalDim/2 - dimensions.itemsize;
        var degreesPerSegment = 360/this.totalSegments;
        var degrees = index * degreesPerSegment;

        var xCoord = Math.round(totalRadius * Math.cos( this.degreeToRadian(degrees) ));
        var yCoord = Math.round(totalRadius * Math.sin( this.degreeToRadian(degrees) ));

        xCoord += Math.round(totalWidth/2 - dimensions.itemsize/2);
        yCoord = (-1)*yCoord + Math.round(totalHeight/2 - dimensions.itemsize/2);

        var count = this.getCount();
        console.log('current count'+count);

        this._animate( { top: yCoord, left: xCoord, width: dimensions.itemsize, height: dimensions.itemsize} );
     },

    _afterAnimate: function(record, dim) {
        record.set('left', dim.left);
        record.set('top', dim.top);
        record.set('width', dim.width);
        record.set('height', dim.height);
        record.dirty = true;
    },

    degreeToRadian: function(degree) {
        return degree * Math.PI / 180;
    },
    getEmbeddingContainerDimensions: function() {
        var parent = this._container.getDataview();
        var w = parent.element.getWidth();
        var h = parent.element.getHeight();
        var dim = (w < h) ? w : h;
        var isize = Math.round(dim/this.totalSegments*1.5);
        return {
            width: w, height: h, preferred : dim, itemsize : isize
        }
    },
    getCount: function() {
        var dataView = this._container.getDataview();
        var query = '#' + dataView.getId() + ' dataitem';
        return Ext.ComponentQuery.query( query ).length;
    }
});