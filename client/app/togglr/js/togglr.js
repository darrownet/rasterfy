$(function() {
  // var myDropzone = Dropzone.forElement("#imgdrop");
  var myDropzone = $("#imgdrop").dropzone({
      acceptedFiles:'image/*',
      url:'/api/togglr',
      maxFiles: 2,
      success: onSuccess,
      withCredentials: true
  });
  function onSuccess(file, obj) {
    console.log(file);
    console.log(obj);
  }
});
