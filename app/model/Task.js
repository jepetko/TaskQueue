Ext.define('TaskQueue.model.Task', {
    extend: 'Ext.data.Model',

    config: {
        identifier: 'uuid',
        fields: [
            { name : 'desc', type : 'string' },
            { name : 'done', type: 'boolean' },
            //position and sine are data-driven
            { name : 'left', type : 'int' },
            { name : 'top', type :'int' },
            { name : 'width', type : 'int' },
            { name : 'height', type : 'int' }
        ],
        validations: [
            { type: 'presence',  field: 'desc' },
            { type: 'length',    field: 'desc', min: 5, max: 100 }
        ]
    }
});