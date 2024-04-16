$(document).ready(function () {
  // Load requests from JSON files and populate dropdown
  // This assumes you have a function loadRequests() that does this

  loadRequests();

  $("#sendRequest").click(function () {
    // Get the selected request
    var selectedRequest = $("#requestDropdown option:selected").text();

    // Find the corresponding request in your requests.json file
    $.getJSON("data/requests.json", function (requests) {
      var request = requests.find((r) => r.name === selectedRequest);
      // Send the request
      var headersMap = request.headers.reduce(function (map, obj) {
        map[obj.name] = obj.values;
        return map;
      }, {});
      $.ajax({
        url: request.url,
        type: request.verb,
        headers: headersMap,
        data: JSON.stringify(request.body),
        success: function (response, textStatus, xhr) {
          console.log("success");
          // Populate the response elements
          $("#responseStatus").text(xhr.status);

          var headers = xhr
            .getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/);
          var headersMap = headers.map(function (header) {
            var parts = header.split(": ");
            var headerObj = {};
            headerObj[parts[0]] = parts[1];
            return headerObj;
          });
          $("#responseHeaders").text(JSON.stringify(headersMap, null, 2));

          $("#responseBody").val(JSON.stringify(response, null, 2));
          $("#responseError").text("");
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("error");
          // Populate the error element
          $("#responseStatus").text(xhr.status);

          var headers = xhr
            .getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/);
          var headersMap = headers.map(function (header) {
            var parts = header.split(": ");
            var headerObj = {};
            headerObj[parts[0]] = parts[1];
            return headerObj;
          });
          $("#responseHeaders").text(JSON.stringify(headersMap, null, 2));

          // Parse the JSON response body
          var responseBody = JSON.parse(xhr.responseText);
          $("#responseBody").text(JSON.stringify(responseBody, null, 2));

          $("#responseError").text(errorThrown);
        },
      });
    });
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
      $("#verbValue").text(request.verb);
      $("#requestBody").text(JSON.stringify(request.body, null, 2));
      var headersTable = $("#headersTable");
      headersTable.find("tr:gt(0)").remove(); // Remove all rows except for the first one and the last one
      $.each(request.headers, function (i, header) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(header.name));
        row.append($("<td></td>").text(header.values.join(", ")));
        headersTable.append(row);
      });

      // clear response section
      $("#responseBody").val("");
      $("#responseError").text("");
      $("#responseHeaders").text("");
      $("#responseStatus").text("");
    });
    reqDropdown.trigger("change");
  });
}
