var allCheckBox = $( "input[name='folder']" );
var engineSelected = false;
var engineFolder = $("#engineFolder");
var updatePackageObj = {
    folderPath: $("#folderPath").text().trim(),
    engineFolderName: null,
    disclaimerSheetLocation: null,
    disclaimerSheetName: null,
    disclaimerSheet: false,
    outputPath: $('#outputPath').val(),
    packages: []
};
var disclaimerSheet = $("#disclaimerSheet");

var modalOpenBtn = $('#modalOpenBtn');


$('#selAll').on( 'change' ,function() {
    if ($(this).is(':checked')) {
        allCheckBox.prop('checked', true);
    } else {
        allCheckBox.prop('checked', false);
    }
});

$('.checkmark-container input').on('change', function(e) {

    updatePackage(allCheckBox);

    if( checkAll(allCheckBox)) {
        $("#zipCreatorBtn").prop('disabled', true);
    }else {
        $("#zipCreatorBtn").prop('disabled', false);
    }

})

$("#outputPath").on('keyup', function() {
    
    updatePackageObj.outputPath = $("#outputPath").val();
    updatePackage(allCheckBox);
    console.log(updatePackageObj)
})

modalOpenBtn.on('click', function( e ) {
    e.preventDefault();
})

engineFolder.on('change', function() {

    updatePackageObj.engineFolderName = $(this).val();
    updatePackage(allCheckBox);

    engineSelected = true;
    if( !checkAll(allCheckBox)) {
        $("#zipCreatorBtn").prop('disabled', false);
    }else {
        $("#zipCreatorBtn").prop('disabled', true);
    }
})

$("#packageForm").on('submit', function( e ){
    
    $("#zipCreatorBtn").prop('disabled', true);
    modalOpenBtn.prop('disabled', true);
    $(".loading").show();
})

function checkAll( nodeList ) {

    for(var i in nodeList) {
        if( nodeList[i].checked && engineSelected ) {
            return false;
        }
    }
    return true;
}

disclaimerSheet.on('change', function( e ) {
    if( $(this).is(':checked') ){
        updatePackageObj.disclaimerSheet = true;
        updatePackageObj.disclaimerSheetLocation = $('#disclaimerSheetLocation').text().trim();
        updatePackageObj.disclaimerSheetName = $('#disclaimerSheetName').text().trim();
        modalOpenBtn.prop('disabled', true);
    }else {
        updatePackageObj.disclaimerSheet = false;
        updatePackageObj.disclaimerSheetLocation = null;
        updatePackageObj.disclaimerSheetName = null;
        modalOpenBtn.prop('disabled', false);
    }

    updatePackage(allCheckBox);

    console.log(updatePackageObj)
})

function updatePackage( nodeList ) {
    updatePackageObj.packages = [];

    for(var i in nodeList) {
        if( nodeList[i].checked ) {
            
            updatePackageObj.packages.push(
                {
                    folder: nodeList[i].value,
                    updatedFolderName: nodeList[i].value
                }
            )
        }
    }

    var obj = JSON.stringify(updatePackageObj);

    $("#packageForm").attr('action', '/make-zip?qry='+obj)
}