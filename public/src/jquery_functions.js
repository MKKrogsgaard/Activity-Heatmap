// Only run these when the page has finished loading
$(document).ready(function(){
    // Global variables

    // Add/remove file dropping styling to the file upload field if the user is hovering over it with a file in hand
    $('.file-upload-wrapper').bind('dragover', function() {
        $(".file-upload-wrapper").addClass('file-dropping');
    });
    $('.file-upload-wrapper').bind('dragleave', function() {
        $('.file-upload-wrapper').removeClass('file-dropping');
    });

    // Event listener for file uploads (when the user drops files into the wrapper)
    $('.file-upload-wrapper').on('drop', function(event) {
        event.preventDefault(); // Prevent the default action that the browser takes when a form is submitted
        event.stopPropagation(); // Stops the event from traveling up the hierarchy of elements (so listeners on parent elements don't trigger)
        $('.file-upload-wrapper').removeClass('file-dropping') // Get rid of the dropping styling

        const dataTransfer = event.originalEvent.dataTransfer || event.dataTransfer; // Use originalEvent.dataTransfer if available, otherwise use event.dataTransfer (for cross-browser compatability)
        const files = dataTransfer.files;
       
        if (files && files.length > 0) { // Check to ensure that files contains at least one file
            submitFiles(files);
        }
    });

    // Event listener for file uploads (when the user picks files via the file selector)
    $('.file-upload-input').on('change', function() {
        submitFiles(this);
    });
}); 