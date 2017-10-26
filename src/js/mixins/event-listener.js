export default {
    methods: {
    	/**
		 * Start listening to events.
		 *@param {HTMLElement} el - The element to listen to.
		 *@param {Array} events
		 */
        startListening: function(el, events) {
        	//TODO: Debounce buttons or not?  
        	//Does not matter if holding the button would not do something else anyway or when it might even increase speed.
        	events.forEach(function(event){
        		document.addEventListener(event, function() {
        			console.log("Nice!");
        		})

        	})
        },


        /**
		 * Unbind key / mouse events.
		 */
        stopListening: function() {
        	console.log("Not nice!");
        }
    }
}