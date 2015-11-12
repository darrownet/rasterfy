$(function() {
  // var myDropzone = Dropzone.forElement("#imgdrop");
  var myDropzone = $("#imgdrop").dropzone({
      acceptedFiles:'image/*',
      url:'/api/stream',
      success: onSuccess
  });
  function onSuccess(file, obj) {
      console.log()
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = window.location.origin + '/api/stream/' + obj.fileName + '?originalName=' + obj.originalName;
      setTimeout(function(){
          $(iframe).remove();
      },10000);
  }
});
