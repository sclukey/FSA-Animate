app.controller('HomeController',
    function($scope, $location) {

        /**
         * declare variables shared within the HomeController scope.
         */
        $scope.NFA = null; // haven't added the DFA class yet
        $scope.DFA = null; // haven't added the DFA class yet
        $scope.NFAVisual = null; // initialized in initializeNFA()
        $scope.DFAVisual = null; // initialized in initializeDFA()
        $scope.converting = false; // used in runConversion() and pauseConversion()

        /**
         * called once the div with id "NFA" has been initialized. 
         * 
         * Creates a new instance of ForceGraph called NFAVisual,
         * appending it to the div with id "NFA"
         *
         * Then applies some sample states and transitions.
         */
        $scope.initializeNFA = function() {

            //extract the width and height of the div.
            var width = $("#NFA").innerWidth(),
                height = $("#NFA").parent().innerHeight();

            //create instance of the ForceGraph class in the
            //div with id "NFA".
            $scope.NFAVisual = new ForceGraph("#NFA", width, height);

            //add the sample NFA states
            $scope.NFAVisual.addNode("start");
            $scope.NFAVisual.addNode("1");
            $scope.NFAVisual.addNode("2");
            $scope.NFAVisual.addNode("3");

            //add the sample NFA transitions
            $scope.NFAVisual.addLink("E", "start", "1");
            $scope.NFAVisual.addLink("E", "1", "3");
            $scope.NFAVisual.addLink("a,b", "2", "3");
            $scope.NFAVisual.addLink("a", "3", "1");
            $scope.NFAVisual.addLink("a,b", "2", "3");
            $scope.NFAVisual.addLink("a", "2", "2");
            $scope.NFAVisual.addLink("b", "1", "2");
            $scope.syncNFA();
        }

        /**
         * analagous to initialize NFA, but with no sample states and transitions.
         */
        $scope.initializeDFA = function() {
            //extract the width and height of the div.
            var width = $("#NFA").innerWidth(),
                height = $("#NFA").parent().innerHeight();

            $scope.DFAVisual = new ForceGraph("#DFA", width, height);
        }

        /**
         * called from: $scope.addState(), $scope.addTransition(), $scope.deleteSelected()
         * 
         * syncs the NFA states and transitions to the corresponding states and transitions
         * in $scope.NFA         
         */
        $scope.syncNFA = function() {
            console.log("syncNFA called");

            //Determine the states and transitions which exist in NFAVisual, but not NFA
            

            //Call addNode and addLink to syncronize for the new states and transitions.
        }

        /** 
         * called from: $scope.stepForward(), $scope.stepBackward(), $scope.runConversion(), $scope.pauseConversion()
         *
         * analagous in functionality to syncNFA, but this time $scope.DFAVisual is "playing catch-up"
         */
        $scope.syncDFA = function() {
            console.log("syncDFA called");
        }

        /**
         * called when a user clicks the "Add State" button.
         *
         * prompts the user for a name for this state and calls
         * addNode for the NFAVisual object.
         * 
         */
        $scope.addState = function() {
            var name = '';
            while (name.trim().length === 0 || name.trim().length > 3) {
                name = prompt('State Name? (1 to 3 characters)', '');
            }
            $scope.NFAVisual.addNode(name);
            $scope.syncNFA();
        }

        /**
         * called when a user clicks the "Add Transition" button.
         *
         * prompts the user for a name, source, and target transition.
         *
         * right now it doesn't error check if the user gives bogus
         * input. I'll have to implement that to make sure the conversion
         * isn't corrupted.
         */
        $scope.addTransition = function() {
            var name = '',
                source = '',
                target = '';
            while (name.trim().length === 0) {
                name = prompt('(1/3): Symbols? (Separated by commas)', '');
            }
            while (source.trim().length === 0) {
                source = prompt('(2/3): Source state?', '');
            }
            while (target.trim().length === 0) {
                target = prompt('(3/3): Target state?', '');
            }
            $scope.NFAVisual.addLink(name, source, target);
            $scope.syncNFA();
        }

        /**
         * called when a user clicks the "Delete Selected" button.
         * 
         * deletes any nodes elements that have the selected
         * class and deletes any corresponding links.
         */
        $scope.deleteSelected = function() {
            d3.selectAll(".selected").each(function(d) {
                $scope.NFAVisual.removeNode(d.id);
            });
            $scope.syncNFA();
        }

        /**
         * called when a user clicks the "Step Forward" button.
         *
         * steps forward in the conversion from NFA to DFA.
         */
        $scope.stepForward = function() {
            console.log("stepForward called");
            $scope.syncDFA();
        }

        /**
         * called when a user clicks the "Step Backward" button.
         *
         * steps backward in the conversion from NFA to DFA.
         */
        $scope.stepBackward = function() {
            console.log("stepBackward called");
            $scope.syncDFA();
        }

        /**
         * called when a user clicks the "Run Conversion" button.
         *
         * runs the conversion from NFA to DFA until 
         * at 1 second intervals until pauseConversion is called.
         */
        $scope.runConversion = function() {
            console.log("runConversion called");
            $scope.convert = true;
            while ($scope.convert === true) {   //add something to determine whether the conversion is complete
                
                //find a clean, non-blocking way to pause here.
                
                $scope.stepForward();
            }
        }

        /**
         * called when a user clicks the "Pause Conversion" button.
         *
         * pauses the conversion from NFA to DFA.
         */
        $scope.pauseConversion = function() {
            console.log("pauseConversion called");
            $scope.convert = false;
            $scope.syncDFA();
        }

    });
