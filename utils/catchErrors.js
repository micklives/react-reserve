const catchErrors = (error, displayError) => {
  let errorMsg;
  if (error.response) {
    // request made, server status code not in 2xx
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);
    // cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
      console.error("Cloudinary error", errorMsg);
    }
  } else if (error.request) {
    // request made, no response received
    errorMsg = error.request;
    console.error("Error request", errorMsg);
  } else {
    // something else
    errorMsg = error.message;
    console.error("Error meessage", errorMsg);
  }
  displayError(errorMsg);
};

export default catchErrors;
