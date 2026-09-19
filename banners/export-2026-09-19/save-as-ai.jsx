#target illustrator
// Run with File > Scripts > Other Script in Adobe Illustrator.
var directory = File($.fileName).parent;
var source = new File(directory + '/edtech-editable-1920x1080.svg');
if (!source.exists) {
    alert('Keep this script next to edtech-editable-1920x1080.svg.');
} else {
    var destination = new File(directory + '/edtech-editable-1920x1080.ai');
    if (!destination.exists || confirm('Replace the existing AI file?')) {
        var document = app.open(source);
        var options = new IllustratorSaveOptions();
        options.pdfCompatible = true;
        document.saveAs(destination, options);
        alert('Saved: ' + destination.fsName);
    }
}
