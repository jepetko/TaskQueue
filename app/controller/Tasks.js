Ext.define('TaskQueue.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ["TaskQueue.model.Task"],
    stores: ["TaskQueue.store.FakeTasks"],
    views:  [],

    config: {
    },

    build: function() {

    },

    poll: function() {

    }
});
