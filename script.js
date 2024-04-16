$(document).ready(function () {
  // Load requests from JSON files and populate dropdown
  // This assumes you have a function loadRequests() that does this

  loadRequests();

  // Add event listener for "Add Header" button
  $("#addHeader").click(function () {
    $("#headersTable").append(
      '<tr><td><input type="text"></td><td><input type="text"></td><td><button class="deleteHeader">Delete</button></td></tr>'
    );
  });

  // Add event listener for "Delete" buttons
  $(document).on("click", ".deleteHeader", function () {
    $(this).closest("tr").remove();
  });

  // Add event listener for "Send Request" button
  $("#sendRequest").click(function () {
    var verb = $("#verbDropdown").val();
    var headers = {};
    $("#headersTable tr").each(function () {
      var headerName = $(this).find("td").eq(0).find("input").val();
      var headerValue = $(this).find("td").eq(1).find("input").val();
      if (headerName && headerValue) {
        headers[headerName] = headerValue;
      }
    });
    var body = $("#requestBody").val();

    $.ajax({
      url: $("#requestDropdown").val(),
      type: verb,
      headers: headers,
      data: body,
      success: function (response, textStatus, xhr) {
        $("#responseStatus").text(xhr.status);
        $("#responseHeaders").text(JSON.stringify(xhr.getAllResponseHeaders()));
        $("#responseBody").text(JSON.stringify(response));
        $("#responseError").text("");
      },
      error: function (xhr, textStatus, errorThrown) {
        $("#responseStatus").text(xhr.status);
        $("#responseHeaders").text(JSON.stringify(xhr.getAllResponseHeaders()));
        $("#responseBody").text("");
        $("#responseError").text(errorThrown);
      },
    });
  });

  // Add event listener for "Save Request" button
  $("#saveRequest").click(function () {
    // This assumes you have a function saveRequest() that does this
    saveRequest();
  });
});

function loadRequests() {
  $.getJSON("data/requests.json", function (data) {
    var reqDropdown = $("#requestDropdown");
    reqDropdown.empty();
    $.each(data, function (i, request) {
      reqDropdown.append(
        $("<option></option>")
          .attr("value", request.url)
          .text(request.name)
          .data("request", request)
      );
    });
    reqDropdown.change(function () {
      var selectedOption = $(this).find("option:selected");
      var request = selectedOption.data("request");
      $("#urlValue").text(request.url);
      $("#verbDropdown").val(request.verb);
      var headersTable = $("#headersTable");
      headersTable.find("tr:gt(0)").remove(); // Remove all rows except for the first one
      $.each(request.headers, function (i, header) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(header.name));
        row.append($("<td></td>").text(header.values.join(", ")));
        headersTable.append(row);
      });
    });
    reqDropdown.trigger("change");
  });
}
