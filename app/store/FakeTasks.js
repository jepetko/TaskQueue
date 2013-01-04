Ext.define('TaskQueue.store.FakeTasks', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'TaskQueue.model.Task'
    ],
    config: {
        model: 'TaskQueue.model.Task',
        pageSize: 10,
        proxy:
        {
            type: 'localstorage',
            id: 'tasks'
        },
        autoLoad: true,
        data: []
    },

    initConfig: function() {
        this.callParent(arguments);
    },

    generate: function() {
        var size = arguments.length > 0 ? arguments[0] : 10;
        while( size > 0 ) {
            var pos = Math.floor(Math.random() * this.DATA.length);
            var el = this.DATA[pos];
            this.add( {index : this.seq, desc: el, left: 0, top: 0} );
            size--;
            this.seq++;
        }
        this.sync();
    },

    seq: 0,

    DATA : [ "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Donec a nibh nisi, eu cursus tellus.",
    "Fusce non nulla vel dolor dignissim tristique nec id leo.",
    "Aenean tempor mollis arcu, euismod sodales urna luctus et.",
    "Praesent ac est ante, non blandit nibh.",
    "Donec ut velit turpis, eu tempor justo.",
    "Vivamus quis orci ac nisi congue facilisis.",
    "Mauris rhoncus luctus quam, at vehicula tellus laoreet congue.",
    "Etiam cursus ligula non velit luctus viverra.",
    "Integer luctus orci ac ante posuere sed aliquet diam cursus.",
    "Mauris aliquet justo eu urna lacinia id aliquam ligula dignissim.",
    "Sed vehicula tristique tellus, id ultricies tellus fermentum sit amet.",
    "Maecenas eu mi vel justo bibendum pellentesque.",
    "Morbi aliquam felis eu elit luctus gravida.",
    "Nullam et sapien semper eros pretium venenatis vitae porttitor magna.",
    "Etiam vitae turpis eu massa auctor tristique vel nec dui.",
    "Etiam sed lacus magna, at pellentesque nunc.",
    "Maecenas porta feugiat turpis, vel eleifend velit gravida sit amet.",
    "Vestibulum congue lectus dictum dolor congue et ullamcorper odio pretium.",
    "Nunc vel enim eget ante luctus porta.",
    "Nulla commodo metus vitae dui varius eu ornare est egestas.",
    "Nunc sed erat ac diam pharetra blandit nec vitae sem.",
    "Donec faucibus tellus eu dui blandit a laoreet mi elementum.",
    "Suspendisse ut lectus non augue placerat lobortis.",
    "Nullam rutrum lorem eget risus pharetra suscipit.",
    "Nam a lorem nunc, eu facilisis nisl.",
    "Pellentesque bibendum urna sit amet sem euismod bibendum.",
    "Donec ac sapien ante, eget porta enim.",
    "Curabitur tincidunt tellus sed urna tincidunt dapibus.",
    "Donec et mauris eget erat tempor convallis id at dui.",
    "Sed adipiscing dolor quis arcu fringilla vitae ultricies est aliquet.",
    "Fusce ac diam eu leo sodales hendrerit lobortis molestie neque.",
    "Ut congue nulla massa, eu condimentum massa.",
    "Curabitur non lectus eu lectus egestas feugiat non a ligula.",
    "Phasellus eleifend varius nibh, adipiscing porta neque venenatis vitae.",
    "Curabitur euismod sagittis lorem, ornare consectetur tortor accumsan at.",
    "Fusce sed risus lorem, et mollis leo.",
    "Mauris a diam ut ante tincidunt congue.",
    "Aliquam gravida lectus sed mi sollicitudin placerat.",
    "Ut eleifend ultricies lacus, a porttitor massa interdum fermentum.",
    "Praesent vitae quam ante, et pulvinar lacus.",
    "Cras vestibulum nibh vitae odio imperdiet id ultricies quam commodo.",
    "Nulla mattis diam magna, tempus vehicula nulla.",
    "Suspendisse quis quam vel tellus viverra consequat.",
    "Maecenas nec turpis sed quam facilisis pharetra.",
    "Donec aliquam lacus et urna ornare molestie.",
    "Curabitur malesuada nunc imperdiet velit vulputate rhoncus.",
    "Morbi faucibus lacinia justo, at bibendum ipsum scelerisque nec.",
    "Sed molestie est at turpis hendrerit mollis.",
    "Integer pellentesque convallis nisl, a rutrum tellus blandit vitae.",
    "Duis imperdiet turpis ac quam dapibus ut pretium nibh varius.",
    "Integer auctor nulla id ante placerat non convallis massa vestibulum.",
    "Duis bibendum venenatis sem, ac egestas nulla pharetra at.",
    "In quis nibh nec sapien pellentesque ornare.",
    "Cras eget ligula ligula, feugiat sodales tellus.",
    "Vestibulum sit amet tellus enim, eu facilisis erat.",
    "Etiam mattis ligula id ipsum semper ornare.",
    "Pellentesque quis velit sed est posuere viverra blandit a ante.",
    "Mauris et nisl tellus, eu condimentum risus.",
    "Quisque a velit vitae sapien volutpat tincidunt porttitor at purus.",
    "Proin auctor diam sit amet ligula semper ultrices volutpat mi malesuada.",
    "Sed egestas lacus sit amet sapien blandit porttitor.",
    "Fusce fermentum orci in risus vulputate rhoncus.",
    "Vestibulum rhoncus justo eu odio consequat in fringilla elit vulputate.",
    "Nunc in velit a libero imperdiet scelerisque.",
    "Mauris a augue lectus, in blandit sem.",
    "Mauris blandit tortor sed dui iaculis consequat sed vitae elit.",
    "Suspendisse ac elit nibh, vestibulum semper neque.",
    "Nam vulputate consectetur sapien, in porta sapien porta at.",
    "Mauris rutrum viverra lectus, ut porttitor turpis gravida sit amet.",
    "Ut nec diam vitae lorem molestie venenatis.",
    "Quisque sollicitudin sem ac neque lacinia faucibus.",
    "Fusce convallis orci vel est venenatis eu venenatis nisi sollicitudin.",
    "Fusce consequat nunc eu urna mattis tristique.",
    "Pellentesque sit amet leo justo, nec tempor tortor.",
    "Nulla at metus quis felis mollis posuere.",
    "Aliquam elementum mi vel nunc vestibulum et condimentum sem feugiat.",
    "Fusce ut mi at quam semper iaculis sit amet vitae erat.",
    "Sed facilisis tincidunt elit, id vehicula ligula dictum quis.",
    "Cras vehicula elit a lacus porta sed elementum mauris sagittis.",
    "Praesent eu tellus sed lorem luctus sodales nec ac justo.",
    "Etiam ac dui eu dolor vehicula vulputate eu et elit.",
    "Vivamus et ligula at dui bibendum commodo.",
    "Nunc quis arcu vitae nisl aliquam bibendum.",
    "Nulla consequat ipsum eu dolor aliquam pharetra fermentum enim fermentum.",
    "Curabitur at elit at quam convallis rutrum id nec purus.",
    "Nunc nec nulla ut tellus pellentesque tempor sed eu nibh.",
    "Donec sed velit orci, id suscipit neque.",
    "In aliquam rhoncus augue, eget viverra justo ultrices vitae.",
    "In non magna eget nisl tempor consectetur eu a tortor.",
    "Vivamus et diam metus, at porttitor mi.",
    "Nunc ac diam ligula, posuere consectetur justo.",
    "Duis a neque et massa facilisis ornare convallis rutrum nisl.",
    "Mauris at erat dolor, in tempus urna.",
    "Praesent vitae libero in sem aliquam adipiscing et in tortor.",
    "Phasellus rutrum placerat diam, fringilla pellentesque ante egestas vel.",
    "Praesent feugiat turpis nec nunc convallis aliquam.",
    "Nam sed ligula eros, eget commodo dui.",
    "Duis ut arcu elit, mattis vehicula risus.",
    "Proin viverra pulvinar diam, a feugiat arcu placerat eget.",
    "Mauris sit amet quam arcu, sed tristique justo.",
    "Suspendisse sed tortor non elit sollicitudin mattis ac at turpis.",
    "Donec sed mauris nec quam semper pharetra.",
    "Sed a diam a tortor vestibulum auctor.",
    "Proin ac mi quam, ut sagittis turpis.",
    "Nunc adipiscing tellus ut nisi consectetur non ultrices nisi hendrerit.",
    "Etiam sed felis nec odio eleifend sagittis id non velit.",
    "In non quam condimentum eros mattis rutrum.",
    "Sed ullamcorper sapien eget est ornare congue.",
    "Nunc cursus purus vel eros lobortis iaculis.",
    "Aliquam scelerisque leo id tortor facilisis pretium.",
    "Morbi et mi arcu, et pharetra dolor.",
    "Cras tincidunt adipiscing odio, eu aliquet dui interdum at.",
    "Vestibulum volutpat ipsum vitae quam cursus convallis.",
    "Donec rhoncus est ac erat luctus ut suscipit purus pharetra.",
    "In condimentum tortor sit amet diam sagittis vestibulum.",
    "Maecenas in eros a nisi hendrerit dignissim.",
    "Mauris aliquam turpis vitae magna pulvinar at dictum dolor convallis.",
    "Morbi in velit non velit sodales faucibus.",
    "Vestibulum elementum justo quis orci porttitor ut commodo ligula sagittis.",
    "Praesent quis purus felis, eget dapibus augue.",
    "Duis ut turpis ac lectus commodo varius mattis eget nulla.",
    "Nam sagittis tristique velit, non molestie quam laoreet ut.",
    "Aenean et risus metus, ac tempor sem.",
    "Etiam posuere mattis libero, quis fringilla tortor suscipit a.",
    "Nam sit amet odio id purus consequat posuere sit amet fringilla enim.",
    "Mauris laoreet ante sit amet arcu posuere porttitor.",
    "Suspendisse vel est odio, vitae condimentum justo.",
    "Nulla iaculis risus pulvinar nisi rutrum consectetur.",
    "Donec id justo diam, quis interdum justo.",
    "Mauris nec metus magna, eu sodales lectus.",
    "Sed eget quam neque, eu dignissim dui.",
    "Nullam in urna sed eros consectetur placerat vitae sed magna.",
    "Quisque faucibus diam a lacus faucibus cursus.",
    "Morbi tempus enim sed elit tempor dapibus ac vehicula augue.",
    "Nulla laoreet dui non nisi dignissim sollicitudin.",
    "Mauris vitae odio nec ipsum condimentum rutrum.",
    "Nulla hendrerit nibh vitae purus porta nec egestas eros varius.",
    "Nunc id lacus at orci ullamcorper malesuada et elementum ipsum.",
    "Aenean nec erat massa, ac hendrerit enim.",
    "Aenean euismod purus id orci egestas ultrices.",
    "Fusce consequat neque non arcu sollicitudin venenatis.",
    "Maecenas at diam eget tellus vehicula tempor a eget magna.",
    "Maecenas nec risus turpis, id iaculis lectus.",
    "Curabitur aliquet lorem eget lectus luctus nec pharetra nunc rhoncus.",
    "Vivamus fringilla urna sit amet leo dignissim venenatis.",
    "Sed ut est vel tellus facilisis adipiscing.",
    "Etiam tempus euismod nisl, a convallis nibh rutrum sit amet.",
    "Quisque eget diam tempus ante sagittis semper.",
    "Vestibulum pulvinar mi vitae lorem facilisis nec iaculis odio aliquet.",
    "Praesent rhoncus felis vitae arcu aliquet hendrerit.",
    "Vestibulum iaculis metus ut ligula facilisis congue.",
    "Aenean sit amet mauris leo, nec rhoncus risus.",
    "Praesent eget turpis in odio dignissim tincidunt at nec orci.",
    "Cras a ipsum sed nunc blandit rutrum.",
    "Suspendisse scelerisque purus ut dui cursus semper.",
    "Ut a neque sit amet dolor lobortis commodo eget ac diam.",
    "Vivamus at nunc quis dolor consequat porta in quis justo.",
    "Praesent eleifend quam vel justo dapibus vel elementum ligula iaculis.",
    "Sed vel justo in tellus consectetur placerat vel a turpis.",
    "Praesent placerat ligula et mi mattis in sagittis velit cursus.",
    "Praesent faucibus quam at sapien convallis ac auctor massa dapibus.",
    "Sed sit amet quam magna, dictum placerat sem.",
    "Morbi et nibh turpis, vitae hendrerit velit.",
    "Curabitur sollicitudin nisi at turpis dignissim sit amet tristique nulla cursus.",
    "Fusce condimentum nibh sit amet mi vehicula quis consequat nibh ullamcorper.",
    "Proin commodo quam sed ligula suscipit imperdiet.",
    "Etiam in nisl id libero varius condimentum quis ac elit.",
    "Phasellus eleifend convallis purus, id lacinia orci tempus et.",
    "Aliquam mollis velit vel diam scelerisque facilisis.",
    "Praesent vitae metus in eros accumsan sodales ut et sem.",
    "Nam pellentesque pretium purus, vitae placerat diam molestie vel.",
    "Etiam egestas elit ultrices mi fringilla ac tincidunt turpis pellentesque.",
    "Nullam at metus sit amet arcu blandit dictum.",
    "Fusce condimentum enim eget lacus elementum imperdiet.",
    "Sed ultrices leo vel sem sodales non fermentum urna hendrerit.",
    "Maecenas porttitor leo ac mauris lobortis at sagittis enim porta.",
    "Duis tincidunt leo ac augue ultricies faucibus.",
    "Integer mattis eros a turpis consectetur in lacinia sapien feugiat." ]
});