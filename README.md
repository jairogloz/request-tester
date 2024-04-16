# 🚀 API Request Tester 🚀

Welcome to the API Request Tester, your new favorite tool for testing API requests right from your browser! 🌐

## 📝 Description 📝

This project is designed to help you test requests against your API directly from a browser. It's perfect for testing CORS and actual browser behavior, which can sometimes be tricky with tools like curl or Postman. It's a dead simple application, so it might not be the prettiest, but it gets the job done! 😎

## 🛠️ How to Use 🛠️

1.  Create a JSON file named `requests.json` inside the `data` folder. This file will contain all the requests you want to test.
2.  Each request in the `requests.json` file should follow this structure:

```json
{
  "name": "Request Name",
  "url": "Request URL",
  "verb": "HTTP Verb",
  "headers": [
    { "name": "Header Name", "values": ["Header Value"] }
    // More headers...
  ],
  "body": {
    // Request body...
  }
}
```

Here's an example:

```json
{
  "name": "Local create CustomLabelType",
  "url": "http://127.0.0.1:8010/my/backend/endpoint",
  "verb": "POST",
  "headers": [
    { "name": "Authorization", "values": ["Token your_token_here"] },
    { "name": "My-Header", "values": ["valueA", "valueB"] },
    { "name": "Content-Type", "values": ["application/json"] }
  ],
  "body": {
    "name": "custom_label_1",
    "description": "custom description 1"
  }
}
```

3.  Once you've added your requests to the `requests.json` file, they will be loaded into the application. You can choose the request you want to send from the select element.
4.  Hit the `sendRequest` button to send the request. The result will be displayed below, including the status code, headers, response body, and any errors.

## 🌐 Serving the Application Locally 🌐

To use the API Request Tester, you'll need to serve the website locally. This is because the application needs to load the `requests.json` file, and most browsers restrict local file access due to security reasons. Here are a few options for serving the application:

### Using Chrome Web Server

If you're using Google Chrome, you can use the Web Server for Chrome extension.

1.  Install the extension and open it.
2.  Choose the folder where your project is located.
3.  Open the provided local URL in your browser.

### Using Node.js

If you have Node.js and npm installed, you can use the `http-server` package:

1.  Install the package globally with `npm install -g http-server`.
2.  Navigate to your project directory in a terminal.
3.  Run `http-server`.
4.  Open the provided local URL in your browser.

## 🎉 Why Use API Request Tester? 🎉

The motivation behind this project is to provide a simple and effective way to test API requests from a browser with minimal effort. It's all about making your life easier! 🥳

## 🤝 How to Contribute 🤝

We welcome contributions from everyone. Whether you're a seasoned developer or a beginner, your contributions are valuable to us. If you're interested in contributing, please fork the repository and make your changes. Once you're done, open a pull request and we'll review it as soon as possible.

Remember, this is a dead simple application, so it might not be the most beautiful, but it's functional and that's what matters! Let's keep it simple and focus on functionality. 🚀

Thank you for using API Request Tester! Happy testing! 🎉
