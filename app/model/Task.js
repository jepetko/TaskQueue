Ext.define('TaskQueue.model.Task', {
    extend: 'Ext.data.Model',

    config: {
        identifier: 'uuid',
        fields: [
            { name : 'index', type : 'int' },
            { name : 'desc', type : 'string' },
            { name : 'left', type : 'int' },
            { name : 'top', type :'int' }
        ],
        validations: [
            { type: 'presence',  field: 'desc' },
            { type: 'length',    field: 'desc', min: 5, max: 100 }
        ]
    }
});