export default {
    methods: {
    	/**
		 * Start listening to events.
		 *@param {Array} events
		 */
        startListening: function(events) {
        	console.log("Nice!");
        },


        /**
		 * Unbind key / mouse events.
		 */
        stopListening: function() {
        	console.log("Not nice!");
        }
    }
}