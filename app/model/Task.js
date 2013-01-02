Ext.define('TaskQueue.model.Task', {
    extend: 'Ext.data.Model',

    config: {
        identifier: 'uuid',
        fields: [
            'desc'
        ],

        validations: [
            { type: 'presence',  field: 'desc' },
            { type: 'length',    field: 'desc', min: 5, max: 100 }
        ]
    }
});