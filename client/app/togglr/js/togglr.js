$(function() {
  // var myDropzone = Dropzone.forElement("#imgdrop");
  $("#submit-all").hide();
  var togglrDropzone = $("#imgdrop").dropzone({
      acceptedFiles:'image/*',
      url:'/api/togglr',
      maxFiles: 2,
      success: onSuccess,
      withCredentials: true,
      autoProcessQueue: false,
      uploadMultiple: true,
      init: function() {
        var submitButton = document.querySelector("#submit-all"),
            togglrDropzone = this; // closure

        submitButton.addEventListener("click", function() {
          togglrDropzone.processQueue(); // Tell Dropzone to process all queued files.
          //console.log(togglrDropzone);
        });

        // You might want to show the submit button only when 
        // files are dropped here:
        this.on("addedfile", function() {
          if(this.files.length > 1){
            $("#submit-all").show();
          }
        });
      }
  });
  function onSuccess(file, obj) {
    console.log(file);
    console.log(obj);
  }
});
