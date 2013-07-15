$(document).bind("mobileinit", function(){
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  $.mobile.touchOverflowEnabled = true;
  //$.mobile.page.prototype.options.addBackBtn = true;
  $('body').removeClass('ui-loading');
});