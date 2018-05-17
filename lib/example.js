var popupOnClick;

(function($) {

  popupOnClick = function(title,imagePath) {
    $('#popup-datamodel-title').html(title);
    $('#popup-datamodel-image').attr( 'data', imagePath);
    var popupDataModel = $('#popup-datamodel').enhanceWithin().popup();
    popupDataModel.popup('open');
    setTimeout( function() { popupDataModel.popup( 'reposition', 'positionTo: window' ); }, 100 );
  };
  
  //initialize JSV when the pagecontainer is ready
  var init = function(event, ui) {
    var loc = window.location,
        //if not already set, set the root schema location
        //this allows dev ENV to override the schema location
        schema = JSV.schema ? JSV.schema : $( '#schemaSelector option:selected' ).val();

    JSV.init({
      schema : schema
    }, function() {

      //display schema version
      JSV.setVersion(tv4.getSchema(JSV.treeData.schema).version);
      //handle permalink
      if (window.jsvInitPath) {
        var node = JSV.expandNodePath(window.jsvInitPath.split('-'));

        JSV.flashNode(node);
        JSV.clickTitle(node);
      } else {
        JSV.resetViewer();
      }
    });
  };

  $('body').one('pagecontainershow', init);
  
  $('#schemaSelector').change( function() {
    JSV.schema = $( '#schemaSelector option:selected' ).val();
    JSV.resetViewer();
    if( $('#info-panel').hasClass("ui-panel-open") == true ) {
      $('#info-panel-selector').click();
    }
    init();
  });

})(jQuery);
