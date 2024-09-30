$(document).ready(function() {
    const rButton = $(".r-button");
    const yInput = $("#y");

    setDefaults();

    drawPlot();
    refreshLabels(parseFloat($('input[name="r"]:checked').val()))

    function setDefaults() {
        $('input[name="x"][value="0"]').prop('checked', true);
        $('#y').val(0);
        $('input[name="r"][value="1"]').prop('checked', true);
    }

    yInput.on('input', function() {
        yInput.val(yInput.val().replace(/[^0-9.,-]/g, ''));
        yInput.val(yInput.val().replace(/,/g, '.'));

        if (yInput.val() && (parseFloat(yInput.val()) < -3 || parseFloat(yInput.val()) > 5)) {
            yInput.val(parseFloat(yInput.val()) > 5 ? 5 : -3);
        }

        if (yInput.val().indexOf('.') !== -1 && yInput.val().split('.')[1].length > 3) {
            yInput.val(yInput.val().substring(0, yInput.val().indexOf('.') + 4));
        }

        if ((yInput.val().match(/\./g) || []).length > 1) {
            yInput.val(yInput.val().substring(0, yInput.val().lastIndexOf('.')));
        }

        if ((yInput.val().match(/\./g) || []).length === 1 && yInput.val().indexOf('.') === 0) {
            yInput.val('0' + yInput.val());
        }
    });
});