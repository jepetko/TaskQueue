Ext.define('TaskQueue.view.TaskElement', {
    extend: 'Ext.Panel',
    config: {
        text: null,
        cls: 'taskqueue-taskelement'
    },
    constructor: function(config) {
        this.initConfig(config);
    }
});
