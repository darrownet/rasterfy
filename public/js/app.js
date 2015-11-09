$(function() {
  var myDropzone = Dropzone.forElement("#imgdrop");
  myDropzone.on("success", function(file, obj) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = window.location.origin + '/yeah/' + obj.fileName + '?originalName=' + obj.originalName;
      setTimeout(function(){
          $(iframe).remove();
      },10000);
  });
});