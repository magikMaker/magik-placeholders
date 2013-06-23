/**
 * Displays placeholder texts, also removes the placeholder upon focus and puts
 * the placeholder back in upon blur (if nothing was changed). 
 * @example
 * // initialize the placeholders, selector is optional
 * Magik.Placeholders.init(selector);
 * 
 * // remove a placeholder from a jQuery element
 * Magik.Placeholders.removePlaceholder($jQueryElement);
 *
 * @class
 */
Magik.Placeholders = (function(){
    /**
     * Holds the forms that are already initialized
     */
    var initialized = [];
    
    /**
     * sets the placeholder text as value and also add the css class
     * 'placeholder'.
     * 
     * @private
     * @param {Object} $input the jQuery object
     * @returns {void}
     */
    function setPlaceholder($input){
        var value = $input.val();
        var placeholder = $input.data('placeholder');

        if(!value || value == placeholder){
            $input.addClass('placeholder');
            setValue($input, placeholder);
        }
    }
    
    /**
     * Resets a placeholder, i.e. removes the value and sets the placeholder
     * 
     * @param {Object} $input the jQuery object
     * @returns {void}
     */
    function resetPlaceholder($input){
        $input.val('');
        setPlaceholder($input);
    }
    
    /**
     * returns the placeholer of the given element
     * 
     * @param {String|Object} element either the ID or the jQuery object
     * @returns {String} the place holder text
     */
    function getPlaceholder($input){
        $input = 'string' == typeof $input ? $('#'+$input) : $input;
        return $input.data('placeholder') || '';
    }
    
    /**
     * sets or removes the place holder, depending on the current value. Gets 
     * called through the change trigger.
     * 
     * @private
     * @param {Object} $input the jQuery object
     * @returns {void}
     */
    function changePlaceholder($input){
        var value = $input.val();
        var placeholder = $input.data('placeholder');
         
        if(!value || value == placeholder){
            $input.addClass('placeholder');
            setValue($input, placeholder);
        }
        else if(value || value != placeholder){
            $input.removeClass('placeholder');
        }
    }
        
    /**
     * Removes the placeholder text and also removes the css class 
     * 'placeholder'.
     * 
     * @public
     * @param {Object} $input the jQuery object
     * @returns {void}
     */
    function removePlaceholder($input){
        var value = $input.val();
        
        if($input.hasClass('placeholder') 
          && (!value || value == $input.data('placeholder'))){
            $input.removeClass('placeholder');
            setValue($input);
        }
    }
    
    /**
     * removes all placeholders in a form, use this before submitting a form
     * 
     * @public
     * @param {Object} $form the jQuery form object 
     */
    function removeAllPlaceholders($form){
        $form.find('input, textarea').each(function(){
            removePlaceholder($(this));
        });
    }
    
    /**
     * sets the value of an <code>&lt;input&gt;</code> or 
     * <code>&lt;textarea&gt;</code>
     * 
     * @private
     * @param {Object} input the input jQuery object
     * @param {Mixed} [value] the value to set leave empty to erase value
     */
    function setValue($input, value){
        value = $.trim(value || '');
        $input.val(value);
    }
    
    /**
     * initializes the place holders in a form
     * 
     * @public
     * @param {String} [selector] valid jQuery selector the Form
     */
    function initialize(selector){
        selector = selector || 'form';

        /**
         * @function iterate over each form element with a placeholder sets the 
         * placeholder and bind focus and blur events.
         */
        $(selector + ' input, ' + selector + ' textarea')
          .filter(function(){
              var $this = $(this);
              return $this.data('placeholder') && !$this.data('placeholder-initialized');
          })
          .each(function(){
              var $this = $(this);
              $this.data('placeholder-initialized', true);
              var value = $this.val();

              if(!value){
                  setPlaceholder($this);
                  
                  /**
                   * @function upon focus clear the placeholder text
                   */
                  $this.bind('focus', function(e){
                      removePlaceholder($(this));
                  });
                
                  /**
                   * @function upon focus clear the placeholder text
                   */
                  $this.bind('change', function(e){
                      changePlaceholder($(this));
                  });
                
                  /**
                   * @function upon blur put the placeholder text back in if no  
                   * input was supplied
                   */
                  $this.bind('blur', function(e){
                      setPlaceholder($(this));
                  });
              }
        });
    }
    
    /**
     * the public interface
     */
    return {
        getPlaceholder: getPlaceholder,
        init: initialize,
        resetPlaceholder: resetPlaceholder,
        setPlaceholder: setPlaceholder,
        removeAllPlaceholders: removeAllPlaceholders, 
        removePlaceholder: removePlaceholder
    };
}());