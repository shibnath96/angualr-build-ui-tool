$("#folderPath").on('keyup', function() {
    
    checkInput() ?  $("#submitBtn").prop('disabled', false) : $("#submitBtn").prop('disabled', true)

});

function checkInput() {
     
    //$("#folderPath").val() !== null && $("#folderPath").val() !== "" ? true : false
    if( $("#folderPath").val() !== null && $("#folderPath").val() !== ""){
        return true;
    }
    return false;
}